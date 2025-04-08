document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const userTableBody = document.querySelector('#userTable tbody');
    const emptyTableMessage = document.getElementById('emptyTableMessage');

    // Load existing data from localStorage
    let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    // Function to display error messages
    function displayError(inputElement, message) {
        const errorDiv = inputElement.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains('error-message')) {
            const newErrorDiv = document.createElement('div');
            newErrorDiv.classList.add('error-message');
            inputElement.parentNode.insertBefore(newErrorDiv, inputElement.nextSibling);
        }
        inputElement.nextElementSibling.textContent = message;
        inputElement.classList.add('error');
    }

    // Function to clear error messages
    function clearError(inputElement) {
        const errorDiv = inputElement.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.textContent = '';
        }
        inputElement.classList.remove('error');
    }

    // Function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to calculate age from Date of Birth
    function calculateAge(dob) {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    // Function to render the table
    function renderTable() {
        userTableBody.innerHTML = ''; // Clear existing table rows
        registeredUsers.forEach(user => {
            const newRow = userTableBody.insertRow();
            newRow.insertCell().textContent = user.name;
            newRow.insertCell().textContent = user.email;
            newRow.insertCell().textContent = '********'; // For privacy, don't show actual password
            newRow.insertCell().textContent = user.dob;
            newRow.insertCell().textContent = user.acceptedTerms;
        });
        updateEmptyTableMessage();
    }

    // Function to update the visibility of the empty table message
    function updateEmptyTableMessage() {
        emptyTableMessage.style.display = registeredUsers.length === 0 ? 'block' : 'none';
    }

    // Initial rendering of the table from stored data
    renderTable();

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const dobInput = document.getElementById('dob');
        const termsInput = document.getElementById('terms');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const dob = dobInput.value;
        const acceptedTerms = termsInput.checked;

        let isValid = true;

        // Email validation
        clearError(emailInput);
        if (!isValidEmail(email)) {
            displayError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        }

        // Age validation
        clearError(dobInput);
        const age = calculateAge(dob);
        if (age < 18 || age > 55) {
            displayError(dobInput, 'Users must be between 18 and 55 years old.');
            isValid = false;
        }

        if (isValid) {
            const newUser = { name, email, dob, acceptedTerms };
            registeredUsers.push(newUser);
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            renderTable();
            registrationForm.reset();
        }
    });
});