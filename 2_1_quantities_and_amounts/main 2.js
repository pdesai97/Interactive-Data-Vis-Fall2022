
/* CONSTANTS AND GLOBALS */
const margin = {top: 20, right: 30, bottom: 40, left: 130};
const width = window.innerWidth * .7 - margin.left - margin.right;
const height = window.innerHeight * .7 - margin.top - margin.bottom;

/* LOAD DATA */
d3.csv('../data/squirrelActivities.csv', function(d) {
  return {
    activity : d.activity,
    spring : +d.spring_count,
    winter : +d.winter_count,
    fall : +d.fall_count,
    summer : +d.summer_count
  }
})
  .then(data => {
    console.log("data", data);

const svg = d3.select("#container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("overflow", "visible")
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");



const allGroup = ["Spring","Summer" , "Fall", "Winter"]
const allGroups = {"Spring":"spring", "Winter":"winter", "Fall":"fall", "Summer":"summer"}
console.log(allGroup)
console.log(allGroups)
          
d3.select("#mybutton1")
  .selectAll('myOptions')
  .data(allGroup)
  .enter()
  .append('option')
  .text(function (d) { return d; })
  .attr("value", function (d) { return d; }) 


const yScale = d3.scaleBand()
      .domain([ "eating", "chasing", "climbing", "foraging", "running"])
      .range([0, height])
      .padding(.1);
svg.append("g")
    .call(d3.axisLeft(yScale))
    .selectAll("text")
      .style("text-anchor", "end")
      .style("font-size", "12px")
      .style("fill", "white");


const xScale = d3.scaleLinear()
    .domain([0, 1600])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", "12px")
      .style("fill", "white");


  const color = d3.scaleOrdinal()
      .domain(allGroup)
      // .range(d3.schemeSet3);
      // .range(["#1f78b4","#33a02c","#e31a1c","#ff7f00","#6a3d9a", "#b15928"])
      .range(["#a6cee3","#b2df8a","#fb9a99","#fdbf6f","#cab2d6","#b15928"])
      // .range(["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#a6761d"])


  const bar = svg.selectAll("rect.bar")
    .data(data)
    // .enter()
    .join("rect")
    .attr("class", "bar")
    .attr("x", xScale(5) )
    .attr("y", function(d) { return yScale(d.activity); })
    .attr("width", function(d) { return xScale(+d.spring); })
    .attr("height", yScale.bandwidth() )
    .attr("fill", function(d) { return color(d.key); })

  function update(selectedGroup) {

      // Create new data with the selection?
      var dataFilter = data.map(function(d){return {activity: d.activity, value:d[allGroups[selectedGroup]]} })
      console.log(dataFilter)

      // Give these new data to update line
      bar
          .data(dataFilter)
          .transition()
          .duration(2000)
          .attr("class", "bar")
          .attr("x", xScale(5) )
          .attr("y", function(d) { return yScale(d.activity); })
          .attr("width", function(d) { return xScale(d.value); })
          .attr("height", yScale.bandwidth() )
          .attr("fill", function(d) { return color(selectedGroup); })
          
    }


    d3.select("#mybutton1").on("change", function(d) {
      var selectedOption = d3.select(this).property("value")
      update(selectedOption)
    })

    
    
    
svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 10)
    .style("font-size", "2em")
    .style("fill", "white")
    .text("Count")

svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", margin.left - 150)
    .attr("x", margin.top - 30)
    .attr("dy", ".75em")
    // .attr("transform", "rotate(-90)")
    .style("font-size", "2em")
    .style("fill", "white")
    .text("Activity");

  })