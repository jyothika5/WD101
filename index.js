document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('regForm');
    const tableBody = document.getElementById('tableBody');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const dobInput = document.getElementById('dob');
    const termsInput = document.getElementById('terms');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const ageError = document.getElementById('age-error');
    const termsError = document.getElementById('terms-error');

    loadTableData();

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const dob = dobInput.value;
        const acceptedTerms = termsInput.checked;

        let isValid = true;

        // Reset error messages
        nameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        ageError.textContent = '';
        termsError.textContent = '';

        // Check for empty fields
        if (!name) {
            nameError.textContent = 'Please fill in your name.';
            isValid = false;
        }
        if (!email) {
            emailError.textContent = 'Please fill in your email.';
            isValid = false;
        }
        if (!password) {
            passwordError.textContent = 'Please fill in your password.';
            isValid = false;
        }
        if (!dob) {
            ageError.textContent = 'Please fill in your date of birth.';
            isValid = false;
        }
        if (!acceptedTerms) {
            termsError.textContent = 'Please accept the terms and conditions.';
            isValid = false;
        }

        let isEmailValid = isValidEmail(email);
        let isAgeValid = isValidAge(dob);

        // Inline email validation feedback
        if (email && !isEmailValid) {
            emailError.textContent = `Please include an "@" in the email address. "${email}" is missing an "@".`;
            isValid = false;
        }

        // Inline age validation feedback
        if (dob && !isAgeValid) {
            const today = new Date();
            const eighteenYearsAgo = new Date(today);
            eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
            const fiftyFiveYearsAgo = new Date(today);
            fiftyFiveYearsAgo.setFullYear(today.getFullYear() - 55);

            const eighteenYearsAgoFormatted = formatDate(eighteenYearsAgo);
            const fiftyFiveYearsAgoFormatted = formatDate(fiftyFiveYearsAgo);

            let errorMessage = `Value must be ${fiftyFiveYearsAgoFormatted} or later.`;
            if (calculateAge(dob) < 18) {
                errorMessage = `Value must be ${eighteenYearsAgoFormatted} or earlier.`;
            }
            ageError.textContent = errorMessage;
            isValid = false;
        }

        if (isValid) {
            const newRowData = { name, email, password, dob, acceptedTerms };
            addRowToTable(newRowData);
            saveTableData();
            form.reset();
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidAge(dob) {
        const age = calculateAge(dob);
        return age >= 18 && age <= 55;
    }

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

    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    function addRowToTable(data) {
        const newRow = tableBody.insertRow();
        newRow.insertCell().textContent = data.name;
        newRow.insertCell().className = 'px-4 py-2';
        newRow.insertCell().textContent = data.email;
        newRow.insertCell().className = 'px-4 py-2';
        newRow.insertCell().textContent = data.password;
        newRow.insertCell().className = 'px-4 py-2';
        newRow.insertCell().textContent = data.dob;
        newRow.insertCell().className = 'px-4 py-2';
        newRow.insertCell().textContent = data.acceptedTerms ? 'Yes' : 'No';
        newRow.insertCell().className = 'px-4 py-2';
    }

    function saveTableData() {
        const rows = tableBody.querySelectorAll('tr');
        const data = Array.from(rows).map(row => {
            const cells = row.querySelectorAll('td');
            return {
                name: cells[0].textContent,
                email: cells[1].textContent,
                password: cells[2].textContent,
                dob: cells[3].textContent,
                acceptedTerms: cells[4].textContent === 'Yes'
            };
        });
        localStorage.setItem('registrationData', JSON.stringify(data));
    }

    function loadTableData() {
        const storedData = localStorage.getItem('registrationData');
        if (storedData) {
            const data = JSON.parse(storedData);
            data.forEach(rowData => addRowToTable(rowData));
        }
    }
});