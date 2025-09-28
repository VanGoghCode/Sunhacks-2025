import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { os_type = 'linux', drive_type = 'hdd' } = body;

    // Validate parameters
    const validOsTypes = ['windows', 'windows10', 'macos', 'linux', 'chrome'];
    const validDriveTypes = ['ssd', 'hdd', 'nvme', 'emmc'];
    
    const validatedOsType = validOsTypes.includes(os_type) ? os_type : 'linux';
    const validatedDriveType = validDriveTypes.includes(drive_type) ? drive_type : 'hdd';

    // Create a temporary Python script to call our generate-script.py
    const pythonScript = `
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'api'))

# Import the handler function
import importlib.util
spec = importlib.util.spec_from_file_location("generate_script", "api/generate-script.py")
generate_script = importlib.util.module_from_spec(spec)
spec.loader.exec_module(generate_script)

# Create a mock request
import json
from io import BytesIO

class MockRequest:
    def __init__(self, data):
        self.data = json.dumps(data).encode('utf-8')
        self.headers = {'Content-Length': str(len(self.data))}
    
    def read(self, size=-1):
        return self.data

class MockResponse:
    def __init__(self):
        self.status_code = None
        self.headers = {}
        self.content = b''
    
    def send_response(self, code):
        self.status_code = code
    
    def send_header(self, name, value):
        self.headers[name] = value
    
    def end_headers(self):
        pass
    
    def write(self, data):
        self.content += data

# Create mock handler
class MockHandler(generate_script.handler):
    def __init__(self, request_data):
        self.rfile = MockRequest(request_data)
        self.wfile = MockResponse()
        self.headers = self.rfile.headers
    
    def send_response(self, code):
        self.wfile.send_response(code)
    
    def send_header(self, name, value):
        self.wfile.send_header(name, value)
    
    def end_headers(self):
        self.wfile.end_headers()
    
    def write(self, data):
        self.wfile.write(data)

# Test the handler
mock_handler = MockHandler({"os_type": "${validatedOsType}", "drive_type": "${validatedDriveType}"})
mock_handler.do_POST()

print("STATUS:", mock_handler.wfile.status_code)
print("CONTENT_TYPE:", mock_handler.wfile.headers.get('Content-Type', ''))
print("CONTENT_DISPOSITION:", mock_handler.wfile.headers.get('Content-Disposition', ''))
print("CONTENT_START:")
print(mock_handler.wfile.content.decode('utf-8'))
`;

    // Write the temporary script
    const tempScriptPath = '/tmp/temp_script.py';
    require('fs').writeFileSync(tempScriptPath, pythonScript);

    // Execute the Python script
    const { stdout, stderr } = await execAsync(`python3 ${tempScriptPath}`);
    
    if (stderr) {
      throw new Error(`Python execution error: ${stderr}`);
    }

    // Parse the output
    const lines = stdout.split('\n');
    const statusLine = lines.find(line => line.startsWith('STATUS:'));
    const contentTypeLine = lines.find(line => line.startsWith('CONTENT_TYPE:'));
    const contentDispositionLine = lines.find(line => line.startsWith('CONTENT_DISPOSITION:'));
    const contentStartIndex = lines.findIndex(line => line === 'CONTENT_START:');
    
    if (!statusLine || !contentTypeLine || !contentDispositionLine || contentStartIndex === -1) {
      throw new Error('Failed to parse Python script output');
    }

    const statusCode = parseInt(statusLine.split(':')[1].trim());
    const contentType = contentTypeLine.split(':')[1].trim();
    const contentDisposition = contentDispositionLine.split(':')[1].trim();
    const scriptContent = lines.slice(contentStartIndex + 1).join('\n');

    // Clean up temporary file
    require('fs').unlinkSync(tempScriptPath);

    // Return the script as a downloadable file
    return new NextResponse(scriptContent, {
      status: statusCode,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': contentDisposition,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error) {
    console.error('Error generating script:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
