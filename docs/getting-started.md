# Getting Started

Welcome to `uniUnit`! This guide will help you get up and running quickly.

## Installation

You can install `uniUnit` and its dependencies using pip:

```bash
pip install pint numpy
```

*(Note: In the future, you'll be able to install it directly via `pip install uniunit` once published to PyPI.)*

## Basic Usage

The core of `uniUnit` is the `uniUnit` class, which manages conversions between different unit systems.

### 1. Define a Unit System

A unit system is defined by a dictionary mapping base dimensions (like length, mass, and time) to specific units.

```python
from uniunit import uniUnit, unit

# Define a system: Millimeter-Gram-Second (mm-g-s)
my_system = uniUnit({
    'm': 'mm',  # Length -> millimeter
    'kg': 'g',  # Mass -> gram
    's': 's'    # Time -> second
})
```

### 2. Convert Units

Once you have a system, you can convert any `Quantity` (a value with a unit) into that system.

```python
# Convert 5 kilograms to the target system (grams)
result = my_system.to_unit(5 * unit.kg)
print(result)  # 5000.0 gram

# Convert 100 Pascals to the target system (g/(mm·s²))
pressure = my_system.to_unit(100 * unit.Pa)
print(pressure)  # 0.1 gram / millimeter / second ** 2
```

## Using Presets

`uniUnit` comes with many built-in presets for common engineering and scientific unit systems.

```python
from uniunit import UnitSystem

# Get the SI (MKS) system
si = UnitSystem.get_preset('SI')

# Get the CGS system
cgs = UnitSystem.get_preset('CGS')

# Get a common FEM system (mm-kg-ms)
fem = UnitSystem.get_preset('mmkgms')

# List all available presets
print(UnitSystem.list_presets())
```

## Next Steps

- Explore the [User Guide](user-guide.md) for advanced features like custom units and NumPy support.
- Check the [API Reference](api.md) for detailed function signatures.
- Try the [Web Demo](demo.md) to test conversions in your browser.
