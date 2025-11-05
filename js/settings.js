// ========== SETTINGS MODULE ==========
window.SettingsModule = (function() {
    'use strict';

    // Initialize settings data in AppState if not exists
    if (!window.AppState.settings) {
        window.AppState.settings = {
            companyName: 'Fortune Enterprises',
            smsGateway: 'twilio',
            timezone: 'Asia/Kolkata',
            dateFormat: 'DD-MM-YYYY',
            notifications: {
                email: true,
                smsReports: true,
                dailySummary: false,
                userActivity: true
            },
            appearance: {
                theme: 'light',
                compactMode: false,
                showAnimations: true
            }
        };
    }

    // DOM Elements
    const settingsMenuItems = document.querySelectorAll('.settings-menu-item');
    const settingsPanels = document.querySelectorAll('.settings-panel');
    
    const generalSettingsForm = document.getElementById('generalSettingsForm');
    const securitySettingsForm = document.getElementById('securitySettingsForm');
    
    const themeOptions = document.querySelectorAll('.theme-option');
    const compactModeToggle = document.getElementById('compactMode');
    const showAnimationsToggle = document.getElementById('showAnimations');

    // ========== THEME MANAGEMENT ==========
    function applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        window.AppState.settings.appearance.theme = theme;
        
        // Save to localStorage for persistence
        localStorage.setItem('appTheme', theme);
        
        showNotification(`Theme changed to ${theme}`, 'success');
    }

    function loadTheme() {
        // Check localStorage first, then AppState
        const savedTheme = localStorage.getItem('appTheme') || window.AppState.settings.appearance.theme;
        document.body.setAttribute('data-theme', savedTheme);
        window.AppState.settings.appearance.theme = savedTheme;
        
        // Update theme selector UI
        themeOptions.forEach(option => {
            if (option.dataset.theme === savedTheme) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }

    // ========== COMPACT MODE MANAGEMENT ==========
    function applyCompactMode(enabled) {
        if (enabled) {
            document.body.classList.add('compact-mode');
        } else {
            document.body.classList.remove('compact-mode');
        }
        
        window.AppState.settings.appearance.compactMode = enabled;
        localStorage.setItem('compactMode', enabled);
        
        showNotification(enabled ? 'Compact mode enabled' : 'Compact mode disabled', 'success');
    }

    function loadCompactMode() {
        const savedCompactMode = localStorage.getItem('compactMode');
        const enabled = savedCompactMode === 'true' || window.AppState.settings.appearance.compactMode;
        
        if (enabled) {
            document.body.classList.add('compact-mode');
            compactModeToggle.checked = true;
        }
        
        window.AppState.settings.appearance.compactMode = enabled;
    }

    // ========== ANIMATIONS MANAGEMENT ==========
    function applyAnimations(enabled) {
        if (enabled) {
            document.body.classList.remove('no-animations');
        } else {
            document.body.classList.add('no-animations');
        }
        
        window.AppState.settings.appearance.showAnimations = enabled;
        localStorage.setItem('showAnimations', enabled);
        
        showNotification(enabled ? 'Animations enabled' : 'Animations disabled', 'success');
    }

    function loadAnimations() {
        const savedAnimations = localStorage.getItem('showAnimations');
        const enabled = savedAnimations === null ? true : savedAnimations === 'true';
        
        if (!enabled) {
            document.body.classList.add('no-animations');
            showAnimationsToggle.checked = false;
        } else {
            showAnimationsToggle.checked = true;
        }
        
        window.AppState.settings.appearance.showAnimations = enabled;
    }

    // ========== LOAD SETTINGS ==========
    function loadSettings() {
        const settings = window.AppState.settings;
        
        // Load General Settings
        document.getElementById('settingCompanyName').value = settings.companyName;
        document.getElementById('settingSMSGateway').value = settings.smsGateway;
        document.getElementById('settingTimezone').value = settings.timezone;
        document.getElementById('settingDateFormat').value = settings.dateFormat;
        
        // Load Notification Settings
        document.getElementById('notifyEmail').checked = settings.notifications.email;
        document.getElementById('notifySMSReports').checked = settings.notifications.smsReports;
        document.getElementById('notifyDailySummary').checked = settings.notifications.dailySummary;
        document.getElementById('notifyUserActivity').checked = settings.notifications.userActivity;
        
        // Load Appearance Settings
        loadTheme();
        loadCompactMode();
        loadAnimations();
    }

    // ========== SAVE SETTINGS ==========
    function saveGeneralSettings(e) {
        e.preventDefault();
        
        window.AppState.settings.companyName = document.getElementById('settingCompanyName').value;
        window.AppState.settings.smsGateway = document.getElementById('settingSMSGateway').value;
        window.AppState.settings.timezone = document.getElementById('settingTimezone').value;
        window.AppState.settings.dateFormat = document.getElementById('settingDateFormat').value;
        
        // Save to localStorage
        localStorage.setItem('generalSettings', JSON.stringify(window.AppState.settings));
        
        showNotification('General settings saved successfully', 'success');
    }

    function saveSecuritySettings(e) {
        e.preventDefault();
        
        const currentPassword = document.getElementById('securityCurrentPassword').value;
        const newPassword = document.getElementById('securityNewPassword').value;
        const confirmPassword = document.getElementById('securityConfirmPassword').value;
        
        if (!currentPassword || !newPassword || !confirmPassword) {
            showNotification('Please fill all password fields', 'error');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            showNotification('New passwords do not match', 'error');
            return;
        }
        
        if (newPassword.length < 8) {
            showNotification('Password must be at least 8 characters', 'error');
            return;
        }
        
        // Simulate password change
        showNotification('Password changed successfully', 'success');
        securitySettingsForm.reset();
    }

    function saveNotificationSettings() {
        window.AppState.settings.notifications.email = document.getElementById('notifyEmail').checked;
        window.AppState.settings.notifications.smsReports = document.getElementById('notifySMSReports').checked;
        window.AppState.settings.notifications.dailySummary = document.getElementById('notifyDailySummary').checked;
        window.AppState.settings.notifications.userActivity = document.getElementById('notifyUserActivity').checked;
        
        // Save to localStorage
        localStorage.setItem('notificationSettings', JSON.stringify(window.AppState.settings.notifications));
        
        showNotification('Notification preferences updated', 'success');
    }

    // ========== EVENT LISTENERS ==========
    function initEventListeners() {
        // Settings Menu Navigation
        settingsMenuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                settingsMenuItems.forEach(mi => mi.classList.remove('active'));
                item.classList.add('active');
                
                const settingType = item.dataset.setting;
                settingsPanels.forEach(panel => panel.classList.remove('active'));
                document.getElementById(`${settingType}-settings`).classList.add('active');
            });
        });

        // General Settings Form
        generalSettingsForm.addEventListener('submit', saveGeneralSettings);

        // Security Settings Form
        securitySettingsForm.addEventListener('submit', saveSecuritySettings);

        // Notification Toggles
        document.getElementById('notifyEmail').addEventListener('change', saveNotificationSettings);
        document.getElementById('notifySMSReports').addEventListener('change', saveNotificationSettings);
        document.getElementById('notifyDailySummary').addEventListener('change', saveNotificationSettings);
        document.getElementById('notifyUserActivity').addEventListener('change', saveNotificationSettings);

        // Theme Selection
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                themeOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                applyTheme(option.dataset.theme);
            });
        });

        // Compact Mode Toggle
        compactModeToggle.addEventListener('change', (e) => {
            applyCompactMode(e.target.checked);
        });

        // Animations Toggle
        showAnimationsToggle.addEventListener('change', (e) => {
            applyAnimations(e.target.checked);
        });

        // 2FA Button
        document.getElementById('enable2FA').addEventListener('click', () => {
            showNotification('Two-factor authentication setup coming soon', 'info');
        });

        // View Sessions Button
        document.getElementById('viewSessions').addEventListener('click', () => {
            showNotification('Active sessions viewer coming soon', 'info');
        });
    }

    // ========== INITIALIZE ==========
    function init() {
        loadSettings();
        initEventListeners();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Public API
    return {
        loadSettings,
        applyTheme,
        applyCompactMode,
        applyAnimations
    };
})();
