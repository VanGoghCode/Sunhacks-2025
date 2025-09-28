#!/bin/bash

# Demo Wipe Assistant Backend Startup Script

echo "🚀 Starting Demo Wipe Assistant Backend..."

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if we're in the backend directory
if [ ! -f "main.py" ]; then
    echo "❌ Please run this script from the backend directory"
    exit 1
fi

# Install dependencies if requirements.txt exists
if [ -f "requirements.txt" ]; then
    echo "📦 Installing dependencies..."
    pip install -r requirements.txt
fi

# Check for Gemini API key
if [ -z "$GEMINI_API_KEY" ]; then
    echo "⚠️  Warning: GEMINI_API_KEY environment variable is not set."
    echo "   The analyze-log endpoint will not work without it."
    echo "   To set it: export GEMINI_API_KEY='your_api_key_here'"
    echo ""
fi

# Start the server
echo "🌐 Starting FastAPI server on http://localhost:8000"
echo "📚 API documentation available at http://localhost:8000/docs"
echo "🔍 Health check available at http://localhost:8000/health"
echo ""
echo "Press Ctrl+C to stop the server"
echo "========================================"

uvicorn main:app --host 0.0.0.0 --port 8000 --reload
