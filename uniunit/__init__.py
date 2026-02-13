#!/usr/bin/env python
# -*- coding:utf-8
"""
uniunit
Consistent units manager. 

Read README.md for more information.

:Author: WANG Longqi <iqgnol@gmail.com>
:Date: 2014-11-27
"""

__version__ = '0.2'

import pint
from pint import UnitRegistry, Quantity

ureg = UnitRegistry()
Q_ = ureg.Quantity

from .uniunit import (
    ureg,
    unit,
    Quantity,
    uniUnit,
    get_base_unit,
    get_base_unit_with_value,
    simplify_unit,
    check_unit_compatibility,
    convert_value,
    create_custom_unit,
    quick_convert,
    get_unit_info,
    UnitSystem,
    to_unit,
)

__all__ = [
    'ureg',
    'unit',
    'Quantity',
    'Q_',
    'uniUnit',
    'get_base_unit',
    'get_base_unit_with_value',
    'simplify_unit',
    'check_unit_compatibility',
    'convert_value',
    'create_custom_unit',
    'quick_convert',
    'get_unit_info',
    'UnitSystem',
    'to_unit',
]
