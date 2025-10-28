// DOM Elements
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menuBtn');
const closeSidebar = document.getElementById('closeSidebar');
const navItems = document.querySelectorAll('.nav-item[data-page]');
const pages = document.querySelectorAll('.page');
const pageTitle = document.getElementById('pageTitle');
const logoutBtn = document.getElementById('logoutBtn');

// Modal Elements
const addContactBtn = document.getElementById('addContactBtn');
const addContactModal = document.getElementById('addContactModal');
const closeModal = document.getElementById('closeModal');
const cancelModal = document.getElementById('cancelModal');
const addContactForm = document.getElementById('addContactForm');

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
    { id: 1, date: '2025-10-28 14:30', recipient: '+91 9876543210', message: 'Your OTP is 123456', status: 'delivered' },
    { id: 2, date: '2025-10-28 14:25', recipient: '+91 9876543211', message: 'Meeting reminder at 3 PM', status: 'delivered' },
    { id: 3, date: '2025-10-28 14:20', recipient: '+91 9876543212', message: 'Payment received successfully', status: 'failed' },
    { id: 4, date: '2025-10-28 14:15', recipient: '+91 9876543213', message: 'Welcome to our service', status: 'delivered' },
    { id: 5, date: '2025-10-28 14:10', recipient: '+91 9876543214', message: 'Your order has been shipped', status: 'delivered' }
];

let contacts = [
    { id: 1, name: 'Rajesh Kumar', phone: '+91 9876543210', email: 'rajesh@example.com', date: '2025-10-15' },
    { id: 2, name: 'Priya Sharma', phone: '+91 9876543211', email: 'priya@example.com', date: '2025-10-16' },
    { id: 3, name: 'Amit Patel', phone: '+91 9876543212', email: 'amit@example.com', date: '2025-10-17' },
    { id: 4, name: 'Sneha Desai', phone: '+91 9876543213', email: 'sneha@example.com', date: '2025-10-18' }
];

// Initialize Dashboard
function initDashboard() {
    updateStats();
    loadRecentActivity();
    loadContacts();
    loadBulkContacts();
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

// Navigation
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
            'reports': 'Reports'
        };
        pageTitle.textContent = titles[pageName];
        
        // Load page-specific data
        if (pageName === 'sms-history') {
            loadSMSHistory();
        }
        
        // Close sidebar on mobile
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
        }
    });
});

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

// Modal Functions
addContactBtn.addEventListener('click', () => {
    addContactModal.classList.add('show');
});

closeModal.addEventListener('click', () => {
    addContactModal.classList.remove('show');
});

cancelModal.addEventListener('click', () => {
    addContactModal.classList.remove('show');
});

addContactModal.addEventListener('click', (e) => {
    if (e.target === addContactModal) {
        addContactModal.classList.remove('show');
    }
});

addContactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newContact = {
        id: contacts.length + 1,
        name: formData.get('name') || e.target[0].value,
        phone: formData.get('phone') || e.target[1].value,
        email: formData.get('email') || e.target[2].value,
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
