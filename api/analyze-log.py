from http.server import BaseHTTPRequestHandler
import json
from datetime import datetime
import os
from typing import Dict, Any

from schemas import (
    AnalyzeLogRequest, 
    AnalyzeLogResponse,
    ErrorResponse
)
from gemini import GeminiAPI

# Initialize Gemini API
try:
    gemini_api = GeminiAPI()
except ValueError as e:
    print(f"Warning: {e}")
    gemini_api = None


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        if self.path == '/health':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            gemini_status = "configured" if gemini_api else "not configured"
            response = {
                "status": "healthy",
                "service": "log-analyzer",
                "gemini_api": gemini_status,
                "timestamp": datetime.now().isoformat()
            }
            self.wfile.write(json.dumps(response).encode())
        else:
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            response = {"message": "Demo Wipe Log Analyzer API is running"}
            self.wfile.write(json.dumps(response).encode())

    def do_POST(self):
        if self.path == '/analyze-log':
            try:
                if not gemini_api:
                    self.send_response(500)
                    self.send_header('Content-type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    
                    error_response = {"error": "Gemini API not configured. Please set GEMINI_API_KEY environment variable."}
                    self.wfile.write(json.dumps(error_response).encode())
                    return
                
                # Read request body
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                request_data = json.loads(post_data.decode('utf-8'))
                
                # Validate request data
                try:
                    request_obj = AnalyzeLogRequest(**request_data)
                except Exception as e:
                    self.send_response(400)
                    self.send_header('Content-type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    
                    error_response = {"error": f"Invalid request data: {str(e)}"}
                    self.wfile.write(json.dumps(error_response).encode())
                    return
                
                # Send log to Gemini API for analysis
                import asyncio
                result = asyncio.run(gemini_api.analyze_log(request_obj.logContent))
                
                # Validate the result structure
                if "status" not in result or "issues" not in result:
                    self.send_response(500)
                    self.send_header('Content-type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    
                    error_response = {"error": "Invalid response from Gemini API"}
                    self.wfile.write(json.dumps(error_response).encode())
                    return
                
                # Send response
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                
                response = AnalyzeLogResponse(
                    status=result["status"],
                    issues=result["issues"]
                )
                self.wfile.write(response.model_dump_json().encode())
                
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                
                error_response = {"error": f"Error analyzing log: {str(e)}"}
                self.wfile.write(json.dumps(error_response).encode())
        else:
            self.send_response(404)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            error_response = {"error": "Not found"}
            self.wfile.write(json.dumps(error_response).encode())
