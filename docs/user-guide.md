# User Guide

This guide covers advanced features and common workflows in `uniUnit`.

## Advanced Unit Conversion

### NumPy Support

`uniUnit` seamlessly integrates with NumPy arrays. This is extremely useful for processing large datasets or simulation results.

```python
import numpy as np
from uniunit import unit, uniUnit

u = uniUnit({'m': 'mm', 'kg': 'g', 's': 's'})

# Create a quantity with a NumPy array
distances = np.array([1.5, 2.0, 3.5]) * unit.m

# Convert the entire array at once
result = u.to_unit(distances)
print(result)  # [1500. 2000. 3500.] millimeter
```

### Batch Processing Lists

You can also pass Python lists directly to the conversion methods.

```python
values = [10, 20, 30] * unit.kg
result = u.to_unit(values)
print(result)  # [10000. 20000. 30000.] gram
```

## Custom Units and Constants

If you need a unit that isn't in the default registry, you can define it on the fly.

```python
from uniunit import ureg, create_custom_unit

# Define a completely new unit
create_custom_unit('my_custom_unit', '1.5 * meter')

# Use it immediately
val = 10 * ureg.my_custom_unit
print(val.to('meter'))  # 15.0 meter
```

## Engineering Workflows (FEM)

In Finite Element Method (FEM) simulations, maintaining unit consistency is critical. Common systems like `mm-kg-ms` (where Force is in Newtons) are built-in.

```python
from uniunit import UnitSystem, unit

# Load the mm-kg-ms system
fem = UnitSystem.get_preset('mmkgms')

# Define material properties in SI
youngs_modulus = 210e9 * unit.Pa  # 210 GPa

# Convert to FEM system
fem_modulus = fem.to_unit(youngs_modulus)
print(fem_modulus)  # 210000.0 kilogram / millimeter / millisecond ** 2
```

## Chinese Unit Support

`uniUnit` has first-class support for Chinese unit names, making it easier for users in Chinese-speaking regions.

```python
from uniunit import unit, uniUnit

# Use Chinese units in your system definition
u = uniUnit({'m': '米', 'kg': '千克', 's': '秒'})

# Convert from standard units to Chinese units
dist = u.to_unit(5 * unit.km)
print(dist)  # 5000.0 米
```

## Light-Based Units

For astronomical or physics calculations:

```python
u = uniUnit({'m': 'm'})
light_year = u.to_unit(1 * unit.light_year)
print(light_year)  # 9460730472580800.0 meter
```

## Performance Optimization

The library includes internal caching (`lru_cache`) for repeated conversions to ensure minimal overhead in tight loops.

```python
u = uniUnit({'m': 'mm', 'kg': 'g', 's': 's'})

# Repeated calls to to_unit for the same dimensionality are cached
for _ in range(1000):
    u.to_unit(1.0 * unit.meter)
```
