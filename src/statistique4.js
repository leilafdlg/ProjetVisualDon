export function displayStatistics4() {
  const totalRespondents = 950;
  const data = [
    { category: "Oui", value: 27 },
    { category: "Non", value: 59 },
    { category: "Sans avis", value: 14 },
  ];

  // Couleurs pour chaque catégorie
  const colors = ["#ff4895", "#e4004d", "#df7272"];

  // Fonction pour générer le contenu du tooltip
  function tooltipContent(d, color) {
    const numberOfPeople = (d.value / 100) * totalRespondents;
    return `<div '>
          ${numberOfPeople.toFixed(0)} personnes</div>`;
  }

  const margin = { top: 150, right: 400, bottom: 300, left: 200 },
    width = 1500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  const svg = d3
    .select("#chart4")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain([0, 100]).range([0, width]);

  const y = d3
    .scaleBand()
    .domain(data.map((d) => d.category))
    .range([0, height])
    .padding(0.1);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("color", "white");

  g.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("y", (d) => y(d.category))
    .attr("height", y.bandwidth())
    .attr("x", 0)
    .attr("width", (d) => x(d.value))
    .style("fill", (d, i) => colors[i])
    .on("mouseover", function (event, d) {
      const color = colors[data.indexOf(d)];
      tooltip
        .html(tooltipContent(d, color))
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY + 10}px`)
        .style("background-color", color)
        .style("opacity", 1); // Show tooltip
    })
    .on("mouseout", function () {
      tooltip.style("opacity", 0); // Hide tooltip
    });
  // Ajout de texte sur les barres
  g.selectAll(".text")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("y", (d) => y(d.category) + y.bandwidth() / 2 + 5)
    .attr("x", (d) => x(d.value) - 45)
    .style("fill", "white")
    .style("font-weight", "medium")
    .text((d) => `${d.value}%`);

  // Axes
  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(
      d3
        .axisBottom(x)
        .tickValues([0, 50, 100])
        .tickFormat((d) => `${d}%`)
    )
    .selectAll("text")
    .style("text-anchor", "middle")
    .style("fill", "black"); // S'assurer que la couleur du texte est visible

  g.append("g").call(d3.axisLeft(y)).selectAll("text").style("fill", "black"); // S'assurer que la couleur du texte est visible

  // Titre du graphique
  g.append("text")
    .attr("x", width / 2)
    .attr("y", -150)
    .attr("text-anchor", "middle")
    .style("font-size", "28px")
    .style("font-family", "'Jost', sans-serif")
    .style("fill", "#e4004d")
    .text("Selon un sondage du journal 24heures réalisé en 2024")
    .append("tspan")
    .attr("x", width / 2)
    .attr("dy", "1.2em")
    .text("59% des participants disent vouloir snober la fête.")
    .append("tspan")
    .attr("x", width / 2)
    .attr("dy", "1.2em")
    .text("de la Saint-Valentin. Car, l’amour, c’est toute l’année.");
}
