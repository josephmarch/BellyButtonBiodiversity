// Function called by Test Subject ID Number changes
function optionChanged(value) {
    console.log(value);
    
    // Select Demographic Info
    //var demographicInfo = d3.select("sample-metadata");

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
}

// Use the D3 library to read in samples.json and set up dropdown
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

    // create the initial plots and demographic information using the optionChanged function
    optionChanged("940");
});
