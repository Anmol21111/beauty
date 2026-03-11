// frontend/services/geminiService.ts

export const getBeautyConsultation = async (concerns: string) => {
  // Frontend NEVER calls Gemini directly
  // It only talks to backend API

  const res = await fetch("http://localhost:5000/api/ai/consult", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ concerns })
  });

  if (!res.ok) {
    throw new Error("AI consultation failed");
  }

  return res.json();
};
