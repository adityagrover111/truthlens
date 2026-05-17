// ============================================================
// src/app/api/investigate/route.ts
// THE BRAIN OF TRUTHLENS — This is the backend API route.
//
// How Next.js API routes work:
// - Files in /app/api/ become API endpoints automatically
// - This file handles POST requests to /api/investigate
// - It runs on the SERVER, so API keys are NEVER sent to the browser
// - The frontend sends a claim → this route processes it → returns a report
//
// Why server-side? If we called Gemini from the browser, our API key
// would be visible to anyone who opens DevTools. Server-side = secret.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { type InvestigationReport } from "@/types/investigation";

// ============================================================
// TAVILY SEARCH FUNCTION
// Searches the web for real evidence about a claim
// ============================================================
async function searchWithTavily(query: string): Promise<string> {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) return ""; // No key = skip search

  try {
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        query: query,
        search_depth: "advanced",  // More thorough search
        max_results: 8,            // Get 8 results
        include_answer: true,      // Get a summarized answer too
        include_raw_content: false, // Skip raw HTML (saves tokens)
      }),
    });

    if (!response.ok) return "";

    const data = await response.json();

    // Format the search results into a readable string for Gemini
    const results = data.results
      ?.slice(0, 6) // Use top 6 results
      .map((r: { title: string; url: string; content: string }, i: number) =>
        `[Source ${i + 1}] ${r.title}\nURL: ${r.url}\nContent: ${r.content?.substring(0, 400)}...`
      )
      .join("\n\n");

    const answer = data.answer ? `Summary Answer: ${data.answer}\n\n` : "";
    return answer + results;
  } catch (error) {
    console.error("Tavily search failed:", error);
    return "";
  }
}

// ============================================================
// MAIN API HANDLER
// This function runs every time the frontend calls POST /api/investigate
// ============================================================
export async function POST(request: NextRequest) {
  try {
    // --- Step 1: Read and validate the request ---
    // request.json() parses the JSON body sent by the frontend
    const body = await request.json();
    const { claim } = body;

    // Input validation — never trust user input!
    if (!claim || typeof claim !== "string") {
      return NextResponse.json(
        { success: false, error: "A claim is required.", isLiveSearch: false },
        { status: 400 } // 400 = Bad Request
      );
    }

    const trimmedClaim = claim.trim();
    if (trimmedClaim.length < 10) {
      return NextResponse.json(
        { success: false, error: "Claim is too short. Please provide more context.", isLiveSearch: false },
        { status: 400 }
      );
    }
    if (trimmedClaim.length > 5000) {
      return NextResponse.json(
        { success: false, error: "Claim is too long. Max 5000 characters.", isLiveSearch: false },
        { status: 400 }
      );
    }

    // --- Step 2: Check for API key ---
    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      return NextResponse.json(
        { success: false, error: "Server configuration error. GEMINI_API_KEY is missing.", isLiveSearch: false },
        { status: 500 } // 500 = Server Error
      );
    }

    // --- Step 3: Try live web search (if Tavily key exists) ---
    const hasTavily = !!process.env.TAVILY_API_KEY;
    let searchContext = "";

    if (hasTavily) {
      // Search for information about the claim
      searchContext = await searchWithTavily(trimmedClaim);
    }

    const isLiveSearch = hasTavily && searchContext.length > 0;

    // --- Step 4: Build the Gemini prompt ---
    // This is the instruction we send to the AI
    const searchSection = isLiveSearch
      ? `\n\nLIVE WEB SEARCH RESULTS (use these as primary evidence):\n${searchContext}\n`
      : `\n\nNOTE: No live search available. Use your training knowledge only. Be transparent about uncertainty.\n`;

    const prompt = `You are TruthLens — an expert AI fact-checker and investigative analyst. 
Analyze the following claim with the rigor of a professional journalist and intelligence analyst.

CLAIM TO INVESTIGATE:
"${trimmedClaim}"
${searchSection}

Perform a thorough credibility investigation. Consider:
- Factual accuracy based on available evidence
- Source reliability and potential bias
- Missing context that changes interpretation
- Logical consistency and internal contradictions
- Red flags like vague sourcing, emotional language, or unverifiable stats

YOU MUST respond with ONLY valid JSON. No markdown, no explanation, no code fences.
The JSON must exactly match this structure:

{
  "caseTitle": "Short investigative title (max 8 words)",
  "verdict": "Trustworthy" or "Unclear" or "Misleading" or "False",
  "credibilityScore": number between 0 and 100,
  "summary": "2-3 sentence plain English summary of findings",
  "extractedClaims": ["array", "of", "specific", "factual", "claims", "found"],
  "supportingEvidence": [
    {
      "point": "Specific evidence that supports the claim",
      "sourceType": "Official" or "News" or "Academic" or "Social" or "Unknown",
      "reliability": number between 0 and 100
    }
  ],
  "contradictingEvidence": [
    {
      "point": "Specific evidence that contradicts or complicates the claim",
      "sourceType": "Official" or "News" or "Academic" or "Social" or "Unknown",
      "reliability": number between 0 and 100
    }
  ],
  "redFlags": ["array of specific warning signs or suspicious elements"],
  "missingContext": ["array of important context that is missing"],
  "suggestedSearchQueries": ["specific Google search queries the user should run"],
  "confidenceExplanation": "1-2 sentences explaining why the credibility score is what it is",
  "nextSteps": ["array of actionable steps the user should take to verify this"]
}

Scoring guide: 80-100 = strong evidence of truth, 60-79 = likely true but uncertain, 40-59 = mixed evidence, 20-39 = likely misleading, 0-19 = strong evidence of falsehood.

Be specific, not vague. Reference actual facts. Minimum 3 items in each evidence array.`;

    // --- Step 5: Call Gemini API ---
    // GoogleGenerativeAI is imported from the official Google package
    const genAI = new GoogleGenerativeAI(geminiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash", // Fast and free tier
      generationConfig: {
        temperature: 0.3,      // Lower = more factual, less creative
        maxOutputTokens: 4096, // Max length of response
      },
    });

    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    // --- Step 6: Parse the JSON response ---
    // Gemini sometimes wraps JSON in ```json ... ``` blocks
    // We need to strip those out before parsing
    let cleanedText = rawText
      .replace(/```json\s*/gi, "") // Remove opening ```json
      .replace(/```\s*/gi, "")     // Remove closing ```
      .trim();

    // Find the JSON object (starts with { and ends with })
    const jsonStart = cleanedText.indexOf("{");
    const jsonEnd = cleanedText.lastIndexOf("}");
    if (jsonStart !== -1 && jsonEnd !== -1) {
      cleanedText = cleanedText.substring(jsonStart, jsonEnd + 1);
    }

    // Parse the cleaned JSON string into a JavaScript object
    let report: InvestigationReport;
    try {
      report = JSON.parse(cleanedText) as InvestigationReport;
    } catch {
      // If parsing fails, return an error
      console.error("JSON parse failed. Raw text:", rawText.substring(0, 500));
      return NextResponse.json(
        {
          success: false,
          error: "The AI returned an unexpected response format. Please try again.",
          isLiveSearch,
        },
        { status: 500 }
      );
    }

    // --- Step 7: Validate the parsed report has required fields ---
    if (!report.verdict || !report.credibilityScore || !report.summary) {
      return NextResponse.json(
        {
          success: false,
          error: "Incomplete analysis received. Please try again.",
          isLiveSearch,
        },
        { status: 500 }
      );
    }

    // --- Step 8: Return the successful response ---
    return NextResponse.json({
      success: true,
      report,
      isLiveSearch, // Frontend uses this to show the disclaimer
    });

  } catch (error) {
    // Catch any unexpected errors
    console.error("Investigation API error:", error);

    // Return a user-friendly error (don't expose internal details)
    return NextResponse.json(
      {
        success: false,
        error: "Investigation failed. Please check your connection and try again.",
        isLiveSearch: false,
      },
      { status: 500 }
    );
  }
}
