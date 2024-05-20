//import the dates to put on the timeline
import { select } from "d3-selection";
import data from "../data/data.json";
import { makePopup, openPopup, closePopup } from "./popup.js";

//important variables
const blocHorizontal = select(".blocHorizontal");
const timeline = document.querySelector("#timeline");
const heartArrow = document.querySelector(".heart-arrow");

heartArrow.style.fill = "#5C98BA";
//const heart = select(".heart-arrow");

//retrieve position of the timeline
let timelineCoordinates = timeline.getBoundingClientRect();
let timelineX = timelineCoordinates.left;
let timelineY = timelineCoordinates.top;
console.log(timelineX, timelineY); //DELETE

//position the arrow on the timeline
heartArrow.style.marginTop = `${timelineY - 51.1953125}px`;

//array containing all the centuries and removes undefined values
let centuries = data.Timeline.map((item) => item.century).filter(
  (item) => item !== undefined
);
//removes identical items
centuries = centuries.filter((item, index) => {
  return centuries.indexOf(item) === index;
});

//trying to retrieve the color

function removeDuplicates(data) {
  const seen = new Set(); // To keep track of seen centuries
  const unique = []; // To store unique items

  data.forEach((item) => {
    if (!seen.has(item.century)) {
      seen.add(item.century);
      unique.push(item); // Add item if its century hasn't been seen before
    }
  });

  return unique;
}

//creates an array of objects whixch contain a century and color object
let timelineData = data.Timeline.map((item) => ({
  century: item.century,
  color: item.color,
}));

timelineData = removeDuplicates(
  timelineData.filter((item) => item.century !== undefined) //removes undefined centuries
);

// timelineData = timelineData.filter((item) => item.century !== undefined);
// timelineData = timelineData.filter((item, index) => {
//   console.log(index, item, item.century);
//   return timelineData.indexOf(item.century) === index;
// }); DELETE

const observerData = [];

const allTimelineData = data.Timeline;

//inserts vertical lines and centuries
const afficheCenturies = () => {
  timelineData.forEach((obj, idx) => {
    //choose color
    let style = getComputedStyle(document.body);
    const color = "--" + obj.color;
    let textColor = style.getPropertyValue(color);

    //adding a div for each element
    const centuryElementId = `century_${idx}`;
    const centuryDiv = blocHorizontal
      .append("div")
      .attr("class", "century")
      .attr("id", centuryElementId);

    const centuryElement = document.getElementById(centuryElementId);

    observerData.push({
      id: centuryElementId,
      element: centuryElement,
      textColor,
    });

    //creating the svg
    const svg = centuryDiv
      .append("svg")
      .attr("class", "marker")
      .attr("height", "100%")
      .attr("width", "max-content");

    const markerDate = svg.append("g").attr("class", "marker-date");

    //adding the text as in : xxeme siecle
    markerDate
      .append("text")
      .attr("class", "marker-text")
      .attr("x", 0)
      .attr("y", timelineY - 35)
      .attr("transform", `translate(-260, 60) rotate(-30)`)
      .attr("fill", textColor)
      .text(obj.century);

    //adding the vertical marker line like so : |
    markerDate
      .append("line")
      .attr("class", "marker-line")
      .attr("stroke", textColor)
      .attr("x1", 50)
      .attr("x2", 50)
      .attr("y1", timelineY - 35)
      .attr("y2", timelineY + 45);

    allTimelineData.forEach((group, idx) => {
      if (
        obj.century === group.century &&
        Object.hasOwn(group, "image-static")
      ) {
        centuryElement.innerHTML += `
          <div id="image_${idx}" class="images">
          <img src="${group["image-static"]}"  width="auto" height="300">
          <p id="title" style="color:${textColor};">${group.title}</p>
          <p id="subtitle" style="color:${textColor};">${group.subtitle}</p>
          </div>
          `;
        // console.log(idx);
        // makePopup(
        //   document.getElementById(`image_${idx}`),
        //   group.description,
        //   textColor,
        //   idx
        // );
      }
    });

    allTimelineData.forEach((group, idx) => {
      if (
        obj.century === group.century &&
        Object.hasOwn(group, "image-static")
      ) {
        makePopup(
          document.getElementById(`image_${idx}`),
          group.description,
          textColor,
          idx,
          group.title,
          group.source
        );
      }
    });

    //makePopup(centuryElement);
  });

  // document.querySelectorAll(".images").forEach((imgDiv, id) => {
  //   imgDiv.querySelector("img").addEventListener("click", openPopup(id));
  // });

  const observer = new IntersectionObserver(
    (entries) => {
      observerData.forEach((century) => {
        const currentEntries = entries.filter((entry) => entry.isIntersecting);
        const entry = currentEntries[0];
        if (entry && entry.target.id === century.id && entry.isIntersecting) {
          heartArrow.style.fill = century.textColor;
        }
      });
    },
    {
      ratio: 0.2,
    }
  );

  observerData.forEach((obj) => {
    observer.observe(obj.element);
  });
};

const afficheFunfacts = () => {
  const funfactsDiv = document.createElement("div");
  funfactsDiv.classList.add("funfacts");
  //blocHorizontal.append("div").attr("class", "funfacts");
  data.Facts.forEach((fact, id) => {
    funfactsDiv.innerHTML += `
    <div id="funfact_${id}" class="funfact">
    <img src="${fact["image-static"]}"  width="auto" height="300">
    <p id="title" style="color:#e4004d;">${fact.title}</p>
    <p id="subtitle" style="color:#e4004d;">${fact.description}</p>
    </div>
    `;
  });
  document.querySelector(".blocHorizontal").appendChild(funfactsDiv);

  data.Facts.forEach((fact, id) => {
    if (Object.hasOwn(fact, "image-hover")) {
      document
        .querySelector(`#funfact_${id} img`)
        .addEventListener("mouseenter", () => {
          document.querySelector(`#funfact_${id} img`).src =
            fact["image-hover"];
        });
      document
        .querySelector(`#funfact_${id} img`)
        .addEventListener("mouseleave", () => {
          document.querySelector(`#funfact_${id} img`).src =
            fact["image-static"];
        });
    }
  });
};

// ---------------------------------------------------

// ---------------------------------------------------

const insertBaseStatHTML = () => {
  const chart1div = blocHorizontal.append("div").attr("class", "stat");
  const chart1 = chart1div.append("div").attr("id", "chart1");

  const chart2div = blocHorizontal.append("div").attr("class", "stat");
  const chart2 = chart2div.append("div").attr("id", "chart2");

  const chart3div = blocHorizontal.append("div").attr("class", "stat");
  const chart3 = chart3div.append("div").attr("id", "chart3");

  const chart4div = blocHorizontal.append("div").attr("class", "stat");
  const chart4 = chart4div.append("div").attr("id", "chart4");
};

const addHeartCountdown = () => {
  const slideDiv = document.createElement("div");
  slideDiv.classList.add("slide");
  //const slideDiv = blocHorizontal.append("div").attr("class", "slide");
  slideDiv.innerHTML = `
  <div class="smallHeart1"></div>
  <div class="bigHeart1">
    <div class="titleHeart">Bientôt la St-Valentin</div>
    <div class="rectangle">
      <div class="countdown-text" id="countdown"></div>
    </div>
  </div>
  <div class="smallHeart2"></div>
`;
  document.querySelector(".blocHorizontal").appendChild(slideDiv);
};

const consoleLoggingTest = () => {
  console.log(allTimelineData);
};

export {
  afficheCenturies,
  insertBaseStatHTML,
  consoleLoggingTest,
  afficheFunfacts,
  addHeartCountdown,
};
