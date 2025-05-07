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
    const drawerToggle = document.getElementById('drawer-toggle');
    const drawer = document.getElementById('drawer');
    const drawerClose = document.getElementById('drawer-close');

    if (drawerToggle && drawer && drawerClose) {
        // Öffnen
        drawerToggle.addEventListener('click', function () {
            drawer.style.display = 'block';
            drawer.focus();
        });
        // Schließen
        drawerClose.addEventListener('click', function () {
            drawer.style.display = 'none';
        });
        // ESC schließt Drawer
        drawer.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') drawer.style.display = 'none';
        });
        // Klick auf Link schließt Drawer
        drawer.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                drawer.style.display = 'none';
            });
        });
        // Klick außerhalb schließt Drawer
        document.addEventListener('click', function (e) {
            if (
                drawer.style.display === 'block' &&
                !drawer.contains(e.target) &&
                e.target !== drawerToggle
            ) {
                drawer.style.display = 'none';
            }
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
    const homeLinkMobile = document.querySelector('.nav-mobile a[href="#home"]');
    if (homeLinkMobile) {
        homeLinkMobile.addEventListener('click', handleHomeLinkClick);
    }
});