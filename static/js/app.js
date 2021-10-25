// Function called by Test Subject ID Number changes
function optionChanged(value) {
    console.log(value);
    
    // Use the D3 library to read in samples.json
    d3.json("samples.json").then(function(data) {
        
        // Pull the metadata for a particular id matching our value
        metadata = Object.values(data.metadata.filter(function(metaid) {
            return metaid.id.toString() == value;
        }));
        metadata = metadata[0];

        // Pull the samples for a particular id matching our value
        samples = Object.values(data.samples.filter(function(sample) {
            return sample.id.toString() == value;
        }));
        samples = samples[0];

        // Sort the samples from largest to smallest
        samples.sample_values.sort(function compareFunction(firstNum, secondNum) {
            // resulting order is (3, 2, 1)
            return secondNum - firstNum;
        });

        // Create slices of 10 values for the bar graph and reverse them
        sample_values = samples.sample_values.slice(0, 10).reverse();
        otu_ids = samples.otu_ids.slice(0, 10).reverse();
        otu_labels = samples.otu_labels.slice(0, 10).reverse();

        // Horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
        var bardata = [{
            type: 'bar',
            x: sample_values,
            y: otu_ids.map(function(id){return `OTU ${id}`;}),
            orientation: 'h',
            hoverinfo: "text",
            hovertext: otu_labels
          }];
        
          Plotly.newPlot("bar", bardata);

        // Select Demographic Info and clear it then fill it in using key-value pairs
        d3.select("#sample-metadata").html("");
        Object.entries(metadata).forEach(([key, value]) => {
            d3.select("#sample-metadata").append("p").text(`${key}: ${value}`);
        });

    });
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
