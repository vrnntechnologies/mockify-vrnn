// --- Configuration ---
// Safely parse config provided by the environment
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');

// --- Initialization ---
let app, auth;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Init Firebase Global
    if (firebaseConfig.apiKey) {
        if (!firebase.apps.length) {
            app = firebase.initializeApp(firebaseConfig);
        } else {
            app = firebase.app();
        }
        auth = firebase.auth();
        initAuthListener();
    } else {
        console.error("Firebase config missing or invalid.");
    }

    // 2. Init Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// --- Auth Listener ---
function initAuthListener() {
    auth.onAuthStateChanged(user => {
        // We now ignore the user state for the nav button
        updateNavAuth(user); 
    });
}

// --- Navigation UI ---
function updateNavAuth(user) {
    const container = document.getElementById('nav-auth-buttons');
    const mobileContainer = document.getElementById('mobile-nav-auth-buttons');
    
    // Return if elements don't exist on the current page
    if (!container || !mobileContainer) return;

    // ALWAYS SHOW DASHBOARD (Bypassing Login)
    container.innerHTML = `<a href="dashboard.html" class="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">Dashboard</a>`;
    mobileContainer.innerHTML = `<a href="dashboard.html" class="text-indigo-400 font-bold block px-3 py-2 rounded-md text-base w-full text-left">Dashboard</a>`;
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
}

// --- Login Page Specific Functions (Kept for future use, but unused now) ---

async function handleAuth(e) {
    e.preventDefault();
    // ... existing logic ...
}

function showAuthError(msg) {
    // ... existing logic ...
}