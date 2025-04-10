document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const userTableBody = document.getElementById('userTableBody');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const dobInput = document.getElementById('dob');
    const dobError = document.getElementById('dobError');

    // Load existing data from local storage
    loadUserData();

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = emailInput.value;
        const password = document.getElementById('password').value;
        const dob = dobInput.value;
        const acceptedTerms = document.getElementById('terms').checked;

        // Validate email
        if (!isValidEmail(email)) {
            emailError.classList.remove('hidden');
            return;
        } else {
            emailError.classList.add('hidden');
        }

        // Validate age
        const ageValidationResult = isAgeValid(dob);
        if (ageValidationResult !== true) {
            dobError.textContent = ageValidationResult; // Set specific error message
            dobError.classList.remove('hidden');
            return;
        } else {
            dobError.classList.add('hidden');
            dobError.textContent = "You must be between 18 and 55 years old."; // Reset to default
        }

        const newUser = { name, email, password, dob, acceptedTerms };
        saveUserData(newUser);
        renderTable();
        registrationForm.reset();
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isAgeValid(dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 18) {
            const eighteenYearsAgo = new Date();
            eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
            const minDateFormatted = eighteenYearsAgo.toLocaleDateString('en-GB'); // Format as dd/mm/yyyy
            return `Value must be ${minDateFormatted} or later.`;
        }

        if (age > 55) {
            const fiftyFiveYearsAgo = new Date();
            fiftyFiveYearsAgo.setFullYear(today.getFullYear() - 55);
            const maxDateFormatted = fiftyFiveYearsAgo.toLocaleDateString('en-GB'); // Format as dd/mm/yyyy
            return `Value must be ${maxDateFormatted} or earlier.`;
        }

        return true; // Age is valid
    }

    function saveUserData(user) {
        let users = localStorage.getItem('users');
        users = users ? JSON.parse(users) : [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    function loadUserData() {
        const users = localStorage.getItem('users');
        if (users) {
            userData = JSON.parse(users);
            renderTable();
        }
    }

    function renderTable() {
        userTableBody.innerHTML = '';
        let users = localStorage.getItem('users');
        if (users) {
            const userData = JSON.parse(users);
            userData.forEach(user => {
                const row = userTableBody.insertRow();
                const nameCell = row.insertCell();
                const emailCell = row.insertCell();
                const passwordCell = row.insertCell();
                const dobCell = row.insertCell();
                const termsCell = row.insertCell();

                nameCell.textContent = user.name;
                emailCell.textContent = user.email;
                passwordCell.textContent = user.password;
                dobCell.textContent = user.dob;
                termsCell.textContent = user.acceptedTerms ? 'Yes' : 'No';
            });
        }
    }
});
