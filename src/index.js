// Pour gérer la page web
import data from "../data/data.json";
// importer la fonction updateCountdown
import { updateCountdown } from "./countdownValentineDay.js";
import {
  afficheCenturies,
  afficheFunfacts,
  insertBaseStatHTML,
  addHeartCountdown,
} from "./timeline.js";
import { makeSpotify } from "./spotify.js";
import { displayStatistics1 } from "./statistique1.js";
import { displayStatistics2 } from "./statistique2.js";
import { displayStatistics3 } from "./statistique3.js";
import { displayStatistics4 } from "./statistique4.js";
import { afficherMap } from "./map.js";
//import { consoleLoggingTest } from "./century.js";

afficheCenturies();
updateCountdown();
setInterval(updateCountdown, 1000);
makeSpotify();
afficheFunfacts();

insertBaseStatHTML();
displayStatistics1();
displayStatistics2();
displayStatistics3();
displayStatistics4();
afficherMap();
addHeartCountdown();
updateCountdown();
//setInterval(updateCountdown, 1000);
////////////////////////////////////////
/////////////// Spotify ////////////////
////////////////////////////////////////

document.querySelector(".spotifyButton").addEventListener("click", () => {
  document.getElementById("spotify-popup").style.display = "block";
});

document
  .querySelector("#spotify-popup .close-button")
  .addEventListener("click", () => {
    document.getElementById("spotify-popup").style.display = "none";
  });
