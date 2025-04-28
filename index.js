document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const tableBody = document.getElementById('userTableBody');
    const emailInput = document.getElementById('email');
    const dobInput = document.getElementById('dob');
    const emailError = document.getElementById('emailError');
    const ageError = document.getElementById('ageError');
    
    // Load existing users from localStorage
    loadUsers();
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Reset error messages
      emailError.classList.add('hidden');
      ageError.classList.add('hidden');
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const dob = document.getElementById('dob').value;
      const acceptedTerms = document.getElementById('terms').checked;
      
      // Validate email format
      if (!validateEmail(email)) {
        emailError.classList.remove('hidden');
        return;
      }
      
      // Validate age (between 18 and 55)
      if (!validateAge(dob)) {
        ageError.classList.remove('hidden');
        return;
      }
      
      // Create user object
      const user = {
        name,
        email,
        password,
        dob,
        acceptedTerms
      };
      
      // Save user to localStorage
      saveUser(user);
      
      // Add user to table
      addUserToTable(user);
      
      // Reset form
      form.reset();
    });
    
    // Email validation
    emailInput.addEventListener('input', function() {
      if (this.value && !validateEmail(this.value)) {
        emailError.classList.remove('hidden');
      } else {
        emailError.classList.add('hidden');
      }
    });
    
    // Age validation
    dobInput.addEventListener('change', function() {
      if (this.value && !validateAge(this.value)) {
        ageError.classList.remove('hidden');
      } else {
        ageError.classList.add('hidden');
      }
    });
    
    // Validate email format
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
    
    // Validate age (between 18 and 55)
    function validateAge(dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      // Adjust age if birthday hasn't occurred yet this year
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      return age >= 18 && age <= 55;
    }
    
    // Save user to localStorage
    function saveUser(user) {
      let users = JSON.parse(localStorage.getItem('users')) || [];
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Load users from localStorage
    function loadUsers() {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.forEach(user => addUserToTable(user));
    }
    
    // Add user to table
    function addUserToTable(user) {
      const row = document.createElement('tr');
      row.className = 'hover:bg-gray-50 transition-colors duration-200';
      
      row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${user.name}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${user.email}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${user.password}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${user.dob}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${user.acceptedTerms}</td>
      `;
      
      tableBody.appendChild(row);
    }
  });