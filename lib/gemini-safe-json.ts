/**
 * Centralized Gemini safe JSON parser and model cascade utility.
 * Guarantees zero runtime crashes when processing model outputs,
 * stripping markdown code fences and handling partial / formatted JSON.
 */

export const ACTIVE_GEMINI_MODELS = [
  "gemini-flash-latest",
  "gemini-flash-lite-latest",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-pro-latest"
] as const;

/**
 * Safely parse JSON from an LLM response string.
 * Strips code fences (```json ... ```), trims leading/trailing chatter,
 * and recovers valid JSON blocks.
 */
export function safeParseLLMJson<T>(rawText: string, fallback: T): T {
  if (!rawText || typeof rawText !== "string") {
    return fallback;
  }

  let cleaned = rawText.trim();

  // Strip markdown code fences if present: ```json ... ``` or ``` ... ```
  cleaned = cleaned.replace(/^```(?:json|JSON)?\s*\n?/i, "");
  cleaned = cleaned.replace(/\n?```\s*$/i, "");
  cleaned = cleaned.trim();

  // Attempt 1: Direct JSON parse
  try {
    const parsed = JSON.parse(cleaned);
    if (parsed !== null && parsed !== undefined) {
      return parsed as T;
    }
  } catch {}

  // Attempt 2: Extract from the first '{' to the last '}'
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    try {
      const braceSubstr = cleaned.substring(firstBrace, lastBrace + 1);
      const parsed = JSON.parse(braceSubstr);
      if (parsed !== null && parsed !== undefined) {
        return parsed as T;
      }
    } catch {}
  }

  // Attempt 3: Extract from the first '[' to the last ']'
  const firstBracket = cleaned.indexOf("[");
  const lastBracket = cleaned.lastIndexOf("]");
  if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
    try {
      const bracketSubstr = cleaned.substring(firstBracket, lastBracket + 1);
      const parsed = JSON.parse(bracketSubstr);
      if (parsed !== null && parsed !== undefined) {
        return parsed as T;
      }
    } catch {}
  }

  return fallback;
}
