
    
        function processPayment() {
            const cardNumber = document.getElementById('cardNumber').value.trim();
            const expiry = document.getElementById('expiry').value.trim();
            const cvv = document.getElementById('cvv').value.trim();

            // Simple validation (demo purposes only)
            if (!cardNumber || cardNumber.length < 16 || !expiry || !cvv || cvv.length < 3) {
                showModal('failed', 'Payment Failed', 'Please fill all fields correctly.');
                return;
            }

            // Simulate success/failure randomly (for demo)
            const isSuccess = Math.random() > 0.3; // ~70% chance of success

            if (isSuccess) {
                showModal('success', 'Payment Successful!', 'Thank you! Your membership is now active.');
            } else {
                showModal('failed', 'Payment Failed', 'Sorry, your payment could not be processed. Try again.');
            }
        }

        function showModal(type, title, message) {
            const modal = document.getElementById('paymentModal');
            const modalIcon = document.getElementById('modalIcon');
            const modalTitle = document.getElementById('modalTitle');
            const modalMessage = document.getElementById('modalMessage');

            if (type === 'success') {
                modalIcon.className = 'modal-icon fas fa-check-circle success';
                modalTitle.className = 'success';
            } else {
                modalIcon.className = 'modal-icon fas fa-times-circle failed';
                modalTitle.className = 'failed';
            }

            modalTitle.textContent = title;
            modalMessage.textContent = message;
            modal.style.display = 'flex';
        }

        function closeModal() {
            document.getElementById('paymentModal').style.display = 'none';
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modal = document.getElementById('paymentModal');
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        }
    