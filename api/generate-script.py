from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import os
from typing import Dict, Any

from schemas import (
    GenerateScriptRequest, 
    GenerateScriptResponse, 
    ErrorResponse
)

app = FastAPI(
    title="Demo Wipe Script Generator API",
    description="API for generating demo wipe scripts",
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


def generate_bash_script(request: GenerateScriptRequest) -> str:
    """Generate a Bash script for Linux/macOS"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    script = f'''#!/bin/bash
# ========================================
# Demo Wipe Script - Generated {timestamp}
# Operator: {request.operator}
# Laptop Model: {request.modelInfo}
# Drive Type: {request.driveType}
# OS: {request.os.upper()}
# ========================================

set -e  # Exit on any error

# Configuration
DEMO_DIR="$HOME/Desktop/project_wipe/demo_wipe"
LOG_DIR="$HOME/Desktop/project_wipe/demo_wipe_logs"
DUMMY_SIZE_MB={request.dummySizeMB}
PASSES={request.passes}

# Create directories
echo "Creating demo directories..."
mkdir -p "$DEMO_DIR"
mkdir -p "$LOG_DIR"

# Initialize log file
LOG_FILE="$LOG_DIR/wipe_log_$(date +%Y%m%d_%H%M%S).txt"
echo "=== Demo Wipe Operation Log ===" > "$LOG_FILE"
echo "Generated: {timestamp}" >> "$LOG_FILE"
echo "Operator: {request.operator}" >> "$LOG_FILE"
echo "Model: {request.modelInfo}" >> "$LOG_FILE"
echo "Drive Type: {request.driveType}" >> "$LOG_FILE"
echo "Dummy Size: {request.dummySizeMB}MB" >> "$LOG_FILE"
echo "Passes: {request.passes}" >> "$LOG_FILE"
echo "=====================================" >> "$LOG_FILE"

# Create dummy files
echo "Creating dummy files..."
for i in $(seq 1 10); do
    echo "Creating dummy file $i..."
    dd if=/dev/urandom of="$DEMO_DIR/dummy_file_$i.dat" bs=1M count=$DUMMY_SIZE_MB 2>/dev/null
    echo "Created dummy_file_$i.dat ($DUMMY_SIZE_MB MB)" >> "$LOG_FILE"
done

# Perform wipe passes
echo "Performing wipe operations..."
for pass_num in $(seq 1 $PASSES); do
    echo "Starting wipe pass $pass_num..."
    echo "Wipe Pass $pass_num: Started" >> "$LOG_FILE"
    
    # Overwrite files with random data
    for file in "$DEMO_DIR"/*.dat; do
        if [ -f "$file" ]; then
            echo "Overwriting $(basename "$file") with random data..."
            dd if=/dev/urandom of="$file" bs=1M count=$DUMMY_SIZE_MB 2>/dev/null
            echo "Overwritten $(basename "$file")" >> "$LOG_FILE"
        fi
    done
    
    echo "Wipe Pass $pass_num: Completed" >> "$LOG_FILE"
done

# Delete dummy files
echo "Deleting dummy files..."
for file in "$DEMO_DIR"/*.dat; do
    if [ -f "$file" ]; then
        echo "Deleting $(basename "$file")..."
        rm -f "$file"
        echo "Deleted $(basename "$file")" >> "$LOG_FILE"
    fi
done

# Remove demo directory
echo "Removing demo directory..."
rmdir "$DEMO_DIR"
echo "Demo directory removed" >> "$LOG_FILE"

# Final log entry
echo "=====================================" >> "$LOG_FILE"
echo "Demo wipe operation completed successfully" >> "$LOG_FILE"
echo "Log saved to: $LOG_FILE" >> "$LOG_FILE"

echo "Demo wipe completed successfully!"
echo "Log saved to: $LOG_FILE"
'''

    return script


def generate_powershell_script(request: GenerateScriptRequest) -> str:
    """Generate a PowerShell script for Windows"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    script = f'''# ========================================
# Demo Wipe Script - Generated {timestamp}
# Operator: {request.operator}
# Laptop Model: {request.modelInfo}
# Drive Type: {request.driveType}
# OS: {request.os.upper()}
# ========================================

# Configuration
$DEMO_DIR = "$env:USERPROFILE\\Desktop\\project_wipe\\demo_wipe"
$LOG_DIR = "$env:USERPROFILE\\Desktop\\project_wipe\\demo_wipe_logs"
$DUMMY_SIZE_MB = {request.dummySizeMB}
$PASSES = {request.passes}

# Create directories
Write-Host "Creating demo directories..."
New-Item -ItemType Directory -Path $DEMO_DIR -Force | Out-Null
New-Item -ItemType Directory -Path $LOG_DIR -Force | Out-Null

# Initialize log file
$LOG_FILE = "$LOG_DIR\\wipe_log_$(Get-Date -Format 'yyyyMMdd_HHmmss').txt"
"=== Demo Wipe Operation Log ===" | Out-File -FilePath $LOG_FILE -Encoding UTF8
"Generated: {timestamp}" | Out-File -FilePath $LOG_FILE -Append -Encoding UTF8
"Operator: {request.operator}" | Out-File -FilePath $LOG_FILE -Append -Encoding UTF8
"Model: {request.modelInfo}" | Out-File -FilePath $LOG_FILE -Append -Encoding UTF8
"Drive Type: {request.driveType}" | Out-File -FilePath $LOG_FILE -Append -Encoding UTF8
"Dummy Size: {request.dummySizeMB}MB" | Out-File -FilePath $LOG_FILE -Append -Encoding UTF8
"Passes: {request.passes}" | Out-File -FilePath $LOG_FILE -Append -Encoding UTF8
"=====================================" | Out-File -FilePath $LOG_FILE -Append -Encoding UTF8

# Create dummy files
Write-Host "Creating dummy files..."
for ($i = 1; $i -le 10; $i++) {{
    Write-Host "Creating dummy file $i..."
    $dummyFile = "$DEMO_DIR\\dummy_file_$i.dat"
    $dummyData = New-Object byte[] ($DUMMY_SIZE_MB * 1024 * 1024)
    (New-Object Random).NextBytes($dummyData)
    [System.IO.File]::WriteAllBytes($dummyFile, $dummyData)
    "Created dummy_file_$i.dat ($DUMMY_SIZE_MB MB)" | Out-File -FilePath $LOG_FILE -Append -Encoding UTF8
}}

# Perform wipe passes
Write-Host "Performing wipe operations..."
for ($pass_num = 1; $pass_num -le $PASSES; $pass_num++) {{
    Write-Host "Starting wipe pass $pass_num..."
    "Wipe Pass $pass_num : Started" | Out-File -FilePath $LOG_FILE -Append -Encoding UTF8
    
    # Overwrite files with random data
    Get-ChildItem -Path $DEMO_DIR -Filter "*.dat" | ForEach-Object {{
        Write-Host "Overwriting $($_.Name) with random data..."
        $randomData = New-Object byte[] ($DUMMY_SIZE_MB * 1024 * 1024)
        (New-Object Random).NextBytes($randomData)
        [System.IO.File]::WriteAllBytes($_.FullName, $randomData)
        "Overwritten $($_.Name)" | Out-File -FilePath $LOG_FILE -Append -Encoding UTF8
    }}
    
    "Wipe Pass $pass_num : Completed" | Out-File -FilePath $LOG_FILE -Append -Encoding UTF8
}}

# Delete dummy files
Write-Host "Deleting dummy files..."
Get-ChildItem -Path $DEMO_DIR -Filter "*.dat" | ForEach-Object {{
    Write-Host "Deleting $($_.Name)..."
    Remove-Item $_.FullName -Force
    "Deleted $($_.Name)" | Out-File -FilePath $LOG_FILE -Append -Encoding UTF8
}}

# Remove demo directory
Write-Host "Removing demo directory..."
Remove-Item $DEMO_DIR -Force
"Demo directory removed" | Out-File -FilePath $LOG_FILE -Append -Encoding UTF8

# Final log entry
"=====================================" | Out-File -FilePath $LOG_FILE -Append -Encoding UTF8
"Demo wipe operation completed successfully" | Out-File -FilePath $LOG_FILE -Append -Encoding UTF8
"Log saved to: $LOG_FILE" | Out-File -FilePath $LOG_FILE -Append -Encoding UTF8

Write-Host "Demo wipe completed successfully!"
Write-Host "Log saved to: $LOG_FILE"
'''

    return script


def generate_log_preview(request: GenerateScriptRequest) -> str:
    """Generate a preview of what the log would look like"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    preview = f"""=== Demo Wipe Operation Log ===
Generated: {timestamp}
Operator: {request.operator}
Model: {request.modelInfo}
Drive Type: {request.driveType}
Dummy Size: {request.dummySizeMB}MB
Passes: {request.passes}
=====================================
Created dummy_file_1.dat ({request.dummySizeMB} MB)
Created dummy_file_2.dat ({request.dummySizeMB} MB)
...
Created dummy_file_10.dat ({request.dummySizeMB} MB)
Wipe Pass 1: Started
Overwritten dummy_file_1.dat
Overwritten dummy_file_2.dat
...
Wipe Pass 1: Completed
Deleted dummy_file_1.dat
Deleted dummy_file_2.dat
...
Demo directory removed
=====================================
Demo wipe operation completed successfully"""

    return preview


@app.post("/generate-script", response_model=GenerateScriptResponse)
async def generate_script(request: GenerateScriptRequest):
    """
    Generate a safe demo wipe script (Bash or PowerShell) and return it as JSON.
    """
    try:
        # Generate script based on OS
        if request.os in ["linux", "macos"]:
            script = generate_bash_script(request)
        elif request.os == "windows":
            script = generate_powershell_script(request)
        else:
            raise HTTPException(status_code=400, detail="Unsupported OS type")
        
        # Generate log preview
        log_preview = generate_log_preview(request)
        
        return GenerateScriptResponse(
            script=script,
            logPreview=log_preview
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating script: {str(e)}")


@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "Demo Wipe Script Generator API is running"}


@app.get("/health")
async def health_check():
    """Health check with API status"""
    return {
        "status": "healthy",
        "service": "script-generator",
        "timestamp": datetime.now().isoformat()
    }


# Vercel handler
def handler(request):
    """Vercel serverless function handler"""
    return app
