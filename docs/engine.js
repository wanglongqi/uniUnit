if (window.lucide) lucide.createIcons();
if (typeof math !== 'undefined') {
  try {
    // Mass units
    math.createUnit('T', '1000 kg', { override: true });
    math.createUnit('ton', '907.185 kg', { override: true });
    math.createUnit('long_ton', '1016.05 kg', { override: true });
    math.createUnit('stone', '6.35029 kg', { override: true });
    math.createUnit('oz', '28.3495 g', { override: true });
    math.createUnit('jin', '0.5 kg', { override: true });
    math.createUnit('liang', '0.05 kg', { override: true });
    math.createUnit('ct', '0.0002 kg', { override: true });
    math.createUnit('gr', '0.00006479891 kg', { override: true });
    math.createUnit('dwt', '0.00155517 kg', { override: true });
    math.createUnit('ozt', '0.0311035 kg', { override: true });
    
    // Length units
    math.createUnit('nautical_mile', '1852 m', { override: true });
    math.createUnit('ly', '9.46073e15 m', { override: true });
    math.createUnit('au', '1.49598e11 m', { override: true });
    math.createUnit('pc', '3.08568e16 m', { override: true });
    math.createUnit('angstrom', '1e-10 m', { override: true });
    math.createUnit('um', '1e-6 m', { override: true });
    math.createUnit('fm', '1e-15 m', { override: true });
    math.createUnit('AU', '1.49598e11 m', { override: true });
    math.createUnit('ly', '9.46073e15 m', { override: true });
    math.createUnit('fermi', '1e-15 m', { override: true });
    math.createUnit('mil', '0.0000254 m', { override: true });
    math.createUnit('inch', '0.0254 m', { override: true });
    math.createUnit('in', '0.0254 m', { override: true });
    math.createUnit('foot', '0.3048 m', { override: true });
    math.createUnit('yard', '0.9144 m', { override: true });
    math.createUnit('mile', '1609.34 m', { override: true });
    math.createUnit('mi', '1609.34 m', { override: true });
    math.createUnit('fathom', '1.8288 m', { override: true });
    math.createUnit('cable', '185.318 m', { override: true });
    
    // Temperature units
    math.createUnit('degC', '1 degC', { override: true });
    math.createUnit('degF', '1 degF', { override: true });
    math.createUnit('celsius', '1 degC', { override: true });
    math.createUnit('fahrenheit', '1 degF', { override: true });
    math.createUnit('kelvin', '1 K', { override: true });
    math.createUnit('rankine', '0.555556 K', { override: true });
    math.createUnit('degR', '0.555556 K', { override: true });
    
    // Pressure units
    math.createUnit('psi', '6894.76 Pa', { override: true });
    math.createUnit('torr', '133.322 Pa', { override: true });
    math.createUnit('mmHg', '133.322 Pa', { override: true });
    math.createUnit('bar', '100000 Pa', { override: true });
    math.createUnit('mbar', '100 Pa', { override: true });
    math.createUnit('atm', '101325 Pa', { override: true });
    math.createUnit('at', '98066.5 Pa', { override: true });
    math.createUnit('mmH2O', '9.80665 Pa', { override: true });
    math.createUnit('inHg', '3386.39 Pa', { override: true });
    math.createUnit('inH2O', '249.089 Pa', { override: true });
    
    // Force units
    math.createUnit('lbf', '4.44822 N', { override: true });
    math.createUnit('dyn', '1e-5 N', { override: true });
    math.createUnit('kgf', '9.80665 N', { override: true });
    math.createUnit('kp', '9.80665 N', { override: true });
    math.createUnit('poundal', '0.138255 N', { override: true });
    math.createUnit('pdl', '0.138255 N', { override: true });
    
    // Energy units
    math.createUnit('kcal', '4184 J', { override: true });
    math.createUnit('eV', '1.60218e-19 J', { override: true });
    math.createUnit('erg', '1e-7 J', { override: true });
    math.createUnit('Wh', '3600 J', { override: true });
    math.createUnit('kWh', '3.6e6 J', { override: true });
    math.createUnit('BTU', '1055.06 J', { override: true });
    math.createUnit('btu', '1055.06 J', { override: true });
    math.createUnit('cal', '4.184 J', { override: true });
    math.createUnit('Cal', '4184 J', { override: true });
    math.createUnit('therm', '105505000 J', { override: true });
    math.createUnit('thm', '105505000 J', { override: true });
    math.createUnit('Eh', '4.3597e-18 J', { override: true });
    
    // Power units
    math.createUnit('hp', '745.7 W', { override: true });
    math.createUnit('hpE', '746 W', { override: true });
    math.createUnit('hpM', '745.7 W', { override: true });
    math.createUnit('BTU/h', '0.293071 W', { override: true });
    math.createUnit('btu/h', '0.293071 W', { override: true });
    math.createUnit('ft·lbf/s', '1.35582 W', { override: true });
    
    // Speed/Frequency units
    math.createUnit('rad/s', '1 rad/s', { override: true });
    math.createUnit('km/h', '0.277778 m/s', { override: true });
    math.createUnit('mph', '0.44704 m/s', { override: true });
    math.createUnit('knot', '0.514444 m/s', { override: true });
    math.createUnit('kn', '0.514444 m/s', { override: true });
    math.createUnit('kt', '0.514444 m/s', { override: true });
    math.createUnit('fps', '0.3048 m/s', { override: true });
    math.createUnit('fpm', '0.00508 m/s', { override: true });
    math.createUnit('c', '299792458 m/s', { override: true });
    
    // Area units
    math.createUnit('ha', '10000 m^2', { override: true });
    math.createUnit('acre', '4046.86 m^2', { override: true });
    math.createUnit('a', '100 m^2', { override: true });
    math.createUnit('barn', '1e-28 m^2', { override: true });
    
    // Volume units
    math.createUnit('ml', '1e-6 m^3', { override: true });
    math.createUnit('gal', '0.00378541 m^3', { override: true });
    math.createUnit('qt', '0.000946353 m^3', { override: true });
    math.createUnit('pt', '0.000473176 m^3', { override: true });
    math.createUnit('fl oz', '2.9574e-5 m^3', { override: true });
    math.createUnit('floz', '2.9574e-5 m^3', { override: true });
    math.createUnit('cup', '0.000236588 m^3', { override: true });
    math.createUnit('tbsp', '1.4787e-5 m^3', { override: true });
    math.createUnit('tsp', '4.9289e-6 m^3', { override: true });
    math.createUnit('bbl', '0.158987 m^3', { override: true });
    math.createUnit('oil_barrel', '0.158987 m^3', { override: true });
    math.createUnit('galUK', '0.00454609 m^3', { override: true });
    math.createUnit('gi', '0.000118294 m^3', { override: true });
    math.createUnit('fl minim', '5.9167e-8 m^3', { override: true });
    
    // Angle units
    math.createUnit('arcmin', '0.0166667 deg', { override: true });
    math.createUnit('arcsec', '0.000277778 deg', { override: true });
    math.createUnit('grad', '0.9 deg', { override: true });
    math.createUnit('gon', '0.9 deg', { override: true });
    math.createUnit('mil', '0.05625 deg', { override: true });
    math.createUnit('turn', '360 deg', { override: true });
    math.createUnit('rev', '360 deg', { override: true });
    math.createUnit('rpm', '6 deg/s', { override: true });
    
    // Time units
    math.createUnit('ms', '0.001 s', { override: true });
    math.createUnit('us', '1e-6 s', { override: true });
    math.createUnit('ns', '1e-9 s', { override: true });
    math.createUnit('ps', '1e-12 s', { override: true });
    math.createUnit('fs', '1e-15 s', { override: true });
    math.createUnit('minute', '60 s', { override: true });
    math.createUnit('hour', '3600 s', { override: true });
    math.createUnit('day', '86400 s', { override: true });
    math.createUnit('week', '604800 s', { override: true });
    math.createUnit('year', '31557600 s', { override: true });
    math.createUnit('shake', '1e-8 s', { override: true });
    math.createUnit('svedberg', '1e-13 s', { override: true });
    
    // Electric/Magnetic units
    math.createUnit('A', '1 A', { override: true });
    math.createUnit('mA', '0.001 A', { override: true });
    math.createUnit('kA', '1000 A', { override: true });
    math.createUnit('V', '1 V', { override: true });
    math.createUnit('mV', '0.001 V', { override: true });
    math.createUnit('kV', '1000 V', { override: true });
    math.createUnit('ohm', '1 ohm', { override: true });
    math.createUnit('S', '1 S', { override: true });
    math.createUnit('F', '1 F', { override: true });
    math.createUnit('pF', '1e-12 F', { override: true });
    math.createUnit('nF', '1e-9 F', { override: true });
    math.createUnit('uF', '1e-6 F', { override: true });
    math.createUnit('H', '1 H', { override: true });
    math.createUnit('mH', '0.001 H', { override: true });
    math.createUnit('uH', '1e-6 H', { override: true });
    math.createUnit('T', '1 T', { override: true });
    math.createUnit('G', '1e-4 T', { override: true });
    math.createUnit('mT', '0.001 T', { override: true });
    math.createUnit('Wb', '1 Wb', { override: true });
    math.createUnit('Mx', '1e-8 Wb', { override: true });
    
    // Data units
    math.createUnit('B', '8 bit', { override: true });
    math.createUnit('bit', '1 bit', { override: true });
    math.createUnit('byte', '8 bit', { override: true });
    math.createUnit('KB', '1000 byte', { override: true });
    math.createUnit('MB', '1e6 byte', { override: true });
    math.createUnit('GB', '1e9 byte', { override: true });
    math.createUnit('TB', '1e12 byte', { override: true });
    math.createUnit('KiB', '1024 byte', { override: true });
    math.createUnit('MiB', '1048576 byte', { override: true });
    math.createUnit('GiB', '1073741824 byte', { override: true });
    
  } catch (e) { console.warn('Unit creation failed:', e); }
}

function initTheme() {
  const saved = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(saved);
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const icon = document.getElementById('themeIcon');
  const label = document.getElementById('themeLabel');
  const mobileIcon = document.getElementById('mobileThemeIcon');
  const mobileLabel = document.getElementById('mobileThemeLabel');
  if (theme === 'dark') {
    icon.setAttribute('data-lucide', 'sun');
    label.textContent = 'Light Appearance';
    if (mobileIcon) mobileIcon.setAttribute('data-lucide', 'sun');
    if (mobileLabel) mobileLabel.textContent = 'Light';
  } else {
    icon.setAttribute('data-lucide', 'moon');
    label.textContent = 'Dark Appearance';
    if (mobileIcon) mobileIcon.setAttribute('data-lucide', 'moon');
    if (mobileLabel) mobileLabel.textContent = 'Dark';
  }
  if (window.lucide) lucide.createIcons();
}

window.toggleTheme = () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
};

window.swapUnits = () => {
  const fromInput = document.getElementById('simpleFrom');
  const toInput = document.getElementById('simpleTo');
  const temp = fromInput.value;
  fromInput.value = toInput.value;
  toInput.value = temp;
};

initTheme();

const UNIT_KB = [
  // Length
  { s: 'm', f: 'meter', n: 'Meter (米)', c: 'Length', d: 'Base SI unit. ~3.28 ft.' },
  { s: 'km', f: 'kilometer', n: 'Kilometer (千米)', c: 'Length', d: '1,000 meters.' },
  { s: 'cm', f: 'centimeter', n: 'Centimeter (厘米)', c: 'Length', d: 'Metric unit (0.01m).' },
  { s: 'mm', f: 'millimeter', n: 'Millimeter (毫米)', c: 'Length', d: 'Metric unit (0.001m).' },
  { s: 'um', f: 'micrometer', n: 'Micrometer (微米)', c: 'Length', d: 'Micro-scale unit.' },
  { s: 'nm', f: 'nanometer', n: 'Nanometer (纳米)', c: 'Length', d: 'Atomic scale unit.' },
  { s: 'pm', f: 'picometer', n: 'Picometer (皮米)', c: 'Length', d: '10^-12 meters.' },
  { s: 'fm', f: 'femtometer', n: 'Femtometer (飞米)', c: 'Length', d: '10^-15 meters.' },
  { s: 'in', f: 'inch', n: 'Inch (英寸)', c: 'Length', d: '25.4 mm exactly.' },
  { s: 'ft', f: 'foot', n: 'Foot (英尺)', c: 'Length', d: '12 inches. ~0.3048m.' },
  { s: 'yd', f: 'yard', n: 'Yard (码)', c: 'Length', d: '3 feet. ~0.9144m.' },
  { s: 'mi', f: 'mile', n: 'Mile (英里)', c: 'Length', d: '5,280 feet. ~1.609 km.' },
  { s: 'nautical_mile', f: 'nautical_mile', n: 'Naut. Mile (海里)', c: 'Length', d: '1,852 meters exactly.' },
  { s: 'ly', f: 'lightyear', n: 'Light Year (光年)', c: 'Length', d: 'Astro-scale distance.' },
  { s: 'au', f: 'astronomical_unit', n: 'AU (天文单位)', c: 'Length', d: 'Sun-Earth distance.' },
  { s: 'pc', f: 'parsec', n: 'Parsec (秒差距)', c: 'Length', d: '3.26 light years.' },
  { s: 'angstrom', f: 'angstrom', n: 'Angstrom (埃)', c: 'Length', d: '10^-10 meters.' },
  { s: 'fermi', f: 'femtometer', n: 'Fermi (费米)', c: 'Length', d: '10^-15 meters.' },
  { s: 'mil', f: 'mil', n: 'Mil (密耳)', c: 'Length', d: '0.001 inches.' },
  { s: 'cable', f: 'cable', n: 'Cable (链)', c: 'Length', d: '185.318 meters.' },
  { s: 'fathom', f: 'fathom', n: 'Fathom (英寻)', c: 'Length', d: '1.8288 meters.' },

  // Mass
  { s: 'kg', f: 'kilogram', n: 'Kilogram (千克)', c: 'Mass', d: 'Core SI mass unit.' },
  { s: 'g', f: 'gram', n: 'Gram (克)', c: 'Mass', d: '1/1,000 of a kilogram.' },
  { s: 'mg', f: 'milligram', n: 'Milligram (毫克)', c: 'Mass', d: '10^-6 kg.' },
  { s: 'ug', f: 'microgram', n: 'Microgram (微克)', c: 'Mass', d: '10^-9 kg.' },
  { s: 'ng', f: 'nanogram', n: 'Nanogram (纳克)', c: 'Mass', d: '10^-12 kg.' },
  { s: 'T', f: 'tonne', n: 'Tonne (公吨)', c: 'Mass', d: '1,000 kg (Metric Ton).' },
  { s: 'ton', f: 'ton', n: 'Ton (短吨)', c: 'Mass', d: 'Short/US ton (~907 kg).' },
  { s: 'long_ton', f: 'long_ton', n: 'Long Ton (长吨)', c: 'Mass', d: 'UK ton (~1016 kg).' },
  { s: 'lb', f: 'pound', n: 'Pound (磅)', c: 'Mass', d: 'Imperial mass (~0.4536 kg).' },
  { s: 'oz', f: 'ounce', n: 'Ounce (盎司)', c: 'Mass', d: '1/16th of a pound.' },
  { s: 'stone', f: 'stone', n: 'Stone (石)', c: 'Mass', d: '14 pounds.' },
  { s: 'jin', f: 'jin', n: 'Jin (斤)', c: 'Mass', d: 'Chinese unit (0.5 kg).' },
  { s: 'liang', f: 'liang', n: 'Liang (两)', c: 'Mass', d: 'Chinese unit (50 g).' },
  { s: 'ct', f: 'carat', n: 'Carat (克拉)', c: 'Mass', d: '0.2 grams.' },
  { s: 'gr', f: 'grain', n: 'Grain (格令)', c: 'Mass', d: '64.8 mg.' },
  { s: 'dwt', f: 'pennyweight', n: 'Pennyweight (本尼威特)', c: 'Mass', d: '1.555 g.' },
  { s: 'ozt', f: 'troy_ounce', n: 'Troy Ounce (金衡盎司)', c: 'Mass', d: '31.1035 g.' },

  // Time
  { s: 's', f: 'second', n: 'Second (秒)', c: 'Time', d: 'The universal base interval.' },
  { s: 'ms', f: 'millisecond', n: 'Millisecond (毫秒)', c: 'Time', d: '0.001 seconds.' },
  { s: 'us', f: 'microsecond', n: 'Microsecond (微秒)', c: 'Time', d: '10^-6 seconds.' },
  { s: 'ns', f: 'nanosecond', n: 'Nanosecond (纳秒)', c: 'Time', d: '10^-9 seconds.' },
  { s: 'min', f: 'minute', n: 'Minute (分钟)', c: 'Time', d: '60 seconds.' },
  { s: 'h', f: 'hour', n: 'Hour (小时)', c: 'Time', d: '3,600 seconds.' },
  { s: 'day', f: 'day', n: 'Day (天)', c: 'Time', d: '24 hours.' },
  { s: 'week', f: 'week', n: 'Week (周)', c: 'Time', d: '7 calendar days.' },
  { s: 'yr', f: 'year', n: 'Year (年)', c: 'Time', d: '365.25 standard days.' },

  // Pressure
  { s: 'Pa', f: 'pascal', n: 'Pascal (帕)', c: 'Pressure', d: 'SI unit. Force of 1N/m².' },
  { s: 'kPa', f: 'kilopascal', n: 'kPa (千帕)', c: 'Pressure', d: '1,000 Pascals.' },
  { s: 'MPa', f: 'megapascal', n: 'MPa (兆帕)', c: 'Pressure', d: '10^6 Pascals.' },
  { s: 'GPa', f: 'gigapascal', n: 'GPa (吉帕)', c: 'Pressure', d: '10^9 Pascals.' },
  { s: 'bar', f: 'bar', n: 'Bar (巴)', c: 'Pressure', d: '100,000 Pa (~1 atm).' },
  { s: 'mbar', f: 'millibar', n: 'Millibar (毫巴)', c: 'Pressure', d: '100 Pa.' },
  { s: 'atm', f: 'atmosphere', n: 'Atm (标准大气压)', c: 'Pressure', d: 'Earth surface standard.' },
  { s: 'psi', f: 'psi', n: 'PSI', c: 'Pressure', d: 'Pounds per square inch.' },
  { s: 'torr', f: 'torr', n: 'Torr', c: 'Pressure', d: '1/760 of an atomosphere.' },
  { s: 'mmHg', f: 'mmHg', n: 'mmHg', c: 'Pressure', d: 'Millimeters of Mercury.' },
  { s: 'inHg', f: 'inHg', n: 'Inch of Mercury', c: 'Pressure', d: 'Inches of Mercury.' },
  { s: 'inH2O', f: 'inH2O', n: 'Inch of Water', c: 'Pressure', d: 'Inches of Water.' },

  // Force / Energy / Power
  { s: 'N', f: 'newton', n: 'Newton (牛顿)', c: 'Force', d: '1kg * 1m/s².' },
  { s: 'kN', f: 'kilonewton', n: 'kN (千牛)', c: 'Force', d: '1,000 Newtons.' },
  { s: 'MN', f: 'meganewton', n: 'MN (兆牛)', c: 'Force', d: '10^6 Newtons.' },
  { s: 'lbf', f: 'pound_force', n: 'Lbf (磅力)', c: 'Force', d: 'Imperial force unit.' },
  { s: 'dyn', f: 'dyne', n: 'Dyne (达因)', c: 'Force', d: 'CGS unit of force (10^-5 N).' },
  { s: 'kgf', f: 'kilogram_force', n: 'kgf (千克力)', c: 'Force', d: '9.80665 N.' },
  { s: 'pdl', f: 'poundal', n: 'Poundal (磅达)', c: 'Force', d: '0.138255 N.' },
  { s: 'J', f: 'joule', n: 'Joule (焦耳)', c: 'Energy', d: 'Work done by 1N over 1m.' },
  { s: 'kJ', f: 'kilojoule', n: 'kJ (千焦)', c: 'Energy', d: '1,000 Joules.' },
  { s: 'MJ', f: 'megajoule', n: 'MJ (兆焦)', c: 'Energy', d: '10^6 Joules.' },
  { s: 'cal', f: 'calorie', n: 'Calorie (卡)', c: 'Energy', d: 'Heat energy (4.184 J).' },
  { s: 'kcal', f: 'kilocalorie', n: 'Kcal (大卡)', c: 'Energy', d: 'Food metabolic energy.' },
  { s: 'Wh', f: 'watt_hour', n: 'Wh (瓦时)', c: 'Energy', d: 'Electrical energy unit.' },
  { s: 'kWh', f: 'kilowatt_hour', n: 'kWh (度)', c: 'Energy', d: '3.6*10^6 Joules.' },
  { s: 'eV', f: 'electronvolt', n: 'eV (电子伏特)', c: 'Energy', d: 'Atomic scale energy.' },
  { s: 'erg', f: 'erg', n: 'Erg (尔格)', c: 'Energy', d: 'CGS unit (10^-7 J).' },
  { s: 'BTU', f: 'BTU', n: 'BTU', c: 'Energy', d: 'British Thermal Unit.' },
  { s: 'therm', f: 'therm', n: 'Therm (撒姆)', c: 'Energy', d: '100,000 BTU.' },
  { s: 'W', f: 'watt', n: 'Watt (瓦特)', c: 'Power', d: '1 Joule per second.' },
  { s: 'kW', f: 'kilowatt', n: 'kW (千瓦)', c: 'Power', d: '1,000 Watts.' },
  { s: 'MW', f: 'megawatt', n: 'MW (兆瓦)', c: 'Power', d: '10^6 Watts.' },
  { s: 'hp', f: 'horsepower', n: 'HP (马力)', c: 'Power', d: 'Mechanical output (~746W).' },

  // Frequency / Temp / Velocity
  { s: 'Hz', f: 'hertz', n: 'Hertz (赫兹)', c: 'Frequency', d: 'Cycles per second.' },
  { s: 'kHz', f: 'kilohertz', n: 'kHz (千赫)', c: 'Frequency', d: '1,000 Hz.' },
  { s: 'MHz', f: 'megahertz', n: 'MHz (兆赫)', c: 'Frequency', d: '10^6 Hz.' },
  { s: 'GHz', f: 'gigahertz', n: 'GHz (吉赫)', c: 'Frequency', d: '10^9 Hz.' },
  { s: 'rad/s', f: 'rad/s', n: 'rad/s (弧度/秒)', c: 'Freq', d: 'Angular frequency.' },
  { s: 'rpm', f: 'rpm', n: 'RPM (转/分)', c: 'Frequency', d: 'Revolutions per minute.' },
  { s: 'm/s', f: 'm/s', n: 'm/s (米/秒)', c: 'Speed', d: 'Primary SI speed.' },
  { s: 'km/h', f: 'km/h', n: 'km/hour', c: 'Speed', d: 'Navigational speed.' },
  { s: 'mph', f: 'mph', n: 'mph', c: 'Speed', d: 'Imperial speed unit.' },
  { s: 'knot', f: 'knot', n: 'Knot (节)', c: 'Speed', d: 'Nautical mile per hour.' },
  { s: 'ft/s', f: 'ft/s', n: 'ft/s', c: 'Speed', d: 'Feet per second.' },
  { s: 'c', f: 'c', n: 'c (光速)', c: 'Speed', d: 'Speed of light.' },
  { s: 'degC', f: 'celsius', n: 'Celsius (摄氏度)', c: 'Temp', d: 'Relative scale.' },
  { s: 'degF', f: 'fahrenheit', n: 'Fahrenheit (华氏度)', c: 'Temp', d: 'Traditional scale.' },
  { s: 'K', f: 'kelvin', n: 'Kelvin', c: 'Temp', d: 'Absolute thermal unit.' },
  { s: 'degR', f: 'rankine', n: 'Rankine (兰金)', c: 'Temp', d: 'Absolute Fahrenheit.' },

  // Area / Volume
  { s: 'm2', f: 'square_meter', n: 'Square Meter (平方米)', c: 'Area', d: 'SI area unit.' },
  { s: 'km2', f: 'square_kilometer', n: 'Square Kilometer', c: 'Area', d: '10^6 m².' },
  { s: 'cm2', f: 'square_centimeter', n: 'Square Centimeter', c: 'Area', d: '10^-4 m².' },
  { s: 'mm2', f: 'square_millimeter', n: 'Square Millimeter', c: 'Area', d: '10^-6 m².' },
  { s: 'ha', f: 'hectare', n: 'Hectare (公顷)', c: 'Area', d: '10,000 m².' },
  { s: 'acre', f: 'acre', n: 'Acre (英亩)', c: 'Area', d: 'Imperial area unit.' },
  { s: 'ft2', f: 'square_foot', n: 'Square Foot', c: 'Area', d: '0.0929 m².' },
  { s: 'in2', f: 'square_inch', n: 'Square Inch', c: 'Area', d: '0.000645 m².' },
  { s: 'm3', f: 'cubic_meter', n: 'Cubic Meter (立方米)', c: 'Volume', d: 'SI volume unit.' },
  { s: 'l', f: 'liter', n: 'Liter (升)', c: 'Volume', d: 'Metric unit (0.001 m³).' },
  { s: 'ml', f: 'milliliter', n: 'Milliliter (毫升)', c: 'Volume', d: '0.001 Liters.' },
  { s: 'dl', f: 'deciliter', n: 'Deciliter (分升)', c: 'Volume', d: '0.1 Liters.' },
  { s: 'cl', f: 'centiliter', n: 'Centiliter (厘升)', c: 'Volume', d: '0.01 Liters.' },
  { s: 'gal', f: 'gallon', n: 'Gallon (加仑)', c: 'Volume', d: 'US Liquid (~3.785 L).' },
  { s: 'galUK', f: 'gallon_UK', n: 'UK Gallon', c: 'Volume', d: 'Imperial gallon (~4.546 L).' },
  { s: 'qt', f: 'quart', n: 'Quart (夸脱)', c: 'Volume', d: '1/4th of a gallon.' },
  { s: 'pt', f: 'pint', n: 'Pint (品脱)', c: 'Volume', d: '1/2 quart.' },
  { s: 'cup', f: 'cup', n: 'Cup (杯)', c: 'Volume', d: '~237 mL.' },
  { s: 'fl oz', f: 'fluid_ounce', n: 'Fluid Ounce (液量盎司)', c: 'Volume', d: '~29.57 mL.' },
  { s: 'tbsp', f: 'tablespoon', n: 'Tablespoon (汤匙)', c: 'Volume', d: '~14.79 mL.' },
  { s: 'tsp', f: 'teaspoon', n: 'Teaspoon (茶匙)', c: 'Volume', d: '~4.93 mL.' },
  { s: 'bbl', f: 'barrel', n: 'Barrel (桶)', c: 'Volume', d: 'Oil barrel (~159 L).' },

  // Angle
  { s: 'rad', f: 'radian', n: 'Radian (弧度)', c: 'Angle', d: 'SI base angle unit.' },
  { s: 'deg', f: 'degree', n: 'Degree (度)', c: 'Angle', d: 'Planar angle unit.' },
  { s: 'arcmin', f: 'arcminute', n: 'Arcminute', c: 'Angle', d: '1/60th of a degree.' },
  { s: 'arcsec', f: 'arcsecond', n: 'Arcsecond', c: 'Angle', d: '1/60th of an arcmin.' },
  { s: 'grad', f: 'gradian', n: 'Gradian (百分度)', c: 'Angle', d: '1/100th of a right angle.' },
  { s: 'turn', f: 'turn', n: 'Turn (转)', c: 'Angle', d: '360 degrees.' },

  // Electric / Magnetic
  { s: 'A', f: 'ampere', n: 'Ampere (安培)', c: 'Current', d: 'SI base current.' },
  { s: 'mA', f: 'milliampere', n: 'Milliampere (毫安)', c: 'Current', d: '0.001 A.' },
  { s: 'uA', f: 'microampere', n: 'Microampere (微安)', c: 'Current', d: '10^-6 A.' },
  { s: 'V', f: 'volt', n: 'Volt (伏特)', c: 'Voltage', d: 'SI voltage unit.' },
  { s: 'mV', f: 'millivolt', n: 'Millivolt (毫伏)', c: 'Voltage', d: '0.001 V.' },
  { s: 'kV', f: 'kilovolt', n: 'Kilovolt (千伏)', c: 'Voltage', d: '1000 V.' },
  { s: 'ohm', f: 'ohm', n: 'Ohm (欧姆)', c: 'Resistance', d: 'SI resistance unit.' },
  { s: 'kohm', f: 'kilohm', n: 'Kilohm (千欧)', c: 'Resistance', d: '1000 ohm.' },
  { s: 'F', f: 'farad', n: 'Farad (法拉)', c: 'Capacitance', d: 'SI capacitance unit.' },
  { s: 'uF', f: 'microfarad', n: 'Microfarad (微法)', c: 'Capacitance', d: '10^-6 F.' },
  { s: 'H', f: 'henry', n: 'Henry (亨利)', c: 'Inductance', d: 'SI inductance unit.' },
  { s: 'T', f: 'tesla', n: 'Tesla (特斯拉)', c: 'Magnetic', d: 'Magnetic flux density.' },
  { s: 'G', f: 'gauss', n: 'Gauss (高斯)', c: 'Magnetic', d: '10^-4 Tesla.' },
  { s: 'Wb', f: 'weber', n: 'Weber (韦伯)', c: 'Magnetic', d: 'Magnetic flux.' },

  // Data
  { s: 'bit', f: 'bit', n: 'Bit (比特)', c: 'Data', d: 'Base data unit.' },
  { s: 'B', f: 'byte', n: 'Byte (字节)', c: 'Data', d: '8 bits.' },
  { s: 'KB', f: 'kilobyte', n: 'Kilobyte (千字节)', c: 'Data', d: '1000 bytes.' },
  { s: 'MB', f: 'megabyte', n: 'Megabyte (兆字节)', c: 'Data', d: '10^6 bytes.' },
  { s: 'GB', f: 'gigabyte', n: 'Gigabyte (吉字节)', c: 'Data', d: '10^9 bytes.' },
  { s: 'TB', f: 'terabyte', n: 'Terabyte (太字节)', c: 'Data', d: '10^12 bytes.' },
  { s: 'KiB', f: 'kibibyte', n: 'Kibibyte', c: 'Data', d: '1024 bytes.' },
  { s: 'MiB', f: 'mebibyte', n: 'Mebibyte', c: 'Data', d: '2^20 bytes.' },
  { s: 'GiB', f: 'gibibyte', n: 'Gibibyte', c: 'Data', d: '2^30 bytes.' },
];

function showTab(id, btn) {
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
  if (window.lucide) lucide.createIcons();
}

function setupAuto(inputId, listId) {
  const input = document.getElementById(inputId);
  const list = document.getElementById(listId);
  input.addEventListener('input', () => {
    const val = input.value;
    const parts = val.split(/[\s*\/^]+/);
    const last = parts[parts.length - 1].toLowerCase().trim();

    if (!last || last.length < 1) { list.style.display = 'none'; return; }
    const hits = UNIT_KB.filter(u =>
      u.s.toLowerCase().includes(last) ||
      u.n.toLowerCase().includes(last) ||
      u.f.toLowerCase().includes(last)
    ).slice(0, 10);
    if (!hits.length) { list.style.display = 'none'; return; }
    list.innerHTML = hits.map(u => `
      <div class="suggestion-item" onclick="pick('${inputId}', '${u.s}')">
        <div class="item-top">
          <span class="item-code">${u.s}</span>
          <span class="item-tag">${u.c}</span>
        </div>
        <div class="item-full">${u.n}</div>
        <div class="item-desc">${u.d}</div>
      </div>
    `).join('');
    list.style.display = 'block';
  });
  input.addEventListener('blur', () => setTimeout(() => list.style.display = 'none', 300));
}

function renderTex(container, tex) {
  try {
    if (!window.katex) { container.textContent = tex; return; }
    // Professional academic formatting: ensure words are mathrm and fractions are large
    const finalTex = `\\displaystyle{${tex.replace(/\\text\{/g, '\\mathrm{')}}`;
    katex.render(finalTex, container, { throwOnError: false });
  } catch (e) {
    container.textContent = tex;
  }
}

window.pick = (id, val) => {
  const input = document.getElementById(id);
  const current = input.value;
  // Replace the last word
  const lastWordMatch = current.match(/([a-zA-Z]+)$/);
  if (lastWordMatch) {
    input.value = current.substring(0, lastWordMatch.index) + val;
  } else {
    input.value = val;
  }
  document.querySelectorAll('.suggestions').forEach(l => l.style.display = 'none');
  input.focus();
};

function showError(container, title, message) {
  const now = new Date().toLocaleTimeString();
  container.innerHTML = `
    <div class="result-header">
      <span>${title}</span>
      <span style="opacity: 0.5;">${now}</span>
    </div>
    <div class="result-error">
      <div class="result-error-msg">
        <i data-lucide="alert-circle"></i>
        <span>${message}</span>
      </div>
    </div>`;
  container.classList.add('show');
  if (window.lucide) lucide.createIcons();
}

['simpleFrom', 'simpleTo', 'systemValue', 'presetValue'].forEach(id => {
  const el = document.getElementById(id);
  const listId = 'auto' + id.charAt(0).toUpperCase() + id.slice(1);
  if (el && document.getElementById(listId)) setupAuto(id, listId);
});

function simpleConvert() {
  const val = parseFloat(document.getElementById('simpleValue').value);
  const from = document.getElementById('simpleFrom').value;
  const to = document.getElementById('simpleTo').value;
  const res = document.getElementById('simpleResult');
  const now = new Date().toLocaleTimeString();
  try {
    const q1 = math.unit(val, from);
    const q2 = q1.to(to);
    const unitInfo = UNIT_KB.find(uk => uk.s === to) || { n: to, d: 'Browser Native Unit' };
    res.innerHTML = `
      <div class="result-header">
        <span>Browser Calculation</span>
        <span style="opacity:0.5;">${now}</span>
      </div>
      <div class="result-body">
        <div class="result-text">
          <span id="simpleFromTex"></span>
          <span class="arrow">→</span>
          <span id="simpleToTex"></span>
        </div>
        <div class="result-hint">
          <i data-lucide="info"></i>
          <span>Description: <b>${unitInfo.n}</b> — ${unitInfo.d}</span>
        </div>
      </div>`;
    renderTex(document.getElementById('simpleFromTex'), math.parse(q1.toString()).toTex());
    renderTex(document.getElementById('simpleToTex'), math.parse(q2.toString()).toTex());
    res.classList.add('show');
    if (window.lucide) lucide.createIcons();
  } catch (e) { showError(res, 'Browser Failure', e.message); }
}

class UniUnitSystem {
  constructor(unitsDict) { this.unitsDict = this.normalizeDict(unitsDict); }

  normalizeDict(dict) {
    const aliases = { 'kilogram': 'kg', 'gram': 'g', 'meter': 'm', 'millimeter': 'mm', 'centimeter': 'cm', 'kilometer': 'km', 'second': 's', 'millisecond': 'ms', 'minute': 'min', 'hour': 'h', 'pound': 'lb', 'inch': 'in', 'foot': 'ft' };
    const result = {};
    for (let [k, v] of Object.entries(dict)) {
      const nk = (aliases[k.toLowerCase()] || k).toLowerCase();
      const nv = (aliases[v.toLowerCase()] || v).toLowerCase();
      result[nk] = nv;
    }
    return result;
  }

  convert(input) {
    const match = input.trim().match(/^([\d.+-]+(?:[eE][+-]?\d+)?)\s+(.+)$/);
    if (!match) throw new Error('Invalid format. Use: "100 N"');
    const value = parseFloat(match[1]);
    const unitStr = match[2].trim();

    let unit;
    try {
      unit = math.unit(value, unitStr);
    } catch (e) {
      throw new Error(`Unknown unit: ${unitStr}`);
    }

    const dims = unit.dimensions;
    const dimNames = ['mass', 'length', 'time', 'current', 'temperature', 'amount', 'luminous', 'angle', 'solid_angle'];
    const dimMap = {};
    for (let i = 0; i < dims.length; i++) { if (dims[i] !== 0) dimMap[dimNames[i]] = dims[i]; }

    const targetUnits = {
      mass: this.unitsDict['kg'] || 'kg',
      length: this.unitsDict['m'] || 'm',
      time: this.unitsDict['s'] || 's',
      current: this.unitsDict['a'] || 'A',
      temperature: this.unitsDict['k'] || 'K',
      amount: this.unitsDict['mol'] || 'mol',
      luminous: this.unitsDict['cd'] || 'cd'
    };

    const numerators = [], denominators = [];
    for (let [dim, exp] of Object.entries(dimMap)) {
      const tu = targetUnits[dim];
      if (!tu) continue;
      if (exp === 1) numerators.push(tu);
      else if (exp === -1) denominators.push(tu);
      else if (exp > 0) numerators.push(`${tu}^${exp}`);
      else denominators.push(`${tu}^${-exp}`);
    }
    let targetUnitStr = numerators.join('*');
    if (denominators.length > 0) targetUnitStr += '/' + denominators.join('*');

    const siUnits = { mass: 'kg', length: 'm', time: 's', current: 'A', temperature: 'K', amount: 'mol', luminous: 'cd' };
    const unitToSi = {
      kg: 1, g: 0.001, mg: 1e-6, ug: 1e-9, lb: 0.45359237, oz: 0.028349523,
      m: 1, mm: 0.001, cm: 0.01, km: 1000, um: 1e-6, nm: 1e-9, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344,
      s: 1, ms: 0.001, us: 1e-6, ns: 1e-9, ps: 1e-12, min: 60, h: 3600, d: 86400,
      A: 1, mA: 0.001, kA: 1000, K: 1, mol: 1, mmol: 0.001, kmol: 1000, cd: 1
    };

    let valueInSiBase = value;
    try {
      const siUnit = unit.toSI();
      valueInSiBase = siUnit.value;
    } catch (e) {
      const inputUnitLower = unitStr.toLowerCase();
      if (unitToSi[inputUnitLower] !== undefined) {
        const inputUnitBaseSiValue = unitToSi[inputUnitLower];
        let simpleFactor = 1;
        for (let [dim, exp] of Object.entries(dimMap)) {
          simpleFactor *= Math.pow(inputUnitBaseSiValue, exp);
        }
        valueInSiBase = value * simpleFactor;
      }
    }

    let factor = 1;
    for (let [dim, exp] of Object.entries(dimMap)) {
      const siUnit = siUnits[dim];
      const targetUnit = targetUnits[dim];
      if (!siUnit || !targetUnit) continue;
      const siFactor = 1;
      const targetFactor = unitToSi[targetUnit] || 1;
      const dimFactor = siFactor / targetFactor;
      factor *= Math.pow(dimFactor, exp);
    }

    const resultValue = valueInSiBase * factor;
    const finalUnit = math.unit(resultValue, targetUnitStr);
    return {
      value: resultValue,
      unit: targetUnitStr,
      magnitude: resultValue,
      units: targetUnitStr,
      toTex: () => math.parse(finalUnit.toString()).toTex(),
      toString: () => `${resultValue} ${targetUnitStr}`
    };
  }
}

function systemConvert() {
  const v = document.getElementById('systemValue').value;
  const u = document.getElementById('systemUnits').value;
  const res = document.getElementById('systemResult');
  const now = new Date().toLocaleTimeString();
  try {
    const converter = new UniUnitSystem(JSON.parse(u));
    const result = converter.convert(v);
    res.innerHTML = `
      <div class="result-header">
        <span>Foundation Projection</span>
        <span style="opacity:0.5;">${now}</span>
      </div>
      <div class="result-body">
        <div class="result-text" id="systemResTex"></div>
        <div class="result-hint">
          <i data-lucide="compass"></i>
          <span>Local Engine Projection: <b>${Object.values(JSON.parse(u)).join('-')}</b></span>
        </div>
      </div>`;
    renderTex(document.getElementById('systemResTex'), result.toTex());
    res.classList.add('show');
    if (window.lucide) lucide.createIcons();
  } catch (e) { showError(res, 'Projection Mapping Error', e.message); }
}

function presetConvert() {
  const v = document.getElementById('presetValue').value;
  const to = document.getElementById('presetTo').value;
  const res = document.getElementById('presetResult');
  const now = new Date().toLocaleTimeString();
  try {
    const presets = { SI: { kg: 'kg', m: 'm', s: 's' }, CGS: { kg: 'g', m: 'cm', s: 's' }, mmkgms: { kg: 'kg', m: 'mm', s: 'ms' }, Imperial: { kg: 'lb', m: 'in', s: 's' } };
    const converter = new UniUnitSystem(presets[to] || presets.SI);
    const result = converter.convert(v);
    res.innerHTML = `
      <div class="result-header">
        <span>System Swap</span>
        <span style="opacity:0.5;">${now}</span>
      </div>
      <div class="result-body">
        <div class="result-text" id="presetResTex"></div>
        <div class="result-hint">
          <i data-lucide="layers"></i>
          <span>Framework: <b>${to}</b> System</span>
        </div>
      </div>`;
    renderTex(document.getElementById('presetResTex'), result.toTex());
    res.classList.add('show');
    if (window.lucide) lucide.createIcons();
  } catch (e) { showError(res, 'Framework System Error', e.message); }
}
