// All the code below runs after the DOM is fully loaded - this means the page is ready
document.addEventListener('DOMContentLoaded', function () {

    /* =========================
       HEADER SCROLL EFFECT
       ========================= */

    // get header element for scroll effect
    const header = document.getElementById('main-header');

    /**
     * Updates the header's appearance based on scroll position
     * Adds/removes classes to create a transparent/solid effect
     * @function updateHeaderOnScroll
     * @listens scroll
     */
    function updateHeaderOnScroll() {
        if (window.scrollY > 50) {
            // If a user scrolled down more than 50 px, change the header style from transparent to scrolled
            header.classList.remove('header--transparent');
            header.classList.add('header--scrolled');
        } else {
            // If the user scrolled back to the top, change the header style back to transparent
            header.classList.add('header--transparent');
            header.classList.remove('header--scrolled');
        }
    }
    // Add a scroll event listener to the window to monitor scroll position
    window.addEventListener('scroll', updateHeaderOnScroll);
    // Whenever the user scrolls, the function is called and updates the header style
    updateHeaderOnScroll();

    /* ===============================
       SCROLL BEHAVIOR:
       FOR MARK THE ACTIVE SECTION URL
       & SET THE RIGHT HASH IN THE URL
       =============================== */

    // Array of section IDs that exist in the navigation, these sections will be monitored for scroll position
    const sections = ['home', 'kollegs', 'kontakt'];
    // Create an object to store the navigation links for each section
    const navLinks = {};
    // Loop through each section ID and find the corresponding navigation link
    sections.forEach(id => {
        navLinks[id] = document.querySelector(`.nav-desktop a[href="#${id}"]`);
    });

    /**
     * Updates the active state of navigation links based on scroll position
     * - Determines which section is currently visible
     * - Updates aria-current attribute for accessibility
     * - Updates URL hash to reflect current section
     * @function updateActiveNavLink
     * @listens scroll
     */
    function updateActiveNavLink() {
        // Start with the first section ("home") as a default active section
        let current = sections[0];

        // Check each section's position relative to the scroll position
        for (const id of sections) {
            const section = document.getElementById(id);
            // If a section exists AND we've scrolled past it (minus 80 px for header),
            // this section becomes the new current active section
            if (section && window.scrollY >= section.offsetTop - 80) {
                current = id;
            }
        }
        // Remove the "aria-current" attribute from all links
        // THis resets the active state for all links
        Object.values(navLinks).forEach(link => link && link.removeAttribute('aria-current'));

        // Add the "aria-current" attribute to the current active link
        // This marks the current section's link as active.
        // This is important for accessibility, as it helps screen readers (for barrier-free) understand the current section
        if (navLinks[current]) navLinks[current].setAttribute('aria-current', 'page');

        // Update the URL hash to reflect the current section
        // If we're at "home", remove the hash from the URL
        // Otherwise, set the hash to the current section (e.g., #kontakt)
        const newHash = current === 'home' ? '' : '#' + current;

        // Only update the URL if the hash actually changed
        // This prevents unnecessary history entries
        if (window.location.hash !== newHash) {
            // Update the URL hash without causing a page jump or adding to browser history
            history.replaceState(null, '', window.location.pathname + window.location.search + newHash);
        }
    }

    // Add a scroll event listener to the window to monitor scroll position
    window.addEventListener('scroll', updateActiveNavLink);
    // Whenever the user scrolls, the function is called and updates the active navigation link
    updateActiveNavLink();

    /* =========================
       MOBILE DRAWER NAVIGATION
       ========================= */

    // get elements for mobile navigation
    const drawerToggle = document.getElementById('drawer-toggle');
    const drawerContent = document.querySelector('.drawer-content');
    const drawerClose = document.getElementById('drawer-close');
    const overlay = document.querySelector('.drawer-overlay');
    const body = document.body;

    /**
     * Opens the mobile navigation drawer
     * Activates the drawer, overlay and prevents body scrolling
     * @function openDrawer
     */
    function openDrawer() {
        drawerContent.classList.add('active');
        overlay.classList.add('active');
        body.style.overflow = 'hidden';
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
        body.style.overflow = '';
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

    /* =========================
       NAVIGATION:
       HOME LINK BEHAVIOR
       (DESKTOP & MOBILE)
       ========================= */

    /**
     * Handles clicks on home links (both desktop and mobile)
     * - Prevents default anchor behavior
     * - Smoothly scrolls to top
     * - Removes hash from URL if present
     * @function handleHomeLinkClick
     * @param {Event} e - Click an event object
     */
    function handleHomeLinkClick(e) {
        // Prevent default anchor jump
        e.preventDefault();
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior:
                'smooth'
        });
        // Clean URL by removing hash if present
        if (window.location.hash) {
            history.replaceState(null, '', window.location.pathname + window.location.search);
        }
    }

    /**
     * ### Desktop home link:
     * Set up home link click handlers for desktop versions to get the same behavior
     * @type {Element}
     */
    const homeLinkDesktop = document.querySelector('.nav-desktop a[href="#home"]');
    if (homeLinkDesktop) {
        homeLinkDesktop.addEventListener('click', handleHomeLinkClick);
    }
    /**
     * ### Mobile home link:
     * Set up home link click handlers for mobile versions to get the same behavior
     * @type {Element}
     */
    const homeLinkMobile = document.querySelector('.drawer-content a[href="#home"]');
    if (homeLinkMobile) {
        homeLinkMobile.addEventListener('click', handleHomeLinkClick);
    }
});