# uniUnit

[English](#english) | [中文](#中文)

---

## English

### What is uniUnit?

uniUnit is a simple Python library for converting between different unit systems effortlessly. It's especially useful for engineering calculations and simulations (like FEM) where maintaining unit consistency is crucial.

### Installation

```bash
pip install pint
```

### Quick Start

```python
from uniunit import unit, uniUnit

# Define target unit system: mm-g-s
conv = {'m': 'mm', 'kg': 'g', 's': 's'}
u = uniUnit(conv)

# Convert 100 kg to grams
u.to_unit(100 * unit.kg)  # 100000.0 gram
```

### Core Features

#### 1. Basic Unit Conversion

```python
from uniunit import unit, uniUnit

# Convert to mm-g-s system
u = uniUnit({'m': 'mm', 'kg': 'g', 's': 's'})

# 100 kg → grams
u.to_unit(100 * unit.kg)        # 100000.0 gram

# 1 Joule → g·mm²/s²
u.to_unit(1 * unit.J)           # 1000000000.0 gram * millimeter ** 2 / second ** 2

# 1 Pascal → g/(mm·s²)
u.to_unit(1 * unit.Pa)          # 1.0 gram / millimeter / second ** 2
```

#### 2. Nano-Science Units

For nano-science researchers:

```python
# nm-μg-ps system
u = uniUnit({'m': 'nm', 'kg': 'ug', 's': 'ps'})

# 2×10¹¹ Pa → μg/(nm·ps²)
u.to_unit(2e11 * unit.Pa)       # 2e-13 microgram / nanometer / picosecond ** 2
```

#### 3. Imperial Units

Convert to British/imperial units:

```python
# pound-inch-minute system
u = uniUnit({'m': 'inch', 'kg': 'pound', 's': 'min'})

# 1 W/m² → pound/(inch·min³)
u.to_unit(unit('1 W/m^2'))       # 476198.4863193356 pound / minute ** 3
```

#### 4. Built-in Presets

One-line unit system switching:

```python
from uniunit import quick_convert, UnitSystem

# Quick conversion
quick_convert(100 * unit.kg, 'SI', 'CGS')     # 1000.0 gram
quick_convert(1 * unit.m, 'SI', 'Imperial')     # 39.37 inch

# Use presets
cgs = UnitSystem.get_preset('CGS')
cgs.to_unit(1 * unit.kg)          # 1000.0 gram
cgs.to_unit(1 * unit.m)           # 100.0 centimeter
```

**Available presets**: `SI`, `MKS`, `CGS`, `mmkgms`, `mmgms`, `nm_ug_ps`, `Imperial`, `FPS`, `British`

#### 5. Chinese Units Support

Use Chinese unit names directly:

```python
# Chinese units
u = uniUnit({'m': '米', 'kg': '千克', 's': '秒'})

u.to_unit(1 * unit.km)            # 1000.0 米
u.to_unit(1000 * unit.g)         # 1.0 千克
```

#### 6. Light-Based Distance Units

Astronomical units based on speed of light:

```python
u = uniUnit({'m': 'm'})
u.to_unit(1 * unit.light_second)   # 299792458 meter
u.to_unit(1 * unit.light_minute)   # 17987547480 meter
```

#### 7. NumPy Support

Batch conversion for arrays:

```python
import numpy as np
from uniunit import unit, uniUnit

u = uniUnit({'m': 'mm', 'kg': 'g', 's': 's'})

# Convert NumPy arrays
distances = np.array([1, 2, 3]) * unit.m
result = u.to_unit(distances)
print(result)  # [1000. 2000. 3000.] gram

# Works with lists too
values = [1, 2, 3] * unit.kg
result = u.to_unit(values)
print(result)  # [1000. 2000. 3000.] gram
```

### More Use Cases

#### FEM Simulation

```python
from uniunit import unit, uniUnit, UnitSystem

# Common FEM unit system: mm-kg-ms
fem = UnitSystem.get_preset('mmkgms')

# Convert simulation results
pressure = fem.to_unit(1000 * unit.Pa)
# 0.001 kilogram / millimeter / millisecond ** 2

velocity = fem.to_unit(50 * unit.m / unit.s)
# 50.0 millimeter / millisecond

acceleration = fem.to_unit(9.8 * unit.m / unit.s**2)
# 9.8e-3 millimeter / millisecond ** 2
```

#### Custom Unit Systems

```python
from uniunit import ureg, uniUnit

# Define custom units
ureg.define('Long = 1000 * kilometer')  # Custom length
ureg.define('Flash = 1 * millisecond')    # Custom time

# Use in conversion
u = uniUnit({'m': 'Long', 's': 'Flash'})
u.to_unit(9.8 * unit.m / unit.s**2)
# 9.8e-12 Long / Flash ** 2
```

#### Multi-Physics Calculations

```python
# Mechanical + Thermal
u = uniUnit({'m': 'cm', 'kg': 'g', 's': 's', 'K': 'K'})

# Stress
stress = u.to_unit(100 * unit.Pa)  # 1000.0 gram / centimeter / second ** 2

# Thermal conductivity
k = u.to_unit(150 * unit.W / unit.m / unit.K)
# 15000000.0 gram * centimeter / second ** 3 / kelvin
```

### Helper Functions

```python
from uniunit import get_base_unit, get_unit_info, check_unit_compatibility

# Get base dimensions
get_base_unit(unit.Pa)
# {'[mass]': 1, '[length]': -1, '[time]': -2}

# Get detailed unit info
get_unit_info(100 * unit.kg)
# {'magnitude': 100, 'units': 'kilogram', 'base_units': {'[mass]': 1}, ...}

# Check compatibility
check_unit_compatibility(unit.kg, unit.g)   # True
check_unit_compatibility(unit.kg, unit.m)    # False
```

### Unit Access Methods

```python
from uniunit import unit, ureg

# Method 1: unit prefix (recommended)
unit.kg, unit.m, unit.s, unit.J

# Method 2: ureg
ureg.kg, ureg.m, ureg.s

# Method 3: string
unit('100 kg'), unit('50 m/s')
```

---

## 中文

### uniUnit 是什么？

uniUnit 是一个简洁的 Python 单位转换库，帮助你在不同单位制之间轻松转换。特别适用于工程计算和仿真（如 FEM），保持单位一致性非常重要。

### 安装

```bash
pip install pint
```

### 快速开始

```python
from uniunit import unit, uniUnit

# 定义目标单位制: 毫米-克-秒
conv = {'m': 'mm', 'kg': 'g', 's': 's'}
u = uniUnit(conv)

# 转换 100 kg → grams
u.to_unit(100 * unit.kg)  # 100000.0 gram
```

### 核心功能

#### 1. 基本单位转换

```python
from uniunit import unit, uniUnit

# 转换为毫米-克-秒单位制
u = uniUnit({'m': 'mm', 'kg': 'g', 's': 's'})

# 100 kg → grams
u.to_unit(100 * unit.kg)        # 100000.0 gram

# 1 Joule → g·mm²/s²
u.to_unit(1 * unit.J)           # 1000000000.0 gram * millimeter ** 2 / second ** 2

# 1 Pascal → g/(mm·s²)
u.to_unit(1 * unit.Pa)          # 1.0 gram / millimeter / second ** 2
```

#### 2. 纳米科学单位

纳米科学研究人员常用：

```python
# 纳米-微克-皮秒单位制
u = uniUnit({'m': 'nm', 'kg': 'ug', 's': 'ps'})

# 2×10¹¹ Pa → μg/(nm·ps²)
u.to_unit(2e11 * unit.Pa)       # 2e-13 microgram / nanometer / picosecond ** 2
```

#### 3. 英制单位

转换为英制单位：

```python
# 磅-英寸-分钟单位制
u = uniUnit({'m': 'inch', 'kg': 'pound', 's': 'min'})

# 1 W/m² → pound/(inch·min³)
u.to_unit(unit('1 W/m^2'))       # 476198.4863193356 pound / minute ** 3
```

#### 4. 预设单位制

内置常用单位制，一行切换：

```python
from uniunit import quick_convert, UnitSystem

# 快速转换
quick_convert(100 * unit.kg, 'SI', 'CGS')     # 1000.0 gram
quick_convert(1 * unit.m, 'SI', 'Imperial')     # 39.37 inch

# 使用预设
cgs = UnitSystem.get_preset('CGS')
cgs.to_unit(1 * unit.kg)          # 1000.0 gram
cgs.to_unit(1 * unit.m)           # 100.0 centimeter
```

**可用预设**: `SI`, `MKS`, `CGS`, `mmkgms`, `mmgms`, `nm_ug_ps`, `Imperial`, `FPS`, `British`

#### 5. 中文单位支持

支持直接使用中文单位：

```python
# 使用中文单位
u = uniUnit({'m': '米', 'kg': '千克', 's': '秒'})

u.to_unit(1 * unit.km)            # 1000.0 米
u.to_unit(1000 * unit.g)         # 1.0 千克
```

#### 6. 光时单位

基于光速的天文距离单位：

```python
u = uniUnit({'m': 'm'})
u.to_unit(1 * unit.light_second)   # 299792458 meter
u.to_unit(1 * unit.light_minute)   # 17987547480 meter
```

#### 7. NumPy 支持

批量转换数组：

```python
import numpy as np
from uniunit import unit, uniUnit

u = uniUnit({'m': 'mm', 'kg': 'g', 's': 's'})

# 转换 NumPy 数组
distances = np.array([1, 2, 3]) * unit.m
result = u.to_unit(distances)
print(result)  # [1000. 2000. 3000.] gram

# 列表也可以
values = [1, 2, 3] * unit.kg
result = u.to_unit(values)
print(result)  # [1000. 2000. 3000.] gram
```

### 更多使用场景

#### FEM 仿真

```python
from uniunit import unit, uniUnit, UnitSystem

# 常用 FEM 单位制: mm-kg-ms
fem = UnitSystem.get_preset('mmkgms')

# 转换仿真结果
pressure = fem.to_unit(1000 * unit.Pa)
# 0.001 kilogram / millimeter / millisecond ** 2

velocity = fem.to_unit(50 * unit.m / unit.s)
# 50.0 millimeter / millisecond

acceleration = fem.to_unit(9.8 * unit.m / unit.s**2)
# 9.8e-3 millimeter / millisecond ** 2
```

#### 自定义单位系统

```python
from uniunit import ureg, uniUnit

# 定义自定义单位
ureg.define('Long = 1000 * kilometer')  # 自定义长度
ureg.define('Flash = 1 * millisecond')   # 自定义时间

# 在转换中使用
u = uniUnit({'m': 'Long', 's': 'Flash'})
u.to_unit(9.8 * unit.m / unit.s**2)
# 9.8e-12 Long / Flash ** 2
```

#### 多物理场计算

```python
# 机械 + 热力学
u = uniUnit({'m': 'cm', 'kg': 'g', 's': 's', 'K': 'K'})

# 应力
stress = u.to_unit(100 * unit.Pa)  # 1000.0 gram / centimeter / second ** 2

# 热导率
k = u.to_unit(150 * unit.W / unit.m / unit.K)
# 15000000.0 gram * centimeter / second ** 3 / kelvin
```

### 辅助函数

```python
from uniunit import get_base_unit, get_unit_info, check_unit_compatibility

# 获取基本维度
get_base_unit(unit.Pa)
# {'[mass]': 1, '[length]': -1, '[time]': -2}

# 获取单位详细信息
get_unit_info(100 * unit.kg)
# {'magnitude': 100, 'units': 'kilogram', 'base_units': {'[mass]': 1}, ...}

# 检查兼容性
check_unit_compatibility(unit.kg, unit.g)   # True
check_unit_compatibility(unit.kg, unit.m)    # False
```

### 单位访问方式

```python
from uniunit import unit, ureg

# 方式1: unit 前缀 (推荐)
unit.kg, unit.m, unit.s, unit.J

# 方式2: ureg
ureg.kg, ureg.m, ureg.s

# 方式3: 字符串
unit('100 kg'), unit('50 m/s')
```
