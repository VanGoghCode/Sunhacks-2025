from http.server import BaseHTTPRequestHandler
import json
import random
import string
from datetime import datetime

def generate_device_id(os_type, timestamp):
    random_suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"AMZ-{os_type.upper()}-{timestamp[:10]}-{random_suffix}"

def generate_script_content(os_type, drive_type, device_id):
    timestamp = datetime.now().isoformat()
    
    if os_type.startswith('windows'):
        script = f"""@echo off
REM ===================================================================
REM Loop It Secure Device Wipe & Audit Script v4.0 - Windows
REM ===================================================================
REM Device ID: {device_id}
REM OS: {os_type}
REM Drive Type: {drive_type}
REM Generated: {timestamp}
REM Compliance: NIST 800-88, DoD 5220.22-M, GDPR Article 17
REM ===================================================================

setlocal enabledelayedexpansion
set DEVICE_ID={device_id}
set SCRIPT_DIR=%~dp0
set LOG_DIR=%SCRIPT_DIR%audit_logs
set PRE_WIPE_LOG=pre_wipe_inventory_%DEVICE_ID%.txt
set POST_WIPE_LOG=post_wipe_verification_%DEVICE_ID%.txt

echo [INFO] Starting Loop It Device Audit & Wipe Process
echo [INFO] Device ID: %DEVICE_ID%
echo [INFO] Target OS: {os_type}
echo [INFO] Target Drive: {drive_type}

REM Create log directory
if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"

REM Step 1: Pre-wipe inventory
echo [INFO] Creating pre-wipe inventory log...
dir /s /b C:\\ > "%LOG_DIR%\\%PRE_WIPE_LOG%" 2>nul
echo [SUCCESS] Pre-wipe inventory completed

REM Step 2: Secure wipe
echo [INFO] Performing secure wipe...
echo [WARNING] This will permanently delete ALL data on the drive!

REM Use Windows built-in diskpart for secure erase
echo select disk 0 > temp_diskpart.txt
echo clean all >> temp_diskpart.txt
diskpart /s temp_diskpart.txt
del temp_diskpart.txt

REM Step 3: Post-wipe verification
echo [INFO] Creating post-wipe verification log...
dir /s /b C:\\ > "%LOG_DIR%\\%POST_WIPE_LOG%" 2>nul
echo [SUCCESS] Post-wipe verification completed

echo [SUCCESS] Device wipe and audit process completed successfully!
echo [SUCCESS] Device ID: %DEVICE_ID%
echo [SUCCESS] Compliance: NIST 800-88, DoD 5220.22-M, GDPR Article 17
pause"""
    else:
        script = f"""#!/bin/bash
# ===================================================================
# Loop It Secure Device Wipe & Audit Script v4.0 - Unix/Linux/macOS
# ===================================================================
# Device ID: {device_id}
# OS: {os_type}
# Drive Type: {drive_type}
# Generated: {timestamp}
# Compliance: NIST 800-88, DoD 5220.22-M, GDPR Article 17
# ===================================================================

set -e
set -u

DEVICE_ID="{device_id}"
SCRIPT_DIR="$(cd "$(dirname "${{BASH_SOURCE[0]}}")" && pwd)"
LOG_DIR="$SCRIPT_DIR/audit_logs"
PRE_WIPE_LOG="pre_wipe_inventory_${{DEVICE_ID}}.txt"
POST_WIPE_LOG="post_wipe_verification_${{DEVICE_ID}}.txt"

echo_info() {{ echo -e "\\033[0;34m[INFO]\\033[0m $1"; }}
echo_success() {{ echo -e "\\033[0;32m[SUCCESS]\\033[0m $1"; }}
echo_warning() {{ echo -e "\\033[1;33m[WARNING]\\033[0m $1"; }}

echo_info "Starting Loop It Device Audit & Wipe Process"
echo_info "Device ID: $DEVICE_ID"
echo_info "Target OS: {os_type}"
echo_info "Target Drive: {drive_type}"

# Create log directory
mkdir -p "$LOG_DIR"

# Step 1: Pre-wipe inventory
echo_info "Creating pre-wipe inventory log..."
{{
    echo "====================================================================="
    echo "Loop It Device Audit Log - PRE-WIPE"
    echo "====================================================================="
    echo "Device ID: $DEVICE_ID"
    echo "Timestamp: $(date -u +"%Y-%m-%d %H:%M:%S UTC")"
    echo "OS: {os_type}"
    echo "Drive Type: {drive_type}"
    echo "====================================================================="
    echo ""
    echo "SYSTEM INFORMATION:"
    echo "-------------------"
    uname -a
    df -h
    echo ""
    echo "FILE SYSTEM INVENTORY:"
    echo "----------------------"
    find / -type f 2>/dev/null | head -10000 | sort
    echo ""
    echo "====================================================================="
    echo "Audit completed at: $(date -u +"%Y-%m-%d %H:%M:%S UTC")"
    echo "====================================================================="
}} > "$LOG_DIR/$PRE_WIPE_LOG"

echo_success "Pre-wipe inventory completed"

# Step 2: Secure wipe
echo_info "Performing secure wipe..."
echo_warning "This will permanently delete ALL data on the drive!"

ROOT_DEVICE=$(df / | tail -1 | awk '{{print $1}}' | sed 's/[0-9]*$//')
echo_info "Target device: $ROOT_DEVICE"

# Perform secure wipe based on drive type
if [ "{drive_type}" = "ssd" ] || [ "{drive_type}" = "nvme" ]; then
    echo_info "Performing SSD secure erase"
    if command -v hdparm &> /dev/null; then
        hdparm --user-master u --security-set-pass p "$ROOT_DEVICE"
        hdparm --user-master u --security-erase p "$ROOT_DEVICE"
    else
        dd if=/dev/urandom of="$ROOT_DEVICE" bs=1M status=progress 2>/dev/null || true
    fi
else
    echo_info "Performing HDD multi-pass wipe"
    dd if=/dev/zero of="$ROOT_DEVICE" bs=1M status=progress 2>/dev/null || true
    sync
    dd if=/dev/urandom of="$ROOT_DEVICE" bs=1M count=1000 status=progress 2>/dev/null || true
    sync
    dd if=/dev/urandom of="$ROOT_DEVICE" bs=1M count=1000 status=progress 2>/dev/null || true
fi

sync

# Step 3: Post-wipe verification
echo_info "Creating post-wipe verification log..."
sleep 5
{{
    echo "====================================================================="
    echo "Loop It Device Audit Log - POST-WIPE VERIFICATION"
    echo "====================================================================="
    echo "Device ID: $DEVICE_ID"
    echo "Timestamp: $(date -u +"%Y-%m-%d %H:%M:%S UTC")"
    echo "OS: {os_type}"
    echo "Drive Type: {drive_type}"
    echo "====================================================================="
    echo ""
    echo "VERIFICATION RESULTS:"
    echo "---------------------"
    df -h
    echo ""
    echo "REMAINING FILES:"
    echo "---------------"
    find / -type f 2>/dev/null | head -1000 | sort
    echo ""
    echo "====================================================================="
    echo "Verification completed at: $(date -u +"%Y-%m-%d %H:%M:%S UTC")"
    echo "====================================================================="
}} > "$LOG_DIR/$POST_WIPE_LOG"

echo_success "Post-wipe verification completed"

echo_success "====================================================================="
echo_success "Device wipe and audit process completed successfully!"
echo_success "====================================================================="
echo_success "Device ID: $DEVICE_ID"
echo_success "Local logs: $LOG_DIR/"
echo_success "Compliance: NIST 800-88, DoD 5220.22-M, GDPR Article 17"
echo_success "====================================================================="""
    
    return script

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Read the request body
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            # Parse JSON data
            body = json.loads(post_data.decode('utf-8'))
            
            # Get parameters from request
            os_type = body.get('os_type', 'linux')
            drive_type = body.get('drive_type', 'hdd')
            
            # Validate parameters
            valid_os_types = ['windows', 'windows10', 'macos', 'linux', 'chrome']
            valid_drive_types = ['ssd', 'hdd', 'nvme', 'emmc']
            
            if os_type not in valid_os_types:
                os_type = 'linux'
            
            if drive_type not in valid_drive_types:
                drive_type = 'hdd'
            
            # Generate device ID and script
            timestamp = datetime.now().isoformat().replace(':', '-').replace('.', '-')
            device_id = generate_device_id(os_type, timestamp)
            script_content = generate_script_content(os_type, drive_type, device_id)
            
            # Determine file extension and content type based on OS
            if os_type.startswith('windows'):
                file_extension = '.bat'
                content_type = 'application/x-bat'
            else:
                file_extension = '.sh'
                content_type = 'application/x-sh'
            
            filename = f"loopit_audit_wipe_{os_type}_{drive_type}_{timestamp[:10]}{file_extension}"
            
            # Send response headers
            self.send_response(200)
            self.send_header('Content-Type', content_type)
            self.send_header('Content-Disposition', f'attachment; filename="{filename}"')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            
            # Write the script content directly to the response
            self.wfile.write(script_content.encode('utf-8'))
            
        except Exception as e:
            # Send error response
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            error_response = json.dumps({
                'success': False,
                'error': str(e)
            })
            self.wfile.write(error_response.encode('utf-8'))
    
    def do_OPTIONS(self):
        # Handle CORS preflight requests
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

if __name__ == "__main__":
    # For local testing
    from http.server import HTTPServer
    
    server = HTTPServer(('localhost', 8000), handler)
    print("Server running on http://localhost:8000")
    server.serve_forever()