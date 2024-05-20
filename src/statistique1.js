import * as d3 from "d3";

// data
async function loadData() {
  try {
    const response = await fetch("data/tendance_cadeau_par_personne.json");
    const data = await response.json();

    data.forEach((d) => {
      d.Bonbon = parseFloat(d.Bonbon.replace("$", ""));
      d.Fleurs = parseFloat(d.Fleurs.replace("$", ""));
      d.Bijoux = parseFloat(d.Bijoux.replace("$", ""));
      d["Carte de vœux"] = parseFloat(d["Carte de vœux"].replace("$", ""));
      d["Une soirée ensemble"] = parseFloat(
        d["Une soirée ensemble"].replace("$", "")
      );
      d.Vêtements = parseFloat(d.Vêtements.replace("$", ""));
      d["Carte cadeaux"] = parseFloat(d["Carte cadeaux"].replace("$", ""));
    });

    return data;
  } catch (error) {
    console.error("Erreur lors du chargement des données:", error);
    throw error;
  }
}
function drawChart(data) {
  const margin = { top: 130, right: 400, bottom: 80, left: 200 },
    width = 1500 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

  const svg = d3
    .select("#chart1")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  svg.style("font-family", "Jost").style("font-size", "25px");

  // échelles
  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.Annee))
    .range([0, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => Math.max(...Object.values(d).slice(1)))])
    .range([height, 0]);

  const colors = {
    Bonbon: "#5c98ba",
    Fleurs: "#676091",
    Bijoux: "#ab529d",
    "Carte de vœux": "#ff4895",
    "Une soirée ensemble": "#e4004d",
    Vêtements: "#df7272",
    "Carte cadeaux": "#ffa7a7",
  };

  // légende
  const legend = svg
    .append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${width + 100}, 0)`);

  Object.entries(colors).forEach(([key, color], index) => {
    legend
      .append("text")
      .attr("y", index * 30) // Positionnement vertical des éléments de la légende
      .attr("x", 5)
      .text(key)
      .style("fill", color) // Couleur correspondant à la courbe
      .style("font-size", "25px"); // Taille de la police

    legend
      .append("circle")
      .attr("cy", index * 30 - 10)
      .attr("cx", -10)
      .attr("r", 5)
      .style("fill", color);
  });

  // tooltip
  const tooltip = d3.select("body").append("div").attr("class", "tooltip");

  Object.keys(colors).forEach((key) => {
    const line = d3
      .line()
      .x((d) => xScale(d.Annee))
      .y((d) => yScale(d[key]))
      .curve(d3.curveMonotoneX);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", colors[key])
      .attr("stroke-width", 2)
      .attr("d", line);

    svg
      .selectAll(`dot-${key}`)
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 6)
      .attr("cx", (d) => xScale(d.Annee))
      .attr("cy", (d) => yScale(d[key]))
      .attr("fill", colors[key])
      .on("mouseover", function (event, d) {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip
          .html(
            `<strong>Cadeau</strong>: ${key}<br><strong>Année:</strong> ${d.Annee}<br><strong>Dépense:</strong> $${d[key]}`
          )
          .style("background", colors[key])
          .style("color", "white")
          .style("left", event.pageX + 5 + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function (d) {
        tooltip.transition().duration(500).style("opacity", 0);
      });

    // Titre
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", -50)
      .attr("id", "title")
      .attr("text-anchor", "middle")
      .style("font-size", "28px")
      .style("font-family", "'Jost', sans-serif")
      .style("fill", "#e4004d")
      .text("Les estimations de dépenses cadeaux par personne (aux USA)");
  });

  // Axes
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale).tickFormat(d3.format("d"))); // Format as whole numbers

  svg.append("g").call(d3.axisLeft(yScale));
}

function displayStatistics1() {
  loadData()
    .then((data) => {
      drawChart(data);
    })
    .catch((error) => {
      console.error("Erreur lors du chargement des données:", error);
    });
}

export { displayStatistics1 };
