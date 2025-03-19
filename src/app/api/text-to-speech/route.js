import { NextResponse } from "next/server";
import zlib from "zlib";

// API URL for the external Text-to-Speech service
const API_URL = "https://sarvam-audio-deploy.onrender.com/generate-audio";

// Configure this function to run on the Edge for lower latency
export const config = {
  runtime: "edge",
};

export async function POST(req) {
  try {
    // Parse the incoming JSON request body
    const { text } = await req.json();

    // Validate if text is provided
    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Make a request to the external Text-to-Speech API
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }), // Send the text input to generate speech
    });

    // If API response is not successful, return an error
    if (!response.ok) {
      return NextResponse.json({ error: await response.text() }, { status: response.status });
    }

    // Convert the API response into an audio buffer
    const audioBuffer = await response.arrayBuffer();

    // Compress the audio buffer using Gzip for faster transfer
    const compressedAudio = zlib.gzipSync(Buffer.from(audioBuffer));

    // Return the compressed audio response with proper headers
    return new NextResponse(compressedAudio, {
      headers: {
        "Content-Type": "audio/wav", // Audio file format
        "Content-Encoding": "gzip", // Enables Gzip compression for reduced size
      },
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error generating audio:", error);

    // Return a 500 Internal Server Error response
    return NextResponse.json({ error: "Failed to generate audio" }, { status: 500 });
  }
}
