// ========== COMPANIES MODULE ==========
window.CompaniesModule = (function() {
    'use strict';

    // Initialize companies data in AppState if not exists
    if (!window.AppState.companies) {
        window.AppState.companies = [
            { id: 1, name: 'Fortune Enterprises', email: 'contact@fortune.com', phone: '+91 9876543210', address: 'Mumbai, Maharashtra, India', website: 'https://fortune.com', status: 'active', createdDate: '2025-01-01' },
            { id: 2, name: 'Tech Solutions Ltd', email: 'info@techsolutions.com', phone: '+91 9876543211', address: 'Bangalore, Karnataka, India', website: 'https://techsolutions.com', status: 'active', createdDate: '2025-02-15' },
            { id: 3, name: 'Digital Marketing Pro', email: 'hello@digitalmp.com', phone: '+91 9876543212', address: 'Delhi, India', website: 'https://digitalmp.com', status: 'inactive', createdDate: '2025-03-20' }
        ];
    }

    // DOM Elements
    const addCompanyBtn = document.getElementById('addCompanyBtn');
    const companyModal = document.getElementById('companyModal');
    const closeCompanyModal = document.getElementById('closeCompanyModal');
    const cancelCompanyModal = document.getElementById('cancelCompanyModal');
    const companyForm = document.getElementById('companyForm');
    const companyModalTitle = document.getElementById('companyModalTitle');
    
    const viewCompanyModal = document.getElementById('viewCompanyModal');
    const closeViewCompanyModal = document.getElementById('closeViewCompanyModal');
    const closeViewCompanyBtn = document.getElementById('closeViewCompanyBtn');

    // ========== LOAD COMPANIES ==========
    function loadCompanies() {
        const tbody = document.getElementById('companiesTable');
        
        if (window.AppState.companies.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="no-data">No companies available</td></tr>';
            return;
        }
        
        tbody.innerHTML = window.AppState.companies.map(company => `
            <tr>
                <td>#${company.id}</td>
                <td>${company.name}</td>
                <td>${company.email}</td>
                <td>${company.phone}</td>
                <td>${company.address}</td>
                <td><span class="status-badge status-${company.status}">${company.status.toUpperCase()}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon" onclick="CompaniesModule.viewCompany(${company.id})" title="View Details">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                        <button class="btn-icon" onclick="CompaniesModule.editCompany(${company.id})" title="Edit">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button class="btn-icon" onclick="CompaniesModule.deleteCompany(${company.id})" title="Delete">
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

    // ========== VIEW COMPANY ==========
    function viewCompany(id) {
        const company = window.AppState.companies.find(c => c.id === id);
        if (!company) return;
        
        document.getElementById('viewCompanyName').textContent = company.name;
        document.getElementById('viewCompanyEmail').textContent = company.email;
        document.getElementById('viewCompanyPhone').textContent = company.phone;
        document.getElementById('viewCompanyAddress').textContent = company.address || 'N/A';
        document.getElementById('viewCompanyWebsite').innerHTML = company.website ? 
            `<a href="${company.website}" target="_blank">${company.website}</a>` : 'N/A';
        document.getElementById('viewCompanyStatus').innerHTML = `<span class="status-badge status-${company.status}">${company.status.toUpperCase()}</span>`;
        document.getElementById('viewCompanyCreatedDate').textContent = company.createdDate;
        
        viewCompanyModal.classList.add('show');
    }

    // ========== EDIT COMPANY ==========
    function editCompany(id) {
        const company = window.AppState.companies.find(c => c.id === id);
        if (!company) return;
        
        companyModalTitle.textContent = 'Edit Company';
        document.getElementById('companyId').value = company.id;
        document.getElementById('companyName').value = company.name;
        document.getElementById('companyEmail').value = company.email;
        document.getElementById('companyPhone').value = company.phone;
        document.getElementById('companyAddress').value = company.address || '';
        document.getElementById('companyWebsite').value = company.website || '';
        document.getElementById('companyStatus').value = company.status;
        
        companyModal.classList.add('show');
    }

    // ========== DELETE COMPANY ==========
    function deleteCompany(id) {
        const company = window.AppState.companies.find(c => c.id === id);
        if (!company) return;
        
        if (confirm(`Are you sure you want to delete company "${company.name}"?`)) {
            window.AppState.companies = window.AppState.companies.filter(c => c.id !== id);
            loadCompanies();
            showNotification('Company deleted successfully', 'success');
        }
    }

    // ========== EVENT LISTENERS ==========
    function initEventListeners() {
        // Add Company Button
        addCompanyBtn.addEventListener('click', () => {
            companyModalTitle.textContent = 'Add New Company';
            companyForm.reset();
            document.getElementById('companyId').value = '';
            companyModal.classList.add('show');
        });

        // Close Company Modal
        closeCompanyModal.addEventListener('click', () => {
            companyModal.classList.remove('show');
        });

        cancelCompanyModal.addEventListener('click', () => {
            companyModal.classList.remove('show');
        });

        companyModal.addEventListener('click', (e) => {
            if (e.target === companyModal) {
                companyModal.classList.remove('show');
            }
        });

        // Company Form Submit
        companyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const companyId = document.getElementById('companyId').value;
            const companyData = {
                name: document.getElementById('companyName').value,
                email: document.getElementById('companyEmail').value,
                phone: document.getElementById('companyPhone').value,
                address: document.getElementById('companyAddress').value,
                website: document.getElementById('companyWebsite').value,
                status: document.getElementById('companyStatus').value
            };
            
            if (companyId) {
                const company = window.AppState.companies.find(c => c.id == companyId);
                if (company) {
                    Object.assign(company, companyData);
                    showNotification('Company updated successfully', 'success');
                }
            } else {
                const newCompany = {
                    id: window.AppState.companies.length + 1,
                    ...companyData,
                    createdDate: new Date().toISOString().split('T')[0]
                };
                window.AppState.companies.push(newCompany);
                showNotification('Company added successfully', 'success');
            }
            
            loadCompanies();
            companyModal.classList.remove('show');
            companyForm.reset();
        });

        // View Company Modal
        closeViewCompanyModal.addEventListener('click', () => {
            viewCompanyModal.classList.remove('show');
        });

        closeViewCompanyBtn.addEventListener('click', () => {
            viewCompanyModal.classList.remove('show');
        });

        viewCompanyModal.addEventListener('click', (e) => {
            if (e.target === viewCompanyModal) {
                viewCompanyModal.classList.remove('show');
            }
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
        loadCompanies,
        viewCompany,
        editCompany,
        deleteCompany
    };
})();
