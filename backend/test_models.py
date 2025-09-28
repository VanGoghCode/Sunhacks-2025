#!/usr/bin/env python3
"""
Test script to check available Gemini models
"""
import google.generativeai as genai
import os

# Configure with your API key
genai.configure(api_key="AIzaSyDwxLBYPFldy1GpJyVujd-iLBAmNuga4vQ")

print("Available models:")
models = genai.list_models()
for model in models:
    if 'generateContent' in model.supported_generation_methods:
        print(f"✅ {model.name} - {model.display_name}")
    else:
        print(f"❌ {model.name} - {model.display_name} (no generateContent)")

print("\nTrying to use gemini-pro model...")
try:
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content("Hello, this is a test.")
    print(f"✅ gemini-pro works! Response: {response.text}")
except Exception as e:
    print(f"❌ gemini-pro failed: {e}")

print("\nTrying to use models/gemini-pro model...")
try:
    model = genai.GenerativeModel('models/gemini-pro')
    response = model.generate_content("Hello, this is a test.")
    print(f"✅ models/gemini-pro works! Response: {response.text}")
except Exception as e:
    print(f"❌ models/gemini-pro failed: {e}")

