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


        // Bubble chart that displays each sample
        var bubbledata = [{
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids,
            },
            text: samples.otu_labels
        }];
        var bubblelayout = {
            xaxis: { title: "OTU ID" }
        };

        Plotly.newPlot("bubble", bubbledata, bubblelayout);

        // Select Demographic Info and clear it then fill it in using key-value pairs
        d3.select("#sample-metadata").html("");
        Object.entries(metadata).forEach(([key, value]) => {
            d3.select("#sample-metadata").append("p").text(`${key}: ${value}`);
        });

        // BONUS: gauge chart to plot the weekly washing frequency of the individual
        var gaugedata = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: metadata.wfreq,
                title: { text: "<span style='font-size: 20px;'>Belly Button Washing Frequency</span><br> Scrubs per Week" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: { range: [null, 9]},
                    steps: [
                        {range: [0, 1], color: "rgb(210,250,210)"},
                        {range: [1, 2], color: "rgb(190,250,190)"},
                        {range: [2, 3], color: "rgb(170,250,170)"},
                        {range: [3, 4], color: "rgb(150,250,150)"},
                        {range: [4, 5], color: "rgb(130,250,130)"},
                        {range: [5, 6], color: "rgb(110,250,110)"},
                        {range: [6, 7], color: "rgb(90,250,90)"},
                        {range: [7, 8], color: "rgb(70,250,70)"},
                        {range: [8, 9], color: "rgb(50,250,50)"}
                    ]
                }
            }
        ];

        Plotly.newPlot("gauge", gaugedata);

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
