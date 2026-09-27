:root {
  --bg: #030d10;
  --bg-2: #051b20;
  --panel: rgba(8, 20, 22, 0.8);
  --panel-strong: rgba(12, 28, 30, 0.96);
  --line: rgba(94, 255, 198, 0.2);
  --green: #71ffd5;
  --green-strong: #31f7b4;
  --green-soft: rgba(49, 247, 180, 0.15);
  --amber: #ffc857;
  --red: #ff5c7a;
  --blue: #78d3ff;
  --text: #d9fff5;
  --muted: rgba(217, 255, 245, 0.7);
  --shadow: rgba(49, 247, 180, 0.35);
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  min-height: 100%;
  height: 100%;
  background: radial-gradient(circle at top, rgba(18, 72, 69, 0.8), transparent 40%), var(--bg);
  color: var(--text);
  font-family: "Share Tech Mono", monospace;
}

body {
  position: relative;
  overflow: hidden;
}

button, input {
  font: inherit;
}

#matrix {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  background: rgba(0, 0, 0, 0.2);
  opacity: 0.42;
  pointer-events: none;
}

.app-shell {
  position: relative;
  z-index: 1;
  width: min(1280px, calc(100% - 40px));
  height: min(860px, calc(100vh - 40px));
  margin: 20px auto;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: rgba(3, 17, 18, 0.78);
  box-shadow: 0 0 30px rgba(49, 247, 180, 0.18), inset 0 0 30px rgba(49, 247, 180, 0.05);
  overflow: hidden;
}

.glass {
  background: rgba(10, 22, 25, 0.72);
  border: 1px solid var(--line);
  box-shadow: inset 0 0 24px rgba(49, 247, 180, 0.08);
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 18px 24px;
  border-bottom: 1px solid var(--line);
}

.left-cluster {
  display: flex;
  align-items: center;
  gap: 18px;
}

.window-controls {
  display: flex;
  gap: 10px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 15px currentColor;
}

.dot.red { background: var(--red); color: var(--red); }
.dot.amber { background: var(--amber); color: var(--amber); }
.dot.green { background: var(--green); color: var(--green); }
.dot.small { width: 8px; height: 8px; }
.dot.blue { background: var(--blue); color: var(--blue); }

.brand-wrap {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand {
  font-family: "Orbitron", sans-serif;
  font-size: 1.12rem;
  letter-spacing: 0.22em;
  font-weight: 800;
  color: var(--green);
  text-shadow: 0 0 14px rgba(49, 247, 180, 0.45);
}

.brand-sub {
  font-size: 0.7rem;
  color: var(--muted);
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.status-strip {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 7px 12px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--muted);
}

.status-pill.online {
  background: rgba(49, 247, 180, 0.12);
  color: var(--green);
}

.workspace {
  display: grid;
  grid-template-columns: 260px 1fr;
  height: calc(100% - 82px);
}

.sidebar {
  padding: 18px 16px;
  border-right: 1px solid var(--line);
}

.nav-title {
  color: var(--muted);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 18px;
  padding-left: 10px;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-btn,
.ghost-btn,
.action-btn,
.toggle {
  border: 1px solid var(--line);
  background: rgba(12, 25, 28, 0.72);
  color: var(--text);
  border-radius: 12px;
  padding: 12px 14px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
}

.nav-btn:hover,
.ghost-btn:hover,
.action-btn:hover,
.toggle:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 18px rgba(49, 247, 180, 0.18);
  border-color: rgba(49, 247, 180, 0.7);
}

.nav-btn.active {
  background: linear-gradient(90deg, rgba(49, 247, 180, 0.16), rgba(49, 247, 180, 0.04));
  color: var(--green);
  box-shadow: inset 0 0 18px rgba(49, 247, 180, 0.12);
}

.mini-panel {
  margin-top: 26px;
  border: 1px solid var(--line);
  background: rgba(10, 22, 25, 0.72);
  border-radius: 14px;
  padding: 14px 12px;
}

.mini-label {
  color: var(--muted);
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

.mini-value {
  margin-top: 8px;
  color: var(--green);
  font-size: 0.8rem;
}

.mini-bars {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.mini-bars span {
  display: inline-block;
  height: 42px;
  border-radius: 8px;
  background: linear-gradient(to top, var(--green), rgba(49, 247, 180, 0.28));
  animation: pulseUp 2.3s ease-in-out infinite alternate;
}

.mini-bars span:nth-child(2) { animation-delay: 0.2s; }
.mini-bars span:nth-child(3) { animation-delay: 0.4s; }
.mini-bars span:nth-child(4) { animation-delay: 0.6s; }

.main-panel {
  padding: 22px;
  overflow: auto;
}

.page {
  display: none;
  animation: pageIn 0.4s ease;
}

.page.active {
  display: block;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 20px 24px;
  border-radius: 18px;
  margin-bottom: 22px;
}

.eyebrow {
  margin: 0 0 10px;
  color: var(--green);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.22em;
}

.hero h1 {
  margin: 0;
  font-family: "Orbitron", sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  letter-spacing: 0.04em;
  color: var(--text);
}

.pulse-ring {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 1px solid rgba(49, 247, 180, 0.45);
  box-shadow: 0 0 0 12px rgba(49, 247, 180, 0.04), 0 0 24px rgba(49, 247, 180, 0.22);
  position: relative;
  animation: pulseRing 2.6s ease-in-out infinite;
}

.pulse-ring::before,
.pulse-ring::after {
  content: "";
  position: absolute;
  inset: 15px;
  border-radius: 50%;
  border: 1px solid rgba(49, 247, 180, 0.32);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 18px;
  margin-bottom: 22px;
}

.stat-card {
  border-radius: 16px;
  padding: 18px;
}

.stat-top {
  color: var(--muted);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.stat-value {
  margin-top: 12px;
  font-size: clamp(2rem, 3vw, 2.6rem);
  font-weight: 700;
  color: var(--green);
  text-shadow: 0 0 16px rgba(49, 247, 180, 0.25);
}

.stat-bottom {
  margin-top: 8px;
  color: var(--muted);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.section-grid,
.intel-grid,
.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(260px, 1fr));
  gap: 22px;
}

.panel {
  border-radius: 18px;
  padding: 18px;
}

.full-panel {
  min-height: 420px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
  color: var(--green);
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.list,
.intel-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 14px;
  color: var(--text);
}

.list li,
.intel-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(94, 255, 198, 0.08);
}

.feed {
  display: grid;
  gap: 14px;
}

.feed-item {
  border: 1px solid rgba(94, 255, 198, 0.12);
  border-radius: 12px;
  padding: 10px 12px;
  color: var(--muted);
}

.feed-time {
  color: var(--green);
  margin-right: 10px;
}

.terminal-panel {
  border-radius: 18px;
  overflow: hidden;
}

.terminal-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--line);
  background: rgba(10, 17, 17, 0.9);
  padding: 12px 16px;
}

.terminal-title {
  color: var(--green);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.terminal {
  min-height: 460px;
  max-height: 500px;
  overflow-y: auto;
  padding: 18px 18px 10px;
  background: rgba(3, 10, 12, 0.9);
  font-size: 0.95rem;
  line-height: 1.6;
  scrollbar-width: thin;
  scrollbar-color: rgba(49, 247, 180, 0.4) transparent;
}

.terminal::-webkit-scrollbar {
  width: 10px;
}

.terminal::-webkit-scrollbar-thumb {
  background: rgba(49, 247, 180, 0.32);
  border-radius: 999px;
}

.line {
  margin: 3px 0;
  color: var(--text);
  text-shadow: 0 0 8px rgba(49, 247, 180, 0.12);
}

.line.success { color: var(--green); }
.line.system { color: var(--muted); }
.line.warning { color: var(--amber); }
.line.error { color: var(--red); }
.line.command { color: var(--text); }

.input-row {
  display: flex;
  align-items: center;
  gap: 12px;
  border-top: 1px solid var(--line);
  background: rgba(8, 18, 19, 0.92);
  padding: 12px 16px 14px;
}

.prompt {
  color: var(--green);
  font-weight: 700;
  white-space: nowrap;
}

#command-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text);
  font-size: 1rem;
  caret-color: var(--green);
  text-shadow: 0 0 12px rgba(49, 247, 180, 0.22);
}

.map-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(120px, 1fr));
  gap: 22px;
  justify-items: center;
  padding: 40px 10px 10px;
}

.node {
  width: 120px;
  height: 120px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid var(--line);
  font-size: 0.76rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-align: center;
  padding: 16px;
}

.node-main {
  background: rgba(49, 247, 180, 0.12);
  color: var(--green);
  box-shadow: 0 0 18px rgba(49, 247, 180, 0.2);
}

.node-ok {
  border-color: rgba(49, 247, 180, 0.45);
  color: var(--green);
}

.node-bad {
  border-color: rgba(255, 92, 122, 0.45);
  color: var(--red);
}

.node-scan {
  border-color: rgba(120, 211, 255, 0.45);
  color: var(--blue);
}

.vault-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(180px, 1fr));
  gap: 20px;
}

.vault-card {
  border-radius: 18px;
  padding: 20px 18px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.vault-title {
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.7rem;
}

.vault-code {
  margin-top: 16px;
  color: var(--green);
  font-size: 1.2rem;
  letter-spacing: 0.08em;
  word-break: break-all;
}

.notes-box {
  color: var(--muted);
  line-height: 1.7;
  padding: 12px 0;
}

.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(94, 255, 198, 0.06);
}

.toggle {
  min-width: 88px;
  text-align: center;
  padding: 8px 12px;
}

.toggle.on {
  background: rgba(49, 247, 180, 0.12);
  color: var(--green);
}

.action-stack {
  display: grid;
  gap: 12px;
}

.action-btn {
  width: 100%;
  text-align: center;
}

@keyframes pulseUp {
  from { transform: scaleY(0.65); opacity: 0.6; }
  to { transform: scaleY(1); opacity: 1; }
}

@keyframes pulseRing {
  0% { transform: scale(0.95); opacity: 0.6; }
  50% { transform: scale(1.04); opacity: 1; }
  100% { transform: scale(0.95); opacity: 0.6; }
}

@keyframes pageIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 980px) {
  .workspace {
    grid-template-columns: 1fr;
  }

  .sidebar {
    border-right: none;
    border-bottom: 1px solid var(--line);
  }

  .stats-grid,
  .section-grid,
  .intel-grid,
  .settings-grid,
  .vault-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 640px) {
  .app-shell {
    width: calc(100% - 16px);
    height: calc(100vh - 16px);
    margin: 8px auto;
  }

  .topbar {
    padding: 12px 14px;
  }

  .brand {
    letter-spacing: 0.12em;
    font-size: 0.92rem;
  }

  .workspace {
    height: calc(100% - 72px);
  }

  .main-panel {
    padding: 14px;
  }

  .stats-grid,
  .section-grid,
  .intel-grid,
  .settings-grid,
  .vault-grid {
    grid-template-columns: 1fr;
  }

  .hero {
    flex-direction: column;
    align-items: flex-start;
  }
}
