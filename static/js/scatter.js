var graphData;
const independent=document.getElementById("independent");
isListening=false;
console.log()
fetch("https://raw.githubusercontent.com/javrobs/house_pricing_analysis/main/static/data/graphInfo.json").then(data=>data.json()).then(data=>{
  graphData=data;
  console.log(graphData);
  setUpFromList("independent",['Bedrooms','Bathrooms',
'Lot Size (ft²)','Living Area (ft²)',
'Garage Spaces','Stories','Year Built'],['numOfBedrooms','numOfBathrooms',
'lotSizeSqFt','livingAreaSqFt',
'garageSpaces','numOfStories','yearBuilt']);
  independent.addEventListener("change",scatter);
});

function scatter(event){
  let chosenVar=event.target.value
  if (chosenVar!==""){
    grapher(graphData[chosenVar]);
  } else {
    clearGraph();
  }
  
};


function grapher(data){
  var realPrice = {
    x: data,
    y: graphData["latestPrice"],
    mode: 'markers',
    type: "scattergl",
    name:"Real Price",
    marker: {
      color: '#ff4824',
      size: 7,
    },
  };

  var lrPrice = {
    x: data,
    y: graphData["predicted_price_lr"],
    mode: 'markers',
    type: 'scattergl',
    name: "Linear Regression",
    marker: {
      color: '#16597a',
      size: 6,
    },
  };

  var nnPrice = {
    x: data,
    y: graphData["predict_price_nn"],
    mode: 'markers',
    type: 'scattergl',
    name: "Neural Network",
    marker: {
      color: '#84ae36',
      size: 5,
    },
  };

  let Layout = {
            margin: { t: 5, l: 40 ,b:5,r:10},
            legend:{orientation:"h"},
            height: document.querySelector("#graphContainer").offsetHeight-15,
            width: document.querySelector("#graphContainer").offsetWidth-15,
            paper_bgcolor: "#F1F8F9",
            plot_bgcolor: "white"
 
        };
  var scatterData = [realPrice,lrPrice,nnPrice];

  Plotly.newPlot('graphContainer', scatterData,Layout);
  if (isListening===false){
    isListening=true;
    window.addEventListener("resize",resizePlot);
  };
};

function resizePlot(){
  let plotWidth=document.querySelector("#graphContainer").offsetWidth-15;
  let plotHeight=document.querySelector("#graphContainer").offsetHeight-15;
  Plotly.update('graphContainer',{},{height:plotHeight,width:plotWidth});
};


function clearGraph(){
  Plotly.purge("graphContainer");
}