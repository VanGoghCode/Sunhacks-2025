# Demo Wipe Assistant Backend

A FastAPI backend that provides two main endpoints for a demo wipe assistant application.

## Features

- **POST /generate-script**: Generates safe demo wipe scripts for Linux/macOS (Bash) and Windows (PowerShell)
- **POST /analyze-log**: Analyzes wipe logs using Google's Gemini API
- Full CORS support for frontend integration
- Comprehensive error handling
- Pydantic validation for all requests/responses

## Setup

1. **Install dependencies**:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Set up Gemini API key** (for log analysis):
   ```bash
   export GEMINI_API_KEY="your_gemini_api_key_here"
   ```

3. **Run the server**:
   ```bash
   python main.py
   ```
   
   Or using uvicorn directly:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

## API Endpoints

### POST /generate-script

Generates a safe demo wipe script based on the provided parameters.

**Request Body**:
```json
{
  "os": "linux",         // "linux" | "macos" | "windows"
  "driveType": "nvme",   // "hdd" | "sata_ssd" | "nvme" | "sed"
  "operator": "demo_user",
  "modelInfo": "Dell Latitude 5420",
  "dummySizeMB": 5,
  "passes": 1
}
```

**Response**:
```json
{
  "script": "#!/bin/bash\n...",
  "logPreview": "=== Demo Wipe Operation Log ===..."
}
```

### POST /analyze-log

Analyzes a wipe log using Gemini AI and returns structured results.

**Request Body**:
```json
{
  "logContent": "=== Wipe Operation Log === ..."
}
```

**Response**:
```json
{
  "status": "SUCCESS",  // or "FAILURE"
  "issues": ["list of issues found"]
}
```

### GET /health

Health check endpoint that shows API status and Gemini API configuration.

## Testing

Run the test script to verify all endpoints:

```bash
python test_api.py
```

Make sure the server is running on `http://localhost:8000` before running tests.

## Project Structure

```
backend/
├── main.py              # FastAPI application with endpoints
├── schemas.py           # Pydantic models for requests/responses
├── gemini.py            # Gemini API integration (using official SDK)
├── test_api.py          # Test script for all endpoints
├── start_server.sh      # Easy startup script
├── setup_gemini_key.sh  # Helper script for API key setup
├── requirements.txt     # Python dependencies
└── README.md            # This file
```

## Environment Variables

- `GEMINI_API_KEY`: Required for the analyze-log endpoint. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### Setting up Gemini API Key

1. **Get your API key**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey) and create a new API key

2. **Set the environment variable**:
   ```bash
   # Temporary (current session only)
   export GEMINI_API_KEY="your_api_key_here"
   
   # Permanent (add to shell profile)
   echo 'export GEMINI_API_KEY="your_api_key_here"' >> ~/.zshrc
   source ~/.zshrc
   ```

3. **Use the setup script**:
   ```bash
   ./setup_gemini_key.sh
   ```

4. **Verify the key is set**:
   ```bash
   echo $GEMINI_API_KEY
   ```

## Security Notes

- The generated scripts are safe demo scripts that only create/delete dummy files
- No actual system wiping or destructive operations are performed
- Scripts use isolated directories in the user's Desktop folder
- All operations are logged for transparency
