(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const body = document.body;
  const pages = $$('.page');
  const navButtons = $$('.nav-btn');
  const output = $('#output');
  const commandInput = $('#command');
  const commandForm = $('#command-form');
  const toast = $('#toast');
  let toastTimer;
  let commandHistory = [];
  let historyIndex = 0;
  let eventCount = 4;
  const state = { noise: 12, packets: 84, nodes: 7, matrix: true, glow: true, motion: false };
  const pageIds = ['overview', 'device', 'console', 'network', 'intel', 'vault', 'missions', 'settings'];

  const sayToast = (message) => {
    $('#toast-message').textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  };

  function addFeed(message, category = 'SYSTEM', color = 'green') {
    const feed = $('#feed-list');
    const now = new Date().toLocaleTimeString('en-GB', { hour12: false });
    const item = document.createElement('div');
    item.className = 'feed-item';
    const time = document.createElement('time'); time.textContent = now;
    const dot = document.createElement('span'); dot.className = `feed-dot ${color}`;
    const p = document.createElement('p'); p.append(document.createTextNode(message));
    const small = document.createElement('small'); small.textContent = ` · ${category}`; p.append(small);
    item.append(time, dot, p); feed.prepend(item);
    while (feed.children.length > 5) feed.lastElementChild.remove();
    const timeline = $('#mission-list');
    if (timeline) {
      const row = document.createElement('div'); row.className = 'timeline-item';
      const point = document.createElement('span'); point.className = `timeline-point ${color}`;
      const t = document.createElement('time'); t.textContent = now;
      const detail = document.createElement('div');
      const title = document.createElement('strong'); title.textContent = message;
      const description = document.createElement('small'); description.textContent = `${category} / ghost-07 / local simulation`;
      detail.append(title, description);
      const label = document.createElement('span'); label.className = 'timeline-label'; label.textContent = category;
      row.append(point, t, detail, label); timeline.prepend(row);
      eventCount += 1; $('#event-count').textContent = String(eventCount).padStart(2, '0');
    }
    $('#last-updated').textContent = 'JUST NOW';
  }

  function showPage(id) {
    if (!pageIds.includes(id)) return;
    pages.forEach(page => page.classList.toggle('active', page.id === id));
    navButtons.forEach(button => button.classList.toggle('active', button.dataset.page === id));
    window.history.replaceState(null, '', `#${id}`);
    if (id === 'console') setTimeout(() => commandInput?.focus(), 80);
    window.scrollTo({ top: 0, behavior: state.motion ? 'auto' : 'smooth' });
  }

  document.addEventListener('click', event => {
    const pageButton = event.target.closest('[data-page], [data-page-link]');
    if (pageButton) {
      const destination = pageButton.dataset.page || pageButton.dataset.pageLink;
      if (destination) { event.preventDefault(); showPage(destination); }
    }
  });

  function terminalLine(text, type = 'system') {
    if (!output) return;
    const line = document.createElement('div'); line.className = `terminal-line ${type}`; line.textContent = text;
    output.append(line); output.scrollTop = output.scrollHeight;
  }

  const commands = {
    help: () => {
      terminalLine('AVAILABLE COMMANDS', 'success');
      [['help','show this command list'],['scan','scan fictional relay nodes'],['trace [node]','trace a simulated route'],['status','show sandbox status'],['whoami','show operator profile'],['ls','list fictional files'],['access [node]','simulate a handshake'],['clear','clear this terminal'],['reboot','restart the visual simulation']].forEach(([cmd, desc]) => terminalLine(`  ${cmd.padEnd(18)} ${desc}`));
      terminalLine('Tip: this console is a local-only visual simulation.', 'warning');
    },
    scan: () => {
      terminalLine('Starting passive sandbox scan…', 'warning');
      [['relay-03','ONLINE'],['oracle-9','MONITORED'],['archive-2','ISOLATED'],['vault-4','ONLINE']].forEach(([node, status], i) => setTimeout(() => terminalLine(`  ${node.padEnd(14)} ${status}`, status === 'ISOLATED' ? 'warning' : 'success'), 180 * (i + 1)));
      setTimeout(() => { addFeed('Simulated node scan completed', 'SCAN', 'green'); sayToast('Sandbox scan complete'); }, 900);
    },
    trace: args => { const node = args[0] || 'relay-03'; terminalLine(`Tracing fictional route to ${node}…`, 'warning'); setTimeout(() => { terminalLine(`Route verified // 3 hops // 04 ms // simulation only`, 'success'); addFeed(`Route traced to ${node}`, 'ROUTING', 'blue'); }, 420); },
    status: () => ['system: nominal','session: encrypted (local)','cipher: 256-bit (simulated)','external connections: none'].forEach(item => terminalLine(item, 'success')),
    whoami: () => ['operator: NOVA / GHOST-07','clearance: level 09','environment: browser sandbox','mode: fictional simulation'].forEach(item => terminalLine(item, 'success')),
    ls: () => ['  /home/nova/','  /home/nova/mission.log','  /vault/simulated-key.dat','  /etc/ghost-profile.json'].forEach(item => terminalLine(item, 'success')),
    access: args => { const node = args[0] || 'vault-4'; terminalLine(`Simulating safe handshake with ${node}…`, 'warning'); setTimeout(() => terminalLine('Handshake complete. No real system was contacted.', 'success'), 450); },
    clear: () => { output.replaceChildren(); terminalLine('VOIDNET local shell // output cleared.', 'system'); },
    reboot: () => { output.replaceChildren(); terminalLine('Restarting visual relay…', 'warning'); setTimeout(() => { terminalLine('Ghost protocol ready. Simulation only.', 'success'); addFeed('Visual relay restarted', 'SYSTEM', 'green'); }, 500); },
  };

  function runCommand(raw) {
    const value = raw.trim(); if (!value) return;
    commandHistory.push(value); historyIndex = commandHistory.length;
    const [cmd, ...args] = value.toLowerCase().split(/\s+/);
    terminalLine(`nova@voidnet ~ % ${value}`, 'command-echo');
    if (commands[cmd]) commands[cmd](args);
    else terminalLine(`command not found: ${cmd}. Type "help" for the simulated command list.`, 'error');
  }

  commandForm?.addEventListener('submit', event => { event.preventDefault(); runCommand(commandInput.value); commandInput.value = ''; });
  $$('.chip[data-command]').forEach(chip => chip.addEventListener('click', () => { showPage('console'); commandInput.value = chip.dataset.command; runCommand(commandInput.value); commandInput.value = ''; }));
  commandInput?.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp') { event.preventDefault(); if (historyIndex > 0) commandInput.value = commandHistory[--historyIndex]; }
    if (event.key === 'ArrowDown') { event.preventDefault(); commandInput.value = historyIndex < commandHistory.length - 1 ? commandHistory[++historyIndex] : ''; }
  });

  const nodeData = {
    'ghost-core': ['GHOST-CORE','Ghost core','Central relay — encrypted and stable.','ONLINE','02 ms','G','stable-text'],
    'relay-03': ['RELAY-03','Relay 03','Edge router — low latency, signal clean.','ONLINE','04 ms','R3','stable-text'],
    'oracle-9': ['ORACLE-09','Oracle 09','Passive observer — monitoring sandbox traffic.','MONITOR','08 ms','O9','blue-text'],
    'edge-12': ['EDGE-12','Edge 12','Peripheral node — signal stable.','ONLINE','12 ms','E12','blue-text'],
    'archive-2': ['ARCHIVE-02','Archive 02','Isolated cache — simulated anomaly contained.','ISOLATED','31 ms','A2','alert-text'],
    'vault-4': ['VAULT-04','Vault 04','Local artifact store — fictional keys only.','SEALED','06 ms','V4','stable-text'],
    'void-41': ['VOID-41','Void 41','Shadow node — noise elevated, watch status.','WATCH','18 ms','V41','watch-text'],
  };
  $$('.network-node').forEach(node => node.addEventListener('click', () => {
    $$('.network-node').forEach(item => item.classList.remove('selected')); node.classList.add('selected');
    const [code, title, desc, status, latency, icon, color] = nodeData[node.dataset.node];
    $('#node-code').textContent = code; $('#node-title').textContent = title; $('#node-description').textContent = desc;
    $('#node-status').textContent = status; $('#node-status').className = color; $('#node-latency').textContent = latency; $('.node-detail-icon').textContent = icon;
  }));

  function platformName() {
    const raw = `${navigator.userAgentData?.platform || navigator.platform || ''} ${navigator.userAgent || ''}`;
    if (/iPhone|iPad|iPod/i.test(raw)) return 'iOS / iPadOS';
    if (/Android/i.test(raw)) return 'Android';
    if (/Windows/i.test(raw)) return 'Windows';
    if (/Macintosh|Mac OS|macOS/i.test(raw)) return 'macOS';
    if (/CrOS/i.test(raw)) return 'ChromeOS';
    if (/Linux/i.test(raw)) return 'Linux';
    return navigator.userAgentData?.platform || navigator.platform || 'Not exposed';
  }
  function browserName() {
    const brands = navigator.userAgentData?.brands?.map(item => item.brand) || [];
    const preferred = brands.find(name => /Google Chrome|Microsoft Edge|Opera/i.test(name));
    if (preferred) return preferred;
    const ua = navigator.userAgent || '';
    if (/Edg\//.test(ua)) return 'Microsoft Edge';
    if (/OPR\//.test(ua)) return 'Opera';
    if (/Firefox\//.test(ua)) return 'Firefox';
    if (/CriOS|Chrome\//.test(ua)) return 'Chrome';
    if (/Safari\//.test(ua)) return 'Safari';
    return brands[0] || 'Browser (not identified)';
  }
  function updateDeviceSnapshot() {
    const screenText = `${screen.width} × ${screen.height}`;
    const viewText = `${innerWidth} × ${innerHeight}`;
    const threads = Number.isFinite(navigator.hardwareConcurrency) ? `${navigator.hardwareConcurrency}` : 'Not exposed';
    const memory = Number.isFinite(navigator.deviceMemory) ? `≈ ${navigator.deviceMemory} GB` : 'Not exposed';
    const online = navigator.onLine;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const connectionText = online ? 'Online' : 'Offline';
    let netDetail = connection?.effectiveType ? `${connection.effectiveType.toUpperCase()} ESTIMATE` : (connection ? 'LINK AVAILABLE' : 'DETAILS NOT EXPOSED');
    if (connection?.saveData) netDetail = 'DATA-SAVER ENABLED';
    $('#stat-cpu').textContent = threads;
    $('#stat-memory').textContent = Number.isFinite(navigator.deviceMemory) ? `${navigator.deviceMemory} GB` : 'N/A';
    $('#stat-screen').textContent = screenText;
    $('#stat-dpr').textContent = `DPR ${window.devicePixelRatio || 1}`;
    $('#stat-network').textContent = connectionText;
    $('#stat-network-detail').textContent = netDetail;
    $('#device-os').textContent = platformName();
    $('#device-browser').textContent = browserName();
    $('#device-threads').textContent = threads === 'Not exposed' ? threads : `${threads} logical`;
    $('#device-memory').textContent = memory;
    $('#device-profile-name').textContent = `${platformName()} / ${browserName()}`;
    $('#detail-screen').textContent = `${screenText} CSS pixels`;
    $('#detail-viewport').textContent = `${viewText} CSS pixels`;
    $('#detail-dpr').textContent = `${window.devicePixelRatio || 1}×`;
    $('#detail-color').textContent = `${screen.colorDepth || 'Not exposed'}-bit`;
    $('#detail-language').textContent = `${navigator.language || 'Not exposed'}${navigator.languages?.length > 1 ? ` (+${navigator.languages.length - 1})` : ''}`;
    $('#detail-timezone').textContent = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Not exposed';
    $('#detail-connection').textContent = `${connectionText} · browser-reported`;
    const bandwidth = Number.isFinite(connection?.downlink) ? `~${connection.downlink} Mbps` : 'Not exposed';
    $('#detail-network').textContent = `${connection?.effectiveType ? connection.effectiveType.toUpperCase() + ' · ' : ''}${bandwidth}`;
    $('#connection-label').textContent = connectionText.toUpperCase();
    $('#connection-pill').classList.toggle('offline', !online);
    const stamp = new Date().toLocaleTimeString('en-GB', { hour12: false });
    $('#last-updated').textContent = stamp; $('#device-updated').textContent = stamp;
  }
  let batteryManager = null;
  let batteryListenersAttached = false;
  async function updateBattery() {
    const target = $('#detail-battery');
    if (!navigator.getBattery) { target.textContent = 'Not exposed by this browser'; return; }
    try {
      batteryManager ||= await navigator.getBattery();
      const paintBattery = () => { target.textContent = `${Math.round(batteryManager.level * 100)}% · ${batteryManager.charging ? 'charging' : 'on battery'}`; };
      paintBattery();
      if (!batteryListenersAttached) {
        batteryManager.addEventListener('levelchange', paintBattery); batteryManager.addEventListener('chargingchange', paintBattery);
        batteryListenersAttached = true;
      }
    } catch { target.textContent = 'Unavailable in this browser context'; }
  }
  updateDeviceSnapshot(); updateBattery();
  setInterval(updateDeviceSnapshot, 5000);
  window.addEventListener('resize', updateDeviceSnapshot);
  window.addEventListener('online', updateDeviceSnapshot);
  window.addEventListener('offline', updateDeviceSnapshot);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) updateDeviceSnapshot(); });
  const liveConnection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  liveConnection?.addEventListener?.('change', updateDeviceSnapshot);
  function logAction(action) {
    switch (action) {
      case 'refresh-device': updateDeviceSnapshot(); updateBattery(); sayToast('Device snapshot refreshed locally'); break;
      case 'quick-scan': case 'run-scan':
        state.noise = Math.max(4, state.noise - 2); if ($('#stat-noise')) $('#stat-noise').innerHTML = `${state.noise}<span class="stat-unit">%</span>`;
        addFeed('Quick scan complete — all clear', 'SCAN', 'green'); sayToast('Quick scan complete · all clear'); break;
      case 'export-report': case 'export-log':
        downloadText(`VOIDNET — ${action === 'export-log' ? 'SESSION LOG' : 'SIMULATION REPORT'}\nGenerated: ${new Date().toLocaleString()}\n\nThis is a fictional browser-only simulation. No external systems were accessed.\nOperator: NOVA / GHOST-07\nNetwork status: nominal\n`, `voidnet-${action === 'export-log' ? 'log' : 'report'}.txt`);
        sayToast('Local report downloaded'); break;
      case 'refresh-intel': sayToast('Threat intelligence refreshed'); addFeed('Threat intelligence refreshed', 'INTEL', 'blue'); break;
      case 'trace-route': showPage('network'); setTimeout(() => sayToast('Route traced · 3 simulated hops'), 150); addFeed('Simulated route traced', 'ROUTING', 'blue'); break;
      case 'inspect-node': sayToast(`Inspecting ${$('#node-title').textContent} · simulation only`); addFeed(`${$('#node-title').textContent} inspected`, 'NETWORK', 'blue'); break;
      case 'clear-terminal': output.replaceChildren(); terminalLine('VOIDNET local shell // output cleared.', 'system'); sayToast('Terminal cleared'); break;
      case 'clear-feed': $('#mission-list').replaceChildren(); eventCount = 0; $('#event-count').textContent = '00'; $('#feed-list').replaceChildren(); sayToast('Local activity history cleared'); break;
      case 'new-artifact': {
        const code = Array.from({length:3}, () => Math.random().toString(16).slice(2, 6).toUpperCase()).join('-');
        const card = document.createElement('article'); card.className = 'vault-card';
        const top = document.createElement('div'); top.className = 'vault-card-top'; const icon = document.createElement('span'); icon.className = 'vault-file-icon'; icon.textContent = '⌑';
        const copy = document.createElement('button'); copy.className = 'icon-button'; copy.title = 'Copy key'; copy.textContent = '⧉'; copy.dataset.copy = code; top.append(icon, copy);
        const label = document.createElement('small'); label.textContent = 'ACCESS KEY / NEW'; const key = document.createElement('strong'); key.textContent = code;
        const meta = document.createElement('span'); meta.className = 'vault-card-meta'; meta.textContent = `CREATED ${new Date().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})} · SIMULATED`;
        card.append(top, label, key, meta); $('.vault-grid').prepend(card); addFeed('Fictional vault key generated', 'VAULT', 'green'); sayToast('New fictional key generated'); break;
      }
      default: break;
    }
  }
  $$('[data-action]').forEach(button => button.addEventListener('click', event => {
    const action = button.dataset.action;
    if (action === 'new-artifact' && event.target.closest('[data-copy]')) return;
    logAction(action);
  }));
  document.addEventListener('click', async event => {
    const copyButton = event.target.closest('[data-copy]'); if (!copyButton) return;
    try { await navigator.clipboard.writeText(copyButton.dataset.copy); sayToast('Artifact copied to clipboard'); }
    catch { sayToast(`Key: ${copyButton.dataset.copy}`); }
  });

  const themes = {
    acid: ['#c6ff55','198,255,85'], ice: ['#83ceff','131,206,255'],
    ember: ['#ffad70','255,173,112'], violet: ['#c0a2ff','192,162,255'],
  };
  function setTheme(name, notify = true) {
    if (!themes[name]) return;
    document.documentElement.style.setProperty('--acid', themes[name][0]);
    document.documentElement.style.setProperty('--accent-rgb', themes[name][1]);
    $$('.theme-option').forEach(option => option.classList.toggle('selected', option.dataset.theme === name));
    localStorage.setItem('voidnet-theme', name); if (notify) sayToast(`${name[0].toUpperCase()}${name.slice(1)} theme applied`);
  }
  $$('.theme-option').forEach(option => option.addEventListener('click', () => setTheme(option.dataset.theme)));
  $$('.switch[data-setting]').forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.setting; state[key] = !state[key]; button.classList.toggle('on', state[key]); button.setAttribute('aria-checked', String(state[key]));
    if (key === 'matrix') body.classList.toggle('no-matrix', !state[key]);
    if (key === 'glow') body.classList.toggle('no-glow', !state[key]);
    if (key === 'motion') body.classList.toggle('reduced-motion', state[key]);
    localStorage.setItem(`voidnet-${key}`, String(state[key])); sayToast(`${key === 'motion' ? 'Reduced motion' : key === 'matrix' ? 'Matrix rain' : 'Ambient glow'} ${state[key] ? 'enabled' : 'disabled'}`);
  }));
  $('[data-action="reset-settings"]')?.addEventListener('click', () => {
    setTheme('acid', false); ['matrix','glow','motion'].forEach(key => { state[key] = key !== 'motion'; body.classList.toggle(key === 'matrix' ? 'no-matrix' : key === 'glow' ? 'no-glow' : 'reduced-motion', !state[key]); const btn = $(`[data-setting="${key}"]`); btn.classList.toggle('on', state[key]); btn.setAttribute('aria-checked', String(state[key])); localStorage.setItem(`voidnet-${key}`, String(state[key])); });
    sayToast('Preferences reset');
  });
  function loadPreferences() {
    setTheme(localStorage.getItem('voidnet-theme') || 'acid', false);
    ['matrix','glow','motion'].forEach(key => {
      const saved = localStorage.getItem(`voidnet-${key}`); if (saved === null) return;
      state[key] = saved === 'true';
      body.classList.toggle(key === 'matrix' ? 'no-matrix' : key === 'glow' ? 'no-glow' : 'reduced-motion', !state[key]);
      const btn = $(`[data-setting="${key}"]`); btn.classList.toggle('on', state[key]); btn.setAttribute('aria-checked', String(state[key]));
    });
  }

  function downloadText(text, filename) { const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' })); link.download = filename; link.click(); URL.revokeObjectURL(link.href); }

  function updateClock() {
    $('#clock').textContent = new Date().toLocaleTimeString('en-GB', { hour12: false });
    const seconds = Math.max(0, 9 * 60 + 42 - Math.floor((Date.now() - sessionStart) / 1000));
    $('#session-time').textContent = `${String(Math.floor(seconds / 60)).padStart(2,'0')}:${String(seconds % 60).padStart(2,'0')}`;
  }
  const sessionStart = Date.now(); updateClock(); setInterval(updateClock, 1000);

  document.addEventListener('keydown', event => {
    const tag = document.activeElement?.tagName;
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); output?.replaceChildren(); if (output) terminalLine('VOIDNET local shell // output cleared.', 'system'); }
    if (tag === 'INPUT' || tag === 'TEXTAREA' || event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.key === '/') { event.preventDefault(); showPage('console'); }
    if (/^[1-8]$/.test(event.key)) showPage(pageIds[Number(event.key) - 1]);
  });

  // Matrix canvas is an ambient visual only; it never reads or sends network data.
  const canvas = $('#matrix'); const ctx = canvas.getContext('2d'); let drops = []; let rafId; let lastFrame = 0;
  function resizeCanvas() { const dpr = Math.min(window.devicePixelRatio || 1, 2); canvas.width = Math.floor(innerWidth * dpr); canvas.height = Math.floor(innerHeight * dpr); ctx.setTransform(dpr,0,0,dpr,0,0); drops = Array.from({ length: Math.ceil(innerWidth / 19) }, () => Math.random() * -45); }
  function drawMatrix(time) {
    rafId = requestAnimationFrame(drawMatrix); if (body.classList.contains('no-matrix')) return;
    if (time - lastFrame < 75) return; lastFrame = time;
    const width = innerWidth, height = innerHeight; ctx.fillStyle = 'rgba(8,12,11,0.11)'; ctx.fillRect(0,0,width,height); ctx.font = '12px monospace'; const styles = getComputedStyle(document.documentElement); const accent = styles.getPropertyValue('--acid').trim(); const accentRgb = styles.getPropertyValue('--accent-rgb').trim();
    const chars = '01アイウエオカキクケコ<>/{}';
    drops.forEach((y, i) => { ctx.fillStyle = i % 8 === 0 ? accent : `rgba(${accentRgb},.48)`; ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 19, y * 16); if (y * 16 > height && Math.random() > .978) drops[i] = 0; drops[i] += .72; });
  }
  window.addEventListener('resize', resizeCanvas); resizeCanvas(); rafId = requestAnimationFrame(drawMatrix);

  loadPreferences();
  const initialPage = location.hash.slice(1); if (pageIds.includes(initialPage)) showPage(initialPage);
  terminalLine('VOIDNET local shell // ghost-07', 'success');
  terminalLine('Network commands are fictional; device details remain local to this browser.', 'system');
  terminalLine('Type "help" to explore available commands.', 'system');
  // Ensure the first load opens cleanly at the top without an animation flash.
  window.addEventListener('pageshow', () => { if (!location.hash) history.replaceState(null, '', '#overview'); });
})();
