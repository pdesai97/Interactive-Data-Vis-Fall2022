/* CONSTANTS AND GLOBALS */
const  margin = {top: 50, right: 30, bottom: 30, left: 60};
const width = window.innerWidth * .7 - margin.left - margin.right;
const  height = window.innerHeight * .7 - margin.top - margin.bottom;

/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * */
 Promise.all([
  d3.json("../data/usState.json"),
  d3.csv("../data/usHeatExtremes.csv", d3.autoType),
]).then(([geojson, heat]) => {


  const svg = d3.select("#container")
  .append("svg")
  .attr("width", width + margin.left + margin.right )
  .attr("height", height + margin.top + margin.bottom )
  .attr("overflow", "visible")
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")
  
  // SPECIFY PROJECTION

const projection = d3.geoAlbersUsa()
  .fitSize([
    width, height
  ], geojson)

  // DEFINE PATH FUNCTION

const path = d3.geoPath(projection)

  // APPEND GEOJSON PATH  

// const newyork = geojson.filter(d => d.NAME === "New York")
  
const state = svg.selectAll("path.state")
    .data(geojson.features)
    .join("path")
    .attr("class", "state")
    .attr("d", coords => path(coords))
    .attr("fill", "darkblue")
    .attr("stroke", "orange")
  
  // APPEND DATA AS SHAPE



const heatmap = svg.selectAll("dots.heat")
  .data(heat)
  .join("circle")
  .attr("class", "heat")
  .attr("r", "2")
  .attr("fill", "red")
  .attr("transform", (d) => {
    const coords = projection([d.Long, d.Lat]);
    return `translate(${coords[0]}, ${coords[1]})`
  })

svg.append("text")
  .attr("x", width/2)
  .attr("y", margin.top - 80)
  .attr("text-anchor", "middle")
  .style("fill", "Green")
  .style("text-decoration", "underline")
  .style("font-size", "3em")
  .text("Regions with Extreme Heat")


});