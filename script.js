document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const userTableBody = document.querySelector('#userTable tbody');
    const emptyTableMessage = document.getElementById('emptyTableMessage');

    // Function to update the visibility of the empty table message
    function updateEmptyTableMessage() {
        if (userTableBody.rows.length === 0) {
            emptyTableMessage.style.display = 'block';
        } else {
            emptyTableMessage.style.display = 'none';
        }
    }

    
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

        const newRow = userTableBody.insertRow();

        const nameCell = newRow.insertCell();
        nameCell.textContent = name;

        const emailCell = newRow.insertCell();
        emailCell.textContent = email;

        const passwordCell = newRow.insertCell();
        passwordCell.textContent = password;

        const dobCell = newRow.insertCell();
        dobCell.textContent = dob;

        const termsCell = newRow.insertCell();
        termsCell.textContent = acceptedTerms;

        registrationForm.reset();
        updateEmptyTableMessage();
    });
});