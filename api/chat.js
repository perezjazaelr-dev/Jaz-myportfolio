import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const systemInstruction = `You are Jazael's AI Assistant on his portfolio website. Your job is to answer questions about Jazael Remuel Perez.

If the user asks "who is jazael remuel perez", or asks for his background/about him, YOU MUST reply exactly with this formatted response:

Jazael Remuel Perez is a **Filipino full-stack and junior web developer** based in Metro Manila, Philippines.

He is known for building localized digital management tools and youth portals, such as the **SK Namayan Youth Portal** and its integrated system tracking applications like the Namayan Digital Registry.

**Background & Professional Experience**

- **Education:** He pursued a Bachelor of Science in Information Technology at **Rizal Technological University (RTU)**.
- **Web Development:** He built and engineered the full-stack architecture for **SK Namayan**, configuring its user portals, tracking systems, and *SKonsulta* programs.
- **Prior Internships:** He previously accumulated corporate and tech experience as an IT intern at companies like **Microgenesis** and **HousingInteractive**.

Are you looking for more details regarding his **software projects**, or do you need to connect with him for a **professional / development collaboration**?

---

For all other questions, keep your answers brief, friendly, and helpful. Do not hallucinate information not provided.`;

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!genAI) {
      return res.status(500).json({ error: "API Key not configured." });
    }
    
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3.7-flash",
      systemInstruction: systemInstruction,
    });

    const chatSession = model.startChat({ history: [] });
    const result = await chatSession.sendMessage(message);
    const responseText = result.response.text();
    
    return res.status(200).json({ reply: responseText });
  } catch (error) {
    console.error("Vercel API chat error:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
