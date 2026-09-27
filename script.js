const terminal = document.getElementById('terminal');
const input = document.getElementById('command-input');

const state = {
  user: 'root',
  host: 'matrix',
  accessLevel: 7,
  files: ['bin/', 'etc/', 'home/', 'var/', 'root/keys', 'system.log'],
  commands: {
    help: 'Display all accessible commands.',
    ls: 'List available directories and files.',
    whoami: 'Display current user and access tier.',
    pwd: 'Print current working directory.',
    clear: 'Clear the terminal screen.',
    scan: 'Scan local network for active endpoints.',
    access: 'Attempt privileged access to a target endpoint.',
    cat: 'Display contents of a file or log.',
    reboot: 'Restart the node interface.',
    exit: 'Disconnect shell session.'
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
    'Booting secure shell v7.9.1...',
    'Initializing matrix relay...',
    'Decrypting user profile... OK',
    'Synchronizing packet traces... OK',
    'Securing access tokens... OK',
    'Connection established to mainframe.',
    'Welcome back, root.'
  ];

  banner.forEach((message, index) => {
    setTimeout(() => addLine(message, index === banner.length - 1 ? 'success' : 'system'), index * 150);
  });
}

function printPrompt(command = '') {
  if (command) {
    addLine(`${state.user}@${state.host}:~$ ${command}`, 'command');
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
      Object.entries(state.commands).forEach(([key, value]) => {
        addLine(`  ${key.padEnd(10)} ${value}`, 'success');
      });
      break;

    case 'ls':
      addLine('/root', 'success');
      state.files.forEach(file => addLine(`  ${file}`, 'system'));
      break;

    case 'whoami':
      addLine(`user: ${state.user}`, 'success');
      addLine(`host: ${state.host}`, 'success');
      addLine(`access: lvl-${state.accessLevel}`, 'success');
      break;

    case 'pwd':
      addLine('/root/secure-shell', 'success');
      break;

    case 'scan':
      addLine('Scanning local subnet...', 'system');
      const targets = [
        '10.0.0.2  ONLINE  gateway',
        '10.0.0.7  ONLINE  relay-node',
        '10.0.0.13 ONLINE  archive',
        '10.0.0.23 ONLINE  obsidian-core',
        '10.0.0.44 OFFLINE  ghost-router'
      ];
      targets.forEach(line => setTimeout(() => addLine(`  ${line}`, 'success'), 120));
      break;

    case 'access': {
      const target = args[0] || 'obsidian-core';
      addLine(`Attempting privilege escalation on ${target}...`, 'warning');
      setTimeout(() => {
        addLine(`> key exchange successful`, 'success');
        addLine(`> bypassing route filter...`, 'success');
        addLine(`> access granted to ${target}`, 'success');
      }, 300);
      break;
    }

    case 'cat': {
      const file = args[0] || 'system.log';
      addLine(`Opening ${file}...`, 'system');
      if (file === 'system.log') {
        addLine('[00:12:09] relay handshake established', 'success');
        addLine('[00:12:58] packet loss reduced to 0.03%', 'success');
        addLine('[00:13:14] root access certificate verified', 'success');
      } else {
        addLine(`No such file: ${file}`, 'error');
      }
      break;
    }

    case 'reboot':
      addLine('Rebooting terminal interface...', 'warning');
      setTimeout(() => {
        addLine('System restart complete. Re-establishing signal..', 'success');
      }, 350);
      break;

    case 'clear':
      terminal.innerHTML = '';
      printBanner();
      break;

    case 'exit':
      addLine('Disconnecting secure shell...', 'warning');
      addLine('Connection terminated. Press any key to reconnect.', 'error');
      input.disabled = true;
      break;

    default:
      addLine(`bash: ${command}: command not found`, 'error');
      addLine('Type "help" for a list of available commands.', 'system');
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

input.focus();
printBanner();
addLine('Type "help" to begin.', 'system');
