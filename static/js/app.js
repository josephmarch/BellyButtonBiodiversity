// Function called by Test Subject ID Number changes
function optionChanged(value) {
    console.log(value);
}

// Use the D3 library to read in samples.json
d3.json("samples.json").then(function(data) {
    console.log(data);
    samples = Object.values(data.samples);
    console.log(samples);

    // Select Dropdown
    var dropdown = d3.select("#selDataset");

    // Provide data to dropdown
    data.names.forEach(function(name){
        dropdown.append("option").text(name);
    });

    //function for what to do when dropdown is changed
    d3.selectAll("#selDataset").on("change", optionChanged(this.value));

    // On change to the Test Subject ID Number, call optionChanged(this.value)
    //d3.selectAll("#selDataset").on("change", getData);

    // Select Demographic Info
    var demographicInfo = d3.select("sample-metadata");
});


// Function called by Test Subject ID Number changes
// function getData() {
//     var dropdownMenu = d3.select("#selDataset");
//     var dataset = dropdownMenu.property("value");
    
// }

// Horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
// var bardata = [{
//     type: 'bar',
//     x: sample_values,
//     y: otu_ids,
//     orientation: 'h',
//     hoverinfo: "text",
//     hovertext: otu_labels
//   }];
  
//   Plotly.newPlot("bar", bardata);


