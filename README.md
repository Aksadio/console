# VOIDNET // Ghost Protocol

A cyberpunk browser dashboard with **local device telemetry** alongside a fictional network simulation. Device readings come directly from browser APIs and stay in the page; all network nodes, credentials, scans, and command results are simulated. The project does not connect to, scan, or interact with real systems.

## Run it

Open `index.html` directly in a modern browser, or serve this folder locally:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Pages

- **Overview** — live browser-reported device snapshot alongside clearly labeled simulated threat/activity panels.
- **This device** — live screen, viewport, language, timezone, connection, browser/OS family, logical threads, and (where supported) coarse memory/battery/network estimates. The browser may hide some values.
- **Terminal** — `help`, `scan`, `trace [node]`, `status`, `whoami`, `ls`, `access [node]`, `clear`, and `reboot`.
- **Network map** — clickable fictional nodes and an inspector panel.
- **Threat intel** — simulated signal graph, risk score, and signature library.
- **Data vault** — copy demo artifacts or generate a random fictional key.
- **Mission log** — local activity timeline and downloadable text log.
- **Settings** — four accent themes, matrix/glow/motion switches, keyboard shortcuts, and reset.

The settings persist in browser `localStorage`. Shortcuts: `/` opens the terminal, `Ctrl/⌘ + K` clears it, and `1`–`8` switches pages. No precise location, files, camera, or microphone are accessed; device telemetry is not sent to a server.
