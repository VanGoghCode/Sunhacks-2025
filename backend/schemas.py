from pydantic import BaseModel, Field
from typing import List, Literal, Optional
from datetime import datetime


# Request schemas
class GenerateScriptRequest(BaseModel):
    os: Literal["linux", "macos", "windows"] = Field(..., description="Operating system type")
    driveType: Literal["hdd", "sata_ssd", "nvme", "sed"] = Field(..., description="Drive type")
    operator: str = Field(..., description="Operator name")
    modelInfo: str = Field(..., description="Laptop model information")
    dummySizeMB: int = Field(..., ge=1, le=1000, description="Size of dummy files in MB")
    passes: int = Field(..., ge=1, le=10, description="Number of wipe passes")


class AnalyzeLogRequest(BaseModel):
    logContent: str = Field(..., description="Log content to analyze")


# Response schemas
class GenerateScriptResponse(BaseModel):
    script: str = Field(..., description="Generated script content")
    logPreview: str = Field(..., description="Preview of expected log output")


class AnalyzeLogResponse(BaseModel):
    status: Literal["SUCCESS", "FAILURE"] = Field(..., description="Analysis status")
    issues: List[str] = Field(..., description="List of issues found")


class ErrorResponse(BaseModel):
    error: str = Field(..., description="Error message")
