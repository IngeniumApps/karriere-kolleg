/* =========================
   HEADER SCROLL EFFECT
   ========================= */

export const initScrollBehavior = () => {
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
            // If a user scrolled down more than 50 px, change the header style to scrolled
            header.classList.add('header--scrolled');
        } else {
            // If the user scrolled back to the top, change the header style back to default
            header.classList.remove('header--scrolled');
        }
    }
    // Add a scroll event listener to the window to monitor scroll position
    window.addEventListener('scroll', updateHeaderOnScroll);
    // Whenever the user scrolls, the function is called and updates the header style
    updateHeaderOnScroll();
}