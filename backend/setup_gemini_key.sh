#!/bin/bash

# Setup script for Gemini API Key
# This script helps you set up the GEMINI_API_KEY environment variable

echo "🔑 Gemini API Key Setup"
echo "======================="
echo ""
echo "To use the analyze-log endpoint, you need to set up your Gemini API key."
echo ""
echo "1. Get your API key from: https://makersuite.google.com/app/apikey"
echo ""
echo "2. Choose one of the following methods:"
echo ""
echo "   Method A - Temporary (current session only):"
echo "   export GEMINI_API_KEY='your_api_key_here'"
echo ""
echo "   Method B - Permanent (add to shell profile):"
echo "   echo 'export GEMINI_API_KEY=\"your_api_key_here\"' >> ~/.zshrc"
echo "   source ~/.zshrc"
echo ""
echo "3. Verify the key is set:"
echo "   echo \$GEMINI_API_KEY"
echo ""
echo "4. Restart the FastAPI server to pick up the new key:"
echo "   ./start_server.sh"
echo ""
echo "5. Test the analyze-log endpoint:"
echo "   python test_api.py"
echo ""

# Check if key is already set
if [ -n "$GEMINI_API_KEY" ]; then
    echo "✅ GEMINI_API_KEY is already set!"
    echo "   Current key: ${GEMINI_API_KEY:0:10}..."
else
    echo "❌ GEMINI_API_KEY is not set."
    echo ""
    echo "Would you like to set it now? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo "Enter your Gemini API key:"
        read -r api_key
        if [ -n "$api_key" ]; then
            echo "export GEMINI_API_KEY='$api_key'" >> ~/.zshrc
            echo "✅ API key added to ~/.zshrc"
            echo "Run 'source ~/.zshrc' to apply changes to current session"
        else
            echo "❌ No API key provided"
        fi
    fi
fi
