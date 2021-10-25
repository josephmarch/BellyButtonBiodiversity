// Use the D3 library to read in samples.json
var sample_values = [];
var otu_ids = [];
var otu_labels = [];

d3.json("samples.json").then(function(data) {
    console.log(data);
    sample_values = Object.values(data.samples);
    console.log(sample_values);
    otu_ids = Object.values(data.names);
    console.log(otu_ids);
    otu_labels = Object.values(data.metadata);
    console.log(otu_labels);
});

// Horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
var bardata = [{
    type: 'bar',
    x: sample_values,
    y: otu_ids,
    orientation: 'h',
    hoverinfo: "text",
    hovertext: otu_labels
  }];
  
  Plotly.newPlot('myDiv', bardata);


