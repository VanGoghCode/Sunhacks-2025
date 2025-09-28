from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import os
from typing import Dict, Any

from schemas import (
    AnalyzeLogRequest, 
    AnalyzeLogResponse,
    ErrorResponse
)
from gemini import GeminiAPI

app = FastAPI(
    title="Demo Wipe Log Analyzer API",
    description="API for analyzing demo wipe logs using Gemini AI",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini API
try:
    gemini_api = GeminiAPI()
except ValueError as e:
    print(f"Warning: {e}")
    gemini_api = None


@app.post("/analyze-log", response_model=AnalyzeLogResponse)
async def analyze_log(request: AnalyzeLogRequest):
    """
    Accept a wipe log, send it to Gemini API, and return structured analysis.
    """
    if not gemini_api:
        raise HTTPException(
            status_code=500, 
            detail="Gemini API not configured. Please set GEMINI_API_KEY environment variable."
        )
    
    try:
        # Send log to Gemini API for analysis
        result = await gemini_api.analyze_log(request.logContent)
        
        # Validate the result structure
        if "status" not in result or "issues" not in result:
            raise HTTPException(
                status_code=500, 
                detail="Invalid response from Gemini API"
            )
        
        return AnalyzeLogResponse(
            status=result["status"],
            issues=result["issues"]
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing log: {str(e)}")


@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "Demo Wipe Log Analyzer API is running"}


@app.get("/health")
async def health_check():
    """Health check with API status"""
    gemini_status = "configured" if gemini_api else "not configured"
    return {
        "status": "healthy",
        "service": "log-analyzer",
        "gemini_api": gemini_status,
        "timestamp": datetime.now().isoformat()
    }


# Vercel handler
def handler(request):
    """Vercel serverless function handler"""
    return app
