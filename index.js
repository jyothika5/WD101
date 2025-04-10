 document.addEventListener('DOMContentLoaded', () => {
                const registrationForm = document.getElementById('registrationForm');
                const userTableBody = document.getElementById('userTableBody');
                const emailInput = document.getElementById('email');
                const emailError = document.getElementById('emailError');
                const dobInput = document.getElementById('dob');
                const dobError = document.getElementById('dobError');
        
                let users = [];
        
                // Load users from localStorage
                function loadUserData() {
                    const storedUsers = localStorage.getItem('users');
                    users = storedUsers ? JSON.parse(storedUsers) : [];
                    renderTable();
                }
        
                function saveUserData() {
                    localStorage.setItem('users', JSON.stringify(users));
                }
        
                function renderTable() {
                    userTableBody.innerHTML = '';
                    users.forEach(user => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td class="px-5 py-3 border-b border-gray-200">${user.name}</td>
                            <td class="px-5 py-3 border-b border-gray-200">${user.email}</td>
                            <td class="px-5 py-3 border-b border-gray-200">${user.password}</td>
                            <td class="px-5 py-3 border-b border-gray-200">${user.dob}</td>
                            <td class="px-5 py-3 border-b border-gray-200">${user.acceptedTerms ? 'Yes' : 'No'}</td>
                        `;
                        userTableBody.appendChild(row);
                    });
                }
        
                function isValidEmail(email) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(email);
                }
        
                function isAgeValid(dob) {
                    const birthDate = new Date(dob);
                    const today = new Date();
                    let age = today.getFullYear() - birthDate.getFullYear();
                    const m = today.getMonth() - birthDate.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                    }
        
                    if (age < 18) {
                        return `You must be at least 18 years old.`;
                    } else if (age > 55) {
                        return `You must be 55 or younger.`;
                    }
        
                    return true;
                }
        
                registrationForm.addEventListener('submit', (e) => {
                    e.preventDefault();
        
                    const name = document.getElementById('name').value.trim();
                    const email = emailInput.value.trim();
                    const password = document.getElementById('password').value.trim();
                    const dob = dobInput.value;
                    const acceptedTerms = document.getElementById('terms').checked;
        
                    // Email validation
                    if (!isValidEmail(email)) {
                        emailError.classList.remove('hidden');
                        return;
                    } else {
                        emailError.classList.add('hidden');
                    }
        
                    // Age validation
                    const ageCheck = isAgeValid(dob);
                    if (ageCheck !== true) {
                        dobError.textContent = ageCheck;
                        dobError.classList.remove('hidden');
                        return;
                    } else {
                        dobError.classList.add('hidden');
                        dobError.textContent = "You must be between 18 and 55 years old.";
                    }
        
                    // Terms validation
                    if (!acceptedTerms) {
                        alert("You must accept the terms and conditions.");
                        return;
                    }
        
                    const newUser = { name, email, password, dob, acceptedTerms };
                    users.push(newUser);
                    saveUserData();
                    renderTable();
                    registrationForm.reset();
                });
        
                // Initial load
                loadUserData();
            });
            const clearDataBtn = document.getElementById('clearDataBtn');
clearDataBtn.addEventListener('click', () => {
    localStorage.removeItem('users');
    userTableBody.innerHTML = ''; // Clear table display
});
