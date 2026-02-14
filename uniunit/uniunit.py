#!/usr/bin/env python
# -*- coding:utf-8
"""
uniunit
Consistent units manager.

Provide consistent units for calculation using Pint library.

Classes:
    uniUnit - main class for conversion between systems of units
    UnitSystem - represent a complete unit system

Functions:
    get_base_unit - return units in seven basic SI units system
    convert - quick conversion between unit systems
    create_custom_unit - create a custom unit definition

:Author: WANG Longqi <iqgnol@gmail.com>
:Date: 2014-11-27
"""

from __future__ import annotations

import pint
from functools import lru_cache
from typing import Dict, Any, Union, List, Tuple, Optional

ureg = pint.UnitRegistry()
Quantity = pint.Quantity

# Add custom units to the registry
ureg.define('light_second = 299792458 * meter = ls')
ureg.define('light_minute = 60 * light_second = lmin')
ureg.define('light_hour = 60 * light_minute = lh')
ureg.define('light_day = 24 * light_hour = lday')

# Add Chinese unit aliases
CHINESE_UNITS = {
    # Length
    '米': 'meter',
    '千米': 'kilometer',
    '分米': 'decimeter',
    '厘米': 'centimeter',
    '毫米': 'millimeter',
    '微米': 'micrometer',
    '纳米': 'nanometer',
    '皮米': 'picometer',
    '飞米': 'femtometer',
    '里': 'li',
    '丈': 'zhang',
    '尺': 'chi',
    '寸': 'cun',
    '分长度': 'fen',
    '公分': 'centimeter',
    
    # Mass
    '千克': 'kilogram',
    '克': 'gram',
    '毫克': 'milligram',
    '微克': 'microgram',
    '吨': 'metric_ton',
    '斤': 'jin',
    '两': 'liang',
    
    # Time
    '秒': 'second',
    '分钟': 'minute',
    '刻钟': '15 * minute',
    '时': 'hour',
    '天': 'day',
    '周': 'week',
    '月': 'month',
    '年': 'year',
    
    # Area
    '平方米': 'square_meter',
    '平方千米': 'square_kilometer',
    '平方厘米': 'square_centimeter',
    '平方毫米': 'square_millimeter',
    '亩': 'mu',
    '公顷': 'hectare',
    
    # Volume
    '立方米': 'cubic_meter',
    '升': 'liter',
    '毫升': 'milliliter',
    
    # Force
    '牛': 'newton',
    '千牛': 'kilonewton',
    
    # Pressure
    '帕': 'pascal',
    '千帕': 'kilopascal',
    '兆帕': 'megapascal',
    '巴': 'bar',
    '标准大气压': 'atmosphere',
    
    # Energy
    '焦': 'joule',
    '千焦': 'kilojoule',
    '卡': 'calorie',
    '千卡': 'kilocalorie',
    '瓦时': 'watt_hour',
    '千瓦时': 'kilowatt_hour',
    
    # Power
    '瓦': 'watt',
    '千瓦': 'kilowatt',
    '兆瓦': 'megawatt',
    
    # Temperature
    '开': 'kelvin',
    '摄氏度': 'degC',
    '华氏度': 'degF',
    
    # Electric
    '安': 'ampere',
    '毫安': 'milliampere',
    '微安': 'microampere',
    '伏': 'volt',
    '毫伏': 'millivolt',
    '千伏': 'kilovolt',
    '欧': 'ohm',
    
    # Other
    '摩尔': 'mole',
    '坎': 'candela',
}

for chinese, english in CHINESE_UNITS.items():
    try:
        ureg.define(f'{chinese} = {english}')
    except pint.errors.DefinitionError:
        pass


# Create a function that allows simple unit access
class _UnitShortcut:
    """Allow accessing units like: km, kg, m, s directly"""
    
    def __getattr__(self, name: str):
        try:
            return ureg(name)
        except pint.errors.UndefinedUnitError:
            raise AttributeError(f"Unit '{name}' not found")
    
    def __call__(self, value: str):
        """Allow calling unit('100 kg') like ureg('100 kg')"""
        return ureg(value)


unit = _UnitShortcut()


def get_base_unit(quantity: Union[pint.Quantity, pint.Unit]) -> Dict[str, int]:
    """
    Return unit of `quantity` represented by seven basic SI units.
    
    Args:
        quantity: A Pint Quantity or Unit
        
    Returns:
        Dictionary mapping dimension to their exponents
        e.g., {'[mass]': 1, '[length]': -2, '[time]': -2} for Pascal
    """
    if isinstance(quantity, pint.Quantity):
        unit = quantity.units
    else:
        unit = quantity
    
    return dict(unit.dimensionality)


def get_base_unit_with_value(quantity: pint.Quantity) -> Tuple[float, Dict[str, int]]:
    """
    Return the value and base units of `quantity`.
    
    Args:
        quantity: A Pint Quantity
        
    Returns:
        Tuple of (magnitude, base_unit_dict)
    """
    return quantity.magnitude, get_base_unit(quantity)


def simplify_unit(quantity: Union[pint.Quantity, pint.Unit]) -> pint.Unit:
    """
    Simplify a unit by removing dimensionless components.
    
    Args:
        quantity: A Pint Quantity or Unit
        
    Returns:
        Simplified Unit
    """
    if isinstance(quantity, pint.Quantity):
        unit = quantity.units
    else:
        unit = quantity
    
    return unit


def check_unit_compatibility(
    q1: Union[pint.Quantity, pint.Unit], 
    q2: Union[pint.Quantity, pint.Unit]
) -> bool:
    """
    Check if two units are compatible (can be converted to each other).
    
    Args:
        q1: First Quantity or Unit
        q2: Second Quantity or Unit
        
    Returns:
        True if units are compatible
    """
    if isinstance(q1, pint.Quantity):
        unit1 = q1.units
    else:
        unit1 = q1
        
    if isinstance(q2, pint.Quantity):
        unit2 = q2.units
    else:
        unit2 = q2
    
    return unit1.is_compatible_with(unit2)


def convert_value(
    value: float, 
    from_unit: Union[pint.Unit, str], 
    to_unit: Union[pint.Unit, str]
) -> float:
    """
    Convert a value from one unit to another.
    
    Args:
        value: Numeric value to convert
        from_unit: Source unit
        to_unit: Target unit
        
    Returns:
        Converted value
    """
    quantity = value * ureg(from_unit)
    converted = quantity.to(ureg(to_unit))
    return converted.magnitude


DIMENSION_TO_BASE_UNIT = {
    '[mass]': 'kilogram',
    '[length]': 'meter',
    '[time]': 'second',
    '[current]': 'ampere',
    '[temperature]': 'kelvin',
    '[amount]': 'mole',
    '[luminosity]': 'candela',
}

BASE_UNIT_TO_DIMENSION = {v: k for k, v in DIMENSION_TO_BASE_UNIT.items()}

# Short name to full dimension mapping for conv_dict
SHORT_TO_DIMENSION = {
    # Short names
    'kg': '[mass]',
    'g': '[mass]',
    'mg': '[mass]',
    'ug': '[mass]',
    'm': '[length]',
    'cm': '[length]',
    'mm': '[length]',
    'um': '[length]',
    'nm': '[length]',
    'pm': '[length]',
    'fm': '[length]',
    'km': '[length]',
    'dm': '[length]',
    's': '[time]',
    'ms': '[time]',
    'us': '[time]',
    'ns': '[time]',
    'ps': '[time]',
    'A': '[current]',
    'mA': '[current]',
    'uA': '[current]',
    'nA': '[current]',
    'K': '[temperature]',
    'mol': '[amount]',
    'mmol': '[amount]',
    'kmol': '[amount]',
    'cd': '[luminosity]',
    # Full names (lowercase)
    'kilogram': '[mass]',
    'gram': '[mass]',
    'meter': '[length]',
    'centimeter': '[length]',
    'millimeter': '[length]',
    'second': '[time]',
    'ampere': '[current]',
    'kelvin': '[temperature]',
    'mole': '[amount]',
    'candela': '[luminosity]',
}

# Reverse mapping: dimension to short base unit name
DIMENSION_TO_SHORT = {
    '[mass]': 'kg',
    '[length]': 'm',
    '[time]': 's',
    '[current]': 'A',
    '[temperature]': 'K',
    '[amount]': 'mol',
    '[luminosity]': 'cd',
}


class UnitSystem:
    """
    Represents a complete system of units.
    
    A UnitSystem defines a complete mapping from base SI units 
    to desired output units.
    
    Attributes:
        name: Name of the unit system
        units: Dictionary mapping base units to their names in this system
        
    Example:
        >>> si = UnitSystem("SI", {'kilogram': 'kilogram', 'meter': 'meter', 'second': 'second'})
    """
    
    PRESETS: Dict[str, Dict[str, str]] = {}
    
    def __init__(self, name: str, units: Dict[str, str], description: str = ""):
        """
        Initialize a unit system.
        
        Args:
            name: Name of the unit system
            units: Dictionary mapping base SI units to output units
            description: Optional description
        """
        self.name = name
        self.units = units
        self.description = description
        self._ureg = ureg
        self._converter = uniUnit(units)
    
    def __repr__(self) -> str:
        return f"UnitSystem('{self.name}', {self.units})"
    
    def __str__(self) -> str:
        return f"UnitSystem: {self.name}"
    
    @classmethod
    def register_preset(cls, name: str, units: Dict[str, str], description: str = "") -> None:
        """
        Register a unit system as a preset.
        
        Args:
            name: Name of the preset
            units: Unit mapping dictionary
            description: Optional description
        """
        cls.PRESETS[name] = units
    
    @classmethod
    def get_preset(cls, name: str) -> "UnitSystem":
        """
        Get a preset unit system by name.
        
        Args:
            name: Name of the preset
            
        Returns:
            UnitSystem object
            
        Raises:
            KeyError: If preset not found
        """
        if name not in cls.PRESETS:
            available = ", ".join(cls.PRESETS.keys()) if cls.PRESETS else "none"
            raise KeyError(f"Preset '{name}' not found. Available: {available}")
        return cls(name, cls.PRESETS[name])
    
    @classmethod
    def list_presets(cls) -> List[str]:
        """List all available preset names."""
        return list(cls.PRESETS.keys())
    
    def to_unit(self, uin: Union[pint.Quantity, float, int]) -> pint.Quantity:
        """
        Convert input to this unit system.
        
        Args:
            uin: Input value with units (or just a number)
            
        Returns:
            Value in this unit system
        """
        return self._converter.to_unit(uin)
    
    def get_new_unit(self, uin: pint.Unit) -> pint.Unit:
        """Get the unit representation in this system."""
        return self._converter.get_new_unit(uin)
    
    def convert_from(self, uin: pint.Quantity, source_system: "UnitSystem") -> pint.Quantity:
        """
        Convert from another unit system to this one.
        
        Args:
            uin: Value in source system
            source_system: Source unit system
            
        Returns:
            Value converted to this system
        """
        si_value = source_system.to_unit(uin)
        return self.to_unit(si_value)


class uniUnit:
    """
    Main class for conversion between systems of units.
    
    This class handles the conversion of values from one unit system
    to another. It works by first converting to base SI units, then
    to the target unit system.
    
    Attributes:
        _udict: Dictionary mapping base units to target units
        
    Example:
        >>> conv_dict = {'kilogram': 'gram', 'meter': 'millimeter', 'second': 'second'}
        >>> myunit = uniUnit(conv_dict)
        >>> myunit.to_unit(100 * ureg.kg)
        100000.0 <Unit('gram')>
    """
    
    def __init__(self, udict: Dict[str, str]):
        """
        Initialize uniUnit with a conversion dictionary.
        
        Args:
            udict: Dictionary mapping base SI units to target units
                   Supports both short names (kg, g, m, s) and full names (kilogram, gram, meter, second)
                   e.g., {'kilogram': 'gram', 'meter': 'millimeter', 'second': 'second'}
                   or {'kg': 'g', 'm': 'mm', 's': 's'}
                   
        Note:
            Only base units used in conversions need to be provided.
            Missing units will use SI base units.
        """
        self._udict = {}
        for key, value in udict.items():
            dim = SHORT_TO_DIMENSION.get(key, key)
            if dim.startswith('['):
                self._udict[dim] = value
            else:
                self._udict[dim] = value
        self._ureg = ureg
        self._target_unit_cache = {}
    
    def __repr__(self) -> str:
        return f"uniUnit({self._udict})"
    
    def _get_target_unit(self, dims_tuple: tuple) -> pint.Unit:
        """
        Internal cached function: compute target unit from dimension tuple.
        dims_tuple format: (('[length]', 1), ('[time]', -2))
        """
        if dims_tuple in self._target_unit_cache:
            return self._target_unit_cache[dims_tuple]
        
        res_unit = self._ureg.dimensionless
        for dim, exp in dims_tuple:
            target_str = self._udict.get(dim, DIMENSION_TO_SHORT.get(dim, dim.strip('[]')))
            res_unit *= self._ureg(target_str) ** exp
        
        self._target_unit_cache[dims_tuple] = res_unit
        return res_unit
    
    def get_new_unit(self, uin: Union[pint.Quantity, pint.Unit]) -> pint.Unit:
        """
        Get the corresponding units of `uin` in new system of units.
        
        Args:
            uin: Input Quantity or Unit
            
        Returns:
            New Unit in target system
        """
        if isinstance(uin, pint.Quantity):
            dims = dict(uin.units.dimensionality)
        else:
            dims = dict(uin.dimensionality)
        
        dims_tuple = tuple(sorted(dims.items()))
        return self._get_target_unit(dims_tuple)
    
    def to_unit(self, uin: Union[pint.Quantity, List, Tuple, float, int]) -> Union[pint.Quantity, List]:
        """
        Return the value of `uin` in new system of units.
        
        Args:
            uin: Input value with units, or list/tuple of values
            
        Returns:
            Converted value(s) in target unit system
            
        Example:
            >>> u.to_unit(100 * ureg.kg)
            100000.0 <Unit('gram')>
            >>> u.to_unit([1*ureg.kg, 2*ureg.kg])
            [1000.0 <Unit('gram')>, 2000.0 <Unit('gram')>]
        """
        if isinstance(uin, (list, tuple)):
            return [self.to_unit(item) for item in uin]
        
        if isinstance(uin, (int, float)):
            return uin
        
        if isinstance(uin, pint.Quantity):
            target_unit = self.get_new_unit(uin)
            
            if uin.magnitude == 1 and not isinstance(target_unit, pint.Quantity):
                result = uin.to(target_unit)
                if isinstance(result, pint.Quantity):
                    return result
                return 1 * result
            
            return uin.to(target_unit)
        
        return uin
    
    def get_conversion_factor(self, base_unit_name: str) -> float:
        """
        Get the conversion factor for a base unit.
        
        Args:
            base_unit_name: Name of the base unit (e.g., 'kilogram', 'meter')
            
        Returns:
            Conversion factor to SI base unit
        """
        if base_unit_name not in self._udict:
            return 1.0
        
        target = self._udict[base_unit_name]
        
        try:
            base = 1 * self._ureg(base_unit_name)
            converted = base.to(target)
            return converted.magnitude
        except:
            return 1.0


def create_custom_unit(
    name: str, 
    value: Union[pint.Quantity, float], 
    unit: Optional[pint.Unit] = None
) -> pint.Unit:
    """
    Create a custom unit definition.
    
    Args:
        name: Name of the new unit
        value: Value in terms of existing units, or conversion factor
        unit: Optional unit to define the custom unit against
        
    Returns:
        New Unit
        
    Example:
        >>> Long = create_custom_unit('Long', 1000 * ureg.km)
        >>> score = create_custom_unit('score', 20)
    """
    if unit is not None:
        return (value * unit).units
    else:
        try:
            ureg.define(f'{name} = {value}')
            return ureg.parse_expression(name)
        except:
            return (value * ureg.parse_expression(name)).units


def quick_convert(
    value: Union[float, pint.Quantity, str],
    from_system: Union[str, UnitSystem],
    to_system: Union[str, UnitSystem]
) -> pint.Quantity:
    """
    Quickly convert between two unit systems.
    
    Args:
        value: Value to convert (can be string like '100 kg', Quantity, or number)
        from_system: Source unit system (name or UnitSystem)
        to_system: Target unit system (name or UnitSystem)
        
    Returns:
        Converted value
        
    Example:
        >>> quick_convert(100 * ureg.kg, 'SI', 'CGS')
        >>> quick_convert('100 kg', 'SI', 'CGS')
    """
    if isinstance(from_system, str):
        from_system = UnitSystem.get_preset(from_system)
    if isinstance(to_system, str):
        to_system = UnitSystem.get_preset(to_system)
    
    if isinstance(value, str):
        value = ureg(value)
    
    si_value = from_system.to_unit(value)
    return to_system.to_unit(si_value)


def get_unit_info(quantity: pint.Quantity) -> Dict[str, Any]:
    """
    Get detailed information about a unit.
    
    Args:
        quantity: Input Pint Quantity
        
    Returns:
        Dictionary with unit information
    """
    return {
        'magnitude': quantity.magnitude,
        'units': str(quantity.units),
        'base_units': get_base_unit(quantity),
        'dimensionality': str(quantity.units.dimensionality),
        'is_dimensionless': quantity.dimensionless,
    }


def to_unit(uin: Union[pint.Quantity, float, int], 
            units: Dict[str, str]) -> Union[pint.Quantity, List]:
    """
    Convenience function to convert using a unit dictionary.
    
    Args:
        uin: Input value
        units: Unit mapping dictionary
        
    Returns:
        Converted value
    """
    converter = uniUnit(units)
    return converter.to_unit(uin)


UnitSystem.register_preset("SI", {
    'kilogram': 'kilogram', 'meter': 'meter', 'second': 'second', 
    'ampere': 'ampere', 'kelvin': 'kelvin', 'mole': 'mole', 'candela': 'candela'
}, "International System of Units")

UnitSystem.register_preset("MKS", {
    'kilogram': 'kilogram', 'meter': 'meter', 'second': 'second'
}, "Meter-Kilogram-Second")

UnitSystem.register_preset("CGS", {
    'kilogram': 'gram', 'meter': 'centimeter', 'second': 'second'
}, "Centimeter-Gram-Second")

UnitSystem.register_preset("mmkgms", {
    'kilogram': 'kilogram', 'meter': 'millimeter', 'second': 'millisecond'
}, "Millimeter-Kilogram-Millisecond")

UnitSystem.register_preset("mmgms", {
    'kilogram': 'gram', 'meter': 'millimeter', 'second': 'millisecond'
}, "Millimeter-Gram-Millisecond")

UnitSystem.register_preset("nm_ug_ps", {
    'kilogram': 'microgram', 'meter': 'nanometer', 'second': 'picosecond',
    'ampere': 'nanoampere', 'kelvin': 'kelvin', 'mole': 'nanomole', 'candela': 'candela'
}, "Nanometer-Microgram-Picosecond (nano-science)")

UnitSystem.register_preset("Imperial", {
    'kilogram': 'pound', 'meter': 'inch', 'second': 'second'
}, "Imperial units")

UnitSystem.register_preset("FPS", {
    'kilogram': 'pound', 'meter': 'foot', 'second': 'second'
}, "Foot-Pound-Second")

UnitSystem.register_preset("British", {
    'kilogram': 'pound', 'meter': 'inch', 'second': 'minute'
}, "British units (pound-inch-minute)")
