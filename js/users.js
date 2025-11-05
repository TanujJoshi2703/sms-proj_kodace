// ========== USERS MODULE ==========
window.UsersModule = (function() {
    'use strict';

    // DOM Elements
    const addUserBtn = document.getElementById('addUserBtn');
    const userModal = document.getElementById('userModal');
    const closeUserModal = document.getElementById('closeUserModal');
    const cancelUserModal = document.getElementById('cancelUserModal');
    const userForm = document.getElementById('userForm');
    const userModalTitle = document.getElementById('userModalTitle');
    
    const viewUserModal = document.getElementById('viewUserModal');
    const closeViewUserModal = document.getElementById('closeViewUserModal');
    const closeViewUserBtn = document.getElementById('closeViewUserBtn');

    // ========== LOAD USERS ==========
    function loadUsers() {
        const tbody = document.getElementById('usersTable');
        
        if (window.AppState.users.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="no-data">No users available</td></tr>';
            return;
        }
        
        tbody.innerHTML = window.AppState.users.map(user => `
            <tr>
                <td>#${user.id}</td>
                <td>${user.username}</td>
                <td>${user.fullName}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td><span class="status-badge status-${user.status}">${user.status.toUpperCase()}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon" onclick="UsersModule.viewUser(${user.id})" title="View Details">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                        <button class="btn-icon" onclick="UsersModule.editUser(${user.id})" title="Edit">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button class="btn-icon" onclick="UsersModule.deleteUser(${user.id})" title="Delete">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // ========== LOAD ROLES DROPDOWN ==========
    function loadRolesDropdown() {
        const select = document.getElementById('userRole');
        select.innerHTML = '<option value="">Select Role</option>' + 
            window.AppState.roles.map(role => `<option value="${role.name}">${role.name}</option>`).join('');
    }

    // ========== VIEW USER ==========
    function viewUser(id) {
        const user = window.AppState.users.find(u => u.id === id);
        if (!user) return;
        
        document.getElementById('viewUsername').textContent = user.username;
        document.getElementById('viewFullName').textContent = user.fullName;
        document.getElementById('viewEmail').textContent = user.email;
        document.getElementById('viewRole').textContent = user.role;
        document.getElementById('viewStatus').innerHTML = `<span class="status-badge status-${user.status}">${user.status.toUpperCase()}</span>`;
        document.getElementById('viewCreatedDate').textContent = user.createdDate;
        document.getElementById('viewLastLogin').textContent = user.lastLogin;
        
        viewUserModal.classList.add('show');
    }

    // ========== EDIT USER ==========
    function editUser(id) {
        const user = window.AppState.users.find(u => u.id === id);
        if (!user) return;
        
        userModalTitle.textContent = 'Edit User';
        document.getElementById('userId').value = user.id;
        document.getElementById('username').value = user.username;
        document.getElementById('fullName').value = user.fullName;
        document.getElementById('userEmail').value = user.email;
        document.getElementById('userRole').value = user.role;
        document.getElementById('userStatus').value = user.status;
        document.getElementById('userPassword').removeAttribute('required');
        
        userModal.classList.add('show');
    }

    // ========== DELETE USER ==========
    function deleteUser(id) {
        const user = window.AppState.users.find(u => u.id === id);
        if (!user) return;
        
        if (user.username === 'admin') {
            showNotification('Cannot delete the main administrator account', 'error');
            return;
        }
        
        if (confirm(`Are you sure you want to delete user "${user.fullName}"?`)) {
            window.AppState.users = window.AppState.users.filter(u => u.id !== id);
            loadUsers();
            
            const role = window.AppState.roles.find(r => r.name === user.role);
            if (role) {
                role.usersCount--;
                if (typeof window.RolesModule !== 'undefined') {
                    window.RolesModule.loadRoles();
                }
            }
            
            showNotification('User deleted successfully', 'success');
        }
    }

    // ========== EVENT LISTENERS ==========
    function initEventListeners() {
        // Add User Button
        addUserBtn.addEventListener('click', () => {
            userModalTitle.textContent = 'Add New User';
            userForm.reset();
            document.getElementById('userId').value = '';
            document.getElementById('userPassword').setAttribute('required', 'required');
            userModal.classList.add('show');
        });

        // Close User Modal
        closeUserModal.addEventListener('click', () => {
            userModal.classList.remove('show');
        });

        cancelUserModal.addEventListener('click', () => {
            userModal.classList.remove('show');
        });

        userModal.addEventListener('click', (e) => {
            if (e.target === userModal) {
                userModal.classList.remove('show');
            }
        });

        // User Form Submit
        userForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const userId = document.getElementById('userId').value;
            const userData = {
                username: document.getElementById('username').value,
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('userEmail').value,
                role: document.getElementById('userRole').value,
                status: document.getElementById('userStatus').value
            };
            
            if (userId) {
                const user = window.AppState.users.find(u => u.id == userId);
                if (user) {
                    const oldRole = user.role;
                    Object.assign(user, userData);
                    
                    if (oldRole !== userData.role) {
                        const oldRoleObj = window.AppState.roles.find(r => r.name === oldRole);
                        const newRoleObj = window.AppState.roles.find(r => r.name === userData.role);
                        if (oldRoleObj) oldRoleObj.usersCount--;
                        if (newRoleObj) newRoleObj.usersCount++;
                        if (typeof window.RolesModule !== 'undefined') {
                            window.RolesModule.loadRoles();
                        }
                    }
                    
                    showNotification('User updated successfully', 'success');
                }
            } else {
                const newUser = {
                    id: window.AppState.users.length + 1,
                    ...userData,
                    createdDate: new Date().toISOString().split('T')[0],
                    lastLogin: 'Never'
                };
                window.AppState.users.push(newUser);
                
                const role = window.AppState.roles.find(r => r.name === userData.role);
                if (role) {
                    role.usersCount++;
                    if (typeof window.RolesModule !== 'undefined') {
                        window.RolesModule.loadRoles();
                    }
                }
                
                showNotification('User added successfully', 'success');
            }
            
            loadUsers();
            userModal.classList.remove('show');
            userForm.reset();
        });

        // View User Modal
        closeViewUserModal.addEventListener('click', () => {
            viewUserModal.classList.remove('show');
        });

        closeViewUserBtn.addEventListener('click', () => {
            viewUserModal.classList.remove('show');
        });

        viewUserModal.addEventListener('click', (e) => {
            if (e.target === viewUserModal) {
                viewUserModal.classList.remove('show');
            }
        });
    }

    // ========== INITIALIZE ==========
    function init() {
        loadRolesDropdown();
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
        loadUsers,
        viewUser,
        editUser,
        deleteUser
    };
})();
