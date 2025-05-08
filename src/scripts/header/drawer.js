/* =========================
   MOBILE DRAWER NAVIGATION
   ========================= */

export const initDrawer = () => {
    // get elements for mobile navigation
    const drawerToggle = document.getElementById('drawer-toggle');
    const drawerContent = document.querySelector('.drawer-content');
    const drawerClose = document.getElementById('drawer-close');
    const overlay = document.querySelector('.drawer-overlay');

    /**
     * Opens the mobile navigation drawer
     * Activates the drawer, overlay and prevents body scrolling
     * @function openDrawer
     */
    function openDrawer() {
        drawerContent.classList.add('active');
        overlay.classList.add('active');
    }

    /**
     * Closes the mobile navigation drawer
     * Deactivates the drawer, overlay and allows body scrolling
     *
     * ### Notes
     * The menu can be closed by clicking the **close (x) button**,
     * the **overlay**, the **ESC key** for barrier-free navigation or by clicking **on a link** in the menu.
     * @function closeDrawer
     */
    function closeDrawer() {
        drawerContent.classList.remove('active');
        overlay.classList.remove('active');
    }

    // Check if all elements are available before adding event listeners
    if (drawerToggle && drawerContent && drawerClose && overlay) {
        // 1. Toggle Button: Open/Close Drawer
        drawerToggle.addEventListener('click', openDrawer);
        // 2. Close Drawer: Close the drawer by clicking the close button
        drawerClose.addEventListener('click', closeDrawer);
        // 3. Close Drawer: Close the drawer by clicking the overlay
        overlay.addEventListener('click', closeDrawer);

        // 4. Close Drawer and navigate:
        // Find all links (<a>-Element) in the drawer and add a click event listener to each link
        // that closes the drawer and navigates to the link's href
        drawerContent.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeDrawer);
        });

        // 5. Close Drawer: Close the drawer by pressing the ESC key
        // @param {KeyboardEvent} e - The keyboard event
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeDrawer();
        });
    }
}