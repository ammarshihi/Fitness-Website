

        function validateSignin() {
            let valid = true;

            // Basic email check
            const email = document.getElementById('signin-email').value.trim();
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                document.getElementById('signEmailError').textContent = 'Invalid email format';
                valid = false;
            } else {
                document.getElementById('signEmailError').textContent = '';
            }

            // Password not empty
            if (document.getElementById('signin-password').value === '') {
                document.getElementById('signPasswordError').textContent = 'Password required';
                valid = false;
            } else {
                document.getElementById('signPasswordError').textContent = '';
            }

            if (valid) {
                try {
                    localStorage.setItem('registered', 'true');
                } catch (e) {
                    console.warn('Unable to set registration flag:', e);
                }
                alert('Sign in successful!');
                window.location.href = '/dashboard';
            }
            return false;
        }
