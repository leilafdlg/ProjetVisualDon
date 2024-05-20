import * as d3 from "d3";

// data
async function loadData() {
  try {
    const response = await fetch("data/attentions_stvalentin.json");

    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    } else {
      const data = await response.json();

      console.log(data);

      return data;
    }
  } catch (error) {
    console.error("Erreur lors de la chargeHommet des données:", error);
  }
}

function drawChart(data) {
  const margin = { top: 130, right: 400, bottom: 80, left: 200 },
    width = 1100 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

  const svg = d3
    .select("#chart2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("color", "white"); // Ensure the text is white

  const colors = {
    Homme: "#df7272",
    Femme: "#ffa7a7",
  };

  // legende
  const legend = svg
    .append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${width + 100}, 30)`);

  Object.entries(colors).forEach(([key, color], index) => {
    legend
      .append("text")
      .attr("y", index * 30)
      .attr("x", 5)
      .text(key)
      .style("fill", color)
      .style("font-size", "22px");

    legend
      .append("circle")
      .attr("cy", index * 30 - 10)
      .attr("cx", -10)
      .attr("r", 5)
      .style("fill", color);
  });

  const x = d3.scaleLinear().domain([0, 0.5]).range([0, width]);

  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).tickFormat(d3.format(".0%")));

  const y = d3
    .scaleBand()
    .range([0, height])
    .domain(data.map((d) => d.Objectif))
    .padding(0.1);

  svg.append("g").call(d3.axisLeft(y));

  svg
    .selectAll(".bar-men")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar-men")
    .attr("x", x(0))
    .attr("y", (d) => y(d.Objectif))
    .attr("width", (d) => x(d.Homme))
    .attr("height", y.bandwidth() / 2)
    .attr("fill", colors["Homme"])
    .on("mouseover", function (event, d) {
      tooltip
        .style("visibility", "visible")
        .style("background-color", colors["Homme"])
        .html(
          `<strong>${d.Objectif}</strong><br/>Genre: Homme<br/>Pourcentage:${(
            d.Homme * 100
          ).toFixed(0)}%`
        ); // Adjusted tooltip content
    })
    .on("mousemove", function (event) {
      tooltip
        .style("top", event.pageY - 10 + "px")
        .style("left", event.pageX + 10 + "px");
    })
    .on("mouseout", function () {
      tooltip.style("visibility", "hidden");
    });

  svg
    .selectAll(".bar-women")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar-women")
    .attr("x", x(0))
    .attr("y", (d) => y(d.Objectif) + y.bandwidth() / 2)
    .attr("width", (d) => x(d.Femme))
    .attr("height", y.bandwidth() / 2)
    .attr("fill", colors["Femme"])
    .on("mouseover", function (event, d) {
      tooltip
        .style("visibility", "visible")
        .style("background-color", colors["Femme"])
        .html(
          `<strong>${d.Objectif}</strong><br/>Genre: Femme<br/>Pourcentage:${(
            d.Femme * 100
          ).toFixed(0)}%`
        ); // Adjusted tooltip content
    })
    .on("mousemove", function (event) {
      tooltip
        .style("top", event.pageY - 10 + "px")
        .style("left", event.pageX + 10 + "px");
    })
    .on("mouseout", function () {
      tooltip.style("visibility", "hidden");
    });

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", -50)
    .attr("id", "title")
    .attr("text-anchor", "middle")
    .style("font-size", "28px")
    .style("font-family", "'Jost', sans-serif")
    .style("fill", "#e4004d")
    .text("À quoi ça sert la Saint-Valentin?");
}

function displayStatistics2() {
  loadData()
    .then((data) => {
      drawChart(data);
    })
    .catch((error) => {
      console.error("Erreur lors du chargeHommet des données:", error);
    });
}

export { displayStatistics2 };
