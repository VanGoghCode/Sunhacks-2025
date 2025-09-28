import google.generativeai as genai
import json
import os
from typing import Dict, Any


class GeminiAPI:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY environment variable is required")
        
        # Configure the Gemini API with the official SDK
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel('gemini-1.5-flash')
    
    async def analyze_log(self, log_content: str) -> Dict[str, Any]:
        """
        Send log content to Gemini API for analysis using the official SDK
        """
        prompt = f"""You are an expert in analyzing disk wipe operation logs. Analyze the provided wipe log and determine if the operation was successful or failed.

Look for these key indicators:
- Successful file creation and deletion
- Proper wipe passes execution
- Error messages or warnings
- Incomplete operations
- System errors or permission issues

Return your analysis as JSON in exactly this format:
{{
  "status": "SUCCESS|FAILURE",
  "issues": ["list of specific problems found", "or empty array if successful"]
}}

If the log shows all operations completed without errors, return status "SUCCESS" with empty issues array.
If any errors, warnings, or incomplete operations are found, return status "FAILURE" with specific issues listed.

Log content:
{log_content}"""

        try:
            # Use the official SDK to generate content
            response = self.model.generate_content(prompt)
            
            if response and response.text:
                content = response.text.strip()
                
                # Try to parse JSON from the response
                try:
                    # Clean up the response text to extract JSON
                    if content.startswith("```json"):
                        content = content[7:]
                    if content.endswith("```"):
                        content = content[:-3]
                    content = content.strip()
                    
                    parsed_result = json.loads(content)
                    
                    # Validate the result structure
                    if "status" in parsed_result and "issues" in parsed_result:
                        return parsed_result
                    else:
                        return {
                            "status": "FAILURE",
                            "issues": ["Invalid response format from Gemini API"]
                        }
                        
                except json.JSONDecodeError:
                    # Fallback: try to extract JSON from the text
                    try:
                        start_idx = content.find("{")
                        end_idx = content.rfind("}") + 1
                        if start_idx != -1 and end_idx != 0:
                            json_str = content[start_idx:end_idx]
                            parsed_result = json.loads(json_str)
                            
                            # Validate the result structure
                            if "status" in parsed_result and "issues" in parsed_result:
                                return parsed_result
                    except json.JSONDecodeError:
                        pass
                    
                    # If all parsing fails, return a default response
                    return {
                        "status": "FAILURE",
                        "issues": ["Unable to parse Gemini API response", f"Raw response: {content[:200]}..."]
                    }
            else:
                return {
                    "status": "FAILURE",
                    "issues": ["No response received from Gemini API"]
                }
                    
        except Exception as e:
            return {
                "status": "FAILURE",
                "issues": [f"Error calling Gemini API: {str(e)}"]
            }
