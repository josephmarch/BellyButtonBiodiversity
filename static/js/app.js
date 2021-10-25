// Use the D3 library to read in samples.json
d3.json("samples.json").then(function(data) {
    console.log(data);
    samples = Object.values(data.samples);
    console.log(samples);
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
  
//   Plotly.newPlot('myDiv', bardata);


