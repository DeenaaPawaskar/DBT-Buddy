// DBT Buddy Application JavaScript

// Application data from the provided JSON
const appData = {
    schools: [
        {
            name: "Government High School Rajampet",
            district: "Kadapa",
            students_total: 245,
            dbt_ready: 198,
            pending: 47
        },
        {
            name: "Zilla Parishad School Mydukur",
            district: "Kadapa",
            students_total: 156,
            dbt_ready: 89,
            pending: 67
        },
        {
            name: "Municipal High School Proddatur",
            district: "Kadapa",
            students_total: 189,
            dbt_ready: 167,
            pending: 22
        }
    ],
    students: [
        {
            id: 1,
            name: "Priya Sharma",
            class: "Class 10",
            aadhaar_status: "Linked",
            dbt_status: "Not Seeded",
            bank: "SBI",
            last_check: "2025-08-25"
        },
        {
            id: 2,
            name: "Ravi Kumar",
            class: "Class 12",
            aadhaar_status: "Linked",
            dbt_status: "DBT Ready",
            bank: "Canara Bank",
            last_check: "2025-08-28"
        },
        {
            id: 3,
            name: "Anjali Reddy",
            class: "Class 11",
            aadhaar_status: "Linked",
            dbt_status: "Pending Verification",
            bank: "Andhra Bank",
            last_check: "2025-08-20"
        }
    ],
    awareness_modules: [
        {
            id: 1,
            title: "Aadhaar Linked vs DBT Seeded",
            title_hi: "आधार लिंक्ड बनाम डीबीटी सीडेड",
            description: "Learn the crucial difference that affects your scholarship",
            description_hi: "अपनी छात्रवृत्ति को प्रभावित करने वाला महत्वपूर्ण अंतर जानें",
            duration: "5 min",
            badge: "DBT Explorer",
            badge_hi: "डीबीटी एक्सप्लोरर"
        },
        {
            id: 2,
            title: "How to Seed Your Account",
            title_hi: "अपने खाते को सीड कैसे करें",
            description: "Step-by-step guide to complete DBT seeding",
            description_hi: "डीबीटी सीडिंग पूरी करने के लिए चरण-दर-चरण गाइड",
            duration: "8 min",
            badge: "Seeding Expert",
            badge_hi: "सीडिंग विशेषज्ञ"
        },
        {
            id: 3,
            title: "Understanding APB System",
            title_hi: "एपीबी सिस्टम को समझना",
            description: "How scholarship money reaches your account",
            description_hi: "छात्रवृत्ति का पैसा आपके खाते तक कैसे पहुंचता है",
            duration: "6 min",
            badge: "APB Master",
            badge_hi: "एपीबी मास्टर"
        }
    ],
    district_stats: {
        total_students: 125000,
        dbt_ready: 89500,
        pending: 35500,
        success_rate: 71.6,
        districts: ["Kadapa", "Kurnool", "Anantapur", "Chittoor"]
    },
    banks: [
        {
            name: "State Bank of India",
            branches: 45,
            seeding_centers: 67
        },
        {
            name: "Canara Bank",
            branches: 32,
            seeding_centers: 41
        },
        {
            name: "Andhra Bank",
            branches: 28,
            seeding_centers: 35
        }
    ]
};

// Application state
let currentLanguage = 'en';
let currentSection = 'home';
let completedModules = [];
let currentStudent = null;
let currentSchool = null;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    // Set initial active navigation
    updateActiveNav();
    
    // Initialize awareness modules
    renderAwarenessModules();
    
    // Initialize school performance data
    renderSchoolPerformance();
    
    // Initialize student list
    renderStudentList();
    
    // Add input formatting for Aadhaar number
    const aadhaarInput = document.getElementById('aadhaar-input');
    if (aadhaarInput) {
        aadhaarInput.addEventListener('input', formatAadhaarInput);
    }
}

function setupEventListeners() {
    // Navigation buttons
    document.querySelectorAll('.nav-link').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const buttonText = this.textContent.toLowerCase();
            if (buttonText.includes('home')) {
                showSection('home');
            } else if (buttonText.includes('student') || buttonText.includes('छात्र')) {
                showSection('student');
            } else if (buttonText.includes('school') || buttonText.includes('स्कूल')) {
                showSection('school');
            } else if (buttonText.includes('admin') || buttonText.includes('प्रशासन')) {
                showSection('admin');
            }
        });
    });

    // Language toggle
    const languageToggle = document.querySelector('.language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleLanguage();
        });
    }

    // Hero buttons
    const heroButtons = document.querySelectorAll('.hero-actions .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const buttonText = this.textContent.toLowerCase();
            if (buttonText.includes('check') || buttonText.includes('चेक')) {
                showSection('student');
            } else if (buttonText.includes('stats') || buttonText.includes('आंकड़े')) {
                scrollToSection('stats');
            }
        });
    });

    // DBT Status check button
    const checkStatusBtn = document.querySelector('[data-en="Check Status"]');
    if (checkStatusBtn) {
        checkStatusBtn.addEventListener('click', checkDBTStatus);
    }

    // School login button
    const schoolLoginBtn = document.querySelector('[data-en="Login"]');
    if (schoolLoginBtn) {
        schoolLoginBtn.addEventListener('click', schoolLogin);
    }

    // Other action buttons
    const csvImportBtn = document.querySelector('[data-en="Import CSV"]');
    if (csvImportBtn) {
        csvImportBtn.addEventListener('click', simulateCSVImport);
    }

    const sendRemindersBtn = document.querySelector('[data-en="Send Reminders"]');
    if (sendRemindersBtn) {
        sendRemindersBtn.addEventListener('click', sendReminders);
    }

    const bulkMessageBtn = document.querySelector('[data-en="Send Message"]');
    if (bulkMessageBtn) {
        bulkMessageBtn.addEventListener('click', sendBulkMessage);
    }

    // Modal close
    const modalCloseBtn = document.querySelector('.modal-close');
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    // Complete module button
    const completeModuleBtn = document.querySelector('[data-en="Mark as Complete"]');
    if (completeModuleBtn) {
        completeModuleBtn.addEventListener('click', completeModule);
    }
}

// Navigation functions
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
        updateActiveNav();
        
        // Add fade-in animation
        targetSection.classList.add('fade-in');
        setTimeout(() => targetSection.classList.remove('fade-in'), 300);
    }
}

function updateActiveNav() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current section nav
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkText = link.textContent.toLowerCase();
        if ((currentSection === 'home' && linkText.includes('home')) ||
            (currentSection === 'student' && (linkText.includes('student') || linkText.includes('छात्र'))) ||
            (currentSection === 'school' && (linkText.includes('school') || linkText.includes('स्कूल'))) ||
            (currentSection === 'admin' && (linkText.includes('admin') || linkText.includes('प्रशासन')))) {
            link.classList.add('active');
        }
    });
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Language toggle functionality
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'hi' : 'en';
    
    // Update the language toggle button text
    const langText = document.getElementById('lang-text');
    if (langText) {
        langText.textContent = currentLanguage === 'en' ? 'हिंदी' : 'English';
    }
    
    // Update all translatable elements
    updateLanguageDisplay();
    
    // Re-render dynamic content that includes text
    renderAwarenessModules();
    
    // Show language change notification
    showToast(currentLanguage === 'en' ? 'Language changed to English' : 'भाषा हिंदी में बदली गई', 'success');
}

function updateLanguageDisplay() {
    document.querySelectorAll('[data-en][data-hi]').forEach(element => {
        const text = currentLanguage === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-hi');
        if (text) {
            element.textContent = text;
        }
    });
}

// DBT Status Check functionality
function formatAadhaarInput(event) {
    let value = event.target.value.replace(/\s+/g, '').replace(/[^0-9]/g, '');
    let formattedValue = value.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3');
    
    if (value.length <= 12) {
        event.target.value = formattedValue.trim();
    }
}

function checkDBTStatus(event) {
    if (event) event.preventDefault();
    
    const aadhaarInput = document.getElementById('aadhaar-input');
    const statusResult = document.getElementById('status-result');
    
    if (!aadhaarInput.value || aadhaarInput.value.replace(/\s/g, '').length !== 12) {
        showToast(currentLanguage === 'en' ? 'Please enter a valid 12-digit Aadhaar number' : 'कृपया एक वैध 12-अंकीय आधार नंबर दर्ज करें', 'error');
        return;
    }
    
    // Add loading state
    const checkBtn = event ? event.target : document.querySelector('[data-en="Check Status"]');
    if (checkBtn) {
        checkBtn.classList.add('loading');
        checkBtn.disabled = true;
    }
    
    // Simulate API call delay
    setTimeout(() => {
        if (checkBtn) {
            checkBtn.classList.remove('loading');
            checkBtn.disabled = false;
        }
        
        // Randomly select a student profile for demonstration
        const randomStudent = appData.students[Math.floor(Math.random() * appData.students.length)];
        currentStudent = randomStudent;
        
        displayDBTStatus(randomStudent);
        statusResult.classList.remove('hidden');
        statusResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 2000);
}

function displayDBTStatus(student) {
    const statusResult = document.getElementById('status-result');
    const isReady = student.dbt_status === 'DBT Ready';
    
    statusResult.className = `status-result ${isReady ? 'success' : 'warning'}`;
    
    const statusHeaderText = currentLanguage === 'en' 
        ? (isReady ? '✅ DBT Ready' : '⚠️ Action Required')
        : (isReady ? '✅ डीबीटी तैयार' : '⚠️ कार्रवाई आवश्यक');
    
    const statusLabels = currentLanguage === 'en' 
        ? {
            aadhaar: 'Aadhaar Status',
            dbt: 'DBT Status', 
            bank: 'Bank',
            lastCheck: 'Last Checked'
        }
        : {
            aadhaar: 'आधार स्थिति',
            dbt: 'डीबीटी स्थिति',
            bank: 'बैंक', 
            lastCheck: 'अंतिम जांच'
        };
    
    const statusHtml = `
        <div class="status-header">
            <h4>${statusHeaderText}</h4>
            <p>${student.name} - ${student.class}</p>
        </div>
        <div class="status-details">
            <div class="status-item">
                <div class="status-item-label">${statusLabels.aadhaar}</div>
                <div class="status-item-value">${student.aadhaar_status}</div>
            </div>
            <div class="status-item">
                <div class="status-item-label">${statusLabels.dbt}</div>
                <div class="status-item-value">${student.dbt_status}</div>
            </div>
            <div class="status-item">
                <div class="status-item-label">${statusLabels.bank}</div>
                <div class="status-item-value">${student.bank}</div>
            </div>
            <div class="status-item">
                <div class="status-item-label">${statusLabels.lastCheck}</div>
                <div class="status-item-value">${new Date(student.last_check).toLocaleDateString()}</div>
            </div>
        </div>
        ${!isReady ? generateSeedingGuide(student.bank) : generateReadyMessage()}
    `;
    
    statusResult.innerHTML = statusHtml;
    
    // Update progress tracker
    markProgressComplete('progress-status-check');
}

function generateSeedingGuide(bankName) {
    const bank = appData.banks.find(b => b.name.includes(bankName)) || appData.banks[0];
    
    const guideText = currentLanguage === 'en' 
        ? {
            title: 'Complete DBT Seeding Process',
            description: 'Your account is Aadhaar-linked but not DBT-enabled. Follow these steps:',
            steps: [
                `Visit your nearest ${bankName} branch`,
                'Carry Aadhaar card and bank passbook',
                'Request for "DBT Seeding" or "NPCI Mapper Registration"',
                'Verify your account details with bank official',
                'Collect acknowledgment receipt'
            ],
            centerText: 'Nearest Centers:',
            buttonText: 'Find Nearest Center'
        }
        : {
            title: 'डीबीटी सीडिंग प्रक्रिया पूरी करें',
            description: 'आपका खाता आधार-लिंक्ड है लेकिन डीबीटी-सक्षम नहीं है। इन चरणों का पालन करें:',
            steps: [
                `अपनी निकटतम ${bankName} शाखा पर जाएं`,
                'आधार कार्ड और बैंक पासबुक ले जाएं',
                '"डीबीटी सीडिंग" या "एनपीसीआई मैपर पंजीकरण" के लिए अनुरोध करें',
                'बैंक अधिकारी के साथ अपने खाते का विवरण सत्यापित करें',
                'पावती रसीद एकत्र करें'
            ],
            centerText: 'निकटतम केंद्र:',
            buttonText: 'निकटतम केंद्र खोजें'
        };
    
    return `
        <div class="seeding-guide">
            <h5>${guideText.title}</h5>
            <p>${guideText.description}</p>
            <ol class="seeding-steps">
                ${guideText.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
            <p><strong>${guideText.centerText}</strong> ${bank.seeding_centers} DBT seeding centers available</p>
            <button class="btn btn--primary mt-16" onclick="findNearestCenter('${bankName}')">${guideText.buttonText}</button>
        </div>
    `;
}

function generateReadyMessage() {
    const readyText = currentLanguage === 'en'
        ? {
            title: '🎉 Congratulations!',
            message: 'Your account is DBT-ready. You will receive scholarship payments directly to your account.',
            buttonText: 'Download DBT Certificate'
        }
        : {
            title: '🎉 बधाई हो!',
            message: 'आपका खाता डीबीटी-तैयार है। आपको छात्रवृत्ति भुगतान सीधे अपने खाते में प्राप्त होगा।',
            buttonText: 'डीबीटी प्रमाणपत्र डाउनलोड करें'
        };
    
    return `
        <div class="seeding-guide" style="background-color: var(--color-bg-3);">
            <h5>${readyText.title}</h5>
            <p>${readyText.message}</p>
            <button class="btn btn--primary mt-16" onclick="downloadCertificate()">${readyText.buttonText}</button>
        </div>
    `;
}

function findNearestCenter(bankName) {
    const message = currentLanguage === 'en' 
        ? `Finding nearest ${bankName} DBT seeding centers...`
        : `निकटतम ${bankName} डीबीटी सीडिंग केंद्र खोजे जा रहे हैं...`;
    showToast(message, 'info');
    
    setTimeout(() => {
        const successMessage = currentLanguage === 'en'
            ? '3 centers found within 5km radius!'
            : '5 किमी त्रिज्या के भीतर 3 केंद्र मिले!';
        showToast(successMessage, 'success');
    }, 1500);
}

function downloadCertificate() {
    const message = currentLanguage === 'en'
        ? 'DBT Certificate downloaded successfully!'
        : 'डीबीटी प्रमाणपत्र सफलतापूर्वक डाउनलोड हुआ!';
    showToast(message, 'success');
}

// Awareness Modules functionality
function renderAwarenessModules() {
    const modulesContainer = document.getElementById('awareness-modules');
    if (!modulesContainer) return;
    
    const modulesHtml = appData.awareness_modules.map(module => {
        const title = currentLanguage === 'en' ? module.title : module.title_hi;
        const description = currentLanguage === 'en' ? module.description : module.description_hi;
        const badge = currentLanguage === 'en' ? module.badge : module.badge_hi;
        
        return `
            <div class="module-card ${completedModules.includes(module.id) ? 'completed' : ''}" data-module-id="${module.id}">
                <div class="module-header">
                    <div class="module-badge">${badge}</div>
                </div>
                <h4>${title}</h4>
                <p>${description}</p>
                <div class="module-duration">📖 ${module.duration}</div>
            </div>
        `;
    }).join('');
    
    modulesContainer.innerHTML = modulesHtml;
    
    // Add event listeners to module cards
    document.querySelectorAll('.module-card').forEach(card => {
        card.addEventListener('click', function() {
            const moduleId = parseInt(this.getAttribute('data-module-id'));
            openModule(moduleId);
        });
    });
}

function openModule(moduleId) {
    const module = appData.awareness_modules.find(m => m.id === moduleId);
    if (!module) return;
    
    const modal = document.getElementById('module-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    const title = currentLanguage === 'en' ? module.title : module.title_hi;
    modalTitle.textContent = title;
    modalBody.innerHTML = generateModuleContent(module);
    
    modal.classList.remove('hidden');
    
    // Store current module for completion
    window.currentModuleId = moduleId;
}

function generateModuleContent(module) {
    const contentMap = {
        1: `
            <div class="module-content">
                <h4>${currentLanguage === 'en' ? 'Understanding the Key Difference' : 'मुख्य अंतर को समझना'}</h4>
                <div class="comparison-visual">
                    <div class="visual-item" style="background-color: var(--color-bg-6); padding: var(--space-16); border-radius: var(--radius-base); margin-bottom: var(--space-16);">
                        <h5>${currentLanguage === 'en' ? '❌ Aadhaar Linked Only' : '❌ केवल आधार लिंक्ड'}</h5>
                        <p>${currentLanguage === 'en' 
                            ? "Your bank account knows your Aadhaar number, but NPCI (National Payments Corporation of India) doesn't know about your account." 
                            : 'आपका बैंक खाता आपके आधार नंबर को जानता है, लेकिन एनपीसीआई (राष्ट्रीय भुगतान निगम) को आपके खाते के बारे में पता नहीं है।'}</p>
                        <p><strong>${currentLanguage === 'en' ? 'Result:' : 'परिणाम:'}</strong> ${currentLanguage === 'en' ? 'Scholarship payments may fail or get delayed.' : 'छात्रवृत्ति भुगतान असफल हो सकता है या विलंबित हो सकता है।'}</p>
                    </div>
                    <div class="visual-item" style="background-color: var(--color-bg-3); padding: var(--space-16); border-radius: var(--radius-base); margin-bottom: var(--space-16);">
                        <h5>${currentLanguage === 'en' ? '✅ DBT Seeded (NPCI Mapped)' : '✅ डीबीटी सीडेड (एनपीसीआई मैप्ड)'}</h5>
                        <p>${currentLanguage === 'en' 
                            ? "Your account is registered with NPCI's central database, enabling direct benefit transfers." 
                            : 'आपका खाता एनपीसीआई के केंद्रीय डेटाबेस में पंजीकृत है, जो प्रत्यक्ष लाभ हस्तांतरण को सक्षम बनाता है।'}</p>
                        <p><strong>${currentLanguage === 'en' ? 'Result:' : 'परिणाम:'}</strong> ${currentLanguage === 'en' ? 'Scholarship payments reach your account instantly.' : 'छात्रवृत्ति भुगतान तुरंत आपके खाते में पहुंच जाता है।'}</p>
                    </div>
                </div>
            </div>
        `,
        2: `
            <div class="module-content">
                <h4>${currentLanguage === 'en' ? 'Step-by-Step DBT Seeding Guide' : 'चरण-दर-चरण डीबीटी सीडिंग गाइड'}</h4>
                <div class="seeding-process">
                    ${generateSteps()}
                </div>
            </div>
        `,
        3: `
            <div class="module-content">
                <h4>${currentLanguage === 'en' ? 'How APB (Aadhaar Payment Bridge) Works' : 'एपीबी (आधार पेमेंट ब्रिज) कैसे काम करता है'}</h4>
                <div class="apb-flow">
                    ${generateAPBFlow()}
                </div>
            </div>
        `
    };
    
    return contentMap[module.id] || '<p>Content coming soon...</p>';
}

function generateSteps() {
    const steps = currentLanguage === 'en' 
        ? [
            { title: 'Prepare Required Documents', items: ['Original Aadhaar Card', 'Bank Account Passbook', 'Valid ID proof (if name differs)'] },
            { title: 'Visit Your Bank Branch', description: 'Go to the branch where your account is maintained. Ask for the "DBT Seeding" or "NPCI Mapper" desk.' },
            { title: 'Submit Seeding Request', description: 'Fill out the DBT seeding form and submit your documents. The process is completely free.' },
            { title: 'Verification & Completion', description: "Bank official will verify your details and submit to NPCI. You'll receive an acknowledgment." },
            { title: 'Check Status', description: 'Status updates within 24-48 hours. Use DBT Buddy to check your status regularly.' }
        ]
        : [
            { title: 'आवश्यक दस्तावेज तैयार करें', items: ['मूल आधार कार्ड', 'बैंक खाता पासबुक', 'वैध पहचान प्रमाण (यदि नाम अलग है)'] },
            { title: 'अपनी बैंक शाखा में जाएं', description: 'उस शाखा में जाएं जहां आपका खाता है। "डीबीटी सीडिंग" या "एनपीसीआई मैपर" डेस्क के लिए पूछें।' },
            { title: 'सीडिंग अनुरोध जमा करें', description: 'डीबीटी सीडिंग फॉर्म भरें और अपने दस्तावेज जमा करें। यह प्रक्रिया पूरी तरह से मुफ्त है।' },
            { title: 'सत्यापन और पूर्णता', description: 'बैंक अधिकारी आपके विवरण को सत्यापित करेगा और एनपीसीआई को भेजेगा। आपको एक पावती मिलेगी।' },
            { title: 'स्थिति जांचें', description: '24-48 घंटों में स्थिति अपडेट होती है। नियमित रूप से अपनी स्थिति जांचने के लिए डीबीटी बडी का उपयोग करें।' }
        ];
    
    return steps.map((step, index) => `
        <div class="step" style="display: flex; gap: var(--space-12); margin-bottom: var(--space-16); padding: var(--space-12); background-color: var(--color-bg-1); border-radius: var(--radius-base);">
            <div class="step-number" style="width: 32px; height: 32px; background-color: var(--color-primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">${index + 1}</div>
            <div class="step-content">
                <h5>${step.title}</h5>
                ${step.items ? `<ul>${step.items.map(item => `<li>${item}</li>`).join('')}</ul>` : `<p>${step.description}</p>`}
            </div>
        </div>
    `).join('');
}

function generateAPBFlow() {
    const flowSteps = currentLanguage === 'en'
        ? [
            { icon: '🏛️', title: 'Government Initiates Payment', description: 'Ministry/Department approves scholarship and sends payment instruction with beneficiary Aadhaar numbers.' },
            { icon: '🔄', title: 'NPCI Processes Request', description: "NPCI's APB system matches Aadhaar numbers with bank account details from the seeded database." },
            { icon: '🏦', title: 'Bank Receives Credit', description: 'Partner banks receive credit instructions and deposit money directly to beneficiary accounts.' },
            { icon: '💰', title: 'Money in Your Account', description: 'You receive SMS confirmation and money appears in your account within minutes.' }
        ]
        : [
            { icon: '🏛️', title: 'सरकार भुगतान शुरू करती है', description: 'मंत्रालय/विभाग छात्रवृत्ति को मंजूरी देता है और लाभार्थी आधार नंबरों के साथ भुगतान निर्देश भेजता है।' },
            { icon: '🔄', title: 'एनपीसीआई अनुरोध को संसाधित करता है', description: 'एनपीसीआई का एपीबी सिस्टम सीडेड डेटाबेस से आधार नंबरों को बैंक खाता विवरणों से मिलाता है।' },
            { icon: '🏦', title: 'बैंक क्रेडिट प्राप्त करता है', description: 'पार्टनर बैंक क्रेडिट निर्देश प्राप्त करते हैं और सीधे लाभार्थी खातों में पैसा जमा करते हैं।' },
            { icon: '💰', title: 'आपके खाते में पैसा', description: 'आपको एसएमएस पुष्टि मिलती है और मिनटों में आपके खाते में पैसा दिखाई देता है।' }
        ];
    
    return flowSteps.map((step, index) => `
        <div class="flow-step" style="text-align: center; padding: var(--space-16); background-color: var(--color-bg-${index + 1}); border-radius: var(--radius-base); margin-bottom: var(--space-16);">
            <div class="flow-icon" style="font-size: var(--font-size-4xl); margin-bottom: var(--space-8);">${step.icon}</div>
            <h5>${step.title}</h5>
            <p>${step.description}</p>
        </div>
        ${index < flowSteps.length - 1 ? '<div class="flow-arrow" style="text-align: center; font-size: var(--font-size-2xl); color: var(--color-primary); margin: var(--space-8) 0;">↓</div>' : ''}
    `).join('');
}

function closeModal() {
    document.getElementById('module-modal').classList.add('hidden');
}

function completeModule(event) {
    if (event) event.preventDefault();
    
    const moduleId = window.currentModuleId;
    if (moduleId && !completedModules.includes(moduleId)) {
        completedModules.push(moduleId);
        
        // Update progress tracker
        markProgressComplete(`progress-module${moduleId}`);
        
        // Re-render modules to show completion
        renderAwarenessModules();
        
        // Show completion badge
        const module = appData.awareness_modules.find(m => m.id === moduleId);
        const badge = currentLanguage === 'en' ? module.badge : module.badge_hi;
        const message = currentLanguage === 'en' 
            ? `🏆 Badge Earned: ${badge}!`
            : `🏆 बैज प्राप्त: ${badge}!`;
        showToast(message, 'success');
        
        closeModal();
    }
}

function markProgressComplete(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('completed');
        const icon = element.querySelector('.progress-icon');
        if (icon) icon.textContent = '✓';
    }
}

// School Dashboard functionality
function schoolLogin(event) {
    if (event) event.preventDefault();
    
    const schoolCode = document.getElementById('school-code').value;
    const adminId = document.getElementById('admin-id').value;
    
    if (!schoolCode || !adminId) {
        const message = currentLanguage === 'en' 
            ? 'Please enter both School Code and Administrator ID'
            : 'कृपया स्कूल कोड और प्रशासक आईडी दोनों दर्ज करें';
        showToast(message, 'error');
        return;
    }
    
    // Simulate authentication
    if (schoolCode.toLowerCase() === 'gh001' && adminId.toLowerCase() === 'admin01') {
        currentSchool = appData.schools[0];
        showSchoolDashboard();
        const message = currentLanguage === 'en' ? 'Login successful!' : 'लॉगिन सफल!';
        showToast(message, 'success');
    } else {
        const message = currentLanguage === 'en' 
            ? 'Invalid credentials. Try: School Code: GH001, Admin ID: admin01'
            : 'अमान्य क्रेडेंशियल। कोशिश करें: स्कूल कोड: GH001, प्रशासक आईडी: admin01';
        showToast(message, 'error');
    }
}

function showSchoolDashboard() {
    document.getElementById('school-login').classList.add('hidden');
    document.getElementById('school-dashboard').classList.remove('hidden');
    
    if (currentSchool) {
        updateSchoolOverview(currentSchool);
        renderStudentList();
    }
}

function updateSchoolOverview(school) {
    document.getElementById('school-name').textContent = school.name;
    document.getElementById('total-students').textContent = school.students_total;
    document.getElementById('dbt-ready').textContent = school.dbt_ready;
    document.getElementById('pending-students').textContent = school.pending;
}

function renderStudentList() {
    const studentList = document.getElementById('student-list');
    if (!studentList) return;
    
    const studentsHtml = appData.students.map(student => `
        <div class="student-row">
            <div class="student-name">${student.name}</div>
            <div>${student.class}</div>
            <div class="student-status">
                <span class="status ${getStatusClass(student.dbt_status)}">${student.dbt_status}</span>
            </div>
            <div>${student.bank}</div>
            <div>
                <button class="btn btn--sm action-btn" data-student-id="${student.id}">${currentLanguage === 'en' ? 'Remind' : 'याद दिलाएं'}</button>
            </div>
        </div>
    `).join('');
    
    studentList.innerHTML = studentsHtml;
    
    // Add event listeners to remind buttons
    studentList.querySelectorAll('.action-btn').forEach(button => {
        button.addEventListener('click', function() {
            const studentId = parseInt(this.getAttribute('data-student-id'));
            sendStudentReminder(studentId);
        });
    });
}

function getStatusClass(status) {
    const classMap = {
        'DBT Ready': 'status--success',
        'Not Seeded': 'status--warning',
        'Pending Verification': 'status--info'
    };
    return classMap[status] || 'status--info';
}

function simulateCSVImport(event) {
    if (event) event.preventDefault();
    const message = currentLanguage === 'en' 
        ? 'CSV import functionality would be available here'
        : 'सीएसवी आयात कार्यक्षमता यहां उपलब्ध होगी';
    showToast(message, 'info');
}

function sendReminders(event) {
    if (event) event.preventDefault();
    const message1 = currentLanguage === 'en'
        ? 'Sending reminders to 47 students with pending DBT status...'
        : 'लंबित डीबीटी स्थिति वाले 47 छात्रों को अनुस्मारक भेजे जा रहे हैं...';
    showToast(message1, 'info');
    
    setTimeout(() => {
        const message2 = currentLanguage === 'en'
            ? 'Reminders sent successfully via SMS and app notifications!'
            : 'एसएमएस और ऐप अधिसूचनाओं के माध्यम से अनुस्मारक सफलतापूर्वक भेजे गए!';
        showToast(message2, 'success');
    }, 2000);
}

function sendStudentReminder(studentId) {
    const student = appData.students.find(s => s.id === studentId);
    if (student) {
        const message = currentLanguage === 'en'
            ? `Reminder sent to ${student.name}`
            : `${student.name} को अनुस्मारक भेजा गया`;
        showToast(message, 'success');
    }
}

// Admin Panel functionality
function renderSchoolPerformance() {
    const performanceContainer = document.getElementById('school-performance');
    if (!performanceContainer) return;
    
    const performanceHtml = appData.schools.map(school => {
        const readinessRate = Math.round((school.dbt_ready / school.students_total) * 100);
        return `
            <div class="school-performance-item">
                <div class="school-info">
                    <div class="school-name">${school.name}</div>
                    <div class="school-district">${school.district} District</div>
                </div>
                <div class="performance-metrics">
                    <div class="metric">
                        <div class="metric-number">${school.students_total}</div>
                        <div class="metric-label">${currentLanguage === 'en' ? 'Total' : 'कुल'}</div>
                    </div>
                    <div class="metric">
                        <div class="metric-number">${school.dbt_ready}</div>
                        <div class="metric-label">${currentLanguage === 'en' ? 'Ready' : 'तैयार'}</div>
                    </div>
                    <div class="metric">
                        <div class="metric-number">${school.pending}</div>
                        <div class="metric-label">${currentLanguage === 'en' ? 'Pending' : 'लंबित'}</div>
                    </div>
                    <div class="metric">
                        <div class="metric-number">${readinessRate}%</div>
                        <div class="metric-label">${currentLanguage === 'en' ? 'Rate' : 'दर'}</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    performanceContainer.innerHTML = performanceHtml;
}

function sendBulkMessage(event) {
    if (event) event.preventDefault();
    
    const targetGroup = document.getElementById('target-group').value;
    const messageText = document.querySelector('textarea').value;
    
    if (!messageText.trim()) {
        const message = currentLanguage === 'en' 
            ? 'Please enter a message to send'
            : 'कृपया भेजने के लिए एक संदेश दर्ज करें';
        showToast(message, 'error');
        return;
    }
    
    const targetCounts = currentLanguage === 'en' 
        ? {
            'pending': '35,500 students with pending DBT status',
            'schools': '150 school administrators',
            'all': '125,000 users across the platform'
        }
        : {
            'pending': 'लंबित डीबीटी स्थिति वाले 35,500 छात्र',
            'schools': '150 स्कूल प्रशासक',
            'all': 'प्लेटफॉर्म पर 125,000 उपयोगकर्ता'
        };
    
    const message1 = currentLanguage === 'en' 
        ? `Sending message to ${targetCounts[targetGroup]}...`
        : `${targetCounts[targetGroup]} को संदेश भेजा जा रहा है...`;
    showToast(message1, 'info');
    
    setTimeout(() => {
        const message2 = currentLanguage === 'en' 
            ? 'Bulk message sent successfully!'
            : 'बल्क संदेश सफलतापूर्वक भेजा गया!';
        showToast(message2, 'success');
        document.querySelector('textarea').value = '';
    }, 2500);
}

// Toast notification system
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
            <div>${getToastIcon(type)}</div>
            <div>${message}</div>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Remove after delay
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function getToastIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    // Close modal on Escape
    if (event.key === 'Escape') {
        const modal = document.getElementById('module-modal');
        if (modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    }
    
    // Navigation with arrow keys (when not in input fields)
    if (!event.target.matches('input, textarea, select')) {
        const sections = ['home', 'student', 'school', 'admin'];
        const currentIndex = sections.indexOf(currentSection);
        
        if (event.key === 'ArrowRight' && currentIndex < sections.length - 1) {
            showSection(sections[currentIndex + 1]);
        } else if (event.key === 'ArrowLeft' && currentIndex > 0) {
            showSection(sections[currentIndex - 1]);
        }
    }
});

// Handle clicks outside modal
document.addEventListener('click', function(event) {
    const modal = document.getElementById('module-modal');
    if (modal && event.target === modal) {
        closeModal();
    }
});

// Initialize demo data for development
function initializeDemoData() {
    // Pre-complete first module for demo
    if (!completedModules.includes(1)) {
        completedModules.push(1);
        markProgressComplete('progress-module1');
    }
}

// Call initialization
initializeDemoData();

// Make functions globally available for any remaining inline handlers
window.showSection = showSection;
window.toggleLanguage = toggleLanguage;
window.checkDBTStatus = checkDBTStatus;
window.openModule = openModule;
window.closeModal = closeModal;
window.completeModule = completeModule;
window.schoolLogin = schoolLogin;
window.sendReminders = sendReminders;
window.sendBulkMessage = sendBulkMessage;
window.showToast = showToast;
window.findNearestCenter = findNearestCenter;
window.downloadCertificate = downloadCertificate;