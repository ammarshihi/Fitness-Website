// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (localStorage.getItem('registered') !== 'true') {
        window.location.href = '/sign';
        return;
    }

    // Load user data
    loadUserData();
    loadProfile();
    loadStats();
    initializeWeightChart();
    loadPhotos();

    // Set today's date as default for weight entry
    document.getElementById('weightDate').valueAsDate = new Date();

    // Setup photo upload handlers
    setupPhotoHandlers();
});

// Load user name
function loadUserData() {
    const userName = localStorage.getItem('userName') || 'User';
    document.getElementById('userName').textContent = userName;
}

// Load profile data
function loadProfile() {
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    
    if (profile.height) document.getElementById('height').value = profile.height;
    if (profile.currentWeight) document.getElementById('currentWeight').value = profile.currentWeight;
    if (profile.targetWeight) document.getElementById('targetWeight').value = profile.targetWeight;
    if (profile.activityLevel) document.getElementById('activityLevel').value = profile.activityLevel;
    if (profile.calorieGoal) document.getElementById('calorieGoal').value = profile.calorieGoal;
}

// Save profile data
function saveProfile() {
    const profile = {
        height: document.getElementById('height').value,
        currentWeight: document.getElementById('currentWeight').value,
        targetWeight: document.getElementById('targetWeight').value,
        activityLevel: document.getElementById('activityLevel').value,
        calorieGoal: document.getElementById('calorieGoal').value
    };

    localStorage.setItem('userProfile', JSON.stringify(profile));
    
    // Update stats after saving profile
    loadStats();
    updateWeightChart();

    // Show success message
    alert('Profile saved successfully!');
}

// Load and display stats
function loadStats() {
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const workoutData = JSON.parse(localStorage.getItem('workoutData') || '{"completed": 0, "total": 7}');
    const streakData = JSON.parse(localStorage.getItem('streakData') || '{"current": 0, "lastDate": ""}');
    
    // Update streak
    updateStreak();
    document.getElementById('streakCount').textContent = streakData.current;

    // Calculate workout percentage
    const workoutPercentage = Math.round((workoutData.completed / workoutData.total) * 100);
    document.getElementById('workoutPercentage').textContent = workoutPercentage + '%';
    document.getElementById('workoutProgressText').textContent = workoutPercentage + '%';
    updateCircularProgress(workoutPercentage);

    // Calculate weight progress
    if (profile.currentWeight && profile.targetWeight) {
        const initialWeight = parseFloat(localStorage.getItem('initialWeight') || profile.currentWeight);
        const progress = initialWeight - parseFloat(profile.currentWeight);
        document.getElementById('weightProgress').textContent = progress.toFixed(1) + ' kg';

        // Calculate goal percentage
        const totalGoal = initialWeight - parseFloat(profile.targetWeight);
        const goalPercentage = Math.min(Math.round((progress / totalGoal) * 100), 100);
        document.getElementById('goalPercentage').textContent = Math.max(goalPercentage, 0) + '%';
    }
}

// Update streak counter
function updateStreak() {
    const streakData = JSON.parse(localStorage.getItem('streakData') || '{"current": 0, "lastDate": ""}');
    const today = new Date().toDateString();
    const lastDate = new Date(streakData.lastDate).toDateString();
    
    // Check if last workout was yesterday or today
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (lastDate !== today && lastDate !== yesterdayStr && streakData.lastDate) {
        // Streak broken, reset to 0
        streakData.current = 0;
        localStorage.setItem('streakData', JSON.stringify(streakData));
    }
}

// Update circular progress bar
function updateCircularProgress(percentage) {
    const circle = document.getElementById('workoutProgressCircle');
    const circumference = 339.292;
    const offset = circumference - (percentage / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}

// Mark workout as complete
function markWorkoutComplete() {
    const workoutData = JSON.parse(localStorage.getItem('workoutData') || '{"completed": 0, "total": 7}');
    const streakData = JSON.parse(localStorage.getItem('streakData') || '{"current": 0, "lastDate": ""}');
    const today = new Date().toDateString();
    const lastDate = new Date(streakData.lastDate).toDateString();

    if (workoutData.completed < workoutData.total) {
        workoutData.completed++;
        localStorage.setItem('workoutData', JSON.stringify(workoutData));

        // Update streak if workout on new day
        if (lastDate !== today) {
            streakData.current++;
            streakData.lastDate = new Date().toISOString();
            localStorage.setItem('streakData', JSON.stringify(streakData));
        }

        loadStats();
        alert('Workout marked as complete! Keep going! 💪');
    } else {
        alert('You\'ve completed all workouts for this week! Great job! 🎉');
        // Reset for next week
        workoutData.completed = 0;
        localStorage.setItem('workoutData', JSON.stringify(workoutData));
    }
}

// Weight Chart
let weightChart;

function initializeWeightChart() {
    const ctx = document.getElementById('weightChart').getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(255, 102, 0, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 102, 0, 0.0)');

    const weightEntries = JSON.parse(localStorage.getItem('weightEntries') || '[]');
    
    // If no entries, create initial entry from profile
    if (weightEntries.length === 0) {
        const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        if (profile.currentWeight) {
            weightEntries.push({
                date: new Date().toISOString().split('T')[0],
                weight: parseFloat(profile.currentWeight)
            });
            localStorage.setItem('weightEntries', JSON.stringify(weightEntries));
            localStorage.setItem('initialWeight', profile.currentWeight);
        }
    }

    const dates = weightEntries.map(entry => {
        const date = new Date(entry.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    const weights = weightEntries.map(entry => entry.weight);

    weightChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Weight (kg)',
                data: weights,
                borderColor: '#ff6600',
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: '#ff6600',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#fff',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ff6600',
                    bodyColor: '#fff',
                    borderColor: '#ff6600',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        color: '#fff',
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#fff',
                        font: {
                            size: 12
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

// Add weight entry modal
function addWeightEntry() {
    const modal = new bootstrap.Modal(document.getElementById('weightModal'));
    modal.show();
}

// Save weight entry
function saveWeightEntry() {
    const date = document.getElementById('weightDate').value;
    const weight = parseFloat(document.getElementById('weightValue').value);

    if (!date || !weight) {
        alert('Please fill in all fields');
        return;
    }

    const weightEntries = JSON.parse(localStorage.getItem('weightEntries') || '[]');
    
    // Check if entry for this date already exists
    const existingIndex = weightEntries.findIndex(entry => entry.date === date);
    if (existingIndex !== -1) {
        weightEntries[existingIndex].weight = weight;
    } else {
        weightEntries.push({ date, weight });
    }

    // Sort by date
    weightEntries.sort((a, b) => new Date(a.date) - new Date(b.date));

    localStorage.setItem('weightEntries', JSON.stringify(weightEntries));

    // Update current weight in profile
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    profile.currentWeight = weight;
    localStorage.setItem('userProfile', JSON.stringify(profile));

    // Update chart and stats
    updateWeightChart();
    loadStats();

    // Close modal
    bootstrap.Modal.getInstance(document.getElementById('weightModal')).hide();

    // Clear form
    document.getElementById('weightValue').value = '';
    document.getElementById('weightDate').valueAsDate = new Date();
}

// Update weight chart with new data
function updateWeightChart() {
    const weightEntries = JSON.parse(localStorage.getItem('weightEntries') || '[]');
    
    const dates = weightEntries.map(entry => {
        const date = new Date(entry.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    const weights = weightEntries.map(entry => entry.weight);

    weightChart.data.labels = dates;
    weightChart.data.datasets[0].data = weights;
    weightChart.update();
}

// Photo upload handlers
function setupPhotoHandlers() {
    document.getElementById('beforePhotoInput').addEventListener('change', function(e) {
        handlePhotoUpload(e, 'before');
    });

    document.getElementById('afterPhotoInput').addEventListener('change', function(e) {
        handlePhotoUpload(e, 'after');
    });
}

function handlePhotoUpload(event, type) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const photoData = e.target.result;
            localStorage.setItem(`${type}Photo`, photoData);
            displayPhoto(type, photoData);
        };
        reader.readAsDataURL(file);
    }
}

function displayPhoto(type, photoData) {
    const preview = document.getElementById(`${type}PhotoPreview`);
    preview.innerHTML = `<img src="${photoData}" alt="${type} photo">`;
}

function loadPhotos() {
    const beforePhoto = localStorage.getItem('beforePhoto');
    const afterPhoto = localStorage.getItem('afterPhoto');

    if (beforePhoto) {
        displayPhoto('before', beforePhoto);
    }

    if (afterPhoto) {
        displayPhoto('after', afterPhoto);
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('registered');
        window.location.href = '/sign';
    }
}
