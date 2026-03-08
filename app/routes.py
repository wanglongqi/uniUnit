from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Dict, List, Optional, Union
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from uniunit import uniUnit, UnitSystem, ureg, unit, CHINESE_UNITS
from uniunit.uniunit import convert_value, get_unit_info, quick_convert

# Academic requirement: normal representation of tonne is T (in some regions)
# We override T (Tesla) with Tonne as requested by user.
try:
    ureg.define('tonne = 1000 kg = T')
except:
    pass

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
        fmag = format_val(result)
        return {
            "value": request.value,
            "from_unit": request.from_unit,
            "to_unit": request.to_unit,
            "result": fmag,
            "result_tex": f"{fmag} \\mathrm{{{request.to_unit}}}"
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
        
        unit_tex = f"{result:~L}".replace("\\text{", "\\mathrm{")
        if "\\mathrm" not in unit_tex:
            unit_tex = unit_tex.replace("{", "\\mathrm{", 1) + "}" if "{" in unit_tex else f"\\mathrm{{{unit_tex}}}"

        fmag = format_val(result.magnitude)
        unit_tex = f"{result:~L}".replace("\\text{", "\\mathrm{")
        if "\\mathrm" not in unit_tex:
            unit_tex = unit_tex.replace("{", "\\mathrm{", 1) + "}" if "{" in unit_tex else f"\\mathrm{{{unit_tex}}}"

        return {
            "value": request.value,
            "units": request.units,
            "result": f"{fmag} {result.units:~}",
            "result_tex": f"{fmag} {unit_tex}"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


def format_val(val):
    """Format numeric value with commas and reasonable precision"""
    if isinstance(val, (int, float)):
        # For very large or very small, use scientific
        if abs(val) > 0 and (abs(val) < 0.0001 or abs(val) > 1e12):
            return f"{val:,.8g}"
        # For others, use commas and avoid trailing zeros
        formatted = f"{val:,.6f}".rstrip('0').rstrip('.')
        return formatted
    return str(val)


def format_quantity(q):
    """Format quantity with reasonable precision. Returns (string, tex)"""
    mag = q.magnitude
    fmag = format_val(mag)
    
    unit_tex = f"{q.units:~L}".replace("\\text{", "\\mathrm{")
    if "\\mathrm" not in unit_tex:
        unit_tex = f"\\mathrm{{{unit_tex}}}"
        
    return f"{fmag} {q.units:~}", f"{fmag} {unit_tex}"


@router.post("/api/quick-convert")
async def convert_systems(request: QuickConvertRequest):
    """Quick convert between two preset unit systems"""
    try:
        result = quick_convert(request.value, request.from_system, request.to_system)
        res, tex = format_quantity(result)
        return {
            "value": str(request.value),
            "from_system": request.from_system,
            "to_system": request.to_system,
            "result": res,
            "result_tex": tex
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
        "meter", "kilometer", "centimeter", "millimeter", "micrometer", "nanometer", "inch", "foot", "yard", "mile", "nautical_mile", "angstrom",
        "kilogram", "gram", "milligram", "microgram", "tonne", "pound", "ounce", "stone", "slug",
        "second", "millisecond", "microsecond", "nanosecond", "minute", "hour", "day", "week", "month", "year",
        "newton", "kilonewton", "pound_force", "dyne", "kilogram_force",
        "pascal", "kilopascal", "megapascal", "gigapascal", "bar", "millibar", "atmosphere", "psi", "torr", "mmHg",
        "joule", "kilojoule", "megajoule", "calorie", "kilocalorie", "watt_hour", "kilowatt_hour", "electron_volt", "BTU",
        "watt", "kilowatt", "megawatt", "milliwatt", "horsepower",
        "kelvin", "degree_Celsius", "degree_Fahrenheit",
        "hertz", "kilohertz", "megahertz", "gigahertz",
        "meter/second", "kilometer/hour", "mile/hour", "knot",
        "meter**2", "hectare", "acre", "square_mile", "square_inch", "square_foot",
        "meter**3", "liter", "milliliter", "gallon", "quart", "pint", "cup", "fluid_ounce",
        "radian", "degree", "arcminute", "arcsecond"
    ]
    return {"units": common_units}
