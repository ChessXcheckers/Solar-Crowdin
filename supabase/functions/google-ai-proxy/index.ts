import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

const GOOGLE_AI_API_KEY = Deno.env.get('GOOGLE_AI_API_KEY')
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS })
  }

  try {
    const { userMessage } = await req.json()

    if (!userMessage) {
      return new Response(JSON.stringify({ error: 'userMessage is required' }), {
        status: 400,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      })
    }

    if (!GOOGLE_AI_API_KEY) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      })
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_AI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are SolarBot AI, an expert assistant for SolarCrowdin - a revolutionary solar energy crowdfunding platform.

Context:
- SolarCrowdin is launching the SLC token presale at $0.063 per token
- Listing price will be $0.14 (122% potential gain)
- Total supply: 6 billion SLC tokens
- VIP levels offer increasing bonuses (20% to 100%)
- Platform supports ETH, BNB, USDT, USDC payments
- Contract address: 0xeaa91F0ef29ECE13dB9F2B46982DDbFa9ff83412
- Focus on solar energy, AI optimization, and sustainable technology

User question: ${userMessage}

Please provide a helpful, accurate response about SolarCrowdin, the SLC token, or related topics. Keep responses conversational but informative. Use relevant emojis. If asked about topics outside of SolarCrowdin/crypto/solar energy, politely redirect to SolarCrowdin topics.`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble processing that right now. Please try again.";

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    })
  }
})
