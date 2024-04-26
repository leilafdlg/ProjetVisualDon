// la logique du décompte jusqu'à la prochaine Saint-Valentin// Function to get the next Valentine's Day date
function getNextValentinesDay() {
    const today = new Date();
    const year = today.getFullYear();
    const valentinesDayThisYear = new Date(year, 1, 14); // February 14
    if (today <= valentinesDayThisYear) {
        return valentinesDayThisYear;
    } else {
        return new Date(year + 1, 1, 14);
    }
}

// Set the date we're counting down to
let countDownDate = getNextValentinesDay().getTime();

// Update the count down every 1 second
function updateCountdown() {
    let now = new Date().getTime();
    let distance = countDownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="countdown"
    document.getElementById("countdown").innerHTML = `${days}j ${hours}h ${minutes}m ${seconds}s`;

    // If the count down is over, restart for next year's Valentine's Day
    if (distance < 0) {
        countDownDate = getNextValentinesDay().getTime();
        updateCountdown(); // Call update immediately to reset the countdown
    }
}

// Export the updateCountdown function if you are using modules
export { updateCountdown };
