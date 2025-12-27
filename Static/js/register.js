
        function validateRegister() {
            let valid = true;

            // Username: 5-20 chars, letters, numbers, underscore
            const username = document.getElementById('username').value.trim();
            const usernameRegex = /^[a-zA-Z0-9_]{5,20}$/;
            if (!usernameRegex.test(username)) {
                document.getElementById('usernameError').textContent = 'Username: 5-20 chars, letters/numbers/underscore only';
                valid = false;
            } else {
                document.getElementById('usernameError').textContent = '';
            }

            // Email
            const email = document.getElementById('reg-email').value.trim();
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                document.getElementById('regEmailError').textContent = 'Invalid email format';
                valid = false;
            } else {
                document.getElementById('regEmailError').textContent = '';
            }

            // Password strength
            const password = document.getElementById('reg-password').value;
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
            if (!passwordRegex.test(password)) {
                document.getElementById('regPasswordError').textContent = 'Password: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special (!@#$%^&*)';
                valid = false;
            } else {
                document.getElementById('regPasswordError').textContent = '';
            }

            // Confirm password
            const confirm = document.getElementById('confirmPassword').value;
            if (password !== confirm) {
                document.getElementById('confirmError').textContent = 'Passwords do not match';
                valid = false;
            } else {
                document.getElementById('confirmError').textContent = '';
            }

            if (valid) {
                localStorage.setItem('registered', 'true');
                localStorage.setItem('userName', username);
                alert('Registration successful!');
                window.location.href = '/dashboard';
}
return false;


        }
    