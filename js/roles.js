// ========== ROLES MODULE ==========
window.RolesModule = (function() {
    'use strict';

    // DOM Elements
    const addRoleBtn = document.getElementById('addRoleBtn');
    const roleModal = document.getElementById('roleModal');
    const closeRoleModal = document.getElementById('closeRoleModal');
    const cancelRoleModal = document.getElementById('cancelRoleModal');
    const roleForm = document.getElementById('roleForm');
    const roleModalTitle = document.getElementById('roleModalTitle');

    // ========== LOAD ROLES ==========
    function loadRoles() {
        const tbody = document.getElementById('rolesTable');
        
        if (window.AppState.roles.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="no-data">No roles available</td></tr>';
            return;
        }
        
        tbody.innerHTML = window.AppState.roles.map(role => `
            <tr>
                <td>#${role.id}</td>
                <td>${role.name}</td>
                <td>${role.description}</td>
                <td>
                    <div class="permissions-display">
                        ${role.permissions.slice(0, 3).map(p => `<span class="permission-tag">${p.replace('_', ' ')}</span>`).join('')}
                        ${role.permissions.length > 3 ? `<span class="permission-tag">+${role.permissions.length - 3} more</span>` : ''}
                    </div>
                </td>
                <td>${role.usersCount}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon" onclick="RolesModule.editRole(${role.id})" title="Edit">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button class="btn-icon" onclick="RolesModule.deleteRole(${role.id})" title="Delete">
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

    // ========== EDIT ROLE ==========
    function editRole(id) {
        const role = window.AppState.roles.find(r => r.id === id);
        if (!role) return;
        
        roleModalTitle.textContent = 'Edit Role';
        document.getElementById('roleId').value = role.id;
        document.getElementById('roleName').value = role.name;
        document.getElementById('roleDescription').value = role.description;
        
        const checkboxes = document.querySelectorAll('input[name="permissions"]');
        checkboxes.forEach(cb => {
            cb.checked = role.permissions.includes(cb.value);
        });
        
        roleModal.classList.add('show');
    }

    // ========== DELETE ROLE ==========
    function deleteRole(id) {
        const role = window.AppState.roles.find(r => r.id === id);
        if (!role) return;
        
        if (role.usersCount > 0) {
            showNotification(`Cannot delete role "${role.name}" because it has ${role.usersCount} assigned user(s)`, 'error');
            return;
        }
        
        if (confirm(`Are you sure you want to delete role "${role.name}"?`)) {
            window.AppState.roles = window.AppState.roles.filter(r => r.id !== id);
            loadRoles();
            
            if (typeof window.UsersModule !== 'undefined') {
                const select = document.getElementById('userRole');
                select.innerHTML = '<option value="">Select Role</option>' + 
                    window.AppState.roles.map(role => `<option value="${role.name}">${role.name}</option>`).join('');
            }
            
            showNotification('Role deleted successfully', 'success');
        }
    }

    // ========== EVENT LISTENERS ==========
    function initEventListeners() {
        // Add Role Button
        addRoleBtn.addEventListener('click', () => {
            roleModalTitle.textContent = 'Add New Role';
            roleForm.reset();
            document.getElementById('roleId').value = '';
            roleModal.classList.add('show');
        });

        // Close Role Modal
        closeRoleModal.addEventListener('click', () => {
            roleModal.classList.remove('show');
        });

        cancelRoleModal.addEventListener('click', () => {
            roleModal.classList.remove('show');
        });

        roleModal.addEventListener('click', (e) => {
            if (e.target === roleModal) {
                roleModal.classList.remove('show');
            }
        });

        // Role Form Submit
        roleForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const roleId = document.getElementById('roleId').value;
            const permissions = Array.from(document.querySelectorAll('input[name="permissions"]:checked')).map(cb => cb.value);
            
            if (permissions.length === 0) {
                showNotification('Please select at least one permission', 'error');
                return;
            }
            
            const roleData = {
                name: document.getElementById('roleName').value,
                description: document.getElementById('roleDescription').value,
                permissions: permissions
            };
            
            if (roleId) {
                const role = window.AppState.roles.find(r => r.id == roleId);
                if (role) {
                    Object.assign(role, roleData);
                    showNotification('Role updated successfully', 'success');
                }
            } else {
                const newRole = {
                    id: window.AppState.roles.length + 1,
                    ...roleData,
                    usersCount: 0
                };
                window.AppState.roles.push(newRole);
                showNotification('Role added successfully', 'success');
            }
            
            loadRoles();
            
            if (typeof window.UsersModule !== 'undefined') {
                const select = document.getElementById('userRole');
                select.innerHTML = '<option value="">Select Role</option>' + 
                    window.AppState.roles.map(role => `<option value="${role.name}">${role.name}</option>`).join('');
            }
            
            roleModal.classList.remove('show');
            roleForm.reset();
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
        loadRoles,
        editRole,
        deleteRole
    };
})();
