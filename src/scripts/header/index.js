import { initScrollBehavior } from "./scroll-behavior.js";
import { initDrawer } from "./drawer.js";
import { initNavigation } from "./navigation.js";

export const initHeader = () => {
    // Initialize the scroll behavior for the header
    initScrollBehavior();
    // Initialize the mobile navigation drawer
    initDrawer();
    // Initialize the navigation links and their active states
    initNavigation();
}