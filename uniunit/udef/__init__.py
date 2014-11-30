#!/usr/bin/env python
# -*- coding:utf-8
"""
uniunit
Consistent units manager. 

Read README.md for more information.

:Author: WANG Longqi <iqgnol@gmail.com>
:Date: 2014-11-27
"""
import unum
from unum.units import *
kgf = unum.Unum.unit('kgf',9.8*N)
inch = unum.Unum.unit('inch', 2.54 * cm )
pound = unum.Unum.unit('pound', 0.45359237 * kg )


