function setUpFromList(variable,texts,values){
    let selector=document.querySelector(`select#${variable}`)
    for(let i=0;i<texts.length;i++){
        let one_option=document.createElement('option');
        one_option.setAttribute("value", values[i])
        one_option.innerHTML=texts[i];
        selector.appendChild(one_option);
    }
}

var zipcodes=[78660, 78617, 78717, 78724, 78747, 78725, 78726, 78744, 78732,
    78750, 78729, 78719, 78731, 78730, 78753, 78733, 78746, 78735,
    78734, 78737, 78619, 78759, 78739, 78652, 78653, 78758, 78749,
    78728, 78754, 78736, 78757, 78727, 78745, 78704, 78741, 78742,
    78752, 78723, 78748, 78738, 78705, 78703, 78702, 78701, 78722,
    78721, 78751, 78756];
var homeTypes=['Single Family', 'Residential', 'Mobile / Manufactured',
'Townhouse', 'Condo', 'Multiple Occupancy', 'Vacant Land', 'Other',
'Apartment', 'MultiFamily'];

setUpFromList("zipcode",zipcodes,zipcodes);
setUpFromList("homeType",homeTypes,homeTypes);
setUpFromList("stories",["One-floor plan"],[1]);
setUpFromList("baths",["1.5+","2+","3+","4+","5+"],[1.5,2,3,4,5]);
setUpFromList("garage",["1+","2+","3+"],[1,2,3]);
setUpFromList("bedrooms",["2+","3+","4+","5+"],[2,3,4,5]);

