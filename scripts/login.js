// DOM Elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const capsWarning = document.getElementById('capsWarning');
const loginButton = loginForm.querySelector('.login-button');
const buttonLoader = document.getElementById('buttonLoader');

// Toggle Password Visibility
togglePasswordBtn.addEventListener('click', function() {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    
    // Update icon
    const eyeIcon = this.querySelector('.eye-icon');
    if (type === 'text') {
        eyeIcon.innerHTML = `
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
        `;
    } else {
        eyeIcon.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        `;
    }
});

// Caps Lock Detection
passwordInput.addEventListener('keyup', function(event) {
    if (event.getModifierState && event.getModifierState('CapsLock')) {
        capsWarning.classList.add('show');
    } else {
        capsWarning.classList.remove('show');
    }
});

// Input Validation
function validateInput(input, errorElementId, errorMessage) {
    const errorElement = document.getElementById(errorElementId);
    
    if (input.value.trim() === '') {
        input.classList.add('error');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
        return false;
    } else {
        input.classList.remove('error');
        errorElement.classList.remove('show');
        return true;
    }
}

// Real-time validation on blur
usernameInput.addEventListener('blur', function() {
    validateInput(this, 'usernameError', 'Username is required');
});

passwordInput.addEventListener('blur', function() {
    validateInput(this, 'passwordError', 'Password is required');
});

// Clear error on input
usernameInput.addEventListener('input', function() {
    if (this.value.trim() !== '') {
        this.classList.remove('error');
        document.getElementById('usernameError').classList.remove('show');
    }
});

passwordInput.addEventListener('input', function() {
    if (this.value.trim() !== '') {
        this.classList.remove('error');
        document.getElementById('passwordError').classList.remove('show');
    }
});

// Form Submission
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate inputs
    const isUsernameValid = validateInput(usernameInput, 'usernameError', 'Username is required');
    const isPasswordValid = validateInput(passwordInput, 'passwordError', 'Password is required');
    
    if (!isUsernameValid || !isPasswordValid) {
        return;
    }
    
    // Show loading state
    loginButton.classList.add('loading');
    loginButton.disabled = true;
    
    // Simulate API call (replace with actual authentication)
    setTimeout(() => {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Demo credentials (replace with actual backend authentication)
        if (username === 'admin' && password === 'admin123') {
            // Success - redirect to dashboard
            alert('Login successful! Redirecting to dashboard...');
            // window.location.href = 'dashboard.html';
        } else {
            // Error handling
            loginButton.classList.remove('loading');
            loginButton.disabled = false;
            
            passwordInput.classList.add('error');
            document.getElementById('passwordError').textContent = 'Invalid username or password';
            document.getElementById('passwordError').classList.add('show');
        }
    }, 1500);
});

// Forgot Password Link
document.querySelector('.forgot-password').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Password reset functionality will be implemented. Please contact your administrator.');
});
