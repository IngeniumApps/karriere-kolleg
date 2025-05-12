export const initDrawer = () => {
    // get elements for mobile navigation
    const drawerToggle = document.getElementById('drawer-toggle');
    const drawerContent = document.querySelector('.drawer-content');
    const drawerClose = document.getElementById('drawer-close');
    const overlay = document.querySelector('.drawer-overlay');

    // Neue Variablen für Touch-Funktionalität
    let startX = 0;
    let currentX = 0;
    let drawerWidth = 0;
    let isDragging = false;

    // Stelle sicher, dass der Drawer initial geschlossen ist
    function initializeDrawerState() {
        drawerContent?.classList.remove('active');
        overlay?.classList.remove('active');
        // Wichtig: Styles zurücksetzen
        resetDrawerStyles();
    }

    function openDrawer() {
        drawerContent?.classList.add('active');
        overlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        drawerContent?.classList.remove('active');
        overlay?.classList.remove('active');
        document.body.style.overflow = '';
        // Wichtig: Styles zurücksetzen
        resetDrawerStyles();
    }

    // Neue Funktion: Styles zurücksetzen
    function resetDrawerStyles() {
        if (drawerContent) {
            drawerContent.style.transform = '';
            drawerContent.classList.remove('is-dragging');
        }
        if (overlay) {
            overlay.style.opacity = '';
        }
    }

    // Check if all elements are available before adding event listeners
    if (drawerToggle && drawerContent && drawerClose && overlay) {
        // Initialize the drawer state
        initializeDrawerState();

        drawerToggle.addEventListener('click', openDrawer);
        drawerClose.addEventListener('click', closeDrawer);
        overlay.addEventListener('click', closeDrawer);

        drawerContent.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeDrawer);
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeDrawer();
        });

        // Touch-Event-Listener
        drawerContent.addEventListener('touchstart', (e) => {
            if (!drawerContent.classList.contains('active')) return;
            isDragging = true;
            drawerContent.classList.add('is-dragging');
            startX = e.touches[0].clientX;
            drawerWidth = drawerContent.offsetWidth;
        });

        drawerContent.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            let deltaX = currentX - startX;
            // Verhindere, dass der Drawer nach links gezogen wird
            deltaX = Math.max(0, deltaX);
            // Transformiere den Drawer
            drawerContent.style.transform = `translateX(${deltaX}px)`;
            // Passe die Overlay-Transparenz an
            const opacity = Math.max(0, 1 - (deltaX / drawerWidth));
            overlay.style.opacity = opacity;
        });

        drawerContent.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            const deltaX = currentX - startX;

            if (deltaX > drawerWidth / 3) {
                // Wenn weit genug gezogen wurde, schließe den Drawer
                closeDrawer();
            } else {
                // Sonst, zurück zur Ausgangsposition
                resetDrawerStyles();
                drawerContent.classList.add('active');
                overlay.classList.add('active');
            }
        });

        // Optional: Abbrechen der Bewegung
        drawerContent.addEventListener('touchcancel', () => {
            if (isDragging) {
                isDragging = false;
                resetDrawerStyles();
            }
        });
    }
}