export function displayStatistics3() {
  const data = [
    { year: 2010, value: 30.4, currency: "millions de CHF" },
    { year: 2014, value: 37.6, currency: "millions de CHF" },
    { year: 2019, value: 41.1, currency: "millions de CHF" },
  ];

  const svg = d3
    .select("#chart3")
    .append("svg")
    .attr("width", 1200)
    .attr("height", 700);

  const margin = { top: 350, right: 300, bottom: 200, left: 100 },
    width = 1500 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

  const x = d3
    .scaleBand()
    .range([0, width])
    .padding(0.1)
    .domain(data.map((d) => d.year));

  const y = d3
    .scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(data, (d) => d.value)]);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("text")
    .attr("x", width / 2)
    .attr("y", -190)
    .attr("text-anchor", "middle")
    .style("font-size", "28px")
    .style("font-family", "'Jost', sans-serif")
    .style("fill", "#e4004d")
    .text("Le marché suisse des sites de rencontres en ligne a augmenté de 34%")
    .append("tspan")
    .attr("x", width / 2)
    .attr("dy", "1.2em")
    .text(
      "entre 2010 et 2024, passant de 30,4 millions à 41 millions de francs suisses."
    );

  const colors = {
    30.4: "#e4004d",
    41: "#ff4d00",
  };

  function getColor(value) {
    if (value === 30.4) return "#e4004d";
    else if (value === 37.6) return "#ff4d00";
    else if (value === 41.1) return "#676091";
    else return "white";
  }

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
    .attr("x", (d) => x(d.year))
    .attr("width", x.bandwidth())
    .attr("y", (d) => y(d.value))
    .attr("height", (d) => height - y(d.value))
    .style(
      "fill",
      (d) => ({ 30.4: "#e4004d", 37.6: "#ff4d00", 41.1: "#676091" }[d.value])
    )
    .on("mouseover", (event, d) => {
      tooltip
        .style("opacity", 1)
        .html(
          `<strong>Année: ${d.year}</strong><br/>Marché: ${d3.format(",.1f")(
            d.value
          )} ${d.currency}`
        )
        .style("position", "absolute")
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY + 10}px`)
        .style("background-color", getColor(d.value));
    })
    .on("mouseout", () => {
      tooltip.style("opacity", 0);
    });

  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

  g.append("g").call(d3.axisLeft(y));
}
