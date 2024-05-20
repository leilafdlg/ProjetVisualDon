// Permet de faire un compte à rebours jusqu'à la prochaine Saint-Valentin
function getNextValentinesDay() {
  const today = new Date();
  const year = today.getFullYear();
  const valentinesDayThisYear = new Date(year, 1, 14); // le 14 février de cette année
  if (today <= valentinesDayThisYear) {
    return valentinesDayThisYear;
  } else {
    return new Date(year + 1, 1, 14);
  }
}

// Initialisation du compte à rebours
let countDownDate = getNextValentinesDay().getTime();

// Mise à jour du compte à rebours
function updateCountdown() {
  const now = new Date().getTime();
  let distance = countDownDate - now;

  // Calcul des jours, heures, minutes et secondes
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (document.getElementsByClassName("countdown-text").length > 1) {
    document.getElementsByClassName(
      "countdown-text"
    )[0].innerHTML = `${days}j ${hours}h ${minutes}m ${seconds}s`;
    document.getElementsByClassName(
      "countdown-text"
    )[1].innerHTML = `${days}j ${hours}h ${minutes}m ${seconds}s`;
  } else {
    document.getElementsByClassName(
      "countdown-text"
    )[0].innerHTML = `${days}j ${hours}h ${minutes}m ${seconds}s`;
  }

  if (distance < 0) {
    countDownDate = getNextValentinesDay().getTime(); // remettre à jour la date de la prochaine Saint-Valentin
  }
}

export { updateCountdown };
