// ========== PROFILE MODULE ==========
window.ProfileModule = (function() {
    'use strict';

    // Initialize profile data in AppState if not exists
    if (!window.AppState.profile) {
        window.AppState.profile = {
            username: 'admin',
            fullName: 'Admin User',
            email: 'admin@fortune.com',
            phone: '+91 9876543210',
            department: 'IT Department',
            role: 'Administrator',
            joinedDate: 'January 1, 2025',
            lastLogin: 'Nov 4, 2025 4:03 PM'
        };
    }

    // DOM Elements
    const editProfileBtn = document.getElementById('editProfileBtn');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeEditProfileModal = document.getElementById('closeEditProfileModal');
    const cancelEditProfile = document.getElementById('cancelEditProfile');
    const editProfileForm = document.getElementById('editProfileForm');

    // ========== LOAD PROFILE ==========
    function loadProfile() {
        const profile = window.AppState.profile;
        
        document.getElementById('profileName').textContent = profile.fullName;
        document.getElementById('profileRole').textContent = profile.role;
        document.getElementById('profileUsername').textContent = profile.username;
        document.getElementById('profileEmail').textContent = profile.email;
        document.getElementById('profilePhone').textContent = profile.phone;
        document.getElementById('profileDepartment').textContent = profile.department;
        document.getElementById('profileJoinedDate').textContent = profile.joinedDate;
        document.getElementById('profileLastLogin').textContent = profile.lastLogin;
        
        // Update activity stats
        document.getElementById('profileSMSSent').textContent = window.AppState.smsData.totalSent.toLocaleString();
        document.getElementById('profileContactsAdded').textContent = window.AppState.smsData.totalContacts.toLocaleString();
        document.getElementById('profileReportsGenerated').textContent = '45';
    }

    // ========== EVENT LISTENERS ==========
    function initEventListeners() {
        // Edit Profile Button
        editProfileBtn.addEventListener('click', () => {
            const profile = window.AppState.profile;
            document.getElementById('editProfileFullName').value = profile.fullName;
            document.getElementById('editProfileEmail').value = profile.email;
            document.getElementById('editProfilePhone').value = profile.phone;
            document.getElementById('editProfileDepartment').value = profile.department;
            editProfileModal.classList.add('show');
        });

        // Close Edit Profile Modal
        closeEditProfileModal.addEventListener('click', () => {
            editProfileModal.classList.remove('show');
        });

        cancelEditProfile.addEventListener('click', () => {
            editProfileModal.classList.remove('show');
        });

        editProfileModal.addEventListener('click', (e) => {
            if (e.target === editProfileModal) {
                editProfileModal.classList.remove('show');
            }
        });

        // Edit Profile Form Submit
        editProfileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            window.AppState.profile.fullName = document.getElementById('editProfileFullName').value;
            window.AppState.profile.email = document.getElementById('editProfileEmail').value;
            window.AppState.profile.phone = document.getElementById('editProfilePhone').value;
            window.AppState.profile.department = document.getElementById('editProfileDepartment').value;
            
            loadProfile();
            editProfileModal.classList.remove('show');
            showNotification('Profile updated successfully', 'success');
        });
    }

    // ========== INITIALIZE ==========
    function init() {
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
        loadProfile
    };
})();
