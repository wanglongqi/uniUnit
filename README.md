uniUnit
=======
uniUnit still under developing, please send your comments on the [post pages](https://wanglongqi.github.io/uniunit/).
![uniUnit](https://wanglongqi.github.io/public/images/uniUnit.png)

Provide consistent units for calculation. [Syntax highlighted version of this page is here](https://wanglongqi.github.io/uniunit/2014/11/27/uniunitreadme/).

In FEM and other similar simulation techniques, keeping consistent units is a tedious work and almost everyone made this kind of mistake one or two times. Therefore, here I propose a package for dealing with this problem once for all.

The idea of the package is simple, you tell me what is the system of units you want. Then, tell me the correct number in any system of units. All is done! The package will try to print out the value in you specified system of units.

Here is some examples:

	from uniunit import *
	conv_dict = {'kg':'g','m':'mm','s':'s',
				'A':'mA','K':'K','mol':'mol','cd':'cd'}
	myunit = uniUnit(conv_dict)

	myunit.to_unit(100 * kg)
	# 100000.0 [g]


Oh, why would someone need something like this. Fine, how about following example?


	myunit.to_unit(J)
	# 1000000000.0 [g.mm2/s2]

	myunit.to_unit(W/m/m)
	# 1000.0 [g/mm0.s3]

	W/m/m == kg/s/s/s
	# True


Or if you are specialist in nano-science, you may need these quantity in `nm`


	conv_dict = {'kg':'ug','m':'nm','s':'ps',
				'A':'mA','K':'K','mol':'mol','cd':'cd'}
	myunit1 = uniUnit(conv_dict)

	myunit1.to_unit(2E11*Pa)
	# 2e-13 [ug/nm.ps2]


Is it also so easy for you? Then, how about not in SI? Try to figure out `1 W/m/m` is how many quantity in system of units like `pound, inch, min`.


	conv_dict = {'kg':'pound','m':'inch','s':'min'}
	myunit2 = uniUnit(conv_dict)

	myunit2.to_unit(W/m/m)
	# 476198.486319 [pound/inch0.min3]

	1*W/m/m - 476198.486319*pound/min**3
	#  7.04547531427e-13 [W/m2]


Noted: 

- You do not need to provide the whole conversion dictionary, as in last example, only units corresponding to `kg`, `m` and `s` are provided. 
- However, you need provide all units you will use in future conversion, since no default value is given for the conversion dictionary.
- You can use you user define unit in the conversion, too. 

Here is an example.

	Long = unum.Unum.unit('Long',1000*km)
	Flash = unum.Unum.unit('Flash',1*ms)

	conv_dict = {'m':'Long','s':'Flash'}

	myunit3 = uniUnit(conv_dict)

	myunit3.to_unit(m)

	myunit3.to_unit(9.8 * m/s**2)
	# 9.8e-12 [Long/Flash2]

Before, you start you may want to know some silly problems in the package like:

- `1 [T]` is not `1000 [kg]`, but `1 Tesla` instead.
- `in` is a reserved word for Python, and cannot be a unit.

## Pre-request
[unum](https://pypi.python.org/pypi/Unum) - You can install it by `easy_install unum`

## To-Do
Here I list some possible extensions for this package:

- Graphic interface: Personally, prefer Qt based GUI.
- Numpy and list support: May be a necessary extension, not so sure.
- Units simplification: May be interesting, have some thoughts on it but not that clear.
- Add more predefined units: I think it is useful, may be will be added into the package later.
- Add tests to the package: some simple tests are used in development, but nose may be not a good idea. Test system is definitely needed in the package. (Direct test code has added as in `tests.py`)
- Documentation: may be not, simple packages like this one need documentation? I think readme page and [site posts](https://wanglongqi.github.io/uniUnit/) are enough.
