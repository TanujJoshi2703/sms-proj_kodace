// ========== GLOBAL STATE ==========
window.AppState = {
    smsData: {
        totalSent: 1542,
        totalDelivered: 1489,
        totalFailed: 53,
        totalContacts: 328
    },
    recentActivity: [
        { id: 1, date: '2025-11-04 14:30', recipient: '+91 9876543210', message: 'Your OTP is 123456', status: 'delivered' },
        { id: 2, date: '2025-11-04 14:25', recipient: '+91 9876543211', message: 'Meeting reminder at 3 PM', status: 'delivered' },
        { id: 3, date: '2025-11-04 14:20', recipient: '+91 9876543212', message: 'Payment received successfully', status: 'failed' },
        { id: 4, date: '2025-11-04 14:15', recipient: '+91 9876543213', message: 'Welcome to our service', status: 'delivered' },
        { id: 5, date: '2025-11-04 14:10', recipient: '+91 9876543214', message: 'Your order has been shipped', status: 'delivered' }
    ],
    contacts: [
        { id: 1, name: 'Rajesh Kumar', phone: '+91 9876543210', email: 'rajesh@example.com', date: '2025-10-15' },
        { id: 2, name: 'Priya Sharma', phone: '+91 9876543211', email: 'priya@example.com', date: '2025-10-16' },
        { id: 3, name: 'Amit Patel', phone: '+91 9876543212', email: 'amit@example.com', date: '2025-10-17' },
        { id: 4, name: 'Sneha Desai', phone: '+91 9876543213', email: 'sneha@example.com', date: '2025-10-18' }
    ],
    users: [
        { id: 1, username: 'admin', fullName: 'Admin User', email: 'admin@fortune.com', role: 'Administrator', status: 'active', createdDate: '2025-01-01', lastLogin: '2025-11-04 13:45' },
        { id: 2, username: 'john.doe', fullName: 'John Doe', email: 'john@fortune.com', role: 'Manager', status: 'active', createdDate: '2025-02-15', lastLogin: '2025-11-03 10:20' },
        { id: 3, username: 'jane.smith', fullName: 'Jane Smith', email: 'jane@fortune.com', role: 'Operator', status: 'active', createdDate: '2025-03-10', lastLogin: '2025-11-02 14:30' },
        { id: 4, username: 'mike.wilson', fullName: 'Mike Wilson', email: 'mike@fortune.com', role: 'Operator', status: 'inactive', createdDate: '2025-04-20', lastLogin: '2025-09-15 09:00' }
    ],
    roles: [
        { id: 1, name: 'Administrator', description: 'Full system access with all permissions', permissions: ['send_sms', 'view_sms', 'manage_contacts', 'manage_users', 'manage_roles', 'view_reports'], usersCount: 1 },
        { id: 2, name: 'Manager', description: 'Can manage SMS and contacts, view reports', permissions: ['send_sms', 'view_sms', 'manage_contacts', 'view_reports'], usersCount: 1 },
        { id: 3, name: 'Operator', description: 'Can send SMS and view history only', permissions: ['send_sms', 'view_sms'], usersCount: 2 }
    ]
};

// ========== UTILITY FUNCTIONS ==========
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

// ========== DOM ELEMENTS ==========
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menuBtn');
const closeSidebar = document.getElementById('closeSidebar');
const navItems = document.querySelectorAll('.nav-item[data-page]');
const pages = document.querySelectorAll('.page');
const pageTitle = document.getElementById('pageTitle');
const logoutBtn = document.getElementById('logoutBtn');

// Contact Modal Elements
const addContactBtn = document.getElementById('addContactBtn');
const addContactModal = document.getElementById('addContactModal');
const closeContactModal = document.getElementById('closeContactModal');
const cancelContactModal = document.getElementById('cancelContactModal');
const addContactForm = document.getElementById('addContactForm');

// SMS Form Elements
const sendType = document.getElementById('sendType');
const individualSection = document.getElementById('individualSection');
const bulkSection = document.getElementById('bulkSection');
const smsMessage = document.getElementById('smsMessage');
const charCount = document.getElementById('charCount');
const sendSmsForm = document.getElementById('sendSmsForm');

// ========== INITIALIZATION ==========
function initDashboard() {
    updateStats();
    loadRecentActivity();
    loadContacts();
    loadBulkContacts();
    
    // Load saved appearance settings on page load
    loadSavedAppearanceSettings();
}

// Load saved appearance settings from localStorage
function loadSavedAppearanceSettings() {
    // Load theme
    const savedTheme = localStorage.getItem('appTheme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }
    
    // Load compact mode
    const savedCompactMode = localStorage.getItem('compactMode');
    if (savedCompactMode === 'true') {
        document.body.classList.add('compact-mode');
    }
    
    // Load animations setting
    const savedAnimations = localStorage.getItem('showAnimations');
    if (savedAnimations === 'false') {
        document.body.classList.add('no-animations');
    }
}

// ========== STATISTICS ==========
function updateStats() {
    document.getElementById('totalSent').textContent = window.AppState.smsData.totalSent.toLocaleString();
    document.getElementById('totalDelivered').textContent = window.AppState.smsData.totalDelivered.toLocaleString();
    document.getElementById('totalFailed').textContent = window.AppState.smsData.totalFailed.toLocaleString();
    document.getElementById('totalContacts').textContent = window.AppState.smsData.totalContacts.toLocaleString();
}

// ========== RECENT ACTIVITY ==========
function loadRecentActivity() {
    const tbody = document.getElementById('recentActivityTable');
    
    if (window.AppState.recentActivity.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="no-data">No recent activity</td></tr>';
        return;
    }
    
    tbody.innerHTML = window.AppState.recentActivity.slice(0, 5).map(item => `
        <tr>
            <td>${item.date}</td>
            <td>${item.recipient}</td>
            <td>${item.message.substring(0, 30)}${item.message.length > 30 ? '...' : ''}</td>
            <td><span class="status-badge status-${item.status}">${item.status.toUpperCase()}</span></td>
        </tr>
    `).join('');
}

// ========== SMS HISTORY ==========
function loadSMSHistory() {
    const tbody = document.getElementById('smsHistoryTable');
    
    if (window.AppState.recentActivity.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="no-data">No SMS history available</td></tr>';
        return;
    }
    
    tbody.innerHTML = window.AppState.recentActivity.map(item => `
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

// ========== CONTACTS MANAGEMENT ==========
function loadContacts() {
    const tbody = document.getElementById('contactsTable');
    
    if (window.AppState.contacts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="no-data">No contacts available</td></tr>';
        return;
    }
    
    tbody.innerHTML = window.AppState.contacts.map(contact => `
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

function loadBulkContacts() {
    const select = document.getElementById('bulkContacts');
    select.innerHTML = '<option value="all">All Contacts</option>' + 
        window.AppState.contacts.map(contact => `<option value="${contact.id}">${contact.name} - ${contact.phone}</option>`).join('');
}

function deleteContact(id) {
    if (confirm('Are you sure you want to delete this contact?')) {
        window.AppState.contacts = window.AppState.contacts.filter(c => c.id !== id);
        loadContacts();
        loadBulkContacts();
        window.AppState.smsData.totalContacts--;
        updateStats();
        showNotification('Contact deleted successfully', 'success');
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
        
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        const pageName = item.dataset.page;
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(`${pageName}-page`).classList.add('active');
        
      const titles = {
    'dashboard': 'Dashboard Overview',
    'send-sms': 'Send SMS',
    'sms-history': 'SMS History',
    'contacts': 'Contact Management',
    'users': 'User Management',
    'roles': 'Role Management',
    'companies': 'Company Management',
    'profile': 'My Profile',
    'settings': 'Settings',
    'reports': 'Reports'
};

        pageTitle.textContent = titles[pageName];
        
        if (pageName === 'sms-history') {
    loadSMSHistory();
} else if (pageName === 'users' && typeof window.UsersModule !== 'undefined') {
    window.UsersModule.loadUsers();
} else if (pageName === 'roles' && typeof window.RolesModule !== 'undefined') {
    window.RolesModule.loadRoles();
} else if (pageName === 'companies' && typeof window.CompaniesModule !== 'undefined') {
    window.CompaniesModule.loadCompanies();
} else if (pageName === 'profile' && typeof window.ProfileModule !== 'undefined') {
    window.ProfileModule.loadProfile();
} else if (pageName === 'settings' && typeof window.SettingsModule !== 'undefined') {
    window.SettingsModule.loadSettings();
}

    });
});

// ========== CONTACT MODAL ==========
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
        id: window.AppState.contacts.length + 1,
        name: document.getElementById('contactName').value,
        phone: document.getElementById('contactPhone').value,
        email: document.getElementById('contactEmail').value,
        date: new Date().toISOString().split('T')[0]
    };
    
    window.AppState.contacts.push(newContact);
    loadContacts();
    loadBulkContacts();
    window.AppState.smsData.totalContacts++;
    updateStats();
    
    addContactModal.classList.remove('show');
    addContactForm.reset();
    showNotification('Contact added successfully', 'success');
});

// ========== SMS FORM ==========
sendType.addEventListener('change', (e) => {
    if (e.target.value === 'bulk') {
        individualSection.style.display = 'none';
        bulkSection.style.display = 'block';
    } else {
        individualSection.style.display = 'block';
        bulkSection.style.display = 'none';
    }
});

smsMessage.addEventListener('input', (e) => {
    charCount.textContent = e.target.value.length;
});

sendSmsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const message = smsMessage.value.trim();
    if (!message) {
        showNotification('Please enter a message', 'error');
        return;
    }
    
    showNotification('SMS sent successfully!', 'success');
    sendSmsForm.reset();
    charCount.textContent = '0';
    
    window.AppState.smsData.totalSent++;
    window.AppState.smsData.totalDelivered++;
    updateStats();
    
    const newActivity = {
        id: window.AppState.recentActivity.length + 1,
        date: new Date().toLocaleString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
        recipient: sendType.value === 'individual' ? document.getElementById('phoneNumber').value : 'Bulk Send',
        message: message,
        status: 'delivered'
    };
    window.AppState.recentActivity.unshift(newActivity);
    loadRecentActivity();
});

// ========== OTHER HANDLERS ==========
document.getElementById('refreshActivity').addEventListener('click', () => {
    loadRecentActivity();
    showNotification('Activity refreshed', 'success');
});

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'login.html';
    }
});

// Initialize on load
document.addEventListener('DOMContentLoaded', initDashboard);
