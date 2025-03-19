import { NextRequest, NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { text } = await req.json()
    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    // Send request to the external API
    const response = await fetch("https://sarvam-audio-deploy.onrender.com/generate-audio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })

    if (!response.ok) {
      return NextResponse.json({ error: await response.text() }, { status: response.status })
    }

    // Directly stream the response without waiting for the full buffer
    return new NextResponse(response.body, {
      headers: { "Content-Type": "audio/wav" },
    })
  } catch (error) {
    console.error("Error generating audio:", error)
    return NextResponse.json({ error: "Failed to generate audio" }, { status: 500 })
  }
}
