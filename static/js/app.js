// Function called by Test Subject ID Number changes
function optionChanged(value) {
    console.log(value);
    
    // Use the D3 library to read in samples.json
    d3.json("samples.json").then(function(data) {
        
        // Pull the metadata for a particular id matching our value
        metadata = Object.values(data.metadata.filter(function(metaid) {
            return metaid.id.toString() == value;
        }));
        console.log(metadata);

        // Pull the samples for a particular id matching our value
        samples = Object.values(data.samples.filter(function(sample) {
            return sample.id.toString() == value;
        }));
        console.log(samples);

        // Select Demographic Info
        //var demographicInfo = d3.select("sample-metadata");


    });

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

    // Select Dropdown
    var dropdown = d3.select("#selDataset");

    // Provide data to dropdown
    data.names.forEach(function(name){
        dropdown.append("option").text(name);
    });

    // create the initial plots and demographic information using the optionChanged function
    optionChanged("940");
});
