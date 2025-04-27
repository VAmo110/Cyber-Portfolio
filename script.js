// Initialize AOS
AOS.init({
    duration: 1400,
    once: true,
    offset: 120
});

// Hacking Simulation
const hackingScreen = document.getElementById('hacking-screen');
const hackCode = document.getElementById('hack-code');
const hackProgress = document.querySelector('.hack-progress .progress-bar');
const hackProgressText = document.querySelector('.hack-progress .progress-text');
const accessMessage = document.getElementById('access-message');

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

gsap.to(hackProgress, {
    width: '100%',
    duration: 5,
    onUpdate: () => {
        const progress = Math.round(gsap.getProperty(hackProgress, 'width') / hackProgress.parentElement.offsetWidth * 100);
        hackProgressText.textContent = `${progress}%`;
    },
    onComplete: () => {
        accessMessage.textContent = 'Access Granted';
        gsap.to(accessMessage, { opacity: 1, duration: 0.5 });
        setTimeout(() => {
            gsap.to(hackingScreen, {
                opacity: 0,
                duration: 1,
                onComplete: () => hackingScreen.style.display = 'none'
            });
            document.getElementById('name-animation').style.display = 'block';
            animateName();
        }, 1000);
    }
});

// Name Animation
const nameCanvas = document.getElementById('name-animation');
const nameCtx = nameCanvas.getContext('2d');
nameCanvas.width = window.innerWidth;
nameCanvas.height = window.innerHeight;

const particles = [];
const particleCount = 200;
for (let i = 0; i < particleCount; i++) {
    particles.push({
        x: Math.random() * nameCanvas.width,
        y: Math.random() * nameCanvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        targetX: 0,
        targetY: 0
    });
}

function animateName() {
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
        gsap.to(nameCanvas, {
            opacity: 0,
            duration: 1,
            onComplete: () => nameCanvas.style.display = 'none'
        });
        return;
    }
    
    requestAnimationFrame(animateName);
}

// 3D Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('matrix-bg'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 50;

const nodes = new THREE.Group();
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

// Virtual Identity Avatar
const avatarCanvas = document.getElementById('avatar-canvas');
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

// Custom Cursor
const cursor = document.querySelector('.cursor');
const trails = [];
const trailCount = 6;

for (let i = 0; i < trailCount; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);
    trails.push(trail);
}

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { left: e.clientX, top: e.clientY, duration: 0.1 });
    trails.forEach((trail, index) => {
        setTimeout(() => {
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            trail.style.opacity = 0.6 - (index / trailCount);
        }, index * 10);
    });
});

// Virus Simulation
const virusWindows = document.getElementById('virus-windows');
function showVirusWindows() {
    for (let i = 0; i < 3; i++) {
        const window = document.createElement('div');
        window.className = 'virus-window';
        window.textContent = `ERROR: System Compromised #${Math.random().toString(36).substr(2, 5)}`;
        window.style.top = `${Math.random() * 80}%`;
        window.style.left = `${Math.random() * 80}%`;
        virusWindows.appendChild(window);
        gsap.from(window, { scale: 0, opacity: 0, duration: 0.5, delay: i * 0.2 });
    }
    setTimeout(() => {
        gsap.to('.virus-window', {
            opacity: 0,
            duration: 0.5,
            onComplete: () => virusWindows.innerHTML = ''
        });
    }, 3000);
}

setTimeout(showVirusWindows, 5000);

// Sidebar Toggle
const sidebar = document.querySelector('.sidebar');
const toggle = document.querySelector('.sidebar-toggle');

toggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    gsap.to(sidebar, { left: sidebar.classList.contains('active') ? 0 : -300, duration: 0.4 });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        sidebar.classList.remove('active');
        gsap.to(sidebar, { left: -300, duration: 0.4 });
    });
});

// Settings Panel
const settingsPanel = document.getElementById('settings-panel');
const settingsToggle = document.querySelector('.settings-toggle');
const themeSelect = document.getElementById('theme-select');
const langSelect = document.getElementById('lang-select');
const animationIntensity = document.getElementById('animation-intensity');

settingsToggle.addEventListener('click', () => {
    settingsPanel.classList.toggle('active');
    gsap.to(settingsPanel, { left: settingsPanel.classList.contains('active') ? 0 : -300, duration: 0.4 });
});

themeSelect.addEventListener('change', () => {
    document.body.setAttribute('data-theme', themeSelect.value);
});

langSelect.addEventListener('change', () => {
    document.body.classList.toggle('rtl', langSelect.value === 'ar');
    updateTranslations(langSelect.value);
});

animationIntensity.addEventListener('input', () => {
    gsap.globalTimeline.timeScale(animationIntensity.value);
});

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
    'home': () => document.querySelector('#home').scrollIntoView({ behavior: 'smooth' }),
    'about': () => document.querySelector('#about').scrollIntoView({ behavior: 'smooth' }),
    'projects': () => document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' }),
    'skills': () => document.querySelector('#skills').scrollIntoView({ behavior: 'smooth' }),
    'certifications': () => document.querySelector('#certifications').scrollIntoView({ behavior: 'smooth' }),
    'security': () => document.querySelector('#security').scrollIntoView({ behavior: 'smooth' }),
    'contact': () => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }),
    'theme cyberpunk': () => themeSelect.value = 'cyberpunk' && themeSelect.dispatchEvent(new Event('change')),
    'theme hacker': () => themeSelect.value = 'hacker' && themeSelect.dispatchEvent(new Event('change')),
    'theme matrix': () => themeSelect.value = 'matrix' && themeSelect.dispatchEvent(new Event('change')),
    'lang en': () => langSelect.value = 'en' && langSelect.dispatchEvent(new Event('change')),
    'lang ar': () => langSelect.value = 'ar' && langSelect.dispatchEvent(new Event('change'))
};

function runCommand() {
    const command = commandInput.value.trim().toLowerCase();
    if (commands[command]) {
        commands[command]();
        commandInput.value = '';
    } else {
        alert('Unknown command. Try: home, projects, theme matrix, lang ar');
    }
}

commandInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        runCommand();
    }
});

// About Terminal Text Animation
const terminalLines = document.querySelectorAll('#about .terminal-text p');
terminalLines.forEach((line, appreciating) => {
    gsap.from(line, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: appreciating * 0.5,
        scrollTrigger: {
            trigger: '#about',
            start: 'top 80%'
        }
    });
});

// Skills Progress Animation
const progressBars = document.querySelectorAll('.progress-bar');
window.addEventListener('scroll', () => {
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const progress = bar.getAttribute('data-progress');
            gsap.to(bar, { width: `${progress}%`, duration: 2 });
            gsap.to(bar.querySelector('.progress-text'), {
                duration: 2,
                textContent: `${progress}%`,
                snap: { textContent: 1 }
            });
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

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project') - 1;
        modalTitle.textContent = projects[projectId].title;
        modalDescription.textContent = projects[projectId].description;
        modalLink.href = projects[projectId].link;
        modal.style.display = 'flex';
        gsap.from('.modal-content', { scale: 0.3, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' });
    });
});

modalClose.addEventListener('click', () => {
    gsap.to('.modal-content', {
        scale: 0.3,
        opacity: 0,
        duration: 0.4,
        onComplete: () => modal.style.display = 'none'
    });
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        gsap.to('.modal-content', {
            scale: 0.3,
            opacity: 0,
            duration: 0.4,
            onComplete: () => modal.style.display = 'none'
        });
    }
});

// Gamification
function solveChallenge(section) {
    const input = document.querySelector(`#${section}-challenge input`);
    if (section === 'projects' && input.value === 'HACK2023') {
        document.querySelector(`#${section}-challenge`).style.display = 'none';
        document.querySelector(`#${section} .projects-grid`).style.display = 'grid';
        gsap.from(`#${section} .projects-grid`, { opacity: 0, y: 50, duration: 0.5 });
    } else {
        alert('Incorrect code. Try HACK2023.');
    }
}

function checkFileOrder(section) {
    const files = document.querySelectorAll(`#${section}-challenge .file`);
    const order = Array.from(files).map(file => file.getAttribute('data-id'));
    if (order.join(',') === 'AI,Cyber,Code') {
        document.querySelector(`#${section}-challenge`).style.display = 'none';
        document.querySelector(`#${section} .skills-grid`).style.display = 'block';
        gsap.from(`#${section} .skills-grid`, { opacity: 0, y: 50, duration: 0.5 });
    } else {
        alert('Incorrect order. Try AI, Cyber, Code.');
    }
}

let draggedFile = null;
document.querySelectorAll('#skills-challenge .file').forEach(file => {
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
        const alert = document.getElementById('cyber-alert');
        alert.textContent = `Recommendation: Check out ${recommended.charAt(0).toUpperCase() + recommended.slice(1)}!`;
        alert.style.display = 'block';
        gsap.from(alert, { opacity: 0, y: -20, duration: 0.5 });
        setTimeout(() => {
            gsap.to(alert, { opacity: 0, duration: 0.5, onComplete: () => alert.style.display = 'none' });
        }, 3000);
    }
}

// Security Fingerprint
const deviceInfo = document.getElementById('device-info');
const browserInfo = document.getElementById('browser-info');
const screenInfo = document.getElementById('screen-info');

deviceInfo.textContent = navigator.platform || 'Unknown';
browserInfo.textContent = navigator.userAgent.match(/(Chrome|Firefox|Safari|Edge)\/[\d.]+/)?.[0] || 'Unknown';
screenInfo.textContent = `${window.screen.width}x${window.screen.height}`;

// Terminal Chat
const chatOutput = document.getElementById('chat-output');
function sendChatMessage() {
    const input = document.querySelector('#contact input');
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

document.querySelector('#contact input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
});

// Dark AI Assistant
const assistant = document.querySelector('.ai-assistant');
const assistantHeader = document.querySelector('.assistant-header');
const assistantBody = document.getElementById('assistant-body');
const assistantInput = document.querySelector('.assistant-input');
const assistantSend = document.querySelector('.assistant-send');

assistantHeader.addEventListener('click', () => {
    assistant.classList.toggle('active');
});

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

// Cybersecurity Alerts
const cyberAlert = document.getElementById('cyber-alert');
const alerts = [
    'Unauthorized access detected!',
    'Firewall active.',
    'System scan complete.',
    'Intrusion attempt blocked.'
];

function showAlert() {
    cyberAlert.textContent = alerts[Math.floor(Math.random() * alerts.length)];
    cyberAlert.style.display = 'block';
    gsap.from(cyberAlert, { opacity: 0, y: -20, duration: 0.5 });
    setTimeout(() => {
        gsap.to(cyberAlert, { opacity: 0, duration: 0.5, onComplete: () => cyberAlert.style.display = 'none' });
    }, 3000);
}

setInterval(showAlert, 30000);

// Back to Top Button
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});