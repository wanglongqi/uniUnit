from uniunit import *
from math import *
import copy

eps = 1E-3

def remove0(d):
	rd = copy.copy(d)
	for key in d.keys():
		if d[key] == 0:
			rd.pop(key)
	return rd


# check all derived form in https://en.wikipedia.org/wiki/SI_derived_unit
def test_derive(c):
	'c is conversion dictionary.'
	t = u.to_unit(Hz)
	a = {c['s']:-1}
	assert remove0(t._unit) == a

	t = u.to_unit(rad)
	a = {}
	assert remove0(t._unit) == a

	t = u.to_unit(sr)
	a = {}
	assert remove0(t._unit) == a

	t = u.to_unit(N)
	a = {c['s']:-2,c['kg']:1,c['m']:1}
	assert remove0(t._unit) == a

	t = u.to_unit(Pa)
	a = {c['s']:-2,c['kg']:1,c['m']:-1}
	assert remove0(t._unit) == a

	t = u.to_unit(J)
	a = {c['s']:-2,c['kg']:1,c['m']:2}
	assert remove0(t._unit) == a

	t = u.to_unit(W)
	a = {c['s']:-3,c['kg']:1,c['m']:2}
	assert remove0(t._unit) == a

	t = u.to_unit(C)
	a = {c['s']:1,c['A']:1}
	assert remove0(t._unit) == a

	t = u.to_unit(V)
	a = {c['s']:-3,c['kg']:1,c['m']:2,c['A']:-1}
	assert remove0(t._unit) == a

	t = u.to_unit(F)
	a = {c['s']:4,c['kg']:-1,c['m']:-2,c['A']:2}
	assert remove0(t._unit) == a

	t = u.to_unit(ohm)
	a = {c['s']:-3,c['kg']:1,c['m']:2,c['A']:-2}
	assert remove0(t._unit) == a

	t = u.to_unit(S)
	a = {c['s']:3,c['kg']:-1,c['m']:-2,c['A']:2}
	assert remove0(t._unit) == a

	t = u.to_unit(T)
	a = {c['s']:-2,c['kg']:1,c['A']:-1}
	assert remove0(t._unit) == a

	t = u.to_unit(Wb)
	a = {c['s']:-2,c['kg']:1,c['m']:2,c['A']:-1}
	assert remove0(t._unit) == a

	H = Wb/A
	t = u.to_unit(H)
	a = {c['s']:-2,c['kg']:1,c['m']:2,c['A']:-2}
	assert remove0(t._unit) == a

	t = u.to_unit(lx)
	a = {c['m']:-2,c['cd']:1}
	assert remove0(t._unit) == a


assert get_base_unit(A) == {'A':1}
assert get_base_unit(Pa) == {'kg':1,'s':-2,'m':-1}
assert get_base_unit(kgf) == get_base_unit(N)

udict = {'kg':'g','m':'mm','s':'s','A':'mA','K':'K','mol':'mol','cd':'cd'}
u = uniUnit(udict)

test_derive(udict)

t = u.to_unit(2*A)
assert t._unit == {'mA':1}
assert t._value == 2000

t = u.to_unit(J)
assert t._unit == {'g':1,'mm':2,'s':-2}
assert abs(t._value-1E9) < eps


udict = {'kg':'pound','m':'inch','s':'min'}
u = uniUnit(udict)

t = u.to_unit(2*kg)
assert t._unit == {'pound':1}
assert abs(t._value-2/0.45359237) < eps

t = u.to_unit(m/s)
assert t._unit == {'inch':1,'min':-1}
assert abs(t._value-2362.2047) < eps