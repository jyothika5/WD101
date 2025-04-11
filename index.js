document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('regForm');
    const tableBody = document.getElementById('tableBody');
    const emailInput = document.getElementById('email');
    const dobInput = document.getElementById('dob');

    loadTableData();

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = emailInput.value;
        const password = document.getElementById('password').value;
        const dob = dobInput.value;
        const acceptedTerms = document.getElementById('terms').checked;

        let isEmailValid = isValidEmail(email);
        let isAgeValid = isValidAge(dob);

        // Inline email validation feedback
        const emailError = document.getElementById('email-error');
        if (!isEmailValid) {
            if (!emailError) {
                const errorSpan = document.createElement('span');
                errorSpan.id = 'email-error';
                errorSpan.className = 'text-red-500 text-sm italic ml-2';
                errorSpan.textContent = 'Please include an "@" in the email address.';
                emailInput.parentNode.insertBefore(errorSpan, emailInput.nextSibling);
            }
        } else {
            if (emailError) {
                emailError.remove();
            }
        }

        // Inline age validation feedback
        const ageError = document.getElementById('age-error');
        if (!isAgeValid) {
            const age = calculateAge(dob);
            let errorMessage = 'Value must be ';
            if (age < 18) {
                errorMessage += '09/11/' + (new Date().getFullYear() - 18) + ' or later.';
            } else if (age > 55) {
                errorMessage += '09/11/' + (new Date().getFullYear() - 55) + ' or earlier.';
            }

            if (!ageError) {
                const errorSpan = document.createElement('span');
                errorSpan.id = 'age-error';
                errorSpan.className = 'text-red-500 text-sm italic ml-2';
                errorSpan.textContent = errorMessage;
                dobInput.parentNode.insertBefore(errorSpan, dobInput.nextSibling);
            } else {
                ageError.textContent = errorMessage; // Update existing error message
            }
        } else {
            if (ageError) {
                ageError.remove();
            }
        }

        if (isEmailValid && isAgeValid) {
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
