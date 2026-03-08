lucide.createIcons();

function initTheme() {
  const saved = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(saved);
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const icon = document.getElementById('themeIcon');
  const label = document.getElementById('themeLabel');
  if (theme === 'dark') {
    icon.setAttribute('data-lucide', 'sun');
    label.textContent = 'Light Appearance';
  } else {
    icon.setAttribute('data-lucide', 'moon');
    label.textContent = 'Dark Appearance';
  }
  lucide.createIcons();
}

window.toggleTheme = () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
};

initTheme();

const UNIT_KB = [
  { s: 'm', f: 'meter', n: 'Meter (米)', c: 'Length', d: 'Base SI unit. ~3.28 ft.' },
  { s: 'km', f: 'kilometer', n: 'Kilometer (千米)', c: 'Length', d: '1,000 meters.' },
  { s: 'cm', f: 'centimeter', n: 'Centimeter (厘米)', c: 'Length', d: 'Metric unit (0.01m).' },
  { s: 'mm', f: 'millimeter', n: 'Millimeter (毫米)', c: 'Length', d: 'Metric unit (0.001m).' },
  { s: 'in', f: 'inch', n: 'Inch (英寸)', c: 'Length', d: '25.4 mm exactly.' },
  { s: 'ft', f: 'foot', n: 'Foot (英尺)', c: 'Length', d: '12 inches. ~0.3048m.' },
  { s: 'kg', f: 'kilogram', n: 'Kilogram (千克)', c: 'Mass', d: 'Core SI mass unit.' },
  { s: 'g', f: 'gram', n: 'Gram (克)', c: 'Mass', d: '1/1,000 of a kilogram.' },
  { s: 'lb', f: 'pound', n: 'Pound (磅)', c: 'Mass', d: 'Imperial mass (~0.4536 kg).' },
  { s: 's', f: 'second', n: 'Second (秒)', c: 'Time', d: 'The universal base interval.' },
  { s: 'min', f: 'minute', n: 'Minute (分钟)', c: 'Time', d: '60 seconds.' },
  { s: 'h', f: 'hour', n: 'Hour (小时)', c: 'Time', d: '3,600 seconds.' },
  { s: 'Pa', f: 'pascal', n: 'Pascal (帕)', c: 'Pressure', d: 'SI unit. Force of 1N/m².' },
  { s: 'N', f: 'newton', n: 'Newton (牛顿)', c: 'Force', d: '1kg * 1m/s².' },
  { s: 'J', f: 'joule', n: 'Joule (焦耳)', c: 'Energy', d: 'Work done by 1N over 1m.' },
  { s: 'W', f: 'watt', n: 'Watt (瓦特)', c: 'Power', d: '1 Joule per second.' },
  { s: 'Hz', f: 'hertz', n: 'Hertz (赫兹)', c: 'Frequency', d: 'Cycles per second.' },
  { s: 'm/s', f: 'm/s', n: 'm/s (米/秒)', c: 'Speed', d: 'Primary SI speed.' }
];

function showTab(id, btn) {
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
  lucide.createIcons();
}

function setupAuto(inputId, listId) {
  const input = document.getElementById(inputId);
  const list = document.getElementById(listId);
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    if (!q) { list.style.display = 'none'; return; }
    const hits = UNIT_KB.filter(u =>
      u.s.toLowerCase().includes(q) ||
      u.n.toLowerCase().includes(q) ||
      u.f.toLowerCase().includes(q)
    ).slice(0, 8);
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

window.pick = (id, val) => {
  document.getElementById(id).value = val;
  document.querySelectorAll('.suggestions').forEach(l => l.style.display = 'none');
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
  lucide.createIcons();
}

['simpleFrom', 'simpleTo'].forEach(id => setupAuto(id, 'auto' + id.charAt(0).toUpperCase() + id.slice(1)));

function simpleConvert() {
  const val = parseFloat(document.getElementById('simpleValue').value);
  const from = document.getElementById('simpleFrom').value;
  const to = document.getElementById('simpleTo').value;
  const res = document.getElementById('simpleResult');
  const now = new Date().toLocaleTimeString();
  try {
    const converted = math.unit(val, from).to(to);
    const unitInfo = UNIT_KB.find(uk => uk.s === to) || { n: to, d: 'Browser Native Unit' };
    res.innerHTML = `
      <div class="result-header">
        <span>Browser Calculation</span>
        <span style="opacity:0.5;">${now}</span>
      </div>
      <div class="result-body">
        <div class="result-text">
          <span class="val">${val}</span> <span class="unit">${from}</span>
          <span class="arrow">→</span>
          <span class="final">${Number(converted.value.toPrecision(10))}</span> <span class="unit">${to}</span>
        </div>
        <div class="result-hint">
          <i data-lucide="info"></i>
          <span>Description: <b>${unitInfo.n}</b> — ${unitInfo.d}</span>
        </div>
      </div>`;
    res.classList.add('show');
    lucide.createIcons();
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

    const siUnits = {mass: 'kg', length: 'm', time: 's', current: 'A', temperature: 'K', amount: 'mol', luminous: 'cd'};
    const unitToSi = {
      kg: 1, g: 0.001, mg: 1e-6, ug: 1e-9, lb: 0.45359237, oz: 0.028349523, ton: 907.18474, tonne: 1000,
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
    return {
      value: resultValue,
      unit: targetUnitStr,
      magnitude: resultValue,
      units: targetUnitStr,
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
        <div class="result-text">
          <span class="final">${result.toString()}</span>
        </div>
        <div class="result-hint">
          <i data-lucide="compass"></i>
          <span>Local Engine Projection: <b>${Object.values(JSON.parse(u)).join('-')}</b></span>
        </div>
      </div>`;
    res.classList.add('show');
    lucide.createIcons();
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
        <div class="result-text">
          <span class="final">${result.toString()}</span>
        </div>
        <div class="result-hint">
          <i data-lucide="layers"></i>
          <span>Framework: <b>${to}</b> System</span>
        </div>
      </div>`;
    res.classList.add('show');
    lucide.createIcons();
  } catch (e) { showError(res, 'Framework System Error', e.message); }
}
