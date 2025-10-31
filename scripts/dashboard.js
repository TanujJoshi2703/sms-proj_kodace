// DOM Elements
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menuBtn');
const closeSidebar = document.getElementById('closeSidebar');
const navItems = document.querySelectorAll('.nav-item[data-page]');
const pages = document.querySelectorAll('.page');
const pageTitle = document.getElementById('pageTitle');
const logoutBtn = document.getElementById('logoutBtn');

// Modal Elements - Contact
const addContactBtn = document.getElementById('addContactBtn');
const addContactModal = document.getElementById('addContactModal');
const closeContactModal = document.getElementById('closeContactModal');
const cancelContactModal = document.getElementById('cancelContactModal');
const addContactForm = document.getElementById('addContactForm');

// Modal Elements - User
const addUserBtn = document.getElementById('addUserBtn');
const userModal = document.getElementById('userModal');
const closeUserModal = document.getElementById('closeUserModal');
const cancelUserModal = document.getElementById('cancelUserModal');
const userForm = document.getElementById('userForm');
const userModalTitle = document.getElementById('userModalTitle');

// Modal Elements - View User
const viewUserModal = document.getElementById('viewUserModal');
const closeViewUserModal = document.getElementById('closeViewUserModal');
const closeViewUserBtn = document.getElementById('closeViewUserBtn');

// Modal Elements - Role
const addRoleBtn = document.getElementById('addRoleBtn');
const roleModal = document.getElementById('roleModal');
const closeRoleModal = document.getElementById('closeRoleModal');
const cancelRoleModal = document.getElementById('cancelRoleModal');
const roleForm = document.getElementById('roleForm');
const roleModalTitle = document.getElementById('roleModalTitle');

// Form Elements
const sendType = document.getElementById('sendType');
const individualSection = document.getElementById('individualSection');
const bulkSection = document.getElementById('bulkSection');
const smsMessage = document.getElementById('smsMessage');
const charCount = document.getElementById('charCount');
const sendSmsForm = document.getElementById('sendSmsForm');

// Sample Data
let smsData = {
    totalSent: 1542,
    totalDelivered: 1489,
    totalFailed: 53,
    totalContacts: 328
};

let recentActivity = [
    { id: 1, date: '2025-10-31 14:30', recipient: '+91 9876543210', message: 'Your OTP is 123456', status: 'delivered' },
    { id: 2, date: '2025-10-31 14:25', recipient: '+91 9876543211', message: 'Meeting reminder at 3 PM', status: 'delivered' },
    { id: 3, date: '2025-10-31 14:20', recipient: '+91 9876543212', message: 'Payment received successfully', status: 'failed' },
    { id: 4, date: '2025-10-31 14:15', recipient: '+91 9876543213', message: 'Welcome to our service', status: 'delivered' },
    { id: 5, date: '2025-10-31 14:10', recipient: '+91 9876543214', message: 'Your order has been shipped', status: 'delivered' }
];

let contacts = [
    { id: 1, name: 'Rajesh Kumar', phone: '+91 9876543210', email: 'rajesh@example.com', date: '2025-10-15' },
    { id: 2, name: 'Priya Sharma', phone: '+91 9876543211', email: 'priya@example.com', date: '2025-10-16' },
    { id: 3, name: 'Amit Patel', phone: '+91 9876543212', email: 'amit@example.com', date: '2025-10-17' },
    { id: 4, name: 'Sneha Desai', phone: '+91 9876543213', email: 'sneha@example.com', date: '2025-10-18' }
];

let users = [
    { id: 1, username: 'admin', fullName: 'Admin User', email: 'admin@fortune.com', role: 'Administrator', status: 'active', createdDate: '2025-01-01', lastLogin: '2025-10-31 17:45' },
    { id: 2, username: 'john.doe', fullName: 'John Doe', email: 'john@fortune.com', role: 'Manager', status: 'active', createdDate: '2025-02-15', lastLogin: '2025-10-30 10:20' },
    { id: 3, username: 'jane.smith', fullName: 'Jane Smith', email: 'jane@fortune.com', role: 'Operator', status: 'active', createdDate: '2025-03-10', lastLogin: '2025-10-29 14:30' },
    { id: 4, username: 'mike.wilson', fullName: 'Mike Wilson', email: 'mike@fortune.com', role: 'Operator', status: 'inactive', createdDate: '2025-04-20', lastLogin: '2025-09-15 09:00' }
];

let roles = [
    { id: 1, name: 'Administrator', description: 'Full system access with all permissions', permissions: ['send_sms', 'view_sms', 'manage_contacts', 'manage_users', 'manage_roles', 'view_reports'], usersCount: 1 },
    { id: 2, name: 'Manager', description: 'Can manage SMS and contacts, view reports', permissions: ['send_sms', 'view_sms', 'manage_contacts', 'view_reports'], usersCount: 1 },
    { id: 3, name: 'Operator', description: 'Can send SMS and view history only', permissions: ['send_sms', 'view_sms'], usersCount: 2 }
];

// Initialize Dashboard
function initDashboard() {
    updateStats();
    loadRecentActivity();
    loadContacts();
    loadBulkContacts();
    loadUsers();
    loadRoles();
    loadRolesDropdown();
}

// Update Statistics
function updateStats() {
    document.getElementById('totalSent').textContent = smsData.totalSent.toLocaleString();
    document.getElementById('totalDelivered').textContent = smsData.totalDelivered.toLocaleString();
    document.getElementById('totalFailed').textContent = smsData.totalFailed.toLocaleString();
    document.getElementById('totalContacts').textContent = smsData.totalContacts.toLocaleString();
}

// Load Recent Activity
function loadRecentActivity() {
    const tbody = document.getElementById('recentActivityTable');
    
    if (recentActivity.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="no-data">No recent activity</td></tr>';
        return;
    }
    
    tbody.innerHTML = recentActivity.slice(0, 5).map(item => `
        <tr>
            <td>${item.date}</td>
            <td>${item.recipient}</td>
            <td>${item.message.substring(0, 30)}${item.message.length > 30 ? '...' : ''}</td>
            <td><span class="status-badge status-${item.status}">${item.status.toUpperCase()}</span></td>
        </tr>
    `).join('');
}

// Load SMS History
function loadSMSHistory() {
    const tbody = document.getElementById('smsHistoryTable');
    
    if (recentActivity.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-data">No SMS history available</td></tr>';
        return;
    }
    
    tbody.innerHTML = recentActivity.map(item => `
        <tr>
            <td>#${item.id}</td>
            <td>${item.date}</td>
            <td>${item.recipient}</td>
            <td>${item.message.substring(0, 40)}${item.message.length > 40 ? '...' : ''}</td>
            <td><span class="status-badge status-${item.status}">${item.status.toUpperCase()}</span></td>
            <td>
                <button class="btn-icon" title="View Details">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                </button>
                <button class="btn-icon" title="Delete">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </td>
        </tr>
    `).join('');
}

// Load Contacts
function loadContacts() {
    const tbody = document.getElementById('contactsTable');
    
    if (contacts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="no-data">No contacts available</td></tr>';
        return;
    }
    
    tbody.innerHTML = contacts.map(contact => `
        <tr>
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td>${contact.email}</td>
            <td>${contact.date}</td>
            <td>
                <button class="btn-icon" title="Edit">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>
                <button class="btn-icon" onclick="deleteContact(${contact.id})" title="Delete">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </td>
        </tr>
    `).join('');
}

// Load Bulk Contacts Dropdown
function loadBulkContacts() {
    const select = document.getElementById('bulkContacts');
    select.innerHTML = '<option value="all">All Contacts</option>' + 
        contacts.map(contact => `<option value="${contact.id}">${contact.name} - ${contact.phone}</option>`).join('');
}

// Delete Contact
function deleteContact(id) {
    if (confirm('Are you sure you want to delete this contact?')) {
        contacts = contacts.filter(c => c.id !== id);
        loadContacts();
        loadBulkContacts();
        smsData.totalContacts--;
        updateStats();
        showNotification('Contact deleted successfully', 'success');
    }
}

// ========== USER MANAGEMENT FUNCTIONS ==========

// Load Users
function loadUsers() {
    const tbody = document.getElementById('usersTable');
    
    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="no-data">No users available</td></tr>';
        return;
    }
    
    tbody.innerHTML = users.map(user => `
        <tr>
            <td>#${user.id}</td>
            <td>${user.username}</td>
            <td>${user.fullName}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td><span class="status-badge status-${user.status}">${user.status.toUpperCase()}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon" onclick="viewUser(${user.id})" title="View Details">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                    <button class="btn-icon" onclick="editUser(${user.id})" title="Edit">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="btn-icon" onclick="deleteUser(${user.id})" title="Delete">
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

// Load Roles Dropdown
function loadRolesDropdown() {
    const select = document.getElementById('userRole');
    select.innerHTML = '<option value="">Select Role</option>' + 
        roles.map(role => `<option value="${role.name}">${role.name}</option>`).join('');
}

// View User Details
function viewUser(id) {
    const user = users.find(u => u.id === id);
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

// Edit User
function editUser(id) {
    const user = users.find(u => u.id === id);
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

// Delete User
function deleteUser(id) {
    const user = users.find(u => u.id === id);
    if (!user) return;
    
    if (user.username === 'admin') {
        showNotification('Cannot delete the main administrator account', 'error');
        return;
    }
    
    if (confirm(`Are you sure you want to delete user "${user.fullName}"?`)) {
        users = users.filter(u => u.id !== id);
        loadUsers();
        
        // Update role user count
        const role = roles.find(r => r.name === user.role);
        if (role) {
            role.usersCount--;
            loadRoles();
        }
        
        showNotification('User deleted successfully', 'success');
    }
}

// ========== ROLE MANAGEMENT FUNCTIONS ==========

// Load Roles
function loadRoles() {
    const tbody = document.getElementById('rolesTable');
    
    if (roles.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-data">No roles available</td></tr>';
        return;
    }
    
    tbody.innerHTML = roles.map(role => `
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
                    <button class="btn-icon" onclick="editRole(${role.id})" title="Edit">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="btn-icon" onclick="deleteRole(${role.id})" title="Delete">
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

// Edit Role
function editRole(id) {
    const role = roles.find(r => r.id === id);
    if (!role) return;
    
    roleModalTitle.textContent = 'Edit Role';
    document.getElementById('roleId').value = role.id;
    document.getElementById('roleName').value = role.name;
    document.getElementById('roleDescription').value = role.description;
    
    // Check permissions
    const checkboxes = document.querySelectorAll('input[name="permissions"]');
    checkboxes.forEach(cb => {
        cb.checked = role.permissions.includes(cb.value);
    });
    
    roleModal.classList.add('show');
}

// Delete Role
function deleteRole(id) {
    const role = roles.find(r => r.id === id);
    if (!role) return;
    
    if (role.usersCount > 0) {
        showNotification(`Cannot delete role "${role.name}" because it has ${role.usersCount} assigned user(s)`, 'error');
        return;
    }
    
    if (confirm(`Are you sure you want to delete role "${role.name}"?`)) {
        roles = roles.filter(r => r.id !== id);
        loadRoles();
        loadRolesDropdown();
        showNotification('Role deleted successfully', 'success');
    }
}

// ========== NAVIGATION ==========

menuBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
});

closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active nav item
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Show corresponding page
        const pageName = item.dataset.page;
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(`${pageName}-page`).classList.add('active');
        
        // Update page title
        const titles = {
            'dashboard': 'Dashboard Overview',
            'send-sms': 'Send SMS',
            'sms-history': 'SMS History',
            'contacts': 'Contact Management',
            'users': 'User Management',
            'roles': 'Role Management',
            'reports': 'Reports'
        };
        pageTitle.textContent = titles[pageName];
        
        // Load page-specific data
        if (pageName === 'sms-history') {
            loadSMSHistory();
        } else if (pageName === 'users') {
            loadUsers();
        } else if (pageName === 'roles') {
            loadRoles();
        }
        
        // Close sidebar on mobile
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
        }
    });
});

// ========== MODAL HANDLERS ==========

// Contact Modal
addContactBtn.addEventListener('click', () => {
    addContactModal.classList.add('show');
});

closeContactModal.addEventListener('click', () => {
    addContactModal.classList.remove('show');
});

cancelContactModal.addEventListener('click', () => {
    addContactModal.classList.remove('show');
});

addContactModal.addEventListener('click', (e) => {
    if (e.target === addContactModal) {
        addContactModal.classList.remove('show');
    }
});

addContactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newContact = {
        id: contacts.length + 1,
        name: document.getElementById('contactName').value,
        phone: document.getElementById('contactPhone').value,
        email: document.getElementById('contactEmail').value,
        date: new Date().toISOString().split('T')[0]
    };
    
    contacts.push(newContact);
    loadContacts();
    loadBulkContacts();
    smsData.totalContacts++;
    updateStats();
    
    addContactModal.classList.remove('show');
    addContactForm.reset();
    showNotification('Contact added successfully', 'success');
});

// User Modal
addUserBtn.addEventListener('click', () => {
    userModalTitle.textContent = 'Add New User';
    userForm.reset();
    document.getElementById('userId').value = '';
    document.getElementById('userPassword').setAttribute('required', 'required');
    userModal.classList.add('show');
});

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
        // Edit existing user
        const user = users.find(u => u.id == userId);
        if (user) {
            const oldRole = user.role;
            Object.assign(user, userData);
            
            // Update role counts
            if (oldRole !== userData.role) {
                const oldRoleObj = roles.find(r => r.name === oldRole);
                const newRoleObj = roles.find(r => r.name === userData.role);
                if (oldRoleObj) oldRoleObj.usersCount--;
                if (newRoleObj) newRoleObj.usersCount++;
                loadRoles();
            }
            
            showNotification('User updated successfully', 'success');
        }
    } else {
        // Add new user
        const newUser = {
            id: users.length + 1,
            ...userData,
            createdDate: new Date().toISOString().split('T')[0],
            lastLogin: 'Never'
        };
        users.push(newUser);
        
        // Update role count
        const role = roles.find(r => r.name === userData.role);
        if (role) {
            role.usersCount++;
            loadRoles();
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

// Role Modal
addRoleBtn.addEventListener('click', () => {
    roleModalTitle.textContent = 'Add New Role';
    roleForm.reset();
    document.getElementById('roleId').value = '';
    roleModal.classList.add('show');
});

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
        // Edit existing role
        const role = roles.find(r => r.id == roleId);
        if (role) {
            Object.assign(role, roleData);
            showNotification('Role updated successfully', 'success');
        }
    } else {
        // Add new role
        const newRole = {
            id: roles.length + 1,
            ...roleData,
            usersCount: 0
        };
        roles.push(newRole);
        showNotification('Role added successfully', 'success');
    }
    
    loadRoles();
    loadRolesDropdown();
    roleModal.classList.remove('show');
    roleForm.reset();
});

// ========== OTHER FORM HANDLERS ==========

// Send Type Toggle
sendType.addEventListener('change', (e) => {
    if (e.target.value === 'bulk') {
        individualSection.style.display = 'none';
        bulkSection.style.display = 'block';
    } else {
        individualSection.style.display = 'block';
        bulkSection.style.display = 'none';
    }
});

// Character Counter
smsMessage.addEventListener('input', (e) => {
    charCount.textContent = e.target.value.length;
});

// Send SMS Form
sendSmsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const message = smsMessage.value.trim();
    if (!message) {
        showNotification('Please enter a message', 'error');
        return;
    }
    
    // Simulate sending SMS
    showNotification('SMS sent successfully!', 'success');
    sendSmsForm.reset();
    charCount.textContent = '0';
    
    // Update stats
    smsData.totalSent++;
    smsData.totalDelivered++;
    updateStats();
    
    // Add to recent activity
    const newActivity = {
        id: recentActivity.length + 1,
        date: new Date().toLocaleString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        recipient: sendType.value === 'individual' ? document.getElementById('phoneNumber').value : 'Bulk Send',
        message: message,
        status: 'delivered'
    };
    recentActivity.unshift(newActivity);
    loadRecentActivity();
});

// Refresh Activity
document.getElementById('refreshActivity').addEventListener('click', () => {
    loadRecentActivity();
    showNotification('Activity refreshed', 'success');
});

// Logout
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'login.html';
    }
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#2ECC71' : type === 'error' ? '#E74C3C' : '#3498DB'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initDashboard);
