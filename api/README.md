# Demo Wipe Assistant API

This directory contains the Vercel-compatible API endpoints for the Demo Wipe Assistant application.

## Structure

- `api1.py` - Script generation endpoint (`/api/generate-script`)
- `api2.py` - Log analysis endpoint (`/api/analyze-log`)
- `schemas.py` - Pydantic models for request/response validation
- `gemini.py` - Gemini AI integration for log analysis
- `requirements.txt` - Python dependencies

## API Endpoints

### 1. Generate Script (`/api/generate-script`)
- **Method**: POST
- **Description**: Generates demo wipe scripts for Linux, macOS, or Windows
- **Request Body**: `GenerateScriptRequest`
- **Response**: `GenerateScriptResponse`

### 2. Analyze Log (`/api/analyze-log`)
- **Method**: POST
- **Description**: Analyzes wipe operation logs using Gemini AI
- **Request Body**: `AnalyzeLogRequest`
- **Response**: `AnalyzeLogResponse`

## Environment Variables

- `GEMINI_API_KEY` - Required for log analysis functionality

## Deployment

This API is designed to be deployed on Vercel as serverless functions. The `vercel.json` configuration file handles routing and runtime settings.

## Local Development

To run locally, you can use the original `backend/main.py` file or test individual endpoints using the Vercel CLI.
