document.addEventListener('DOMContentLoaded', function () {
    // Header-Element holen
    const header = document.getElementById('main-header');

    // Header beim Scrollen anpassen
    function updateHeaderOnScroll() {
        if (window.scrollY > 50) {
            header.classList.remove('header--transparent');
            header.classList.add('header--scrolled');
        } else {
            header.classList.add('header--transparent');
            header.classList.remove('header--scrolled');
        }
    }
    window.addEventListener('scroll', updateHeaderOnScroll);
    updateHeaderOnScroll();

    // Drawer-Logik (Mobile Navigation)
    // Drawer-Logik (Mobile Navigation)
    const drawerToggle = document.getElementById('drawer-toggle');
    const drawerContent = document.querySelector('.drawer-content');
    const drawerClose = document.getElementById('drawer-close');
    const overlay = document.querySelector('.drawer-overlay');
    const body = document.body;

    function openDrawer() {
        drawerContent.classList.add('active');
        overlay.classList.add('active');
        body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        drawerContent.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    }

    if (drawerToggle && drawerContent && drawerClose && overlay) {
        drawerToggle.addEventListener('click', openDrawer);
        drawerClose.addEventListener('click', closeDrawer);
        overlay.addEventListener('click', closeDrawer);

        // Links im Drawer
        drawerContent.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeDrawer);
        });

        // ESC schließt Drawer
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeDrawer();
        });
    }

    // Dynamisches aria-current für Navigation (Desktop)
    const sections = ['home', 'kollegs', 'kontakt'];
    const navLinks = {};
    sections.forEach(id => {
        navLinks[id] = document.querySelector(`.nav-desktop a[href="#${id}"]`);
    });

    function updateActiveNavLink() {
        let current = sections[0];
        for (const id of sections) {
            const section = document.getElementById(id);
            if (section && window.scrollY >= section.offsetTop - 80) {
                current = id;
            }
        }
        Object.values(navLinks).forEach(link => link && link.removeAttribute('aria-current'));
        if (navLinks[current]) navLinks[current].setAttribute('aria-current', 'page');

        // Hash in der URL aktualisieren, aber nur wenn er sich ändert
        const newHash = current === 'home' ? '' : '#' + current;
        if (window.location.hash !== newHash) {
            history.replaceState(null, '', window.location.pathname + window.location.search + newHash);
        }
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();

    // Startseite-Link: Scrollt nach oben und entfernt Hash aus URL
    function handleHomeLinkClick(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Entfernt Hash aus URL, falls vorhanden
        if (window.location.hash) {
            history.replaceState(null, '', window.location.pathname + window.location.search);
        }
    }

    // Desktop
    const homeLinkDesktop = document.querySelector('.nav-desktop a[href="#home"]');
    if (homeLinkDesktop) {
        homeLinkDesktop.addEventListener('click', handleHomeLinkClick);
    }
    // Mobile
    const homeLinkMobile = document.querySelector('.drawer-content a[href="#home"]');
    if (homeLinkMobile) {
        homeLinkMobile.addEventListener('click', handleHomeLinkClick);
    }
});