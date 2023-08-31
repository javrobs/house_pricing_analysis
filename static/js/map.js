var map = L.map('map',{zoomControl:false,trackResize:true,zoomDelta:0.5}).setView([30.291739606158348,-97.77869931230686],11);
var mapData;

new L.Control.Zoom({ position: 'topright' }).addTo(map);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

fetch("https://raw.githubusercontent.com/javrobs/house_pricing_analysis/main/static/data/mapinfo.geojson").then(data=>data.json()).then(data=>{
    mapData=data;
    console.log(mapData)
    mapQuery();
});

map.on("click",collapseAll);

var legend = L.control({position: 'bottomright'});
    legend.onAdd=function (){
    let div = L.DomUtil.create('div', 'p-2 legend text-center');
    div.innerHTML +=`
    <h5 class="m-1">Legend</h5>
    <div class="separator"></div>
    <p class="m-1">Neural Network vs Listed Price:</p>
    <table class="text-start mx-3">
    <tr>
    <td class="p-2"><div class="legend-color" style="background-color:#ff4824;"></div></td>
    <td class="">Predicted &lt; Listed (+20%)</td>
    </tr>
    <tr>
    <td class="p-2"><div class="legend-color" style="background-color:#16597a;"></div></td>
    <td class="">Predicted ≈ Listed (±20%)</td>
    </tr>
    <tr>
    <td class="p-2"><div class="legend-color" style="background-color:#84ae36;"></div></td>
    <td class="">Predicted &gt; Listed (-20%)</td>
    </tr>
    </table>
    `
    return div};
    legend.addTo(map);

var markers;
function mapQuery(filters=["","","","","","","","","","","","","",""],showCount=false){
    let features=mapData["features"];
    let lats=[];
    let lons=[];
    markers=L.layerGroup();
    console.log(filters);
    let count=0;
    for (let i=0;i<features.length;i++) {
        let properties=features[i]["properties"];
        if((filters[0]===""||properties["latestPrice"]>=filters[0])&&
        (filters[1]===""||properties["latestPrice"]<=filters[1])&&
        (filters[2]===""||properties["yearBuilt"]>=filters[2])&&
        (filters[3]===""||properties["yearBuilt"]<=filters[3])&&
        (filters[4]===""||properties["lotSizeSqFt"]>=filters[4])&&
        (filters[5]===""||properties["lotSizeSqFt"]<=filters[5])&&
        (filters[6]===""||properties["livingAreaSqFt"]>=filters[6])&&
        (filters[7]===""||properties["livingAreaSqFt"]<=filters[7])&&
        (filters[8]===""||properties["zipcode"]==filters[8])&&
        (filters[9]===""||properties["homeType"]==filters[9])&&
        (filters[10]===""||properties["numOfStories"]==filters[10])&&
        (filters[11]===""||properties["garageSpaces"]>=filters[11])&&
        (filters[12]===""||properties["numOfBathrooms"]>=filters[12])&&
        (filters[13]===""||properties["numOfBedrooms"]>=filters[13])){
            count++;
            let [lon,lat]=features[i]["geometry"]["coordinates"];
            lats.push(lat);
            lons.push(lon);
            notFound=true;
            let marketvalue_nn;
            let marketvalue_lr;
            let difference_nn=properties["latestPrice"]-properties["price_nn"];
            let difference_lr=properties["latestPrice"]-properties["price_lr"];
             if (difference_nn<=0){
                marketvalue_nn=`<span style="color:green;">$${(properties["price_nn"]).toLocaleString("en-US")}<br>(+$${(-difference_nn).toLocaleString("en-US")})</span>`
            } else {
                marketvalue_nn=`<span style="color:red;">$${(properties["price_nn"]).toLocaleString("en-US")}<br>(-$${(difference_nn).toLocaleString("en-US")})</span>`
            }
            if (difference_lr<=0){
                marketvalue_lr=`<span style="color:green;">$${(properties["price_lr"]).toLocaleString("en-US")}<br>(+$${(-difference_lr).toLocaleString("en-US")})</span>`
            } else {
                marketvalue_lr=`<span style="color:red;">$${(properties["price_lr"]).toLocaleString("en-US")}<br>(-$${(difference_lr).toLocaleString("en-US")})</span>`
            }
            let popupContent=`<div class="text-center row popup">
            <div class="col-12">
            <span style="color:#16697A;font-size:22px;font-weight:bold">$${properties["latestPrice"].toLocaleString("en-US")}</span><br>
            </div>
            <div class="separator my-1"></div>
            <div class="col-12">
            <span style="font-size:16px;font-weight:bold">${properties["address"]}, ${properties["zipcode"]}</span><br>
            ${properties["numOfBedrooms"]} beds, ${properties["numOfBathrooms"]} baths<br>
            ${properties["numOfStories"]} stories, ${properties["garageSpaces"]} garage<br>
            Living: ${properties["livingAreaSqFt"].toLocaleString("en-US")} ft², Lot: ${properties["lotSizeSqFt"].toLocaleString("en-US")} ft²<br>
            Built in ${properties["yearBuilt"]}
            </div>
            <div class="separator my-1"></div>
            <div class="col-6 px-1">Linear<br>Regression:</div>
            <div class="col-6 px-1">Neural<br>Network:</div>
            <div class="col-6 px-1">${marketvalue_lr}</div>
            <div class="col-6 px-1">${marketvalue_nn}</div>
            </div>
            `
            let percentage=properties["latestPrice"]/properties["price_nn"];
            let markerColor;
            let colors=["#ff4824","#16597a","#84ae36"]
            switch(true){
                case (percentage>=1.2):
                    markerColor=colors[0];
                    break;
                case (percentage>=.8):
                    markerColor=colors[1];
                    break;
                case (percentage<.8):
                    markerColor=colors[2];
                    break;
            };
            L.circle([lat,lon],{"radius":30,"color":markerColor}).bindPopup(popupContent).addTo(markers);
        };
    };
    if(showCount){
        let placeholder=document.getElementById("count-placeholder");
        placeholder.innerHTML=(count===0)?"no":count;
        show("results");
    }
    let [minLat,maxLat,sumLat,minLon,maxLon,sumLon]=[lats[0],lats[0],0,lons[0],lons[0],0];
    for (let i=0;i<lats.length;i++){
        minLat=Math.min(minLat,lats[i]);
        maxLat=Math.max(maxLat,lats[i]);
        sumLat+=lats[i];
        minLon=Math.min(minLon,lons[i]);
        maxLon=Math.max(maxLon,lons[i]);
        sumLon+=lons[i];
    };
    console.log(minLat,maxLat,sumLat,minLon,maxLon,sumLon);
    console.log("avgLat:",sumLat/count,"avgLon:",sumLon/count,"difLat:",maxLat-minLat,"difLon:",maxLon-minLon)
    markers.addTo(map);
    let zoom=(maxLat-minLat>.20&&maxLat-minLat>.20)?11:(maxLat-minLat>.10&&maxLat-minLat>.10)?12:13;
    map.setView([sumLat/count,sumLon/count],zoom);
    
    
};

function clearMap(){
    map.removeLayer(markers);
};
