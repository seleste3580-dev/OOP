/**
 * SELESTE TECHNOLOGIES - ADVANCED EDUCATIONAL ENGINE v2.0
 * Features: High-Density Content, Stamped PDF Generation, Official Branding
 */

const { jsPDF } = window.jspdf;

// 1. COMPREHENSIVE LESSON DATABASE
const lessons = [
    {
        id: 1,
        level: 'beginner',
        cat: 'Rust OOP',
        title: 'Mastering Structs & Data Architecture',
        desc: 'A complete guide to memory-safe data modeling in Rust.',
        curriculum: [
            { title: "Introduction to Systems Modeling", content: "Unlike traditional OOP languages like Java or C++, Rust decouples state (structs) from behavior (impl). This architectural choice prevents common memory leaks and data races." },
            { title: "Struct Variants", content: "1. Classic Structs: For complex entities. 2. Tuple Structs: For lightweight data types like coordinates. 3. Unit Structs: For marker traits and zero-cost abstractions." },
            { title: "Memory Layout", content: "Rust structs are packed by the compiler for optimal cache alignment. We will explore how #[repr(C)] can be used for hardware compatibility." }
        ],
        code: `// Official Seleste Technologies Pattern\nstruct SatelliteController {\n    id: u64,\n    power_state: bool,\n    buffer: Vec<u8>,\n}\n\nimpl SatelliteController {\n    pub fn new(id: u64) -> Self {\n        Self { id, power_state: false, buffer: Vec::with_capacity(1024) }\n    }\n}`
    },
    {
        id: 2,
        level: 'intermediate',
        cat: 'Embedded Systems',
        title: 'Peripheral Access & MMIO Mastery',
        desc: 'Interfacing with hardware registers using memory-mapped I/O.',
        curriculum: [
            { title: "Understanding Register Maps", content: "Every hardware peripheral (GPIO, UART, DMA) is mapped to a specific address in the memory space. Manipulating these addresses directly is the core of embedded development." },
            { title: "The Volatile Pattern", content: "We use 'volatile' operations to prevent the compiler from optimizing away hardware reads/writes that it might think are redundant." },
            { title: "Safe Abstractions", content: "Creating a Hardware Abstraction Layer (HAL) to wrap 'unsafe' raw pointer manipulation into safe, idiomatic Rust code." }
        ],
        code: `// Writing to a 32-bit Control Register\nconst GPIOA_BASE: usize = 0x4002_0000;\nconst GPIO_MODER_OFFSET: usize = 0x00;\n\nfn set_pin_mode() {\n    let moder = (GPIOA_BASE + GPIO_MODER_OFFSET) as *mut u32;\n    unsafe { core::ptr::write_volatile(moder, 0x01); }\n}`
    },
    {
        id: 3,
        level: 'guru',
        cat: 'Rust for Embedded',
        title: 'Developing a Custom RTOS Kernel',
        desc: 'The ultimate guide to task scheduling and bare-metal context switching.',
        curriculum: [
            { title: "The Task Control Block (TCB)", content: "To build a Real-Time Operating System, we must define how tasks are stored in memory, including their stack pointers and priority levels." },
            { title: "Context Switching", content: "Using assembly instructions to save the current CPU state (registers R0-R15) and loading the state of the next task in the queue." },
            { title: "Preemptive vs Cooperative", content: "Implementing a SysTick timer interrupt to force-switch tasks for high-reliability systems." }
        ],
        code: `// Guru-Level Assembler Wrapper for ARM Cortex-M\n#[naked]\n#[no_mangle]\npub unsafe extern "C" fn PendSV_Handler() {\n    asm!(\n        "mrs r0, psp",\n        "stmdb r0!, {{r4-r11}}",\n        "bl get_next_tcb_stack_ptr",\n        "ldmia r0!, {{r4-r11}}",\n        "msr psp, r0",\n        "bx lr",\n        options(noreturn)\n    );\n}`
    }
];

// Fill placeholders up to 105 lessons with professional filler
for (let i = 4; i <= 105; i++) {
    let lvl = i < 30 ? 'beginner' : i < 60 ? 'intermediate' : i < 90 ? 'expert' : 'guru';
    lessons.push({
        id: i,
        level: lvl,
        cat: 'Systems Engineering',
        title: `Technical Module ${i}: Industrial Logic`,
        desc: `High-fidelity exploration of module ${i} within the global roadmap.`,
        curriculum: [
            { title: "Executive Summary", content: "This module provides the theoretical and practical framework required for industrial-scale systems deployment." },
            { title: "Implementation Strategy", content: "Covering safety-critical design patterns and zero-cost abstraction overhead analysis." }
        ],
        code: `// Standard Module ${i} Template\nfn process_logic() {\n    let priority = ${i};\n    log::info!("Executing priority sequence: {}", priority);\n}`
    });
}

// 2. UI HANDLERS
const grid = document.getElementById('lessonGrid');
const modal = document.getElementById('lessonModal');
const modalBody = document.getElementById('modalBody');

function renderLessons(lvl = 'all', query = '') {
    grid.innerHTML = '';
    const filtered = lessons.filter(l => (lvl === 'all' || l.level === lvl) && l.title.toLowerCase().includes(query.toLowerCase()));
    
    filtered.forEach(l => {
        const div = document.createElement('div');
        div.className = 'card';
        div.onclick = () => openLesson(l.id);
        div.innerHTML = `<span class="badge ${l.level}">${l.level}</span><h3>${l.title}</h3><p>${l.desc}</p>`;
        grid.appendChild(div);
    });
}

let activeLessonId = null;

function openLesson(id) {
    const l = lessons.find(lx => lx.id === id);
    activeLessonId = id;
    modalBody.innerHTML = `
        <h1 style="color:var(--neon-cyan)">${l.title}</h1>
        ${l.curriculum.map(c => `<h4>${c.title}</h4><p>${c.content}</p>`).join('')}
        <pre><code>${l.code}</code></pre>
    `;
    modal.style.display = 'block';
}

// 3. THE "SELESTE" PDF GENERATOR (The Powerhouse)
async function downloadPDF() {
    const l = lessons.find(lx => lx.id === activeLessonId);
    const doc = new jsPDF();
    
    // --- Page Setup & Official Stamp ---
    const addBranding = (pageDoc) => {
        // 1. Diagonal Official Stamp
        pageDoc.setGState(new pageDoc.GState({opacity: 0.1}));
        pageDoc.setTextColor(200, 0, 0); // Reddish
        pageDoc.setFontSize(60);
        pageDoc.text("SELESTE TECHNOLOGIES", 35, 150, { angle: 45 });
        pageDoc.setGState(new pageDoc.GState({opacity: 1}));

        // 2. Header
        pageDoc.setFillColor(15, 23, 42); // Navy Header
        pageDoc.rect(0, 0, 210, 25, 'F');
        pageDoc.setTextColor(255, 255, 255);
        pageDoc.setFontSize(16);
        pageDoc.text("SELESTE TECHNOLOGIES | ACADEMY", 15, 15);
        
        // 3. Footer
        pageDoc.setFontSize(8);
        pageDoc.setTextColor(100);
        pageDoc.text(`Official Lesson ID: ST-00${l.id} | Page ${pageDoc.internal.getNumberOfPages()}`, 15, 285);
        pageDoc.text("Verified Systems Engineering Curriculum", 150, 285);
    };

    addBranding(doc);

    // --- Content Rendering ---
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(22);
    doc.text(l.title, 15, 45);
    
    let yPos = 60;
    l.curriculum.forEach(section => {
        if (yPos > 250) { doc.addPage(); addBranding(doc); yPos = 40; }
        doc.setFontSize(14);
        doc.setTextColor(50, 50, 150);
        doc.text(section.title, 15, yPos);
        yPos += 7;
        doc.setFontSize(10);
        doc.setTextColor(30, 30, 30);
        const splitText = doc.splitTextToSize(section.content, 180);
        doc.text(splitText, 15, yPos);
        yPos += (splitText.length * 5) + 10;
    });

    // --- Code Example Block ---
    if (yPos > 200) { doc.addPage(); addBranding(doc); yPos = 40; }
    doc.setFillColor(240, 240, 240);
    doc.rect(15, yPos, 180, 60, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.text("OFFICIAL CODE SNIPPET:", 20, yPos + 10);
    doc.setFont("courier", "normal");
    doc.setFontSize(9);
    doc.text(l.code, 20, yPos + 20);

    doc.save(`Seleste_Tech_Lesson_${l.id}.pdf`);
}

// 4. INIT
renderLessons();
