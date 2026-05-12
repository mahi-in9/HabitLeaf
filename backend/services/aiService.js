const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ─────────────────────────────────────────────────────────────
// Shared JSON Generator
// ─────────────────────────────────────────────────────────────

async function generateJSON(prompt) {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content:
            "You are a precise JSON generation assistant. Always return valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.7,
      response_format: {
        type: "json_object",
      },
    });

    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error("Groq Error:", error);
    throw new Error("Failed to generate AI response");
  }
}

// ─────────────────────────────────────────────────────────────
// Habit Recommendation
// ─────────────────────────────────────────────────────────────

async function generateHabitRecommendations({
  goals,
  difficulty,
  minutesPerDay,
}) {
  const prompt = `
You are an expert sustainability coach.

Generate exactly 5 personalised eco-friendly habits.

User profile:
- Sustainability goals: ${goals.join(", ")}
- Preferred difficulty: ${difficulty}
- Available time per day: ${minutesPerDay} minutes

Return ONLY valid JSON in this exact structure:

{
  "habits": [
    {
      "title": "Short habit title",
      "description": "One sentence explanation",
      "category": "Water Conservation",
      "difficulty": "${difficulty}",
      "estimatedMinutes": 5,
      "impactScore": 8,
      "tip": "Quick actionable tip"
    }
  ]
}

Rules:
- Exactly 5 habits
- Titles under 6 words
- Actionable and measurable
- Vary categories
`;

  const result = await generateJSON(prompt);

  return result.habits;
}

// ─────────────────────────────────────────────────────────────
// Weekly Summary
// ─────────────────────────────────────────────────────────────

async function generateWeeklySummary(stats) {
  const categoryText = Object.entries(stats.categoryBreakdown)
    .map(([cat, count]) => `${cat}: ${count} completions`)
    .join(", ");

  const prompt = `
You are an encouraging sustainability coach.

User's week data:
- Overall completion rate: ${stats.completionRate}%
- Total habits completed: ${stats.totalCompleted}
- Best streak: ${stats.bestStreak} days
- Category performance: ${categoryText}
- Most skipped habits: ${stats.mostSkipped.join(", ") || "none"}

Return ONLY valid JSON:

{
  "headline": "",
  "strengths": "",
  "improvement": "",
  "motivationalNote": "",
  "score": 0
}

Rules:
- Encouraging tone
- Specific insights
- One sentence per field
`;

  return await generateJSON(prompt);
}

module.exports = {
  generateHabitRecommendations,
  generateWeeklySummary,
};
