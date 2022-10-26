
/* CONSTANTS AND GLOBALS */
const margin = {top: 20, right: 30, bottom: 40, left: 90};
const width = 700 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', d3.autoType)
  .then(data => {
    console.log("data", data);

const svg = d3.select("#container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("overflow", "visible")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    /* SCALES */
    /** This is where you should define your scales from data to pixel space */
console.log(d3.extent(data.map(d => d.count)))
const yScale = d3.scaleBand()
      .domain([ "eating", "chasing", "climbing", "foraging", "running"])
      .range([0, height])
      .padding(.1);
svg.append("g")
    .call(d3.axisLeft(yScale))
    .selectAll("text")
      .style("text-anchor", "end")
      .style("fill", "black");


const xScale = d3.scaleLinear()
    .domain([0, Math.max(...data.map(d => d.count))])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style("fill", "black");

    /* HTML ELEMENTS */
    /** Select your container and append the visual elements to it */

// svg.selectAll("rect.bar")
//     .data(data)
//     .join("rect")
//     .attr("class", "bar")
//     .attr("x", d => xScale(d.count))
//     .attr("y", d => yScale(d.activity))
//     .attr("height", 20)
//     .attr("width", d => xScale(d.count))

svg.selectAll("rect.bar")
    .data(data)
    // .enter()
    .join("rect")
    .attr("class", "bar")
    .attr("x", xScale(5) )
    .attr("y", function(d) { return yScale(d.activity); })
    .attr("width", function(d) { return xScale(d.count); })
    .attr("height", yScale.bandwidth() )
    .attr("fill", "lightblue")
    .append("text")
    
svg.append("text")
    .attr("x", width/2)
    .attr("y", 0 - margin.top)
    .attr("text-anchor", "middle")
    .style("fill", "red")
    .style("font-size", "16px")
    .text("First Barchart");

  })