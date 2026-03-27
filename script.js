// Database of 100+ Lessons
const lessons = [
    // BEGINNER
    { level: 'beginner', cat: 'Embedded', title: 'Silicon Architecture 101', desc: 'Decoding how ARM Cortex-M microcontrollers process instructions.' },
    { level: 'beginner', cat: 'Rust OOP', title: 'Ownership Fundamentals', desc: 'Why Rust memory management replaces the Garbage Collector.' },
    // Generating 25 Beginner lessons
    ...Array.from({length: 23}, (_, i) => ({
        level: 'beginner', cat: 'General', title: `Core Foundation Module ${i+1}`, desc: 'Establishing the mental model for systems-level programming.'
    })),

    // INTERMEDIATE
    { level: 'intermediate', cat: 'Rust for Embedded', title: 'HAL Abstraction Layers', desc: 'Writing portable code across different hardware vendors.' },
    { level: 'intermediate', cat: 'Embedded', title: 'I2C & SPI Protocol', desc: 'Mastering chip-to-chip communication and timing diagrams.' },
    // Generating 30 Intermediate lessons
    ...Array.from({length: 28}, (_, i) => ({
        level: 'intermediate', cat: 'Systems', title: `Intermediate Architecture ${i+1}`, desc: 'Deep dive into memory safety and thread concurrency.'
    })),

    // EXPERT
    { level: 'expert', cat: 'Embedded', title: 'DMA Direct Memory Access', desc: 'Offloading data transfer from CPU to peripheral controllers.' },
    { level: 'expert', cat: 'Rust OOP', title: 'Dynamic Dispatch & Traits', desc: 'Implementing runtime polymorphism safely in Rust.' },
    // Generating 30 Expert lessons
    ...Array.from({length: 28}, (_, i) => ({
        level: 'expert', cat: 'Advanced', title: `Expert Hardware Protocol ${i+1}`, desc: 'Analyzing complex data races and synchronization primitives.'
    })),

    // GURU
    { level: 'guru', cat: 'Low Level', title: 'Custom RTOS Kernel', desc: 'Building a priority-based scheduler from bare metal assembly.' },
    { level: 'guru', cat: 'Rust', title: 'Procedural Macro Mastery', desc: 'Using compiler-level code generation for optimized drivers.' },
    // Generating 15 Guru lessons
    ...Array.from({length: 13}, (_, i) => ({
        level: 'guru', cat: 'Guru', title: `Black-Belt Module ${i+1}`, desc: 'The absolute peak of systems performance and safety optimization.'
    }))
];

const grid = document.getElementById('lessonGrid');
const countDisp = document.getElementById('count');
const searchInput = document.getElementById('search');

function renderLessons(lvl = 'all', query = '') {
    grid.innerHTML = '';
    const filtered = lessons.filter(l => {
        const matchesLvl = lvl === 'all' || l.level === lvl;
        const matchesSearch = l.title.toLowerCase().includes(query.toLowerCase());
        return matchesLvl && matchesSearch;
    });

    countDisp.innerText = filtered.length;

    filtered.forEach(l => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <span class="badge ${l.level}">${l.level}</span>
            <div style="color:var(--neon-cyan); font-family:'Fira Code'; font-size:0.7rem; margin-bottom:5px;">${l.cat.toUpperCase()}</div>
            <h3>${l.title}</h3>
            <p>${l.desc}</p>
        `;
        grid.appendChild(card);
    });
}

// Event Listeners
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        renderLessons(btn.dataset.level, searchInput.value);
    });
});

searchInput.addEventListener('input', (e) => {
    const activeLvl = document.querySelector('.filter-btn.active').dataset.level;
    renderLessons(activeLvl, e.target.value);
});

// Initial Render
renderLessons();