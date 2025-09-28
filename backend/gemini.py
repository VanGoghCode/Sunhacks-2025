import httpx
import json
import os
from typing import Dict, Any


class GeminiAPI:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY environment variable is required")
        
        self.base_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
        self.headers = {
            "Content-Type": "application/json"
        }
    
    async def analyze_log(self, log_content: str) -> Dict[str, Any]:
        """
        Send log content to Gemini API for analysis
        """
        prompt = f"""Analyze this wipe log. Return JSON with {{ "status": "SUCCESS|FAILURE", "issues": [list of problems] }}.

Log content:
{log_content}

Please provide a structured analysis in JSON format only."""

        payload = {
            "contents": [{
                "parts": [{
                    "text": prompt
                }]
            }]
        }
        
        url = f"{self.base_url}?key={self.api_key}"
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(url, headers=self.headers, json=payload, timeout=30.0)
                response.raise_for_status()
                
                result = response.json()
                
                if "candidates" in result and len(result["candidates"]) > 0:
                    content = result["candidates"][0]["content"]["parts"][0]["text"]
                    
                    # Try to parse JSON from the response
                    try:
                        # Clean up the response text to extract JSON
                        content = content.strip()
                        if content.startswith("```json"):
                            content = content[7:]
                        if content.endswith("```"):
                            content = content[:-3]
                        content = content.strip()
                        
                        parsed_result = json.loads(content)
                        return parsed_result
                    except json.JSONDecodeError:
                        # Fallback: try to extract JSON from the text
                        try:
                            start_idx = content.find("{")
                            end_idx = content.rfind("}") + 1
                            if start_idx != -1 and end_idx != 0:
                                json_str = content[start_idx:end_idx]
                                parsed_result = json.loads(json_str)
                                return parsed_result
                        except json.JSONDecodeError:
                            pass
                        
                        # If all parsing fails, return a default response
                        return {
                            "status": "FAILURE",
                            "issues": ["Unable to parse Gemini API response"]
                        }
                else:
                    return {
                        "status": "FAILURE",
                        "issues": ["No analysis returned from Gemini API"]
                    }
                    
        except httpx.HTTPError as e:
            return {
                "status": "FAILURE",
                "issues": [f"HTTP error when calling Gemini API: {str(e)}"]
            }
        except Exception as e:
            return {
                "status": "FAILURE",
                "issues": [f"Error calling Gemini API: {str(e)}"]
            }
