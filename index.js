document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const userTableBody = document.querySelector('#userTable tbody');
    const emptyTableMessage = document.getElementById('emptyTableMessage');

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

    // Function to validate password strength (at least 8 characters)
    function isStrongPassword(password) {
        return password.length >= 8;
    }

    // Function to update the visibility of the empty table message
    function updateEmptyTableMessage() {
        if (userTableBody.rows.length === 0) {
            emptyTableMessage.style.display = 'block';
        } else {
            emptyTableMessage.style.display = 'none';
        }
    }

    // Initial call to set the initial state
    updateEmptyTableMessage();

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

        // Password validation
        clearError(passwordInput);
        if (!isStrongPassword(password)) {
            displayError(passwordInput, 'Password must be at least 8 characters long.');
            isValid = false;
        }

        if (isValid) {
            const newRow = userTableBody.insertRow();

            const nameCell = newRow.insertCell();
            nameCell.textContent = name;

            const emailCell = newRow.insertCell();
            emailCell.textContent = email;

            const passwordCell = newRow.insertCell();
            passwordCell.textContent = password; // In a real application, hash this!

            const dobCell = newRow.insertCell();
            dobCell.textContent = dob;

            const termsCell = newRow.insertCell();
            termsCell.textContent = acceptedTerms;

            registrationForm.reset();
            updateEmptyTableMessage();
        }
    });
});