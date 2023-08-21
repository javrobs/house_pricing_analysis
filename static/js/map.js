var map = L.map('map',{zoomControl:false}).setView([30.3077609,-97.7557424],12);
var mapData;

new L.Control.Zoom({ position: 'topright' }).addTo(map);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

fetch("https://raw.githubusercontent.com/javrobs/house_pricing_analysis/main/static/data/mapinfo.geojson").then(data=>data.json()).then(data=>{
    mapData=data;
    mapQuery();
});


var markers;
function mapQuery(filters=["","","","","","","","","","","","","",""],showCount=false){
    let features=mapData["features"];
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
            let lon=features[i]["geometry"]["coordinates"][0];
            let lat=features[i]["geometry"]["coordinates"][1];
            notFound=true;
            let marketvalue;
            if (properties["difference_nn"]<=0){
                marketvalue=`<span style="color:green;">▼ $${(-properties["difference_nn"]).toLocaleString("en-US")} cheaper<br>than our estimate: $${(properties["predict_price_nn"]).toLocaleString("en-US")}<br></span>`
            } else {
                marketvalue=`<span style="color:red;">▲ $${properties["difference_nn"].toLocaleString("en-US")} more expensive<br>than our estimate: $${(properties["predict_price_nn"]).toLocaleString("en-US")}<br></span>`
            }
            let popupContent=`<div style="text-align:center">
            <span style="color:#16697A;font-size:18px;font-weight:bold">${properties["address"]}, ${properties["zipcode"]}</span><br>
            <span style="color:#16697A;font-size:14px;font-weight:bold">$${properties["latestPrice"].toLocaleString("en-US")}</span><br>
            ${properties["homeType"]}<br>
            ${properties["numOfBedrooms"]} bd, ${properties["numOfBathrooms"]} ba, ${properties["numOfStories"]} st, ${properties["garageSpaces"]} ga<br>
            Living: ${properties["livingAreaSqFt"].toLocaleString("en-US")} ft², Lot: ${properties["lotSizeSqFt"].toLocaleString("en-US")} ft²<br>
            Built in ${properties["yearBuilt"]}<br>
            ${marketvalue}
            </div>
            `
            let colors=["#ff4824","#f39227","#e6dc29","#92d746","#3dd162"];
            let percentage=properties["percent_change_nn"];
            let markerColor;
            switch(true){
                case (percentage>=50):
                    markerColor=colors[0];
                    break;
                case (percentage>20):
                    markerColor=colors[1];
                    break;
                case (percentage>-20):
                    markerColor=colors[2];
                    break;
                case (percentage>-50):
                    markerColor=colors[3];
                    break;
                case (percentage<=-50):
                    markerColor=colors[4];
                    break;                
            }
            colors=["#ff4824","#2156a5","#75ab38"]
            colors=["#ff4824","#16597a","#84ae36"]
            switch(true){
                case (percentage>=20):
                    markerColor=colors[0];
                    break;
                case (percentage>=-20):
                    markerColor=colors[1];
                    break;
                case (percentage<-20):
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
    markers.addTo(map);
};

function clearMap(){
    map.removeLayer(markers);
};
