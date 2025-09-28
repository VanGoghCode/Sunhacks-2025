# Loop It Script Generation API

This directory contains the Python API endpoint for generating secure device wipe scripts using the `BaseHTTPRequestHandler` approach for better Vercel compatibility.

## Files

- `generate-script.py` - Main API handler for script generation
- `README.md` - This documentation file

## API Endpoint

**URL:** `/api/generate-script.py`  
**Method:** `POST`  
**Content-Type:** `application/json`

### Request Body

```json
{
  "os_type": "linux|windows|windows10|macos|chrome",
  "drive_type": "ssd|hdd|nvme|emmc"
}
```

### Response

The API returns the generated script directly as a downloadable file with appropriate headers:

**Headers:**
- `Content-Type`: `application/x-sh` (for Unix scripts) or `application/x-bat` (for Windows scripts)
- `Content-Disposition`: `attachment; filename="loopit_audit_wipe_{os_type}_{drive_type}_{date}.{ext}"`
- `Access-Control-Allow-Origin`: `*`

**Body:** The complete script content as plain text

## Features

- ✅ Generates OS-specific scripts (Windows .bat, Unix .sh)
- ✅ Drive-type optimized wipe methods (SSD vs HDD)
- ✅ Unique device ID generation with timestamps
- ✅ Comprehensive audit logging (pre-wipe and post-wipe)
- ✅ Compliance with NIST 800-88, DoD 5220.22-M, GDPR Article 17
- ✅ Vercel-compatible using BaseHTTPRequestHandler
- ✅ CORS headers for web integration
- ✅ Direct file download (no JSON wrapper)
- ✅ Proper error handling with HTTP status codes

## Script Features

### Windows Scripts (.bat)
- Uses `diskpart` for secure drive wiping
- Creates audit logs in local directory
- Includes pre-wipe and post-wipe verification
- Proper error handling and user feedback

### Unix Scripts (.sh)
- Supports both SSD (ATA Secure Erase) and HDD (multi-pass wipe)
- Comprehensive file system inventory
- Uses `hdparm` for SSD secure erase when available
- Fallback to `dd` with random data
- Detailed logging and verification

## Usage

The API is automatically called by the frontend when users click "Download Script" in the device management interface. The generated script is downloaded directly to the user's device with the appropriate filename.

## Deployment

This API is designed to work with Vercel's serverless functions using the `BaseHTTPRequestHandler` class, which provides better compatibility and more direct control over HTTP responses.
