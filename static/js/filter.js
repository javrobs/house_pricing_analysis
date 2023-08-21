function filterMap(){
    let inputsNumbers=document.querySelectorAll("#filters input[type='number']");
    console.log(inputsNumbers);
    let selects=document.querySelectorAll("#filters select");
    let result=[];
    for (let i=0;i<inputsNumbers.length;i++){
        result.push(inputsNumbers[i].value);
    };
    for (let i=0;i<selects.length;i++){
        result.push(selects[i].value);
    };
    document.querySelector("#filterClear").removeAttribute("disabled");
    clearMap();
    mapQuery(result,true);
};

function clearFilter(){
    let inputs=document.querySelectorAll("#filters input[type='number'],#filters select");
    for (let i=0;i<inputs.length;i++){
        inputs[i].value="";
    };
    document.querySelector("#filterClear").setAttribute("disabled", "");
    clearMap();
    hide("results");
    mapQuery();
};