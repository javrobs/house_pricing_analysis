const menu=document.querySelector("#menu");
const allWidgets=document.querySelectorAll(".widget");
const mapMiniWidget=document.querySelector("#map-btn-mini");
function collapsible(ids,button,isMini){
    let showSections=ids.map(id=>document.querySelector("#"+id));
    let allSections=document.querySelectorAll(".content");
    allWidgets.forEach(one=>{
        one.classList.remove("active-now");
    })
    for (let i=0;i<allSections.length;i++){
        thisID=allSections[i].id;
        if (showSections.includes(allSections[i])===false){
            // console.log("remove:",allSections[i]);
            hide(thisID);
        } else if (allSections[i].classList.contains("not-shown")){
            console.log("expand:",allSections[i]);
            show(thisID)
            menu.classList.add("expand");
            mapMiniWidget.classList.remove("active-now");
            button.classList.add("active-now");
            otherButton=(isMini)?document.querySelector("#"+button.id.replace("-mini","")):document.querySelector("#"+button.id+"-mini");
            otherButton.classList.add("active-now");
        } else {
            console.log("collapse:",allSections[i]);
            hide(thisID)
            menu.classList.remove("expand");
            mapMiniWidget.classList.add("active-now");
        };
    };
    
    console.log("collapsible function finished")
    map.invalidateSize();
};

function collapseAll(){
    let allSections=document.querySelectorAll(".content");
    for (let i=0;i<allSections.length;i++){
        thisID=allSections[i].id;
        hide(thisID);
    };
    menu.classList.remove("expand");
    console.log("collapse all function finished");
    allWidgets.forEach(one=>{
        one.classList.remove("active-now");
    })
    mapMiniWidget.classList.add("active-now");
    map.invalidateSize();
};

function show(id){
    let section=document.querySelector("#"+id);
    section.classList.remove("not-shown");
}

function hide(id){
    let section=document.querySelector("#"+id);
    section.classList.add("not-shown");
}