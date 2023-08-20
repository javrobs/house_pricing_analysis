var map = L.map('map',{zoomControl:false}).setView([30.3077609,-97.7557424],12);


new L.Control.Zoom({ position: 'topright' }).addTo(map);
mapQuery();

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var markers;
function mapQuery(filters=["",""]){
    fetch("https://raw.githubusercontent.com/javrobs/house_pricing_analysis/main/static/data/mapinfo.geojson").then(data=>data.json()).then(data=>{
    let features=data["features"];
    markers=L.layerGroup();
        console.log(data);
        console.log(filters);
        for (let i=0;i<features.length;i++) {
            let properties=features[i]["properties"];
            if(filters[0]===""||properties["latestPrice"]>=filters[0]&&
                filters[1]===""||properties["latestPrice"]<=filters[1]&&filters[2]){
                let lon=features[i]["geometry"]["coordinates"][0];
                let lat=features[i]["geometry"]["coordinates"][1];
                let marketvalue;
                if (properties["difference_nn"]<=0){
                    marketvalue=`<span style="color:green;">▼ $${(-properties["difference_nn"]).toLocaleString("en-US")} cheaper<br>than our estimate: $${(properties["predict_nn"]).toLocaleString("en-US")}<br></span>`
                } else {
                    marketvalue=`<span style="color:red;">▲ $${properties["difference_nn"].toLocaleString("en-US")} more expensive<br>than our estimate: $${(properties["predict_nn"]).toLocaleString("en-US")}<br></span>`
                    
                }
                let popupContent=`<div style="text-align:center">
                <span style="color:#16697A;font-size:18px;font-weight:bold">${properties["address"]}, ${properties["zipcode"]}</span><br>
                <span style="color:#16697A;font-size:14px;font-weight:bold">$${properties["latestPrice"].toLocaleString("en-US")}</span><br>
                
                ${properties["numOfBedrooms"]} bd, ${properties["numOfBathrooms"]} ba,
                ${properties["livingAreaSqFt"].toLocaleString("en-US")}ft²<br>
                ${marketvalue}
                </div>
                `
                let colors=["#ff4824","#f39227","#e6dc29","#92d746","#3dd162"];
                // colors=["#16587a","#22404f","#2c2526","#581d23","#821621"]
                let percentage=properties["percent_change_nn"]
                let markerColor
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
                }
        
                L.circle([lat,lon],{"radius":30,"color":markerColor}).bindPopup(popupContent).addTo(markers);
            };};   
        markers.addTo(map);
    });
};

function clearMap(){
    map.removeLayer(markers);
};
