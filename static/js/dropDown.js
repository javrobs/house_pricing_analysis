function setUpFromList(variable,texts,values,suffix){
    let selector=document.querySelector(`select#${variable}_${suffix}`)
    for(let i=0;i<texts.length;i++){
        let one_option=document.createElement('option');
        one_option.setAttribute("value", values[i])
        one_option.innerHTML=texts[i];
        selector.appendChild(one_option);
    }
}

var zipcodes=[]
var homeTypes=[]

// setUp("zipcode","flt");
// setUp("homeType","flt");
setUpFromList("stories",["One-floor plan"],[1],"flt");
setUpFromList("baths",["1.5+","2+","3+"],[1.5,2,3],"flt");
setUpFromList("garage",["1+","2+","3+"],[1,2,3],"flt");
setUpFromList("bedrooms",["2+","3+"],[2,3],"flt");