const margin = {top: 50, right: 0, bottom: -10, left: 70};
const width = window.innerWidth * .4 - margin.left - margin.right;
const height = window.innerHeight * .5 - margin.top - margin.bottom;
const margin1 = {top: -50, right: 10, bottom: 50, left: -160}
const width1 = window.innerWidth * .7 ;
const height1 = window.innerHeight * .67;


d3.csv('nyc_census_tracts.csv', function(d) {
  return {
    borough : d.Borough,
    drive : +d.Driveavg,
    carpool : +d.Carpoolavg,
    transit : +d.Transitavg,
    walk : +d.Walkavg,
    other: +d.OtherTranspavg,
    work: +d.WorkAtHomeavg
  };
  })
  .then(data => {
  console.log("data", data);

  
  const svg = d3.select("#bar").append("svg")
  .attr("width", width + margin.left + margin.right ) 
  .attr("height", height + margin.top + margin.bottom)
  .attr("overflow", "visible")
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
  
  
  const allGroup = ["Drive", "Carpool", "Transit", "Walk", "Other Transport", "Work At Home"]
  const allGroups = {"Drive":"drive", "Carpool":"carpool", "Transit":"transit", "Walk":"walk", "Other Transport":"other", "Work At Home":"work"}
  
  d3.select("#mybutton1")
    .selectAll('myOptions')
    .data(allGroup)
    .enter()
    .append('option')
    .text(function (d) { return d; })
    .attr("value", function (d) { return d; }) 


  const xScale = d3.scaleBand()
    .domain(d3.map(data, function(d){return(d.borough)}))
    .range([0, width])
    .padding(0.2);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale).tickSize(0))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style("fill", "black");


  const yScale = d3.scaleLinear()
    .domain([0,100])
    .range([height,0]);
    svg.append("g")
    .call(d3.axisLeft(yScale))
    .selectAll("text")
    .style("text-anchor", "end")
    .style("fill", "black");  


  const color = d3.scaleOrdinal()
    .domain(allGroup)
    // .range(d3.schemeSet3);
    // .range(["#1f78b4","#33a02c","#e31a1c","#ff7f00","#6a3d9a", "#b15928"])
    // .range(["#a6cee3","#b2df8a","#fb9a99","#fdbf6f","#cab2d6","#b15928"])
    .range(["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#a6761d"])


  const bar = svg.selectAll("rect.bar")
    .data(data)
    // .enter()
    .join("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return xScale(d.borough); })
    .attr("width", xScale.bandwidth())
    .attr("y", function(d) { return yScale(+d.drive); })
    .attr("height", function(d) { return height - yScale(+d.drive); })  
    .attr("fill", function(d) { return color(d.key); })
    // .append("text") 


    function update(selectedGroup) {

      // Create new data with the selection?
      var dataFilter = data.map(function(d){return {borough: d.borough, value:d[allGroups[selectedGroup]]} })
      console.log(dataFilter)

      // Give these new data to update line
      bar
          .data(dataFilter)
          .transition()
          .duration(1500)
          .attr("class", "bar")
          .attr("x", function(d) { return xScale(d.borough); })
          .attr("width", xScale.bandwidth())
          .attr("y", function(d) { return yScale(+d.value); })
          .attr("height", function(d) { return height - yScale(+d.value); })  
          .attr("fill", function(d) { return color(selectedGroup); })
          
    }


    d3.select("#mybutton1").on("change", function(d) {
      var selectedOption = d3.select(this).property("value")
      update(selectedOption)
    })

//     d3.select("#selected-dropdown").text("Drive");

//     d3.select("select")
//       .on("change",function(d){
//         var selected = d3.select("#d3-dropdown").node().value;
//         console.log( selected );
//         d3.select("#selected-dropdown").text(selected);
// })


  svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width * .5)
    .attr("y", height + 70)
    .style("font-size", "1.5em")
    .text("Borough")

  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -margin.left+15)
    .attr("x", -margin.top+40)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .style("font-size", "1.5em")
    .text("Population (in percentage)");


  const newtext = d3.select("#text").append("text")
  .text("In day to day, let us visualise the percentage of people using different means of commute like Drive, Walk, Transit, Carpool, Other Transport or Work At Home after COVID-19 in the region of New York.")
  
  
  d3.select("#text1")
  .append("br")


  const newtext1 = d3.select("#text1").append("text")
  .text("Upon selection from the dropdown, you can summarize the data wrt Boroughs of NYC.")

  d3.select("#text2")
  .append("br")

  const newtext2 = d3.select("#text2").append("text")
  .text("Percentage is calculated on Population using different Transport Methods by Population residing in those Boroughs.")

})

Promise.all([
  d3.json("Borough Boundaries.geojson"),
  d3.csv("nyc_census_tracts.csv", d3.autoType),
]).then(([geojson, borough]) => {

  const svg = d3.select("#map")
  .append("svg")
  .attr("width", width1 + margin1.left + margin1.right )
  .attr("height", height1 + margin1.top + margin1.bottom )
  .attr("overflow", "visible")
  .append("g")
  .attr("transform",
        "translate(" + margin1.left + "," + margin1.top + ")");

  
  const allGroup = ["Drive", "Carpool", "Transit", "Walk", "Other Transport", "Work At Home"]
  const allGroups = {"Drive":"Driveavg", "Carpool":"Carpoolavg", "Transit":"Transitavg", "Walk":"Walkavg", "Other Transport":"OtherTranspavg", "Work At Home":"WorkAtHomeavg"}
  
  d3.select("#mybutton")
    .selectAll('myOptions')
    .data(allGroup)
    .enter()
    .append('option')
    .text(function (d) { return d; })
    .attr("value", function (d) { return d; }) 

  // const colorScale = d3.scaleThreshold()
  //       // .domain([0,1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100])
  //       // .range(d3.schemeBlues[9])
  //       .range(interpolatePuRd(9));

  var colorScale = d3.scaleSequential()
  .domain([0,60])
  .interpolator(d3.interpolateViridis);


  const projection = d3.geoAlbersUsa()
  .fitSize([ width1 , height1 ], geojson)

  const path = d3.geoPath()
    .projection(projection)


  const state = svg.selectAll("path.state")
        .data(geojson.features)
        .join("path")
        .attr("class", "state")
        .attr("d", coords => path(coords))
        .attr("stroke", "orange")
        // .attr("fill", "steelblue")
        .attr("fill", function (d) {
          console.log(borough)
          // d.total = borough.get(d.id) || 0; 
          console.log(d.total)
          const total = borough.find((e) => e.Borough === d.properties.boro_name).Drive;
          return colorScale(total);
        });


  function update(selectedGroup) {

      // Create new data with the selection?
      var dataFilter = borough.map(function(d){return {borough: d.Borough, value:d[allGroups[selectedGroup]]} })
      console.log(dataFilter)

      // Give these new data to update line
    state
    .transition()
    .duration(1500)
    .attr("fill", function (d) {
      // d.total = borough.get(d.id) || 0; 
      const total = borough.find((e) => e.Borough === d.properties.boro_name)[allGroups[selectedGroup]];
      return colorScale(total);})
    }

  d3.select("#mybutton").on("change", function(d) {
  var selectedOption = d3.select(this).property("value")
  update(selectedOption)
  })

  var svg1 = d3.select("#legend")
  .text("Population (in percentage)")

  svg.append("g")
    .attr("class", "legendSequential")
    .attr("transform", "translate(195,60)");
  
  var legendSequential = d3.legendColor()
      .shapeWidth(20)
      .cells(15)
      .scale(colorScale) 
      
  
  svg.select(".legendSequential")
    .call(legendSequential);
  

  var labels = svg.append('g').attr('class', 'labels');
  labels.selectAll('.label').data(geojson.features).enter().append('text')
        .attr("class", "halo")
        .attr('transform', function(d) {
            return "translate(" + path.centroid(d) + ")";
        })
        .style('text-anchor', 'middle')
        .style('font', '12px times')
        .text(function(d) {
            return d.properties.boro_name
        });
    labels.selectAll('.label').data(geojson.features).enter().append('text')
        .attr("class", "label")
        .attr('transform', function(d) {
            return "translate(" + path.centroid(d) + ")";
        })
        .style('text-anchor', 'middle')
        .style('font', '12px times')
        .attr("fill", "red")
        .text(function(d) {
            return d.properties.boro_name
        });


})



// d3.csv('nyc_census_tracts.csv', function(d) {
//   return {
//     borough : d.Borough,
//     drive : +d.Drive,
//     carpool : +d.Carpool,
//     transit : +d.Transit,
//     walk : +d.Walk,
//     other: +d.OtherTransp,
//     work: +d.WorkAtHome
//   };
//   })
//   .then(data => {
//   console.log("data", data);

  
//   const svg = d3.select("#bar").append("svg")
//   .attr("width", width + margin.left + margin.right ) 
//   .attr("height", height + margin.top + margin.bottom)
//   .attr("overflow", "visible")
//   .append("g")
//   .attr("transform",
//         "translate(" + margin.left + "," + margin.top + ")");


//         var x = d3.scaleLinear()
//         .domain([0, d3.max(data, function(d) { return +d.drive; })])
//         .range([ 0, width ]);
//       svg.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x).tickSize(0))
//         .selectAll("text")
  
//       // Add Y axis
//       // var y = d3.scaleBand()
//       //   .domain(d3.extent(data, function(d) { return d.borough; }))
//       //   .range([ height, 0 ])
//       //   .padding(.1);
//       // svg.append("g")
//       //   .call(d3.axisLeft(y));


//     const y = d3.scaleBand()
//     .domain(d3.map(data, function(d){return(d.borough)}))
//     .range([height, 0])
//     .padding(0.2);
//     svg.append("g")
//     .call(d3.axisLeft(y).tickSize(0))
//     .selectAll("text")
//       .style("text-anchor", "end")
//       .style("fill", "black");

//     const color = d3.scaleOrdinal()
//     .domain(d3.map(data, function(d){return(d.borough)}))
//     .range(['#e41a1c','#377eb8','#4daf4a'])


//     svg.append("path")
//       .datum(data)
//       .attr("fill", "pink")
//       .attr("stroke", "steelblue")
//       .attr("stroke-width", 1.5)
//       .attr("d", d3.line()
//         .x(function(d) { return x(+d.drive) })
//         .y(function(d) { return y(d.borough) })
//         )

//     svg.append("text")
//     .attr("class", "x label")
//     .attr("text-anchor", "end")
//     .attr("x", width * .5)
//     .attr("y", height + 70)
//     .style("font-size", "1.5em")
//     .text("Borough")

//     svg.append("text")
//     .attr("class", "y label")
//     .attr("text-anchor", "end")
//     .attr("y", -margin.left+20)
//     .attr("x", -margin.top+20)
//     .attr("dy", ".75em")
//     .attr("transform", "rotate(-90)")
//     .style("font-size", "1.5em")
//     .text("Population (in percentage)");
 
// })
