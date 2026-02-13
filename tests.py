#!/usr/bin/env python
# -*- coding:utf-8
"""
Tests for uniunit package.

Run with: python tests.py
"""

import unittest
import math
from uniunit import (
    ureg,
    unit,
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
)


class TestBasicConversion(unittest.TestCase):
    """Test basic unit conversion."""
    
    def test_kg_to_g(self):
        """Convert 100 kg to grams."""
        conv_dict = {'kilogram': 'gram', 'meter': 'millimeter', 'second': 'second'}
        u = uniUnit(conv_dict)
        result = u.to_unit(100 * ureg.kg)
        self.assertAlmostEqual(result.magnitude, 100000.0, places=1)
    
    def test_joule_conversion(self):
        """Convert Joule to the unit system."""
        conv_dict = {'kilogram': 'gram', 'meter': 'millimeter', 'second': 'second'}
        u = uniUnit(conv_dict)
        result = u.to_unit(1 * ureg.J)
        self.assertAlmostEqual(result.magnitude, 1e9, places=1)
    
    def test_pressure_conversion(self):
        """Convert Pascal to the unit system."""
        conv_dict = {'kilogram': 'gram', 'meter': 'millimeter', 'second': 'second'}
        u = uniUnit(conv_dict)
        result = u.to_unit(1 * ureg.Pa)
        self.assertIn('gram', str(result.units))
    
    def test_list_conversion(self):
        """Convert list of quantities."""
        conv_dict = {'kilogram': 'gram', 'meter': 'millimeter', 'second': 'second'}
        u = uniUnit(conv_dict)
        result = u.to_unit([1 * ureg.kg, 2 * ureg.kg])
        self.assertEqual(len(result), 2)
        self.assertAlmostEqual(result[0].magnitude, 1000.0, places=1)
        self.assertAlmostEqual(result[1].magnitude, 2000.0, places=1)


class TestSIConversions(unittest.TestCase):
    """Test SI unit conversions."""
    
    def test_meter_conversion(self):
        """Test meter to different units."""
        u = uniUnit({'meter': 'centimeter'})
        result = u.to_unit(1 * ureg.m)
        self.assertAlmostEqual(result.magnitude, 100, places=1)
    
    def test_second_conversion(self):
        """Test second to millisecond."""
        u = uniUnit({'second': 'millisecond'})
        result = u.to_unit(1 * ureg.s)
        self.assertEqual(result.magnitude, 1000)
    
    def test_watt_conversion(self):
        """Test watt conversion."""
        u = uniUnit({'kilogram': 'gram', 'meter': 'centimeter', 'second': 'second'})
        result = u.to_unit(1 * ureg.W)
        self.assertIn('gram', str(result.units))
        self.assertAlmostEqual(result.magnitude, 1e7, places=1)


class TestCGSConversion(unittest.TestCase):
    """Test CGS (Centimeter-Gram-Second) conversions."""
    
    def test_kg_to_g_cgs(self):
        """Convert kilogram to gram (CGS)."""
        u = uniUnit({'kilogram': 'gram', 'meter': 'centimeter', 'second': 'second'})
        result = u.to_unit(1 * ureg.kg)
        self.assertAlmostEqual(result.magnitude, 1000, places=1)
    
    def test_m_to_cm_cgs(self):
        """Convert meter to centimeter."""
        u = uniUnit({'kilogram': 'gram', 'meter': 'centimeter', 'second': 'second'})
        result = u.to_unit(1 * ureg.m)
        self.assertAlmostEqual(result.magnitude, 100, places=1)
    
    def test_n_to_dyne(self):
        """Convert Newton to dyne."""
        u = uniUnit({'kilogram': 'gram', 'meter': 'centimeter', 'second': 'second'})
        result = u.to_unit(1 * ureg.N)
        self.assertAlmostEqual(result.magnitude, 1e5, places=1)
    
    def test_j_to_erg(self):
        """Convert Joule to erg."""
        u = uniUnit({'kilogram': 'gram', 'meter': 'centimeter', 'second': 'second'})
        result = u.to_unit(1 * ureg.J)
        self.assertAlmostEqual(result.magnitude, 1e7, places=1)


class TestImperialConversion(unittest.TestCase):
    """Test Imperial unit conversions."""
    
    def test_kg_to_pound(self):
        """Convert kilogram to pound."""
        u = uniUnit({'kilogram': 'pound', 'meter': 'inch', 'second': 'second'})
        result = u.to_unit(1 * ureg.kg)
        self.assertAlmostEqual(result.magnitude, 2.20462, places=2)
    
    def test_meter_to_inch(self):
        """Convert meter to inch."""
        u = uniUnit({'kilogram': 'pound', 'meter': 'inch', 'second': 'second'})
        result = u.to_unit(1 * ureg.m)
        self.assertAlmostEqual(result.magnitude, 39.3701, places=2)
    
    def test_second_to_minute(self):
        """Convert second to minute."""
        u = uniUnit({'kilogram': 'pound', 'meter': 'inch', 'second': 'minute'})
        result = u.to_unit(60 * ureg.s)
        self.assertAlmostEqual(result.magnitude, 1, places=2)
    
    def test_w_to_fps_power(self):
        """Convert watt to FPS (foot-pound-second) power units."""
        u = uniUnit({'kilogram': 'pound', 'meter': 'foot', 'second': 'second'})
        result = u.to_unit(1 * ureg.W)
        self.assertIn('pound', str(result.units))
        self.assertIn('foot', str(result.units))


class TestNanoscience(unittest.TestCase):
    """Test nano-science unit conversions."""
    
    def test_nano_science_pressure(self):
        """Convert Pa to nano-science units."""
        conv_dict = {'kilogram': 'microgram', 'meter': 'nanometer', 'second': 'picosecond'}
        u = uniUnit(conv_dict)
        result = u.to_unit(2e11 * ureg.Pa)
        self.assertAlmostEqual(result.magnitude, 2e-13, places=1)
    
    def test_nano_science_energy(self):
        """Convert J to nano-science units."""
        conv_dict = {'kilogram': 'microgram', 'meter': 'nanometer', 'second': 'picosecond'}
        u = uniUnit(conv_dict)
        result = u.to_unit(1 * ureg.J)
        self.assertIsNotNone(result)
        self.assertIn('microgram', str(result.units).lower() or 'nanometer' in str(result.units).lower())
    
    def test_atomic_scale(self):
        """Test atomic scale units (eV)."""
        conv_dict = {'kilogram': 'gram', 'meter': 'angstrom', 'second': 'femtosecond'}
        u = uniUnit(conv_dict)
        result = u.to_unit(1 * ureg.eV)
        self.assertGreater(result.magnitude, 0)


class TestUnitSystemPresets(unittest.TestCase):
    """Test UnitSystem preset functionality."""
    
    def test_si_preset(self):
        """Test SI preset."""
        si = UnitSystem.get_preset('SI')
        self.assertEqual(si.name, 'SI')
        result = si.to_unit(1 * ureg.kg)
        self.assertIn('kilogram', str(result.units))
    
    def test_cgs_preset(self):
        """Test CGS preset."""
        cgs = UnitSystem.get_preset('CGS')
        result = cgs.to_unit(1 * ureg.kg)
        self.assertIn('gram', str(result.units))
    
    def test_mks_preset(self):
        """Test MKS preset."""
        mks = UnitSystem.get_preset('MKS')
        result = mks.to_unit(1 * ureg.kg)
        self.assertIn('kilogram', str(result.units))
    
    def test_imperial_preset(self):
        """Test Imperial preset."""
        imp = UnitSystem.get_preset('Imperial')
        result = imp.to_unit(1 * ureg.kg)
        self.assertIn('pound', str(result.units))
    
    def test_mmkgms_preset(self):
        """Test mm-kg-ms preset."""
        mmkgms = UnitSystem.get_preset('mmkgms')
        result = mmkgms.to_unit(1 * ureg.m)
        self.assertIn('millimeter', str(result.units))
        result = mmkgms.to_unit(1 * ureg.s)
        self.assertIn('millisecond', str(result.units))
    
    def test_nm_ug_ps_preset(self):
        """Test nano-science preset."""
        nano = UnitSystem.get_preset('nm_ug_ps')
        result = nano.to_unit(1 * ureg.Pa)
        self.assertIn('microgram', str(result.units).lower() or 'nanometer' in str(result.units).lower())
    
    def test_fps_preset(self):
        """Test FPS (Foot-Pound-Second) preset."""
        fps = UnitSystem.get_preset('FPS')
        result = fps.to_unit(1 * ureg.kg)
        self.assertIn('pound', str(result.units))
    
    def test_british_preset(self):
        """Test British (inch-pound-minute) preset."""
        british = UnitSystem.get_preset('British')
        result = british.to_unit(1 * ureg.s)
        self.assertIn('minute', str(result.units))
    
    def test_list_presets(self):
        """Test listing all presets."""
        presets = UnitSystem.list_presets()
        expected = ['SI', 'MKS', 'CGS', 'mmkgms', 'mmgms', 'nm_ug_ps', 'Imperial', 'FPS', 'British']
        for p in expected:
            self.assertIn(p, presets)


class TestCustomUnitSystem(unittest.TestCase):
    """Test creating custom unit systems."""
    
    def test_custom_system(self):
        """Test creating a custom unit system."""
        custom = UnitSystem('Custom', {'kilogram': 'gram', 'meter': 'cm'})
        result = custom.to_unit(1 * ureg.kg)
        self.assertIn('gram', str(result.units))
    
    def test_custom_system_conversion(self):
        """Test conversion in custom system."""
        custom = UnitSystem('Test', {'kilogram': 'mg', 'meter': 'km', 'second': 'minute'})
        result = custom.to_unit(1 * ureg.kg / ureg.m**2)
        self.assertIsNotNone(result)


class TestHelperFunctions(unittest.TestCase):
    """Test helper functions."""
    
    def test_get_base_unit(self):
        """Test getting base units."""
        result = get_base_unit(ureg.Pa)
        self.assertIn('[mass]', result)
        self.assertIn('[length]', result)
        self.assertIn('[time]', result)
    
    def test_get_base_unit_with_value(self):
        """Test getting value and base units."""
        mag, base = get_base_unit_with_value(100 * ureg.kg)
        self.assertEqual(mag, 100)
        self.assertIn('[mass]', base)
    
    def test_get_unit_info(self):
        """Test getting unit info."""
        info = get_unit_info(100 * ureg.kg)
        self.assertIn('magnitude', info)
        self.assertIn('units', info)
        self.assertIn('base_units', info)
        self.assertIn('dimensionality', info)
        self.assertIn('is_dimensionless', info)
    
    def test_check_unit_compatibility_same(self):
        """Test unit compatibility - same units."""
        self.assertTrue(check_unit_compatibility(ureg.kg, ureg.g))
    
    def test_check_unit_compatibility_different_dimensions(self):
        """Test unit compatibility - different dimensions."""
        self.assertFalse(check_unit_compatibility(ureg.kg, ureg.m))
    
    def test_check_unit_compatibility_derived(self):
        """Test unit compatibility - derived units."""
        self.assertTrue(check_unit_compatibility(ureg.N, ureg.kg * ureg.m / ureg.s**2))
    
    def test_quick_convert_si_cgs(self):
        """Test quick convert SI to CGS."""
        result = quick_convert(1 * ureg.kg, 'SI', 'CGS')
        self.assertIn('gram', str(result.units))
        self.assertAlmostEqual(result.magnitude, 1000, places=1)
    
    def test_quick_convert_imperial(self):
        """Test quick convert to Imperial."""
        result = quick_convert(1 * ureg.kg, 'SI', 'Imperial')
        self.assertIn('pound', str(result.units))
    
    def test_quick_convert_preset_names(self):
        """Test quick convert with preset names."""
        result = quick_convert(1000 * ureg.g, 'CGS', 'SI')
        self.assertIn('kilogram', str(result.units))
        self.assertAlmostEqual(result.magnitude, 1, places=2)


class TestDerivedUnits(unittest.TestCase):
    """Test derived unit conversions."""
    
    def test_newton_conversion(self):
        """Test Newton conversion."""
        u = uniUnit({'kilogram': 'gram', 'meter': 'centimeter', 'second': 'second'})
        result = u.to_unit(1 * ureg.N)
        self.assertIn('gram', str(result.units))
        self.assertAlmostEqual(result.magnitude, 1e5, places=1)
    
    def test_pascal_conversion(self):
        """Test Pascal conversion."""
        u = uniUnit({'kilogram': 'gram', 'meter': 'centimeter', 'second': 'second'})
        result = u.to_unit(1 * ureg.Pa)
        self.assertIn('gram', str(result.units))
        self.assertAlmostEqual(result.magnitude, 10, places=1)
    
    def test_hertz_conversion(self):
        """Test Hertz conversion."""
        u = uniUnit({'second': 'millisecond'})
        result = u.to_unit(1 * ureg.Hz)
        self.assertIn('millisecond', str(result.units))
    
    def test_volt_conversion(self):
        """Test Volt conversion."""
        u = uniUnit({'kilogram': 'gram', 'meter': 'centimeter', 'second': 'second', 'ampere': 'milliampere'})
        result = u.to_unit(1 * ureg.V)
        self.assertIsNotNone(result)


class TestComplexConversions(unittest.TestCase):
    """Test complex conversions."""
    
    def test_density_conversion(self):
        """Test density unit conversion."""
        u = uniUnit({'kilogram': 'gram', 'meter': 'centimeter'})
        result = u.to_unit(1000 * ureg.kg / ureg.m**3)
        self.assertIn('gram', str(result.units))
    
    def test_velocity_conversion(self):
        """Test velocity conversion."""
        u = uniUnit({'meter': 'kilometer', 'second': 'hour'})
        result = u.to_unit(1 * ureg.m / ureg.s)
        self.assertAlmostEqual(result.magnitude, 3.6, places=1)
    
    def test_acceleration_conversion(self):
        """Test acceleration conversion."""
        u = uniUnit({'meter': 'centimeter', 'second': 'second'})
        result = u.to_unit(1 * ureg.m / ureg.s**2)
        self.assertAlmostEqual(result.magnitude, 100, places=1)
    
    def test_force_per_area(self):
        """Test force per area (pressure) conversion."""
        u = uniUnit({'kilogram': 'gram', 'meter': 'millimeter', 'second': 'second'})
        result = u.to_unit(1 * ureg.N / ureg.m**2)
        self.assertIsNotNone(result)


class TestListTupleConversion(unittest.TestCase):
    """Test list and tuple conversions."""
    
    def test_tuple_conversion(self):
        """Test tuple conversion."""
        u = uniUnit({'kilogram': 'gram'})
        result = u.to_unit((1 * ureg.kg, 2 * ureg.kg, 3 * ureg.kg))
        self.assertIsInstance(result, list)
        self.assertEqual(len(result), 3)
    
    def test_empty_list(self):
        """Test empty list conversion."""
        u = uniUnit({'kilogram': 'gram'})
        result = u.to_unit([])
        self.assertEqual(result, [])
    
    def test_mixed_values(self):
        """Test mixed value types."""
        u = uniUnit({'kilogram': 'gram'})
        result = u.to_unit([1 * ureg.kg, 2 * ureg.kg])
        self.assertEqual(len(result), 2)


class TestEdgeCases(unittest.TestCase):
    """Test edge cases."""
    
    def test_zero_value(self):
        """Test zero value conversion."""
        u = uniUnit({'kilogram': 'gram'})
        result = u.to_unit(0 * ureg.kg)
        self.assertEqual(result.magnitude, 0)
    
    def test_very_small_value(self):
        """Test very small value."""
        u = uniUnit({'kilogram': 'gram'})
        result = u.to_unit(1e-10 * ureg.kg)
        self.assertGreater(result.magnitude, 0)
    
    def test_very_large_value(self):
        """Test very large value."""
        u = uniUnit({'kilogram': 'gram'})
        result = u.to_unit(1e10 * ureg.kg)
        self.assertGreater(result.magnitude, 0)
    
    def test_dimensionless_value(self):
        """Test dimensionless conversion."""
        u = uniUnit({'kilogram': 'gram'})
        result = u.to_unit(1.0)
        self.assertEqual(result, 1.0)
    
    def test_integer_value(self):
        """Test integer value."""
        u = uniUnit({'kilogram': 'gram'})
        result = u.to_unit(1)
        self.assertEqual(result, 1)


class TestPintIntegration(unittest.TestCase):
    """Test Pint integration features."""
    
    def test_ureg_access(self):
        """Test accessing ureg."""
        self.assertIsNotNone(ureg)
    
    def test_quantity_creation(self):
        """Test creating quantities."""
        q = 100 * ureg.kg
        self.assertEqual(q.magnitude, 100)
        self.assertEqual(str(q.units), 'kilogram')
    
    def test_compound_units(self):
        """Test compound units."""
        q = 10 * ureg.m / ureg.s**2
        self.assertEqual(str(q.units), 'meter / second ** 2')
    
    def test_unit_arithmetic(self):
        """Test unit arithmetic."""
        v = 10 * ureg.m / ureg.s
        a = v / (1 * ureg.s)
        self.assertIn('meter', str(a.units))


class TestLightTimeUnits(unittest.TestCase):
    """Test light-time units (distance units based on light travel time)."""
    
    def test_light_second(self):
        """Test light second to meter."""
        u = uniUnit({'meter': 'meter'})
        result = u.to_unit(1 * ureg.light_second)
        self.assertAlmostEqual(result.magnitude, 299792458, places=0)
    
    def test_light_minute(self):
        """Test light minute to meter."""
        u = uniUnit({'meter': 'meter'})
        result = u.to_unit(1 * ureg.light_minute)
        self.assertAlmostEqual(result.magnitude, 17987547480, places=0)
    
    def test_light_hour(self):
        """Test light hour to meter."""
        u = uniUnit({'meter': 'kilometer'})
        result = u.to_unit(1 * ureg.light_hour)
        self.assertAlmostEqual(result.magnitude, 1079252848.8, places=0)
    
    def test_light_day(self):
        """Test light day to meter."""
        u = uniUnit({'meter': 'kilometer'})
        result = u.to_unit(1 * ureg.light_day)
        self.assertAlmostEqual(result.magnitude, 25902068371.2, places=0)
    
    def test_meter_to_light_second(self):
        """Test meter to light second."""
        u = uniUnit({'meter': 'light_second'})
        result = u.to_unit(299792458 * ureg.m)
        self.assertAlmostEqual(result.magnitude, 1.0, places=5)


class TestChineseUnits(unittest.TestCase):
    """Test Chinese unit support."""
    
    def test_meter_chinese(self):
        """Test 米 (meter)."""
        u = uniUnit({'meter': '米'})
        result = u.to_unit(1 * ureg.km)
        self.assertAlmostEqual(result.magnitude, 1000, places=1)
    
    def test_kilometer_chinese(self):
        """Test 千米 (kilometer)."""
        u = uniUnit({'meter': '千米'})
        result = u.to_unit(1000 * ureg.m)
        self.assertAlmostEqual(result.magnitude, 1, places=1)
    
    def test_centimeter_chinese(self):
        """Test 厘米 (centimeter)."""
        u = uniUnit({'meter': '厘米'})
        result = u.to_unit(1 * ureg.m)
        self.assertAlmostEqual(result.magnitude, 100, places=1)
    
    def test_kilogram_chinese(self):
        """Test 千克 (kilogram)."""
        u = uniUnit({'kilogram': '千克'})
        result = u.to_unit(1 * ureg.g)
        self.assertAlmostEqual(result.magnitude, 0.001, places=3)
    
    def test_gram_chinese(self):
        """Test 克 (gram)."""
        u = uniUnit({'kilogram': '克'})
        result = u.to_unit(1 * ureg.kg)
        self.assertAlmostEqual(result.magnitude, 1000, places=1)
    
    def test_second_chinese(self):
        """Test 秒 (second)."""
        u = uniUnit({'second': '秒'})
        result = u.to_unit(1 * ureg.minute)
        self.assertAlmostEqual(result.magnitude, 60, places=1)
    
    def test_minute_chinese(self):
        """Test 分钟 (minute)."""
        u = uniUnit({'second': '分钟'})
        result = u.to_unit(1 * ureg.hour)
        self.assertAlmostEqual(result.magnitude, 60, places=1)
    
    def test_hour_chinese(self):
        """Test 时 (hour)."""
        u = uniUnit({'second': '时'})
        result = u.to_unit(1 * ureg.day)
        self.assertAlmostEqual(result.magnitude, 24, places=1)
    
    def test_watt_chinese(self):
        """Test 瓦 (watt)."""
        u = uniUnit({'kilogram': '千克', 'meter': '米', 'second': '秒'})
        result = u.to_unit(1 * ureg.kW)
        self.assertAlmostEqual(result.magnitude, 1000, places=1)
    
    def test_joule_chinese(self):
        """Test 焦 (joule)."""
        u = uniUnit({'kilogram': '千克', 'meter': '米', 'second': '秒'})
        result = u.to_unit(1 * ureg.kJ)
        self.assertAlmostEqual(result.magnitude, 1000, places=1)
    
    def test_pascal_chinese(self):
        """Test 帕 (pascal)."""
        u = uniUnit({'kilogram': '千克', 'meter': '米', 'second': '秒'})
        result = u.to_unit(1 * ureg.kPa)
        self.assertAlmostEqual(result.magnitude, 1000, places=1)
    
    def test_volt_chinese(self):
        """Test 伏 (volt)."""
        u = uniUnit({'kilogram': '千克', 'meter': '米', 'second': '秒', 'ampere': '安'})
        result = u.to_unit(1 * ureg.kV)
        self.assertAlmostEqual(result.magnitude, 1000, places=1)
    
    def test_mixed_chinese_conversion(self):
        """Test mixed Chinese units conversion."""
        u = uniUnit({'meter': '米', 'kilogram': '千克', 'second': '秒'})
        result = u.to_unit(1 * ureg.km / ureg.s)
        self.assertIsNotNone(result)


class TestUncommonUnitSystems(unittest.TestCase):
    """Test uncommon unit systems."""
    
    def test_astronomical_units(self):
        """Test astronomical units."""
        u = uniUnit({'meter': 'light_year'})
        result = u.to_unit(1 * ureg.m)
        self.assertGreater(result.magnitude, 0)
    
    def test_atomic_units(self):
        """Test atomic mass units - using amu."""
        u = uniUnit({'kilogram': 'amu'})
        result = u.to_unit(1 * ureg.kg)
        self.assertIsNotNone(result)
    
    def test_planck_units(self):
        """Test Planck length/mass/time."""
        u = uniUnit({'meter': 'planck_length', 'kilogram': 'planck_mass', 'second': 'planck_time'})
        result = u.to_unit(1 * ureg.m)
        self.assertIn('planck', str(result.units).lower())
    
    def test_femtometer_units(self):
        """Test femtometer units."""
        u = uniUnit({'meter': 'femtometer'})
        result = u.to_unit(1 * ureg.m)
        self.assertAlmostEqual(result.magnitude, 1e15, places=0)
    
    def test_micrometer_units(self):
        """Test micrometer units."""
        u = uniUnit({'meter': 'micrometer'})
        result = u.to_unit(1 * ureg.m)
        self.assertAlmostEqual(result.magnitude, 1e6, places=1)
    
    def test_megagram_units(self):
        """Test megagram (tonne) units."""
        u = uniUnit({'kilogram': 'megagram'})
        result = u.to_unit(1000 * ureg.kg)
        self.assertAlmostEqual(result.magnitude, 1, places=1)
    
    def test_kilometer_units(self):
        """Test kilometer units."""
        u = uniUnit({'meter': 'kilometer'})
        result = u.to_unit(1000 * ureg.m)
        self.assertAlmostEqual(result.magnitude, 1, places=1)
    
    def test_megahertz_units(self):
        """Test megahertz units."""
        u = uniUnit({'second': 'megasecond'})
        result = u.to_unit(1e6 * ureg.s)
        self.assertAlmostEqual(result.magnitude, 1, places=1)
    
    def test_gram_force(self):
        """Test gram-force."""
        u = uniUnit({'kilogram': 'gram', 'meter': 'centimeter', 'second': 'second'})
        result = u.to_unit(1 * ureg.g * ureg.gravity)
        self.assertIsNotNone(result)
    
    def test_dyne_units(self):
        """Test dyne (CGS force unit)."""
        u = uniUnit({'kilogram': 'gram', 'meter': 'centimeter', 'second': 'second'})
        result = u.to_unit(1 * ureg.dyn)
        self.assertIsNotNone(result)
    
    def test_bar_units(self):
        """Test bar pressure."""
        u = uniUnit({'kilogram': 'gram', 'meter': 'centimeter', 'second': 'second'})
        result = u.to_unit(1 * ureg.bar)
        self.assertIsNotNone(result)
    
    def test_atmosphere_units(self):
        """Test atmosphere pressure."""
        u = uniUnit({'kilogram': 'gram', 'meter': 'centimeter', 'second': 'second'})
        result = u.to_unit(1 * ureg.atm)
        self.assertIsNotNone(result)
    
    def test_torr_units(self):
        """Test torr (mmHg) pressure."""
        u = uniUnit({'kilogram': 'gram', 'meter': 'centimeter', 'second': 'second'})
        result = u.to_unit(1 * ureg.torr)
        self.assertIsNotNone(result)
    
    def test_psi_units(self):
        """Test PSI pressure."""
        u = uniUnit({'kilogram': 'pound', 'meter': 'inch', 'second': 'second'})
        result = u.to_unit(1 * ureg.psi)
        self.assertIsNotNone(result)
    
    def test_calorie_units(self):
        """Test calorie energy."""
        u = uniUnit({'kilogram': 'gram', 'meter': 'centimeter', 'second': 'second'})
        result = u.to_unit(1 * ureg.calorie)
        self.assertIsNotNone(result)
    
    def test_electronvolt_units(self):
        """Test electronvolt energy."""
        u = uniUnit({'kilogram': 'gram', 'meter': 'centimeter', 'second': 'second'})
        result = u.to_unit(1 * ureg.eV)
        self.assertIsNotNone(result)
    
    def test_watthour_units(self):
        """Test watt-hour energy."""
        u = uniUnit({'kilogram': 'gram', 'meter': 'centimeter', 'second': 'second'})
        result = u.to_unit(1 * ureg.Wh)
        self.assertIsNotNone(result)
    
    def test_knot_velocity(self):
        """Test knot velocity."""
        u = uniUnit({'meter': 'nautical_mile', 'second': 'hour'})
        result = u.to_unit(1 * ureg.m / ureg.s)
        self.assertIsNotNone(result)
    
    def test_mph_velocity(self):
        """Test mph velocity."""
        u = uniUnit({'meter': 'mile', 'second': 'hour'})
        result = u.to_unit(1 * ureg.m / ureg.s)
        self.assertIsNotNone(result)
    
    def test_acre_area(self):
        """Test acre area."""
        u = uniUnit({'meter': 'foot'})
        result = u.to_unit(1 * ureg.acre)
        self.assertIsNotNone(result)
    
    def test_hectare_area(self):
        """Test hectare area."""
        u = uniUnit({'meter': 'meter'})
        result = u.to_unit(1 * ureg.hectare)
        self.assertIsNotNone(result)
    
    def test_liter_volume(self):
        """Test liter volume."""
        u = uniUnit({'meter': 'centimeter'})
        result = u.to_unit(1 * ureg.liter)
        self.assertIsNotNone(result)
    
    def test_gallon_volume(self):
        """Test gallon volume."""
        u = uniUnit({'kilogram': 'gram', 'meter': 'centimeter', 'second': 'second'})
        result = u.to_unit(1 * ureg.gallon)
        self.assertIsNotNone(result)


class TestUncommonConversions(unittest.TestCase):
    """Test uncommon unit conversions with verification."""
    
    def test_light_year_to_au(self):
        """Test light year to astronomical unit."""
        u = uniUnit({'meter': 'astronomical_unit'})
        result = u.to_unit(1 * ureg.light_year)
        self.assertAlmostEqual(result.magnitude, 63241.1, places=1)
    
    def test_parsec_to_au(self):
        """Test parsec to astronomical unit."""
        u = uniUnit({'meter': 'astronomical_unit'})
        result = u.to_unit(1 * ureg.parsec)
        self.assertAlmostEqual(result.magnitude, 206264.8, places=1)
    
    def test_amu_to_kg(self):
        """Test amu (atomic mass unit) to kg."""
        u = uniUnit({'kilogram': 'kilogram'})
        result = u.to_unit(1 * ureg.amu)
        self.assertAlmostEqual(result.magnitude, 1.6605e-27, places=10)
    
    def test_fermi_to_meter(self):
        """Test fermi (femtometer) to meter."""
        u = uniUnit({'meter': 'meter'})
        result = u.to_unit(1 * ureg.fermi)
        self.assertAlmostEqual(result.magnitude, 1e-15, places=1)
    
    def test_angstrom_to_nm(self):
        """Test angstrom to nanometer."""
        u = uniUnit({'meter': 'nanometer'})
        result = u.to_unit(1 * ureg.angstrom)
        self.assertAlmostEqual(result.magnitude, 0.1, places=1)
    
    def test_psi_to_pascal(self):
        """Test psi to pascal."""
        u = uniUnit({'kilogram': 'kilogram', 'meter': 'meter', 'second': 'second'})
        result = u.to_unit(1 * ureg.psi)
        self.assertAlmostEqual(result.magnitude, 6894.76, places=1)
    
    def test_bar_to_pascal(self):
        """Test bar to pascal."""
        u = uniUnit({'kilogram': 'kilogram', 'meter': 'meter', 'second': 'second'})
        result = u.to_unit(1 * ureg.bar)
        self.assertAlmostEqual(result.magnitude, 1e5, places=1)
    
    def test_knot_to_ms(self):
        """Test knot to m/s."""
        u = uniUnit({'meter': 'meter', 'second': 'second'})
        result = u.to_unit(1 * ureg.knot)
        self.assertAlmostEqual(result.magnitude, 0.5144, places=3)
    
    def test_mph_to_ms(self):
        """Test mph to m/s."""
        u = uniUnit({'meter': 'meter', 'second': 'second'})
        result = u.to_unit(1 * ureg.mph)
        self.assertAlmostEqual(result.magnitude, 0.4470, places=3)
    
    def test_revolution_to_hz(self):
        """Test revolution to hertz."""
        u = uniUnit({'second': 'second'})
        result = u.to_unit(1 * ureg.revolution)
        self.assertAlmostEqual(result.magnitude, 6.283185307179586, places=1)
    
    def test_dozen_to_single(self):
        """Test dozen conversion."""
        u = uniUnit({'dimensionless': 'dozen'})
        result = u.to_unit(12)
        self.assertEqual(result, 12)


class TestStability(unittest.TestCase):
    """Test conversion stability - ensure results are consistent."""
    
    def test_repeated_conversion(self):
        """Test that repeated conversions give same result."""
        u = uniUnit({'kilogram': 'gram', 'meter': 'centimeter', 'second': 'second'})
        result1 = u.to_unit(1 * ureg.kg)
        result2 = u.to_unit(1 * ureg.kg)
        result3 = u.to_unit(1 * ureg.kg)
        self.assertEqual(result1.magnitude, result2.magnitude)
        self.assertEqual(result2.magnitude, result3.magnitude)
    
    def test_round_trip_conversion(self):
        """Test round trip conversion."""
        u = uniUnit({'kilogram': 'gram'})
        original = 100 * ureg.kg
        converted = u.to_unit(original)
        back = converted.to(ureg.kg)
        self.assertAlmostEqual(back.magnitude, original.magnitude, places=1)
    
    def test_chain_conversion(self):
        """Test multiple conversions in sequence."""
        u1 = uniUnit({'kilogram': 'gram'})
        u2 = uniUnit({'kilogram': 'milligram'})
        
        result = u1.to_unit(1 * ureg.kg)
        result = u2.to_unit(result)
        self.assertAlmostEqual(result.magnitude, 1e6, places=1)
    
    def test_large_value_stability(self):
        """Test large values."""
        u = uniUnit({'kilogram': 'gram'})
        result = u.to_unit(1e15 * ureg.kg)
        self.assertGreater(result.magnitude, 0)
    
    def test_small_value_stability(self):
        """Test small values."""
        u = uniUnit({'kilogram': 'gram'})
        result = u.to_unit(1e-15 * ureg.kg)
        self.assertGreater(result.magnitude, 0)
    
    def test_negative_value(self):
        """Test negative values."""
        u = uniUnit({'kilogram': 'gram'})
        result = u.to_unit(-100 * ureg.kg)
        self.assertEqual(result.magnitude, -100000)


def run_tests():
    unittest.main(verbosity=2)


if __name__ == '__main__':
    run_tests()
