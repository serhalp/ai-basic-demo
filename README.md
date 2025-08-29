# Triple Jeopardy

A Jeopardy! game that compares AI responses from multiple backends. Give it an answer, and three different AI models will respond with questions.

**Live demo:** <https://triple-jeopardy.netlify.app>

## Features

- Compare responses from OpenAI, Anthropic (Claude), and Google Gemini
- Select different models for each backend
- See response times for each AI
- Netlify serverless and edge functions
- Real-time streaming responses

## Setup

1. Clone this repo
2. Set environment variables:
   - `OPENAI_API_KEY`
   - `ANTHROPIC_API_KEY`
   - `GEMINI_API_KEY`
3. Deploy to Netlify or run locally with `netlify dev`

## Functions

- `/openai` - OpenAI serverless function
- `/openai-edge` - OpenAI edge function
- `/anthropic` - Anthropic serverless function
- `/gemini` - Google Gemini serverless function

Built with Netlify Functions, Netlify Edge Functions, and vanilla HTML/CSS/JS.
