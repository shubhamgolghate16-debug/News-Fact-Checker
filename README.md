An **AI-powered agent** that uses the **Google Gemini API** with Search grounding to fact-check news, articles, and claims in real-time. 

Users can input a **URL or a piece of text**, and the agent verifies the information against web sources, providing a clear rating, a concise summary, a justification for its conclusion, and a list of references.

Built with **React**, **TypeScript**, and the **Google Gemini API**.

**✨ Features**
- **AI-Powered Analysis**: Leverages the **gemini-2.5-flash** model for intelligent analysis of claims.
- **Real-time Web Verification**: Uses the googleSearch tool to ground responses in up-to-date information from the web.
- **Structured & Clear Results**: Receives a structured **JSON response** from the API, presenting a clear verdict (True, False, Misleading, etc.), a summary, and a justification.
- **Source Transparency**: Displays the web pages used by the model to arrive at its conclusion, allowing users to verify the sources themselves.
- **Modern & Responsive UI**: A clean, user-friendly interface built with **Tailwind CSS** that works on all devices.
- **Zero-Build Setup**: Built with a modern importmap setup, requiring no complex build tools to get started.

**🚀 Getting Started**
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.
**Prerequisites**
- Node.js (v18 or later recommended)
- A package manager like npm or yarn
- A Google Gemini API Key. You can get one from Google AI Studio.

**Installation & Setup**## How to get Started?

1. Clone the GitHub repository

```bash
git clone https://github.com/Shubhamgolghate/awesome-llm-apps.git
cd advanced_ai_agents/single_agent_apps/ai_investment_agent


2. Install a local development server:
This project is a static site. You'll need a simple server to run it locally. We recommend using vite as it's fast and handles environment variables well.
```bash
npm install -D vite

