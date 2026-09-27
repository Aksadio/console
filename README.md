const terminal = document.getElementById('terminal');
const input = document.getElementById('command-input');
const navButtons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

const terminalState = {
  user: 'root',
  host: 'ghost',
  accessLevel: 9,
  files: ['bin/', 'etc/', 'home/', 'var/', 'root/keys/', 'mission.log'],
  commands: {
    help: 'Display available commands.',
    ls: 'List directories and files.',
    whoami: 'Display current identity and access level.',
    pwd: 'Print current working directory.',
    scan: 'Scan local network topology.',
    trace: 'Trace inbound and outbound routes.',
    access: 'Attempt privileged access.',
    cat: 'Display a log or file.',
    clear: 'Clear the terminal buffer.',
    status: 'Display system health.',
    reboot: 'Restart the relay daemon.',
    exit: 'Disconnect the shell.'
  }
};

function addLine(text, type = 'system') {
  const line = document.createElement('div');
  line.className = `line ${type}`;
  line.textContent = text;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

function printBanner() {
  const banner = [
    'Initializing ghost relay daemon...',
    'Booting secure packet bridge...',
    'Decrypting user profile... OK',
    'Syncing relay ledger... OK',
    'Authenticating node signatures... OK',
    'Connection established to VOIDNET.',
    'Welcome back, root.'
  ];

  banner.forEach((message, index) => {
    setTimeout(() => addLine(message, index === banner.length - 1 ? 'success' : 'system'), index * 120);
  });
}

function printPrompt(command = '') {
  if (command) {
    addLine(`${terminalState.user}@${terminalState.host}:~$ ${command}`, 'command');
  }
}

function handleCommand(raw) {
  const inputValue = raw.trim();
  if (!inputValue) return;

  printPrompt(inputValue);

  const [command, ...args] = inputValue.split(/\s+/);
  const lower = command.toLowerCase();

  switch (lower) {
    case 'help':
      addLine('Available commands:', 'system');
      Object.entries(terminalState.commands).forEach(([key, value]) => {
        addLine(`  ${key.padEnd(10)} ${value}`, 'success');
      });
      break;

    case 'ls':
      addLine('/root/ghost', 'success');
      terminalState.files.forEach(file => addLine(`  ${file}`, 'system'));
      break;

    case 'whoami':
      addLine(`identity: ${terminalState.user}`, 'success');
      addLine(`host: ${terminalState.host}`, 'success');
      addLine(`access: tier-${terminalState.accessLevel}`, 'success');
      break;

    case 'pwd':
      addLine('/var/run/voidnet/relay', 'success');
      break;

    case 'scan':
      addLine('Scanning network lattice...', 'warning');
      const nodes = [
        'relay-03 // ONLINE // stable',
        'archive-2 // COMPROMISED // 3.4s delay',
        'oracle-9 // MONITORED // stable',
        'vault-4 // ONLINE // encrypted',
        'ghost-net // ACTIVE // root access'
      ];
      nodes.forEach((item, index) => {
        setTimeout(() => addLine(`  ${item}`, 'success'), index * 120);
      });
      break;

    case 'trace': {
      const target = args[0] || 'relay-03';
      addLine(`Tracing route to ${target}...`, 'warning');
      setTimeout(() => {
        addLine('> packet route stable', 'success');
        addLine('> jitter reduced to 2.4ms', 'success');
        addLine('> tunnel encryption verified', 'success');
      }, 280);
      break;
    }

    case 'access': {
      const target = args[0] || 'vault-4';
      addLine(`Attempting privileged access on ${target}...`, 'warning');
      setTimeout(() => {
        addLine('> key exchange established', 'success');
        addLine('> relay signature accepted', 'success');
        addLine(`> access granted to ${target}`, 'success');
      }, 320);
      break;
    }

    case 'cat': {
      const target = args[0] || 'mission.log';
      addLine(`Opening ${target}...`, 'system');
      if (target === 'mission.log') {
        addLine('[11:42:14] secure tunnel re-established', 'success');
        addLine('[11:46:08] packet shield recalibrated', 'success');
        addLine('[11:51:17] archive sync completed successfully', 'success');
      } else {
        addLine(`No such file: ${target}`, 'error');
      }
      break;
    }

    case 'status':
      addLine('System health: nominal', 'success');
      addLine('Latency: 4.2ms', 'success');
      addLine('Cipher: active', 'success');
      addLine('Firewalls: stable', 'success');
      break;

    case 'reboot':
      addLine('Rebooting relay daemon...', 'warning');
      setTimeout(() => {
        addLine('Relay daemon restarted successfully.', 'success');
      }, 350);
      break;

    case 'clear':
      terminal.innerHTML = '';
      printBanner();
      break;

    case 'exit':
      addLine('Disconnecting secure shell...', 'warning');
      addLine('Session terminated. Press any key to reconnect.', 'error');
      input.disabled = true;
      break;

    default:
      addLine(`bash: ${command}: command not found`, 'error');
      addLine('Type "help" for list of commands.', 'system');
      break;
  }
}

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const value = input.value;
    handleCommand(value);
    input.value = '';
  }
});

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    navButtons.forEach(btn => btn.classList.toggle('active', btn === button));
    pages.forEach(page => page.classList.toggle('active', page.id === button.dataset.page));
  });
});

document.querySelectorAll('.toggle').forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const isOn = toggle.classList.contains('on');
    toggle.classList.toggle('on', !isOn);
    toggle.textContent = !isOn ? 'ON' : 'OFF';
  });
});

const statValues = document.querySelectorAll('[data-value]');
statValues.forEach((el) => {
  const target = Number(el.dataset.value);
  let current = 0;
  const interval = setInterval(() => {
    current += 1;
    el.textContent = current;
    if (current >= target) clearInterval(interval);
  }, 18);
});

const matrixCanvas = document.getElementById('matrix');
const ctx = matrixCanvas.getContext('2d');

function resizeCanvas() {
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;
}

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#*+.;';
let columns = [];

function initMatrix() {
  columns.length = 0;
  const fontSize = 16;
  const columnsCount = Math.floor(matrixCanvas.width / fontSize);
  for (let i = 0; i < columnsCount; i++) {
    columns.push(Math.random() * -100);
  }
}

function drawMatrix() {
  ctx.fillStyle = 'rgba(3, 13, 16, 0.08)';
  ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

  ctx.font = '16px monospace';
  for (let i = 0; i < columns.length; i++) {
    const char = letters[Math.floor(Math.random() * letters.length)];
    const x = i * 16;
    const y = columns[i] * 16;
    ctx.fillStyle = i % 3 === 0 ? '#71ffd5' : '#35c497';
    ctx.fillText(char, x, y);

    if (y > matrixCanvas.height && Math.random() > 0.975) {
      columns[i] = 0;
    }
    columns[i] += 1;
  }
}

window.addEventListener('resize', () => {
  resizeCanvas();
  initMatrix();
});

resizeCanvas();
initMatrix();
setInterval(drawMatrix, 80);

printBanner();
addLine('Type "help" to begin.', 'system');
input.focus();
