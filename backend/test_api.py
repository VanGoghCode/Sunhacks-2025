#!/usr/bin/env python3
"""
Simple test script for the Demo Wipe Assistant API
"""
import asyncio
import httpx
import json


async def test_generate_script():
    """Test the /generate-script endpoint"""
    print("Testing /generate-script endpoint...")
    
    test_data = {
        "os": "linux",
        "driveType": "nvme",
        "operator": "demo_user",
        "modelInfo": "Dell Latitude 5420",
        "dummySizeMB": 5,
        "passes": 1
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                "http://localhost:8000/generate-script",
                json=test_data,
                timeout=30.0
            )
            response.raise_for_status()
            
            result = response.json()
            print("✅ /generate-script test passed!")
            print(f"Script length: {len(result['script'])} characters")
            print(f"Log preview length: {len(result['logPreview'])} characters")
            print(f"Script preview (first 200 chars): {result['script'][:200]}...")
            print()
            
        except httpx.HTTPError as e:
            print(f"❌ /generate-script test failed: {e}")
            if hasattr(e, 'response'):
                print(f"Response: {e.response.text}")


async def test_analyze_log():
    """Test the /analyze-log endpoint"""
    print("Testing /analyze-log endpoint...")
    
    test_log = """=== Demo Wipe Operation Log ===
Generated: 2024-01-15 10:30:00
Operator: demo_user
Model: Dell Latitude 5420
Drive Type: nvme
Dummy Size: 5MB
Passes: 1
=====================================
Created dummy_file_1.dat (5 MB)
Created dummy_file_2.dat (5 MB)
Wipe Pass 1: Started
Overwritten dummy_file_1.dat
Overwritten dummy_file_2.dat
Wipe Pass 1: Completed
Deleted dummy_file_1.dat
Deleted dummy_file_2.dat
Demo directory removed
=====================================
Demo wipe operation completed successfully"""
    
    test_data = {
        "logContent": test_log
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                "http://localhost:8000/analyze-log",
                json=test_data,
                timeout=30.0
            )
            response.raise_for_status()
            
            result = response.json()
            print("✅ /analyze-log test passed!")
            print(f"Status: {result['status']}")
            print(f"Issues: {result['issues']}")
            print()
            
        except httpx.HTTPError as e:
            print(f"❌ /analyze-log test failed: {e}")
            if hasattr(e, 'response'):
                print(f"Response: {e.response.text}")


async def test_health():
    """Test the health endpoint"""
    print("Testing health endpoints...")
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get("http://localhost:8000/health", timeout=10.0)
            response.raise_for_status()
            
            result = response.json()
            print("✅ Health check passed!")
            print(f"Status: {result['status']}")
            print(f"Gemini API: {result['gemini_api']}")
            print()
            
        except httpx.HTTPError as e:
            print(f"❌ Health check failed: {e}")


async def main():
    """Run all tests"""
    print("🚀 Starting API tests...")
    print("Make sure the FastAPI server is running on http://localhost:8000")
    print("=" * 50)
    
    await test_health()
    await test_generate_script()
    await test_analyze_log()
    
    print("=" * 50)
    print("✨ All tests completed!")


if __name__ == "__main__":
    asyncio.run(main())
