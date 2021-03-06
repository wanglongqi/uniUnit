#!/usr/bin/env python
# -*- coding:utf-8
"""
uniunit
Consistent units manager. 

get_base_unit
	return units in seven basic units system

uniUnit
	main class for conversion between systems of units
	get_new_unit(uin): get the corresponding units of `uin`
						in new system of units.
	to_unit(uin): return the value of `uin` in new system 
						of units.

Update 2014-11-28:
	At support to to_unit for iterators like list, tuple 
	and numpy.ndarray.

:Author: WANG Longqi <iqgnol@gmail.com>
:Date: 2014-11-27
"""

import unum

def get_base_unit(inu):
	'return unit of `inu` represented by seven basic units.'
	base_unit = {}
	for u, exp in list(inu._unit.items()):
		new_u = inu._unitTable[u][0]
		if new_u is None:
			if u in base_unit.keys():
				base_unit[u] += exp
			else:
				base_unit[u] = exp
		else:
			bu = get_base_unit(new_u)
			for key in bu.keys():
				if key in base_unit.keys():
					base_unit[key] += bu[key]*exp
				else:
					base_unit[key] = bu[key]*exp
	return base_unit

class uniUnit(object):
	def __init__(self,udict):
		self._udict = udict

	def get_new_unit(self,uin):
		base_unit = get_base_unit(uin)
		new_unit = {}
		for key in base_unit.keys():
			new_unit[self._udict[key]] = base_unit[key]
		return unum.Unum(new_unit)

	def to_unit(self,uin):
		if hasattr(uin,'__iter__'):
			return map(self.to_unit,uin)
		new_unit=self.get_new_unit(uin)
		return uin.asUnit(new_unit)


