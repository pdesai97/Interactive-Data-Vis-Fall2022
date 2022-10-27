/* CONSTANTS AND GLOBALS */
const  margin = {top: 30, right: 30, bottom: 30, left: 60};
const width = window.innerWidth * .7 - margin.left - margin.right;
const  height = window.innerHeight * .7 - margin.top - margin.bottom;

/* LOAD DATA */
d3.csv('insurance.csv', d3.autoType)
  .then(data => {
    console.log("data", data);

const svg = d3.select("#container")
    .append("svg")
    .attr("width", width + margin.left + margin.right )
    .attr("height", height + margin.top + margin.bottom)
    .attr("overflow", "visible")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")

    /* SCALES */

// const extent = d3.extent(data)
// let p = data(data.age);
// let extent = d3.extent(p);
const xScale = d3.scaleLinear()
    .domain(d3.extent(data.map(d => d.age)))
    .range([ 0, width ])
    .nice()
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));
    
    
const yScale = d3.scaleLinear()
    .domain(d3.extent(data.map(d => d.bmi)))
    .range([ height , margin.top])
    .nice();
  svg.append("g")
    .call(d3.axisLeft(yScale));


const colorScale = d3.scaleOrdinal()
      .domain(["R", "G"])
      .range(["red", "green"])
        

    /* HTML ELEMENTS */

svg.append('g')
.selectAll("dot")
.data(data)
.enter()
.append("circle")
.attr("cx", d => xScale(d.age) )
.attr("cy", d => yScale(d.bmi) )
.attr("r", 3)
.style("fill", d => colorScale(d.charges));

svg.append("text")
    .attr("x", width/2)
    .attr("y", margin.top - 20)
    .attr("text-anchor", "middle")
    .style("fill", "#000080")
    .style("text-decoration", "underline")
    .style("font-size", "3em")
    .text("Insurance Charges")

svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 6)
    .style("font-size", "1.5em")
    .text("BMI")

svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", height/2  - width/3.3)
    .attr("x", -margin.top-150)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .style("font-size", "1.5em")
    .text("AGE");
    
    
  });