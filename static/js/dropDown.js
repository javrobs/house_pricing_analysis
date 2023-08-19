function setUp(variable,suffix){
    fetch("unique/"+variable).then(data=>data.json()).then((data)=>{
        let selector=document.querySelector(`select#${variable}_${suffix}`)
        data.forEach(one=>{
            let one_option=document.createElement('option');
            one_option.setAttribute("value", one);
            one_option.innerHTML=one;
            selector.appendChild(one_option);
        })
    });
}

function setUpFromList(variable,texts,values,suffix){
    let selector=document.querySelector(`select#${variable}_${suffix}`)
    for(let i=0;i<texts.length;i++){
        let one_option=document.createElement('option');
        one_option.setAttribute("value", values[i])
        one_option.innerHTML=texts[i];
        selector.appendChild(one_option);
    }
}


setUp("zipcode","flt");
setUp("homeType","flt");
setUpFromList("stories",["One-floor plan"],[1],"flt");
setUpFromList("baths",["1.5+","2+","3+"],[1.5,2,3],"flt");
setUpFromList("garage",["1+","2+","3+"],[1,2,3],"flt");
setUpFromList("bedrooms",["2+","3+"],[2,3],"flt");

