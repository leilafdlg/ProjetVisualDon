import data from "../data/data.json";
import { select } from "d3-selection";
const blocHorizontal = select(".blocHorizontal");

function makeSpotify() {
  const spotifyDiv = blocHorizontal.append("div").attr("class", "spotify");

  const spotDiv = document.querySelector(".spotify");

  spotDiv.innerHTML = `
        <p id="title" style="color:#e4004d;">Top 10</p>
        <p id="subtitle" style="color:#e4004d;">des chansons les plus <br>écoutées à la St-Valentin</p> 
        <button class="spotifyButton">Écouter la playlist Spotify</button>
        <div id="spotify-popup" class="popup">
        <div class="popup-content">
            <button class="close-button">
                <i class="bi bi-x-circle-fill"></i>
            </button>
            <iframe style="border-radius:12px"
                src="https://open.spotify.com/embed/playlist/4S4avqKGYuM5PCMkWSknJZ?utm_source=generator" width="800px"
                height="500" frameBorder="0" allowfullscreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"></iframe>
        </div>
        </div>
    
        <img src="assets/Timeline/30_Playlist.png"  width="300" height="auto">
        
        `;

  //   const svg = spotifyDiv
  //     .append("svg")
  //     .attr("class", "spotify-svg")
  //     .attr("width", "524")
  //     .attr("height", "564")
  //     .attr("viewBox", "0 0 524 564")
  //     .attr("fill", "none");
  //   // .attr("height", "100%");

  //   const markerDate = svg
  //     .append("path")
  //     .attr("class", "background")
  //     .attr("fill-rule", "evenodd")
  //     .attr("clip-rule", "evenodd")
  //     .attr(
  //       "d",
  //       "M-6.10352e-05 676L524 676L524 201.63L523.427 201.63C514.439 89.0336 400.829 0.000111302 262 9.91655e-05C123.171 8.70287e-05 9.56115 89.0335 0.572978 201.63L-1.95644e-05 201.63L-2.08235e-05 216.032L-6.10352e-05 676Z"
  //     )
  //     .attr("fill", "#FFC1C1");
}

export { makeSpotify };
