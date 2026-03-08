if (window.lucide) lucide.createIcons();
if (typeof math !== 'undefined') {
  try { math.createUnit('T', '1000 kg', { override: true }); } catch (e) { }
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

initTheme();

const UNIT_KB = [
  // Length
  { s: 'm', f: 'meter', n: 'Meter (米)', c: 'Length', d: 'Base SI unit. ~3.28 ft.' },
  { s: 'km', f: 'kilometer', n: 'Kilometer (千米)', c: 'Length', d: '1,000 meters.' },
  { s: 'cm', f: 'centimeter', n: 'Centimeter (厘米)', c: 'Length', d: 'Metric unit (0.01m).' },
  { s: 'mm', f: 'millimeter', n: 'Millimeter (毫米)', c: 'Length', d: 'Metric unit (0.001m).' },
  { s: 'um', f: 'micrometer', n: 'Micrometer (微米)', c: 'Length', d: 'Micro-scale unit.' },
  { s: 'nm', f: 'nanometer', n: 'Nanometer (纳米)', c: 'Length', d: 'Atomic scale unit.' },
  { s: 'in', f: 'inch', n: 'Inch (英寸)', c: 'Length', d: '25.4 mm exactly.' },
  { s: 'ft', f: 'foot', n: 'Foot (英尺)', c: 'Length', d: '12 inches. ~0.3048m.' },
  { s: 'yd', f: 'yard', n: 'Yard (码)', c: 'Length', d: '3 feet. ~0.9144m.' },
  { s: 'mi', f: 'mile', n: 'Mile (英里)', c: 'Length', d: '5,280 feet. ~1.609 km.' },
  { s: 'nautical_mile', f: 'nautical_mile', n: 'Naut. Mile (海里)', c: 'Length', d: '1,852 meters exactly.' },
  { s: 'ly', f: 'lightyear', n: 'Light Year (光年)', c: 'Length', d: 'Astro-scale distance.' },
  { s: 'au', f: 'astronomical_unit', n: 'AU (天文单位)', c: 'Length', d: 'Sun-Earth distance.' },
  { s: 'pc', f: 'parsec', n: 'Parsec (秒差距)', c: 'Length', d: '3.26 light years.' },
  { s: 'angstrom', f: 'angstrom', n: 'Angstrom (埃)', c: 'Length', d: '10^-10 meters.' },

  // Mass
  { s: 'kg', f: 'kilogram', n: 'Kilogram (千克)', c: 'Mass', d: 'Core SI mass unit.' },
  { s: 'g', f: 'gram', n: 'Gram (克)', c: 'Mass', d: '1/1,000 of a kilogram.' },
  { s: 'mg', f: 'milligram', n: 'Milligram (毫克)', c: 'Mass', d: '10^-6 kg.' },
  { s: 'ug', f: 'microgram', n: 'Microgram (微克)', c: 'Mass', d: '10^-9 kg.' },
  { s: 'T', f: 'tonne', n: 'Tonne (公吨)', c: 'Mass', d: '1,000 kg (Metric Ton).' },
  { s: 'ton', f: 'ton', n: 'Ton (短吨)', c: 'Mass', d: 'Short/US ton (~907 kg).' },
  { s: 'long_ton', f: 'long_ton', n: 'Long Ton (长吨)', c: 'Mass', d: 'UK ton (~1016 kg).' },
  { s: 'lb', f: 'pound', n: 'Pound (磅)', c: 'Mass', d: 'Imperial mass (~0.4536 kg).' },
  { s: 'oz', f: 'ounce', n: 'Ounce (盎司)', c: 'Mass', d: '1/16th of a pound.' },
  { s: 'stone', f: 'stone', n: 'Stone (石)', c: 'Mass', d: '14 pounds.' },

  // Time
  { s: 's', f: 'second', n: 'Second (秒)', c: 'Time', d: 'The universal base interval.' },
  { s: 'ms', f: 'millisecond', n: 'Millisecond (毫秒)', c: 'Time', d: '0.001 seconds.' },
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
  { s: 'atm', f: 'atmosphere', n: 'Atm (标准大气压)', c: 'Pressure', d: 'Earth surface standard.' },
  { s: 'psi', f: 'psi', n: 'PSI', c: 'Pressure', d: 'Pounds per square inch.' },
  { s: 'torr', f: 'torr', n: 'Torr', c: 'Pressure', d: '1/760 of an atomosphere.' },
  { s: 'mmHg', f: 'mmHg', n: 'mmHg', c: 'Pressure', d: 'Millimeters of Mercury.' },

  // Force / Energy / Power
  { s: 'N', f: 'newton', n: 'Newton (牛顿)', c: 'Force', d: '1kg * 1m/s².' },
  { s: 'kN', f: 'kilonewton', n: 'kN (千牛)', c: 'Force', d: '1,000 Newtons.' },
  { s: 'lbf', f: 'pound_force', n: 'Lbf (磅力)', c: 'Force', d: 'Imperial force unit.' },
  { s: 'dyn', f: 'dyne', n: 'Dyne (达因)', c: 'Force', d: 'CGS unit of force (10^-5 N).' },
  { s: 'J', f: 'joule', n: 'Joule (焦耳)', c: 'Energy', d: 'Work done by 1N over 1m.' },
  { s: 'kJ', f: 'kilojoule', n: 'kJ (千焦)', c: 'Energy', d: '1,000 Joules.' },
  { s: 'cal', f: 'calorie', n: 'Calorie (卡)', c: 'Energy', d: 'Heat energy (4.184 J).' },
  { s: 'kcal', f: 'kilocalorie', n: 'Kcal (大卡)', c: 'Energy', d: 'Food metabolic energy.' },
  { s: 'Wh', f: 'watt_hour', n: 'Wh (瓦时)', c: 'Energy', d: 'Electrical energy unit.' },
  { s: 'kWh', f: 'kilowatt_hour', n: 'kWh (度)', c: 'Energy', d: '3.6*10^6 Joules.' },
  { s: 'eV', f: 'electronvolt', n: 'eV (电子伏特)', c: 'Energy', d: 'Atomic scale energy.' },
  { s: 'erg', f: 'erg', n: 'Erg (尔格)', c: 'Energy', d: 'CGS unit (10^-7 J).' },
  { s: 'W', f: 'watt', n: 'Watt (瓦特)', c: 'Power', d: '1 Joule per second.' },
  { s: 'kW', f: 'kilowatt', n: 'kW (千瓦)', c: 'Power', d: '1,000 Watts.' },
  { s: 'hp', f: 'horsepower', n: 'HP (马力)', c: 'Power', d: 'Mechanical output (~746W).' },

  // Frequency / Temp / Velocity
  { s: 'Hz', f: 'hertz', n: 'Hertz (赫兹)', c: 'Frequency', d: 'Cycles per second.' },
  { s: 'rad/s', f: 'rad/s', n: 'rad/s (弧度/秒)', c: 'Freq', d: 'Angular frequency.' },
  { s: 'm/s', f: 'm/s', n: 'm/s (米/秒)', c: 'Speed', d: 'Primary SI speed.' },
  { s: 'km/h', f: 'km/h', n: 'km/hour', c: 'Speed', d: 'Navigational speed.' },
  { s: 'mph', f: 'mph', n: 'mph', c: 'Speed', d: 'Imperial speed unit.' },
  { s: 'degC', f: 'celsius', n: 'Celsius (摄氏度)', c: 'Temp', d: 'Relative scale.' },
  { s: 'degF', f: 'fahrenheit', n: 'Fahrenheit (华氏度)', c: 'Temp', d: 'Traditional scale.' },
  { s: 'K', f: 'kelvin', n: 'Kelvin', c: 'Temp', d: 'Absolute thermal unit.' },

  // Area / Volume
  { s: 'ha', f: 'hectare', n: 'Hectare (公顷)', c: 'Area', d: '10,000 m².' },
  { s: 'acre', f: 'acre', n: 'Acre (英亩)', c: 'Area', d: 'Imperial area unit.' },
  { s: 'l', f: 'liter', n: 'Liter (升)', c: 'Volume', d: 'Metric unit (0.001 m³).' },
  { s: 'ml', f: 'milliliter', n: 'Milliliter (毫升)', c: 'Volume', d: '0.001 Liters.' },
  { s: 'gal', f: 'gallon', n: 'Gallon (加仑)', c: 'Volume', d: 'US Liquid (~3.785 L).' },
  { s: 'qt', f: 'quart', n: 'Quart (夸脱)', c: 'Volume', d: '1/4th of a gallon.' },

  // Angle
  { s: 'rad', f: 'radian', n: 'Radian (弧度)', c: 'Angle', d: 'SI base angle unit.' },
  { s: 'deg', f: 'degree', n: 'Degree (度)', c: 'Angle', d: 'Planar angle unit.' },
  { s: 'arcmin', f: 'arcminute', n: 'Arcminute', c: 'Angle', d: '1/60th of a degree.' },
  { s: 'arcsec', f: 'arcsecond', n: 'Arcsecond', c: 'Angle', d: '1/60th of an arcmin.' }
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
