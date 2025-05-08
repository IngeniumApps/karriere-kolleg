/* ===============================
   SCROLL BEHAVIOR:
   FOR MARK THE ACTIVE SECTION URL
   & SET THE RIGHT HASH IN THE URL
   =============================== */
export const initNavigation = () => {
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
}