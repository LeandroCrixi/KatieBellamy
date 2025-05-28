// Vanilla JavaScript Router for Katie Bellamy LLC
// Loads HTML files from src/pages and src/pages/topics into <main id="app">

const app = document.getElementById('app');

// Define your routes here
const routes = [
    { path: '/', file: 'src/pages/home.html' },
    { path: '/aboutUs', file: 'src/pages/aboutUs.html' },
    { path: '/contactUs', file: 'src/pages/contactUs.html' },
    { path: '/submit', file: 'src/pages/submit.html' },
    // Topic pages will be handled dynamically
];

// Helper to fetch and inject HTML, then run page-specific JS
async function loadPage(file, path) {
    try {
        const res = await fetch(file);
        if (!res.ok) throw new Error('Page not found');
        const html = await res.text();
        app.innerHTML = html;
        await runPageScript(path || window.location.pathname);
    } catch (e) {
        app.innerHTML = '<h2>404 - Page Not Found</h2>';
    }
}

// Run page-specific JS after HTML is loaded
async function runPageScript(path) {
    // Home page
    if (path === '/' || path === '/home' || path === '/index' || path === '/index.html') {
        try {
            const { addCircles, myPageBreak } = await import('../js/pages/indexPage.js');
            addCircles && addCircles();
            myPageBreak && myPageBreak();
        } catch (e) { /* ignore */ }
    }
    // Topic pages
    else if (/^\/topics\//.test(path)) {
        try {
            const { addResource } = await import('../js/pages/topicPages.js');
            addResource && addResource();
        } catch (e) { /* ignore */ }
    }
    // Add more page-specific scripts as needed
}

// Parse the current path and find the route
function getRoute(path) {
    // Check static routes first
    const staticRoute = routes.find(r => r.path === path);
    if (staticRoute) return staticRoute.file;

    // Check for topic pages: /topics/:topic
    const topicMatch = path.match(/^\/topics\/(.+)$/);
    if (topicMatch) {
        const topicFile = `src/pages/topics/${topicMatch[1]}.html`;
        return topicFile;
    }

    // Default to 404
    return null;
}

// Handle navigation
function navigate(path) {
    const file = getRoute(path);
    if (file) {
        loadPage(file, path);
        window.history.pushState({}, '', path);
    } else {
        app.innerHTML = '<h2>404 - Page Not Found</h2>';
        window.history.pushState({}, '', path);
    }
}

// Intercept link clicks
function linkHandler(e) {
    const anchor = e.target.closest('a');
    if (anchor && anchor.getAttribute('href')) {
        const href = anchor.getAttribute('href');
        // Only handle internal links
        if (href.startsWith('/') && !href.startsWith('//')) {
            e.preventDefault();
            navigate(href);
        }
    }
}

document.addEventListener('click', linkHandler);

// Handle browser navigation (back/forward)
window.addEventListener('popstate', () => {
    const path = window.location.pathname;
    const file = getRoute(path);
    if (file) {
        loadPage(file, path);
    } else {
        app.innerHTML = '<h2>404 - Page Not Found</h2>';
    }
});

// Initial load
function initRouter() {
    let path = window.location.pathname;
    // Redirect root to / if needed
    if (path === '' || path === '/') path = '/';
    const file = getRoute(path);
    if (file) {
        loadPage(file, path);
    } else {
        app.innerHTML = '<h2>404 - Page Not Found</h2>';
    }
}

export { initRouter, navigate };
