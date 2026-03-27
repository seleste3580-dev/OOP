/**
 * SELESTE TECHNOLOGIES - LESSON ENGINE
 * Purpose: Manage 100+ lessons, filtering, and modal viewing with PDF support.
 */

// 1. THE LESSON DATABASE
// I have provided detailed starters; you can fill the 'content' for the placeholders.
const lessons = [
    // --- BEGINNER LESSONS ---
    {
        id: 1,
        level: 'beginner',
        cat: 'Rust OOP',
        title: 'Introduction to Structs',
        desc: 'The foundation of data organization in Rust.',
        content: `<h3>Mastering Structs</h3><p>In Rust, we use structs to create custom types. Unlike traditional OOP, data and behavior are separated into 'struct' and 'impl' blocks.</p><ul><li><b>Classic Structs:</b> Named fields.</li><li><b>Tuple Structs:</b> Position-based fields.</li><li><b>Unit Structs:</b> Field-less types used for markers.</li></ul>`,
        code: `struct Satellite {\n    name: String,\n    id: u32,\n    active: bool,\n}\n\nimpl Satellite {\n    fn boost(&self) {\n        println!("{} is firing thrusters!", self.name);\n    }\n}`
    },
    {
        id: 2,
        level: 'beginner',
        cat: 'Embedded Systems',
        title: 'The MCU Architecture',
        desc: 'Understanding Memory-Mapped I/O and Registers.',
        content: `<h3>How Hardware Talks</h3><p>Microcontrollers (MCUs) use Memory-Mapped I/O (MMIO). This means hardware peripherals like LEDs or Sensors are assigned specific memory addresses.</p>`,
        code: `// Writing directly to a register (Conceptual)\nlet gpio_ptr = 0x40021000 as *mut u32;\nunsafe {\n    *gpio_ptr |= 0x1; // Turn on bit 0\n}`
    },
    {
        id: 3,
        level: 'beginner',
        cat: 'General Programming',
        title: 'Ownership & Borrowing',
        desc: 'Rust’s unique way of managing memory without a GC.',
        content: `<h3>The Three Rules</h3><ol><li>Each value has an owner.</li><li>Only one owner at a time.</li><li>When owner goes out of scope, value is dropped.</li></ol>`,
        code: `fn main() {\n    let s1 = String::from("Seleste");\n    let s2 = s1; // s1 is MOVED here\n    // println!("{}", s1); // This would crash!\n}`
    },

    // --- INTERMEDIATE LESSONS ---
    {
        id: 4,
        level: 'intermediate',
        cat: 'Rust OOP',
        title: 'Traits: Shared Behavior',
        desc: 'How Rust handles interfaces and polymorphism.',
        content: `<h3>Defining Traits</h3><p>Traits tell the Rust compiler about functionality a particular type has and can share with other types.</p>`,
        code: `trait Sensor {\n    fn read_data(&self) -> f32;\n}\n\nstruct Thermometer;\nimpl Sensor for Thermometer {\n    fn read_data(&self) -> f32 { 22.5 }\n}`
    },
    {
        id: 5,
        level: 'intermediate',
        cat: 'Rust for Embedded',
        title: 'The no_std Environment',
        desc: 'Programming without the standard library.',
        content: `<h3>Bare Metal Rust</h3><p>In embedded systems, we don't have an OS. We must use #![no_std] to tell Rust not to use things like Vec or String that require a heap.</p>`,
        code: `#![no_std]\n#![no_main]\n\nuse core::panic::PanicInfo;\n\n#[panic_handler]\nfn panic(_info: &PanicInfo) -> ! {\n    loop {}\n}`
    },

    // --- EXPERT LESSONS ---
    {
        id: 6,
        level: 'expert',
        cat: 'Embedded Systems',
        title: 'DMA: Direct Memory Access',
        desc: 'High-speed data transfer without CPU intervention.',
        content: `<h3>Zero-CPU Transfer</h3><p>DMA allows hardware peripherals to send/receive data directly to RAM, freeing the CPU to do complex math or sleep.</p>`,
        code: `// Configuration for a DMA stream\n// 1. Set Peripheral Address\n// 2. Set Memory Address\n// 3. Set Number of items to transfer\n// 4. Enable DMA channel`
    },

    // --- GURU LESSONS ---
    {
        id: 7,
        level: 'guru',
        cat: 'General Programming',
        title: 'Procedural Macros',
        desc: 'Writing code that writes other code at compile time.',
        content: `<h3>Metaprogramming</h3><p>Procedural macros accept Rust code as input, operate on that code, and produce Rust code as output.</p>`,
        code: `#[proc_macro_derive(SelesteIdentity)]\npub fn seleste_derive(input: TokenStream) -> TokenStream {\n    // Magic happens here\n}`
    }
];

// 2. AUTO-GENERATOR FOR 100+ LESSONS
// This fills the remaining slots so your UI looks full and professional immediately.
for (let i = 8; i <= 105; i++) {
    let lvl = i < 30 ? 'beginner' : i < 60 ? 'intermediate' : i < 90 ? 'expert' : 'guru';
    let cat = i % 2 === 0 ? 'Embedded Systems' : 'Rust OOP';
    lessons.push({
        id: i,
        level: lvl,
        cat: cat,
        title: `Advanced Module ${i}: Systems Design`,
        desc: `Deep dive exploration of ${cat} principles level ${i}.`,
        content: `<h3>Detailed Curriculum for Module ${i}</h3><p>This is a specialized deep-dive module under the Seleste Technologies roadmap. Content covers advanced synchronization, memory safety, and hardware interfacing.</p>`,
        code: `// Sample Code for Module ${i}\nfn advanced_function() {\n    let core_priority = ${i};\n    println!("Executing high-level logic...");\n}`
    });
}

// 3. CORE DOM ELEMENTS
const grid = document.getElementById('lessonGrid');
const countDisp = document.getElementById('count');
const searchInput = document.getElementById('search');
const modal = document.getElementById('lessonModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close-btn');

// 4. RENDER FUNCTION
function renderLessons(lvl = 'all', query = '') {
    grid.innerHTML = '';
    
    const filtered = lessons.filter(l => {
        const matchesLvl = lvl === 'all' || l.level === lvl;
        const matchesSearch = l.title.toLowerCase().includes(query.toLowerCase()) || 
                              l.cat.toLowerCase().includes(query.toLowerCase());
        return matchesLvl && matchesSearch;
    });

    countDisp.innerText = filtered.length;

    filtered.forEach(l => {
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = () => openLesson(l.id);
        
        card.innerHTML = `
            <span class="badge ${l.level}">${l.level}</span>
            <div style="color:var(--neon-cyan); font-family:'Fira Code'; font-size:0.7rem; margin-bottom:5px;">${l.cat.toUpperCase()}</div>
            <h3>${l.title}</h3>
            <p>${l.desc}</p>
            <div style="margin-top:20px; color:var(--neon-cyan); font-size:0.8rem; font-weight:bold;">OPEN LESSON →</div>
        `;
        grid.appendChild(card);
    });
}

// 5. MODAL LOGIC
function openLesson(id) {
    const lesson = lessons.find(l => l.id === id);
    if (!lesson) return;

    modalBody.innerHTML = `
        <div style="text-align:right; font-family:'Fira Code'; color:var(--neon-purple); font-size:0.8rem;">
            SELESTE-TECH-REF: 00${lesson.id}
        </div>
        <h1 style="font-size:2.5rem; margin-bottom:10px; color:var(--neon-cyan);">${lesson.title}</h1>
        <div style="margin-bottom:20px; font-weight:bold; color:#888;">Category: ${lesson.cat} | Level: ${lesson.level.toUpperCase()}</div>
        <hr style="border:0; border-top:1px solid #333; margin-bottom:30px;">
        
        <div class="lesson-rich-content" style="font-size:1.1rem; line-height:1.8;">
            ${lesson.content}
        </div>

        <h3 style="margin:40px 0 15px 0; color:var(--neon-purple);">Official Code Implementation</h3>
        <pre id="codeSnippet" style="position:relative;"><code>${lesson.code}</code></pre>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scroll
}

// 6. UTILITY FUNCTIONS
function downloadPDF() {
    window.print();
}

function copyCode() {
    const code = document.getElementById('codeSnippet').innerText;
    navigator.clipboard.writeText(code).then(() => {
        alert("Code copied to clipboard!");
    });
}

// 7. EVENT LISTENERS
closeBtn.onclick = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
};

window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

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

// 8. INITIAL LOAD
renderLessons();
console.log("Seleste Technologies Academy Loaded: 105 Modules Ready.");
