 /* CONSTANTS AND GLOBALS */
 const  margin = {top: 60, right: 30, bottom: 30, left: 60}
 const width = window.innerWidth * .7 - margin.left - margin.right
 const  height = window.innerHeight * .7 - margin.top - margin.bottom

/* LOAD DATA */
d3.csv('Christmas spending.csv', d => {
  return {
    year: new Date(+d.Year, 0, 1),
    spend: +d.Christmas_spend_in_US$ 
  }
  }).then(data => {
    console.log('data :=> ', data);


  // CREATE SVG ELEMENT

const svg = d3.select("#container")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("overflow", "visible")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")"); 

  // SCALES

const  xScale = d3.scaleTime()
  .domain(d3.extent(data, function(d) { return +d.year; }))
  .range([ 0, width ]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xScale));

const yScale = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return +d.spend; })])
  .range([ height, 0 ]);
svg.append("g")
  .call(d3.axisLeft(yScale));


  // LINE GENERATOR FUNCTION

// const line = d3.line()
//     .x(d => xScale(d.year))
//     .y(d => yScale(d.spend))


svg.append("path")
      .datum(data)
      .attr("fill", "pink")
      .attr("stroke", "#000080")
      .attr("stroke-width", 1.5)
      // .attr("d", d => line(d))
      .attr("d", d3.area()
        .x(function(d) { return xScale(d.year) })
        .y0(yScale(0))
        .y1(function(d) { return yScale(d.spend) })
        )

svg.append("text")
        .attr("x", width/2)
        .attr("y", 45 - margin.top )
        .attr("text-anchor", "middle")
        .style("fill", "Red")
        .style("text-decoration", "underline")
        .style("font-size", "3em")
        .text("Christmas Spending")
    
svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width/2)
        .attr("y", height + 50)
        .style("font-size", "1.5em")
        .text("Year")
    
svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -margin.left+0)
        .attr("x", -margin.top-120)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .style("font-size", "1.5em")
        .text("Spend in US$");


})