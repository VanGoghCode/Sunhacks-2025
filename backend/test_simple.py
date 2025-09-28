#!/usr/bin/env python3
"""
Simple test to check Gemini API with your key
"""
import os
import sys

# Add the backend directory to the path
sys.path.append('/Users/navneetharajan/Navneetha/Study/Projects/Sunhacks-2025/backend')

try:
    import google.generativeai as genai
    
    # Set the API key from environment variable
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("❌ GEMINI_API_KEY environment variable is not set")
        exit(1)
    genai.configure(api_key=api_key)
    
    print("✅ Successfully configured Gemini API")
    print(f"API Key: {api_key[:10]}...")
    
    # Try to list models
    print("\n📋 Available models:")
    try:
        models = genai.list_models()
        for model in models:
            if 'generateContent' in model.supported_generation_methods:
                print(f"✅ {model.name} - {model.display_name}")
            else:
                print(f"❌ {model.name} - {model.display_name} (no generateContent)")
    except Exception as e:
        print(f"❌ Error listing models: {e}")
    
    # Try different model names
    model_names_to_try = [
        'gemini-pro',
        'gemini-1.5-pro', 
        'gemini-1.5-flash',
        'gemini-1.0-pro',
        'models/gemini-pro',
        'models/gemini-1.5-pro'
    ]
    
    print(f"\n🧪 Testing model names:")
    for model_name in model_names_to_try:
        try:
            model = genai.GenerativeModel(model_name)
            response = model.generate_content("Hello, this is a test.")
            print(f"✅ {model_name} - WORKS! Response: {response.text[:50]}...")
            break  # Found a working model
        except Exception as e:
            print(f"❌ {model_name} - Failed: {str(e)[:100]}...")
    
except ImportError as e:
    print(f"❌ Import error: {e}")
    print("Make sure google-generativeai is installed")
except Exception as e:
    print(f"❌ General error: {e}")

