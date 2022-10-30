 /* CONSTANTS AND GLOBALS */
 const  margin = {top: 30, right: 30, bottom: 30, left: 60}
 const width = window.innerWidth * .7 - margin.left - margin.right
 const  height = window.innerHeight * .7 - margin.top - margin.bottom

/* LOAD DATA */
d3.csv('Christmas spending.csv', d => {
  return {
    date: new Date(+d.Year, 0, 1),
    spend: +d.Christmas_spend_in_US$ 
  }
  }).then(data => {
    console.log("data", data);

  // CREATE SVG ELEMENT

const svg = d3.select("#container")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")"); 

  // SCALES

const  xScale = d3.scaleLinear()
  .domain( d3.extent(data, d => d.date ))
  // .domain(d3.extent(data, d => d.Year))
  .range([ 0, width ]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xScale));

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.spend)])
  // .domain(d3.extent(data, d => d.Christmas_spend_in_US$))
  .range([ height, margin.top ]);
svg.append("g")
  .call(d3.axisLeft(yScale));


  // LINE GENERATOR FUNCTION

const line = d3.line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.spend))


const path = svg.selectAll("paths")
    .data(data)
    .join("path")
    .attr("stroke", "white")
    .attr("fill", "cyan")
    .attr("d", d => line(d))


  // DRAW LINE

})