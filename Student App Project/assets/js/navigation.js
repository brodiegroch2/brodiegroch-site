// Shared navigation component
function createNavigation() {
    const nav = document.createElement('nav');
    nav.className = 'main-nav';
    
    // Determine the base path based on current location
    const currentPath = window.location.pathname;
    let basePath = '';
    
    if (currentPath.includes('/pages/')) {
        basePath = '../../';
    } else if (currentPath !== '/' && currentPath !== '/index.html') {
        basePath = '../';
    }
    
    nav.innerHTML = `
        <div class="nav-container">
            <h1 class="nav-title">UniHUB</h1>
            <ul class="nav-links">
                <li><a href="${basePath}index.html" class="nav-link">Dashboard</a></li>
                <li><a href="${basePath}pages/courses/index.html" class="nav-link">Courses</a></li>
                <li><a href="${basePath}pages/deliverables/index.html" class="nav-link">Deliverables</a></li>
                <li><a href="${basePath}pages/todo/index.html" class="nav-link">To Do</a></li>
                <li><a href="${basePath}pages/schedule/index.html" class="nav-link">Schedule</a></li>
                <li><a href="${basePath}pages/quick-links/index.html" class="nav-link">Quick Links</a></li>
            </ul>
        </div>
    `;
    return nav;
}

// Add navigation to page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const body = document.querySelector('body');
    const nav = createNavigation();
    body.insertBefore(nav, body.firstChild);
});