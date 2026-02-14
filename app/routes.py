from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Dict, List, Optional, Union
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from uniunit import uniUnit, UnitSystem, ureg, unit, CHINESE_UNITS
from uniunit.uniunit import convert_value, get_unit_info, quick_convert

router = APIRouter()


class ConversionRequest(BaseModel):
    value: float = Field(..., description="Numeric value to convert")
    from_unit: str = Field(..., description="Source unit")
    to_unit: str = Field(..., description="Target unit")


class UnitSystemRequest(BaseModel):
    value: Union[str, float] = Field(..., description="Value with units (e.g., '100 kg') or just number")
    units: Dict[str, str] = Field(..., description="Unit mapping dictionary")


class QuickConvertRequest(BaseModel):
    value: Union[float, str] = Field(..., description="Value with units")
    from_system: str = Field(..., description="Source system name")
    to_system: str = Field(..., description="Target system name")


@router.get("/api/units/presets")
async def get_presets():
    """Get all available unit system presets"""
    return {
        "presets": UnitSystem.list_presets(),
        "details": {name: UnitSystem.PRESETS[name] for name in UnitSystem.list_presets()}
    }


@router.get("/api/units/presets/{name}")
async def get_preset(name: str):
    """Get a specific preset by name"""
    try:
        preset = UnitSystem.get_preset(name)
        return {
            "name": preset.name,
            "units": preset.units,
            "description": preset.description
        }
    except KeyError:
        raise HTTPException(status_code=404, detail=f"Preset '{name}' not found")


@router.post("/api/convert")
async def convert_units(request: ConversionRequest):
    """Simple unit conversion between two units"""
    try:
        result = convert_value(request.value, request.from_unit, request.to_unit)
        return {
            "value": request.value,
            "from_unit": request.from_unit,
            "to_unit": request.to_unit,
            "result": result
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/api/unit-system")
async def convert_with_system(request: UnitSystemRequest):
    """Convert using a custom unit system"""
    try:
        converter = uniUnit(request.units)
        
        if isinstance(request.value, str):
            q = ureg(request.value)
        else:
            q = request.value * ureg.meter
        
        result = converter.to_unit(q)
        
        return {
            "value": request.value,
            "units": request.units,
            "result": format_quantity(result)
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


def format_quantity(q):
    """Format quantity with reasonable precision"""
    mag = q.magnitude
    if abs(mag) < 0.001 or abs(mag) > 10000:
        return f"{mag:.8g} {q.units}"
    else:
        return f"{mag:.5g} {q.units}"


@router.post("/api/quick-convert")
async def convert_systems(request: QuickConvertRequest):
    """Quick convert between two preset unit systems"""
    try:
        result = quick_convert(request.value, request.from_system, request.to_system)
        return {
            "value": str(request.value),
            "from_system": request.from_system,
            "to_system": request.to_system,
            "result": format_quantity(result)
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/api/unit-info")
async def get_info(value: str):
    """Get detailed information about a unit"""
    try:
        q = ureg(value)
        info = get_unit_info(q)
        return info
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/api/chinese-units")
async def get_chinese_units():
    """Get all available Chinese unit mappings"""
    return {"chinese_units": CHINESE_UNITS}


@router.get("/api/ureg/units")
async def list_common_units():
    """List common units from Pint registry"""
    common_units = [
        "meter", "kilometer", "centimeter", "millimeter", "nanometer",
        "kilogram", "gram", "milligram", "microgram",
        "second", "minute", "hour", "day",
        "newton", "pascal", "joule", "watt",
        "volt", "ampere", "ohm",
        "kelvin", "degree_Celsius", "degree_Fahrenheit",
        "meter/second", "kilogram/meter**3", "newton/meter**2"
    ]
    return {"units": common_units}
