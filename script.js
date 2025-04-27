console.log('Script.js loaded.');

// Initialize AOS
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1400,
        once: true,
        offset: 120
    });
} else {
    console.warn('AOS not loaded.');
}

// Utility Function for Alerts
function showAlert(message) {
    const alert = document.getElementById('cyber-alert');
    if (alert) {
        alert.textContent = message;
        alert.style.display = 'block';
        if (typeof gsap !== 'undefined') {
            gsap.from(alert, { opacity: 0, y: -20, duration: 0.5 });
            setTimeout(() => {
                gsap.to(alert, { opacity: 0, duration: 0.5, onComplete: () => alert.style.display = 'none' });
            }, 3000);
        } else {
            setTimeout(() => {
                alert.style.display = 'none';
            }, 3000);
        }
    }
}

// Port Scanner Simulation
const portScanner = document.getElementById('port-scanner');
const scanOutput = document.getElementById('scan-output');
const scanResult = document.getElementById('scan-result');

if (portScanner && scanOutput && scanResult) {
    console.log('Port Scanner elements found.');
    const fakePorts = [
        '80: HTTP - OPEN',
        '443: HTTPS - OPEN',
        '22: SSH - CLOSED',
        '3389: RDP - OPEN',
        '21: FTP - CLOSED'
    ];

    function typeScan() {
        let output = '';
        for (let i = 0; i < 3; i++) {
            output += `> Scanning port ${fakePorts[Math.floor(Math.random() * fakePorts.length)]}\n`;
        }
        scanOutput.textContent = output;
        setTimeout(typeScan, 500);
    }

    typeScan();

    setTimeout(() => {
        console.log('Port Scanner complete.');
        scanResult.textContent = 'Scan Complete. Proceeding to system access...';
        if (typeof gsap !== 'undefined') {
            gsap.to(scanResult, { opacity: 1, duration: 0.5 });
            setTimeout(() => {
                gsap.to(portScanner, {
                    opacity: 0,
                    duration: 1,
                    onComplete: () => {
                        console.log('Hiding port scanner, showing hacking screen.');
                        portScanner.style.display = 'none';
                        const hackingScreen = document.getElementById('hacking-screen');
                        if (hackingScreen) {
                            hackingScreen.style.display = 'flex';
                        } else {
                            console.error('Hacking screen not found, skipping to main content.');
                            showMainContent();
                        }
                    }
                });
            }, 2000);
        } else {
            console.warn('GSAP not loaded, using fallback.');
            portScanner.style.display = 'none';
            const hackingScreen = document.getElementById('hacking-screen');
            if (hackingScreen) {
                hackingScreen.style.display = 'flex';
            } else {
                showMainContent();
            }
        }
    }, 5000);
} else {
    console.error('Port scanner elements not found, skipping to main content.');
    showMainContent();
}

// Hacking Simulation
const hackingScreen = document.getElementById('hacking-screen');
const hackCode = document.getElementById('hack-code');
const hackProgress = document.querySelector('.hack-progress .progress-bar');
const hackProgressText = document.querySelector('.hack-progress .progress-text');
const accessMessage = document.getElementById('access-message');

if (hackingScreen && hackCode && hackProgress && hackProgressText && accessMessage) {
    console.log('Hacking screen elements found.');
    const fakeCode = [
        'nmap -sS -A 192.168.1.1',
        'hydra -l admin -P pass.txt ftp://192.168.1.1',
        'sqlmap -u "http://target.com" --dbs',
        'metasploit -r exploit/windows/smb/ms17_010',
        'curl -X POST http://target.com/api -d "key=123"',
        'nc -lvp 4444'
    ];

    function typeCode() {
        let code = '';
        for (let i = 0; i < 5; i++) {
            code += `> ${fakeCode[Math.floor(Math.random() * fakeCode.length)]}\n`;
        }
        hackCode.textContent = code;
        setTimeout(typeCode, 500);
    }

    typeCode();

    if (typeof gsap !== 'undefined') {
        gsap.to(hackProgress, {
            width: '100%',
            duration: 5,
            onUpdate: () => {
                const progress = Math.round(gsap.getProperty(hackProgress, 'width') / hackProgress.parentElement.offsetWidth * 100);
                hackProgressText.textContent = `${progress}%`;
            },
            onComplete: () => {
                console.log('Hacking complete, transitioning to name animation.');
                accessMessage.textContent = 'Access Granted';
                gsap.to(accessMessage, { opacity: 1, duration: 0.5 });
                setTimeout(() => {
                    gsap.to(hackingScreen, {
                        opacity: 0,
                        duration: 1,
                        onComplete: () => {
                            hackingScreen.style.display = 'none';
                            const nameAnimation = document.getElementById('name-animation');
                            if (nameAnimation) {
                                nameAnimation.style.display = 'block';
                                animateName();
                            } else {
                                console.error('Name animation not found, skipping to main content.');
                                showMainContent();
                            }
                        }
                    });
                }, 1000);
            }
        });
    } else {
        console.warn('GSAP not loaded, using fallback.');
        hackProgress.style.width = '100%';
        hackProgressText.textContent = '100%';
        accessMessage.textContent = 'Access Granted';
        setTimeout(() => {
            hackingScreen.style.display = 'none';
            const nameAnimation = document.getElementById('name-animation');
            if (nameAnimation) {
                nameAnimation.style.display = 'block';
                animateName();
            } else {
                showMainContent();
            }
        }, 3000);
    }
} else {
    console.error('Hacking screen elements not found, skipping to main content.');
    showMainContent();
}

// Function to Show Main Content
function showMainContent() {
    console.log('Showing main content.');
    const sections = document.querySelectorAll('section:not(#hacking-game, #quiz, #dashboard)');
    sections.forEach(section => {
        section.style.display = 'block';
    });
    const matrixBg = document.getElementById('matrix-bg');
    if (matrixBg) matrixBg.style.display = 'block';
    if (typeof animate3DScene === 'function') animate3DScene();
}

// Name Animation
const nameCanvas = document.getElementById('name-animation');
let nameCtx;
if (nameCanvas) {
    nameCtx = nameCanvas.getContext('2d', { willReadFrequently: true });
    nameCanvas.width = window.innerWidth;
    nameCanvas.height = window.innerHeight;
}

const particles = [];
const particleCount = 200;
for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * (nameCanvas ? nameCanvas.width : window.innerWidth),
        y: Math.random() * (nameCanvas ? nameCanvas.height : window.innerHeight),
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        targetX: 0,
        targetY: 0
    });
}

function animateName() {
    if (!nameCanvas || !nameCtx) {
        console.error('Name canvas not found, skipping to main content.');
        showMainContent();
        return;
    }

    nameCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    nameCtx.fillRect(0, 0, nameCanvas.width, nameCanvas.height);

    nameCtx.font = 'bold 60px Orbitron';
    nameCtx.fillStyle = '#00cc00';
    nameCtx.textAlign = 'center';
    nameCtx.fillText('ENG Mohamed Samir', nameCanvas.width / 2, nameCanvas.height / 2);

    const imageData = nameCtx.getImageData(0, 0, nameCanvas.width, nameCanvas.height);
    const pixels = imageData.data;
    const targets = [];
    for (let y = 0; y < nameCanvas.height; y += 5) {
        for (let x = 0; x < nameCanvas.width; x += 5) {
            if (pixels[(y * nameCanvas.width + x) * 4 + 3] > 0) {
                targets.push({ x, y });
            }
        }
    }

    particles.forEach((p, i) => {
        const target = targets[i % targets.length];
        p.targetX = target.x;
        p.targetY = target.y;
        p.x += (p.targetX - p.x) * 0.1;
        p.y += (p.targetY - p.y) * 0.1;

        nameCtx.beginPath();
        nameCtx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        nameCtx.fillStyle = '#00cc00';
        nameCtx.fill();
    });

    if (Math.abs(particles[0].x - particles[0].targetX) < 1) {
        if (typeof gsap !== 'undefined') {
            gsap.to(nameCanvas, {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                    nameCanvas.style.display = 'none';
                    showMainContent();
                }
            });
        } else {
            nameCanvas.style.display = 'none';
            showMainContent();
        }
        return;
    }

    requestAnimationFrame(animateName);
}

// 3D Background
const matrixBg = document.getElementById('matrix-bg');
let scene, camera, renderer, nodes;
if (matrixBg && typeof THREE !== 'undefined') {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: matrixBg, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 50;

    nodes = new THREE.Group();
    const nodeCount = window.innerWidth < 768 ? 200 : 400;
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeVelocities = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount; i++) {
        nodePositions[i * 3] = (Math.random() - 0.5) * 200;
        nodePositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
        nodePositions[i * 3 + 2] = (Math.random() - 0.5) * 200;
        nodeVelocities[i * 3] = (Math.random() - 0.5) * 0.1;
        nodeVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
        nodeVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    }

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    const nodeMaterial = new THREE.PointsMaterial({ color: 0x00cc00, size: 0.5, transparent: true, opacity: 0.6 });
    const nodeSystem = new THREE.Points(nodeGeometry, nodeMaterial);
    nodes.add(nodeSystem);

    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00cc00, transparent: true, opacity: 0.2 });
    const lines = [];
    for (let i = 0; i < nodeCount / 2; i++) {
        const line = new THREE.Line(lineGeometry, lineMaterial);
        nodes.add(line);
        lines.push(line);
    }

    scene.add(nodes);

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    function animate3DScene() {
        requestAnimationFrame(animate3DScene);
        camera.position.x += (mouseX * 20 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 20 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);

        for (let i = 0; i < nodeCount; i++) {
            nodePositions[i * 3] += nodeVelocities[i * 3];
            nodePositions[i * 3 + 1] += nodeVelocities[i * 3 + 1];
            nodePositions[i * 3 + 2] += nodeVelocities[i * 3 + 2];
            if (Math.abs(nodePositions[i * 3]) > 100) nodeVelocities[i * 3] *= -1;
            if (Math.abs(nodePositions[i * 3 + 1]) > 100) nodeVelocities[i * 3 + 1] *= -1;
            if (Math.abs(nodePositions[i * 3 + 2]) > 100) nodeVelocities[i * 3 + 2] *= -1;
        }

        nodeGeometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
    }

    animate3DScene();
} else {
    console.warn('Matrix background or THREE.js not available.');
}

// Virtual Identity Avatar
const avatarCanvas = document.getElementById('avatar-canvas');
if (avatarCanvas) {
    const avatarCtx = avatarCanvas.getContext('2d');

    function drawAvatar() {
        avatarCtx.clearRect(0, 0, avatarCanvas.width, avatarCanvas.height);
        avatarCtx.fillStyle = '#00cc00';
        avatarCtx.beginPath();
        avatarCtx.arc(100, 100, 80, 0, Math.PI * 2);
        avatarCtx.fill();

        avatarCtx.fillStyle = '#0a0a0a';
        avatarCtx.beginPath();
        avatarCtx.arc(70, 80, 20, 0, Math.PI * 2);
        avatarCtx.arc(130, 80, 20, 0, Math.PI * 2);
        avatarCtx.fill();

        avatarCtx.beginPath();
        avatarCtx.arc(100, 130, 40, 0, Math.PI, false);
        avatarCtx.fill();

        requestAnimationFrame(drawAvatar);
    }

    drawAvatar();
}

// Custom Cursor
const cursor = document.querySelector('.cursor');
if (cursor) {
    const trails = [];
    const trailCount = 6;

    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);
        trails.push(trail);
    }

    document.addEventListener('mousemove', (e) => {
        if (typeof gsap !== 'undefined') {
            gsap.to(cursor, { left: e.clientX, top: e.clientY, duration: 0.1 });
            trails.forEach((trail, index) => {
                setTimeout(() => {
                    trail.style.left = e.clientX + 'px';
                    trail.style.top = e.clientY + 'px';
                    trail.style.opacity = 0.6 - (index / trailCount);
                }, index * 10);
            });
        } else {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    });
}

// Virus Simulation
const virusWindows = document.getElementById('virus-windows');
if (virusWindows) {
    function showVirusWindows() {
        for (let i = 0; i < 3; i++) {
            const window = document.createElement('div');
            window.className = 'virus-window';
            window.textContent = `ERROR: System Compromised #${Math.random().toString(36).substr(2, 5)}`;
            window.style.top = `${Math.random() * 80}%`;
            window.style.left = `${Math.random() * 80}%`;
            virusWindows.appendChild(window);
            if (typeof gsap !== 'undefined') {
                gsap.from(window, { scale: 0, opacity: 0, duration: 0.5, delay: i * 0.2 });
            }
        }
        setTimeout(() => {
            if (typeof gsap !== 'undefined') {
                gsap.to('.virus-window', {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => virusWindows.innerHTML = ''
                });
            } else {
                virusWindows.innerHTML = '';
            }
        }, 3000);
    }

    setTimeout(showVirusWindows, 5000);
}

// Sidebar Toggle
const sidebar = document.querySelector('.sidebar');
const toggle = document.querySelector('.sidebar-toggle');

if (sidebar && toggle) {
    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        if (typeof gsap !== 'undefined') {
            gsap.to(sidebar, { left: sidebar.classList.contains('active') ? 0 : -300, duration: 0.4 });
        } else {
            sidebar.style.left = sidebar.classList.contains('active') ? '0' : '-300px';
        }
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            if (sidebar) {
                sidebar.classList.remove('active');
                if (typeof gsap !== 'undefined') {
                    gsap.to(sidebar, { left: -300, duration: 0.4 });
                } else {
                    sidebar.style.left = '-300px';
                }
            }
        }
    });
});

// Settings Panel
const settingsPanel = document.getElementById('settings-panel');
const settingsToggle = document.querySelector('.settings-toggle');
const themeSelect = document.getElementById('theme-select');
const langSelect = document.getElementById('lang-select');
const animationIntensity = document.getElementById('animation-intensity');

if (settingsPanel && settingsToggle) {
    settingsToggle.addEventListener('click', () => {
        settingsPanel.classList.toggle('active');
        if (typeof gsap !== 'undefined') {
            gsap.to(settingsPanel, { left: settingsPanel.classList.contains('active') ? 0 : -300, duration: 0.4 });
        } else {
            settingsPanel.style.left = settingsPanel.classList.contains('active') ? '0' : '-300px';
        }
    });
}

if (themeSelect) {
    themeSelect.addEventListener('change', () => {
        document.body.setAttribute('data-theme', themeSelect.value);
    });
}

if (langSelect) {
    langSelect.addEventListener('change', () => {
        document.body.classList.toggle('rtl', langSelect.value === 'ar');
        updateTranslations(langSelect.value);
    });
}

if (animationIntensity && typeof gsap !== 'undefined') {
    animationIntensity.addEventListener('input', () => {
        gsap.globalTimeline.timeScale(animationIntensity.value);
    });
}

// Translations
const translations = {
    en: {
        'About Me': 'About Me',
        'Projects': 'Projects',
        'Skills': 'Skills',
        'Certifications': 'Certifications',
        'Security Fingerprint': 'Security Fingerprint',
        'Get in Touch': 'Get in Touch'
    },
    ar: {
        'About Me': 'عني',
        'Projects': 'المشاريع',
        'Skills': 'المهارات',
        'Certifications': 'الشهادات',
        'Security Fingerprint': 'بصمة أمنية',
        'Get in Touch': 'تواصل معي'
    }
};

function updateTranslations(lang) {
    document.querySelectorAll('.glitch').forEach(h2 => {
        const text = h2.getAttribute('data-text');
        if (translations[lang][text]) {
            h2.setAttribute('data-text', translations[lang][text]);
            h2.textContent = translations[lang][text];
        }
    });
}

// Command Line
const commandInput = document.querySelector('.command-line input');
const commands = {
    'home': () => document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' }),
    'about': () => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }),
    'projects': () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }),
    'skills': () => document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' }),
    'certifications': () => document.querySelector('#certifications')?.scrollIntoView({ behavior: 'smooth' }),
    'security': () => document.querySelector('#security')?.scrollIntoView({ behavior: 'smooth' }),
    'contact': () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }),
    'theme cyberpunk': () => themeSelect && (themeSelect.value = 'cyberpunk') && themeSelect.dispatchEvent(new Event('change')),
    'theme hacker': () => themeSelect && (themeSelect.value = 'hacker') && themeSelect.dispatchEvent(new Event('change')),
    'theme matrix': () => themeSelect && (themeSelect.value = 'matrix') && themeSelect.dispatchEvent(new Event('change')),
    'lang en': () => langSelect && (langSelect.value = 'en') && langSelect.dispatchEvent(new Event('change')),
    'lang ar': () => langSelect && (langSelect.value = 'ar') && langSelect.dispatchEvent(new Event('change')),
    'show_projects': () => {
        const challenge = document.querySelector('#projects-challenge');
        const grid = document.querySelector('#projects .projects-grid');
        if (challenge && grid) {
            challenge.style.display = 'none';
            grid.style.display = 'grid';
            if (typeof gsap !== 'undefined') {
                gsap.from(grid, { opacity: 0, y: 50, duration: 0.5 });
            }
        }
    },
    'decrypt_skills': () => {
        const challenge = document.querySelector('#skills-challenge');
        const grid = document.querySelector('#skills .skills-grid');
        if (challenge && grid) {
            challenge.style.display = 'none';
            grid.style.display = 'block';
            if (typeof gsap !== 'undefined') {
                gsap.from(grid, { opacity: 0, y: 50, duration: 0.5 });
            }
        }
    },
    'connect_to_mohamed': () => {
        const contact = document.querySelector('#contact');
        if (contact) {
            contact.scrollIntoView({ behavior: 'smooth' });
            showAlert('Connected to Mohamed Samir\'s network!');
        }
    }
};

function runCommand() {
    if (commandInput) {
        const command = commandInput.value.trim().toLowerCase();
        if (commands[command]) {
            commands[command]();
            commandInput.value = '';
        } else {
            alert('Unknown command. Try: home, projects, theme matrix, lang ar');
        }
    }
}

if (commandInput) {
    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            runCommand();
        }
    });
}

// About Terminal Text Animation
const terminalLines = document.querySelectorAll('#about .terminal-text p');
terminalLines.forEach((line, index) => {
    if (typeof gsap !== 'undefined') {
        gsap.from(line, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            delay: index * 0.5,
            scrollTrigger: {
                trigger: '#about',
                start: 'top 80%'
            }
        });
    }
});

// Skills Progress Animation
const progressBars = document.querySelectorAll('.progress-bar');
window.addEventListener('scroll', () => {
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const progress = bar.getAttribute('data-progress');
            if (typeof gsap !== 'undefined') {
                gsap.to(bar, { width: `${progress}%`, duration: 2 });
                gsap.to(bar.querySelector('.progress-text'), {
                    duration: 2,
                    textContent: `${progress}%`,
                    snap: { textContent: 1 }
                });
            } else {
                bar.style.width = `${progress}%`;
                bar.querySelector('.progress-text').textContent = `${progress}%`;
            }
        }
    });
});

// Project Modals
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalLink = document.getElementById('modal-link');
const modalClose = document.querySelector('.modal-close');

const projects = [
    {
        title: 'AI Intrusion Detection',
        description: 'A deep learning system for real-time network intrusion detection.',
        link: 'https://github.com/ai-intrusion'
    },
    {
        title: 'Secure Chat App',
        description: 'An end-to-end encrypted messaging platform with AES-256 and RSA-2048 encryption.',
        link: 'https://github.com/secure-chat'
    },
    {
        title: 'Cyber Portfolio',
        description: 'A hacker-themed portfolio website showcasing advanced animations.',
        link: 'https://github.com/cyber-portfolio'
    },
    {
        title: 'Vulnerability Scanner',
        description: 'A Python-based tool for automated vulnerability scanning.',
        link: 'https://github.com/vuln-scanner'
    }
];

if (modal && modalTitle && modalDescription && modalLink && modalClose) {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project') - 1;
            modalTitle.textContent = projects[projectId].title;
            modalDescription.textContent = projects[projectId].description;
            modalLink.href = projects[projectId].link;
            modal.style.display = 'flex';
            if (typeof gsap !== 'undefined') {
                gsap.from('.modal-content', { scale: 0.3, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' });
            }
        });
    });

    modalClose.addEventListener('click', () => {
        if (typeof gsap !== 'undefined') {
            gsap.to('.modal-content', {
                scale: 0.3,
                opacity: 0,
                duration: 0.4,
                onComplete: () => modal.style.display = 'none'
            });
        } else {
            modal.style.display = 'none';
        }
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            if (typeof gsap !== 'undefined') {
                gsap.to('.modal-content', {
                    scale: 0.3,
                    opacity: 0,
                    duration: 0.4,
                    onComplete: () => modal.style.display = 'none'
                });
            } else {
                modal.style.display = 'none';
            }
        }
    });
}

// Gamification
function solveChallenge(section) {
    const input = document.querySelector(`#${section}-challenge input`);
    if (section === 'projects' && input && input.value === 'HACK2023') {
        const challenge = document.querySelector(`#${section}-challenge`);
        const grid = document.querySelector(`#${section} .projects-grid`);
        if (challenge && grid) {
            challenge.style.display = 'none';
            grid.style.display = 'grid';
            if (typeof gsap !== 'undefined') {
                gsap.from(grid, { opacity: 0, y: 50, duration: 0.5 });
            }
        }
    } else {
        alert('Incorrect code. Try HACK2023.');
    }
}

function checkFileOrder(section) {
    const files = document.querySelectorAll(`#${section}-challenge .file`);
    const order = Array.from(files).map(file => file.getAttribute('data-id'));
    if (order.join(',') === 'AI,Cyber,Code') {
        const challenge = document.querySelector(`#${section}-challenge`);
        const grid = document.querySelector(`#${section} .skills-grid`);
        if (challenge && grid) {
            challenge.style.display = 'none';
            grid.style.display = 'block';
            if (typeof gsap !== 'undefined') {
                gsap.from(grid, { opacity: 0, y: 50, duration: 0.5 });
            }
        }
    } else {
        alert('Incorrect order. Try AI, Cyber, Code.');
    }
}

const skillFiles = document.querySelectorAll('#skills-challenge .file');
if (skillFiles.length > 0) {
    let draggedFile = null;
    skillFiles.forEach(file => {
        file.addEventListener('dragstart', () => {
            draggedFile = file;
            setTimeout(() => file.style.display = 'none', 0);
        });
        file.addEventListener('dragend', () => {
            draggedFile.style.display = 'block';
            draggedFile = null;
        });
        file.addEventListener('dragover', (e) => e.preventDefault());
        file.addEventListener('drop', () => {
            const parent = file.parentElement;
            const files = Array.from(parent.children);
            const index1 = files.indexOf(draggedFile);
            const index2 = files.indexOf(file);
            if (index1 < index2) {
                parent.insertBefore(draggedFile, file.nextSibling);
            } else {
                parent.insertBefore(draggedFile, file);
            }
        });
    });
}

// AI Recommendations
const sectionTimes = {};
document.querySelectorAll('section').forEach(section => {
    sectionTimes[section.id] = 0;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                sectionTimes[section.id] += entry.intersectionRatio;
                recommendSection();
            }
        });
    }, { threshold: [0, 0.5, 1] });
    observer.observe(section);
});

function recommendSection() {
    const maxTime = Math.max(...Object.values(sectionTimes));
    const recommended = Object.keys(sectionTimes).find(id => sectionTimes[id] === maxTime);
    if (recommended && recommended !== 'home') {
        showAlert(`Recommendation: Check out ${recommended.charAt(0).toUpperCase() + recommended.slice(1)}!`);
    }
}

// Security Fingerprint
const deviceInfo = document.getElementById('device-info');
const browserInfo = document.getElementById('browser-info');
const screenInfo = document.getElementById('screen-info');

if (deviceInfo && browserInfo && screenInfo) {
    deviceInfo.textContent = navigator.platform || 'Unknown';
    browserInfo.textContent = navigator.userAgent.match(/(Chrome|Firefox|Safari|Edge)\/[\d.]+/)?.[0] || 'Unknown';
    screenInfo.textContent = `${window.screen.width}x${window.screen.height}`;
}

// Terminal Chat
const chatOutput = document.getElementById('chat-output');
function sendChatMessage() {
    const input = document.querySelector('#contact input');
    if (input) {
        const message = input.value.trim();
        if (message.startsWith('send message=')) {
            const content = message.slice(12);
            chatOutput.innerHTML += `<p>> ${message}</p><p>> Message sent to Mohamed Samir!</p>`;
            chatOutput.scrollTop = chatOutput.scrollHeight;
            input.value = '';
        } else {
            chatOutput.innerHTML += `<p>> Invalid command. Use: send message=Your message</p>`;
            chatOutput.scrollTop = chatOutput.scrollHeight;
        }
    }
}

const contactInput = document.querySelector('#contact input');
if (contactInput) {
    contactInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
}

// Dark AI Assistant
const assistant = document.querySelector('.ai-assistant');
const assistantHeader = document.querySelector('.assistant-header');
const assistantBody = document.getElementById('assistant-body');
const assistantInput = document.querySelector('.assistant-input');
const assistantSend = document.querySelector('.assistant-send');

if (assistant && assistantHeader) {
    assistantHeader.addEventListener('click', () => {
        assistant.classList.toggle('active');
    });
}

if (assistantSend && assistantInput && assistantBody) {
    const assistantResponses = {
        'who are you': 'I’m Mohamed Samir, an AI & Cybersecurity specialist!',
        'what do you do': 'I develop secure AI solutions and perform ethical hacking.',
        'projects': 'Check out my projects like AI Intrusion Detection and Secure Chat App!',
        'contact': 'Reach me at mohamed.samir@example.com or +1234567890.',
        'education': 'Studying AI & Cybersecurity, with certifications like CEH and OSCP.',
        'default': 'Ask about my projects, education, or contact details!'
    };

    assistantSend.addEventListener('click', () => {
        const question = assistantInput.value.trim().toLowerCase();
        const response = assistantResponses[question] || assistantResponses['default'];
        const message = document.createElement('p');
        message.textContent = `> ${response}`;
        assistantBody.appendChild(message);
        assistantBody.scrollTop = assistantBody.scrollHeight;
        assistantInput.value = '';
    });

    assistantInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            assistantSend.click();
        }
    });
}

// Cybersecurity Alerts
const cyberAlert = document.getElementById('cyber-alert');
if (cyberAlert) {
    const alerts = [
        'Unauthorized access detected!',
        'Firewall active.',
        'System scan complete.',
        'Intrusion attempt blocked.'
    ];

    function showRandomAlert() {
        cyberAlert.textContent = alerts[Math.floor(Math.random() * alerts.length)];
        cyberAlert.style.display = 'block';
        if (typeof gsap !== 'undefined') {
            gsap.from(cyberAlert, { opacity: 0, y: -20, duration: 0.5 });
            setTimeout(() => {
                gsap.to(cyberAlert, { opacity: 0, duration: 0.5, onComplete: () => cyberAlert.style.display = 'none' });
            }, 3000);
        } else {
            setTimeout(() => {
                cyberAlert.style.display = 'none';
            }, 3000);
        }
    }

    setInterval(showRandomAlert, 30000);
}

// Back to Top Button
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Hacking Mini Game
function hackStage(stage) {
    const input = document.querySelector(`#${stage}-stage input`);
    const codes = {
        firewall: 'FIREWALL2025',
        captcha: 'CAPTCHA2025',
        network: 'NETWORK2025'
    };
    if (input && input.value === codes[stage]) {
        const stageElement = document.getElementById(`${stage}-stage`);
        if (stageElement) stageElement.style.display = 'none';
        if (stage === 'firewall') {
            const captchaStage = document.getElementById('captcha-stage');
            const projectsChallenge = document.querySelector('#projects-challenge');
            const projectsGrid = document.querySelector('#projects .projects-grid');
            if (captchaStage) captchaStage.style.display = 'block';
            if (projectsChallenge) projectsChallenge.style.display = 'none';
            if (projectsGrid) {
                projectsGrid.style.display = 'grid';
                if (typeof gsap !== 'undefined') {
                    gsap.from(projectsGrid, { opacity: 0, y: 50, duration: 0.5 });
                }
            }
        } else if (stage === 'captcha') {
            const networkStage = document.getElementById('network-stage');
            const skillsChallenge = document.querySelector('#skills-challenge');
            const skillsGrid = document.querySelector('#skills .skills-grid');
            if (networkStage) networkStage.style.display = 'block';
            if (skillsChallenge) skillsChallenge.style.display = 'none';
            if (skillsGrid) {
                skillsGrid.style.display = 'block';
                if (typeof gsap !== 'undefined') {
                    gsap.from(skillsGrid, { opacity: 0, y: 50, duration: 0.5 });
                }
            }
        } else if (stage === 'network') {
            const certsChallenge = document.querySelector('#certifications-challenge');
            const certsGrid = document.querySelector('#certifications .certifications-grid');
            if (certsChallenge) certsChallenge.style.display = 'none';
            if (certsGrid) {
                certsGrid.style.display = 'grid';
                if (typeof gsap !== 'undefined') {
                    gsap.from(certsGrid, { opacity: 0, y: 50, duration: 0.5 });
                }
            }
        }
        showAlert(`Stage ${stage.charAt(0).toUpperCase() + stage.slice(1)} Breached!`);
    } else {
        alert(`Incorrect code. Try ${codes[stage]}.`);
    }
}

// Easter Eggs
let keySequence = '';
document.addEventListener('keydown', (e) => {
    keySequence += e.key;
    if (keySequence.includes('hacker')) {
        const easterEggModal = document.getElementById('easter-egg-modal');
        if (easterEggModal) {
            easterEggModal.style.display = 'flex';
            if (typeof gsap !== 'undefined') {
                gsap.from('#easter-egg-modal .modal-content', { scale: 0.3, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' });
            }
            keySequence = '';
        }
    }
}, { passive: true });

function closeEasterEggModal() {
    const easterEggModal = document.getElementById('easter-egg-modal');
    if (easterEggModal) {
        if (typeof gsap !== 'undefined') {
            gsap.to('#easter-egg-modal .modal-content', {
                scale: 0.3,
                opacity: 0,
                duration: 0.4,
                onComplete: () => easterEggModal.style.display = 'none'
            });
        } else {
            easterEggModal.style.display = 'none';
        }
    }
}

// Recruit Modal
function openRecruitModal() {
    const recruitModal = document.getElementById('recruit-modal');
    if (recruitModal) {
        recruitModal.style.display = 'flex';
        if (typeof gsap !== 'undefined') {
            gsap.from('#recruit-modal .modal-content', { scale: 0.3, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' });
        }
    }
}

function closeRecruitModal() {
    const recruitModal = document.getElementById('recruit-modal');
    if (recruitModal) {
        if (typeof gsap !== 'undefined') {
            gsap.to('#recruit-modal .modal-content', {
                scale: 0.3,
                opacity: 0,
                duration: 0.4,
                onComplete: () => recruitModal.style.display = 'none'
            });
        } else {
            recruitModal.style.display = 'none';
        }
    }
}

function submitRecruit() {
    const codenameInput = document.querySelector('#recruit-modal input');
    if (codenameInput) {
        const codename = codenameInput.value.trim();
        if (codename) {
            showAlert(`Welcome to the squad, ${codename}!`);
            closeRecruitModal();
        } else {
            alert('Please enter a codename.');
        }
    }
}

const contactContainer = document.querySelector('#contact .contact-container');
if (contactContainer) {
    contactContainer.insertAdjacentHTML('beforeend', '<button class="recruit-button" onclick="openRecruitModal()">Join Secret Network</button>');
}

// AI/Cyber Quiz
const quizContainer = document.getElementById('quiz-questions');
if (quizContainer) {
    const quizQuestions = [
        {
            question: 'What is the primary goal of a neural network in AI?',
            options: ['Data encryption', 'Pattern recognition', 'File compression', 'Network scanning'],
            answer: 'Pattern recognition'
        },
        {
            question: 'Which algorithm is commonly used for supervised learning?',
            options: ['K-Means', 'Linear Regression', 'DBSCAN', 'Apriori'],
            answer: 'Linear Regression'
        },
        {
            question: 'What is the main purpose of a GAN in AI?',
            options: ['Generate synthetic data', 'Classify images', 'Optimize networks', 'Encrypt data'],
            answer: 'Generate synthetic data'
        },
        {
            question: 'What is a common method to prevent SQL injection?',
            options: ['Use prepared statements', 'Increase server bandwidth', 'Disable JavaScript', 'Use plain text passwords'],
            answer: 'Use prepared statements'
        },
        {
            question: 'What does a firewall primarily protect against?',
            options: ['Unauthorized access', 'Data loss', 'Hardware failure', 'Software bugs'],
            answer: 'Unauthorized access'
        }
    ];

    function loadQuiz() {
        quizQuestions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'quiz-question';
            questionDiv.innerHTML = `
                <p>${q.question}</p>
                ${q.options.map((option, i) => `
                    <label>
                        <input type="radio" name="question-${index}" value="${option}">
                        ${option}
                    </label>
                `).join('')}
            `;
            quizContainer.appendChild(questionDiv);
        });
    }

    function submitQuiz() {
        let score = 0;
        quizQuestions.forEach((q, index) => {
            const selected = document.querySelector(`input[name="question-${index}"]:checked`);
            if (selected && selected.value === q.answer) {
                score++;
            }
        });
        const resultDiv = document.getElementById('quiz-result');
        if (resultDiv) {
            resultDiv.textContent = `Your score: ${score}/${quizQuestions.length}! ${score >= 3 ? 'Elite Hacker!' : 'Keep practicing!'}`;
            if (typeof gsap !== 'undefined') {
                gsap.from(resultDiv, { opacity: 0, y: 20, duration: 0.5 });
            }
        }
    }

    document.addEventListener('DOMContentLoaded', loadQuiz);
}

// Cyber Dashboard
const dashboardCanvas = document.getElementById('dashboard-canvas');
if (dashboardCanvas && typeof THREE !== 'undefined') {
    const dashboardScene = new THREE.Scene();
    const dashboardCamera = new THREE.PerspectiveCamera(75, dashboardCanvas.width / dashboardCanvas.height, 0.1, 1000);
    const dashboardRenderer = new THREE.WebGLRenderer({ canvas: dashboardCanvas, alpha: true });
    dashboardRenderer.setSize(dashboardCanvas.width, dashboardCanvas.height);
    dashboardCamera.position.z = 50;

    const attackNodes = new THREE.Group();
    const attackNodeCount = 100;
    const attackPositions = new Float32Array(attackNodeCount * 3);
    const attackVelocities = new Float32Array(attackNodeCount * 3);

    for (let i = 0; i < attackNodeCount; i++) {
        attackPositions[i * 3] = (Math.random() - 0.5) * 100;
        attackPositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        attackPositions[i * 3 + 2] = (Math.random() - 0.5) * 100;
        attackVelocities[i * 3] = (Math.random() - 0.5) * 0.05;
        attackVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
        attackVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
    }

    const attackGeometry = new THREE.BufferGeometry();
    attackGeometry.setAttribute('position', new THREE.BufferAttribute(attackPositions, 3));
    const attackMaterial = new THREE.PointsMaterial({ color: 0x00cc00, size: 0.5, transparent: true, opacity: 0.6 });
    const attackSystem = new THREE.Points(attackGeometry, attackMaterial);
    attackNodes.add(attackSystem);

    dashboardScene.add(attackNodes);

    function animateDashboard() {
        requestAnimationFrame(animateDashboard);
        for (let i = 0; i < attackNodeCount; i++) {
            attackPositions[i * 3] += attackVelocities[i * 3];
            attackPositions[i * 3 + 1] += attackVelocities[i * 3 + 1];
            attackPositions[i * 3 + 2] += attackVelocities[i * 3 + 2];
            if (Math.abs(attackPositions[i * 3]) > 50) attackVelocities[i * 3] *= -1;
            if (Math.abs(attackPositions[i * 3 + 1]) > 50) attackVelocities[i * 3 + 1] *= -1;
            if (Math.abs(attackPositions[i * 3 + 2]) > 50) attackVelocities[i * 3 + 2] *= -1;
        }
        attackGeometry.attributes.position.needsUpdate = true;
        dashboardRenderer.render(dashboardScene, dashboardCamera);
    }

    animateDashboard();
}

// Do Not Press Button
function triggerCollapse() {
    const collapseMessage = document.getElementById('collapse-message');
    if (collapseMessage) {
        document.querySelectorAll('section, .sidebar, .command-line, .settings-panel').forEach(el => {
            if (typeof gsap !== 'undefined') {
                gsap.to(el, { opacity: 0, scale: 0.5, duration: 1, ease: 'power4.out' });
            } else {
                el.style.display = 'none';
            }
        });
        document.body.style.background = 'var(--attack-bg)';
        collapseMessage.style.display = 'block';
        if (typeof gsap !== 'undefined') {
            gsap.from(collapseMessage, { opacity: 0, scale: 0.3, duration: 0.6, ease: 'back.out(1.7)' });
            setTimeout(() => {
                gsap.to(collapseMessage, {
                    opacity: 0,
                    duration: 1,
                    onComplete: () => {
                        collapseMessage.style.display = 'none';
                        document.querySelectorAll('section, .sidebar, .command-line, .settings-panel').forEach(el => {
                            gsap.to(el, { opacity: 1, scale: 1, duration: 1 });
                            el.style.display = '';
                        });
                        document.body.style.background = 'var(--bg)';
                    }
                });
            }, 3000);
        } else {
            setTimeout(() => {
                collapseMessage.style.display = 'none';
                document.querySelectorAll('section, .sidebar, .command-line, .settings-panel').forEach(el => {
                    el.style.display = '';
                });
                document.body.style.background = 'var(--bg)';
            }, 3000);
        }
    }
}

// Fake FBI Warning
const fbiWarning = document.getElementById('fbi-warning');
const fbiJoke = document.getElementById('fbi-joke');

if (fbiWarning && fbiJoke) {
    function triggerFBIWarning() {
        fbiWarning.style.display = 'flex';
        if (typeof gsap !== 'undefined') {
            gsap.to(fbiWarning, { opacity: 1, duration: 0.5 });
            setTimeout(() => {
                fbiJoke.style.display = 'block';
                gsap.from(fbiJoke, { opacity: 0, y: 20, duration: 0.5 });
                setTimeout(() => {
                    gsap.to(fbiWarning, {
                        opacity: 0,
                        duration: 1,
                        onComplete: () => fbiWarning.style.display = 'none'
                    });
                }, 2000);
            }, 3000);
        } else {
            setTimeout(() => {
                fbiJoke.style.display = 'block';
                setTimeout(() => {
                    fbiWarning.style.display = 'none';
                }, 2000);
            }, 3000);
        }
    }

    setTimeout(triggerFBIWarning, 120000);
}

// Fake Breach Animation
function triggerFakeBreach(projectId) {
    const fakeBreach = document.getElementById('fake-breach');
    const breachTimer = document.getElementById('breach-timer');
    if (fakeBreach && breachTimer) {
        fakeBreach.style.display = 'flex';
        if (typeof gsap !== 'undefined') {
            gsap.to(fakeBreach, { opacity: 1, duration: 0.5 });
        }
        let timeLeft = 5;
        breachTimer.textContent = timeLeft;
        const timer = setInterval(() => {
            timeLeft--;
            breachTimer.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                if (typeof gsap !== 'undefined') {
                    gsap.to(fakeBreach, {
                        opacity: 0,
                        duration: 1,
                        onComplete: () => {
                            fakeBreach.style.display = 'none';
                            modalTitle.textContent = projects[projectId].title;
                            modalDescription.textContent = projects[projectId].description;
                            modalLink.href = projects[projectId].link;
                            modal.style.display = 'flex';
                            gsap.from('.modal-content', { scale: 0.3, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' });
                        }
                    });
                } else {
                    fakeBreach.style.display = 'none';
                    modalTitle.textContent = projects[projectId].title;
                    modalDescription.textContent = projects[projectId].description;
                    modalLink.href = projects[projectId].link;
                    modal.style.display = 'flex';
                }
            }
        }, 1000);
    }
}

document.querySelectorAll('.project-card').forEach(card => {
    card.removeEventListener('click', card.onclick);
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project') - 1;
        triggerFakeBreach(projectId);
    });
});
