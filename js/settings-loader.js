// ========== SHARED SETTINGS LOADER ==========
// This script loads saved settings from localStorage on every page
// Include this script BEFORE dashboard.js on all pages

(function () {
    'use strict';

    // Load theme setting
    function loadTheme() {
        const savedTheme = localStorage.getItem('appTheme');
        if (savedTheme) {
            document.body.setAttribute('data-theme', savedTheme);
        }
    }

    // Load compact mode setting
    function loadCompactMode() {
        const savedCompactMode = localStorage.getItem('compactMode');
        if (savedCompactMode === 'true') {
            document.body.classList.add('compact-mode');
        }
    }

    // Load animations setting
    function loadAnimations() {
        const savedAnimations = localStorage.getItem('showAnimations');
        if (savedAnimations === 'false') {
            document.body.classList.add('no-animations');
        }
    }

    // Apply all settings immediately
    function applySettings() {
        loadTheme();
        loadCompactMode();
        loadAnimations();
    }

    // Apply settings as soon as possible (before DOM is fully loaded)
    applySettings();

    // Also apply when DOM is ready (in case script loads late)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applySettings);
    }
})();
