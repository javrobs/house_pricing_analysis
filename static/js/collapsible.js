const menu=document.querySelector("#menu");

function collapsible(ids){
    let showSections=ids.map(id=>document.querySelector("#"+id));
    let allSections=document.querySelectorAll(".content");
    for (let i=0;i<allSections.length;i++){
        thisID=allSections[i].id;
        if (showSections.includes(allSections[i])===false){
            console.log("remove:",allSections[i]);
            hide(thisID);
        } else if (allSections[i].classList.contains("not-shown")){
            console.log("expand:",allSections[i]);
            show(thisID)
            menu.classList.add("expand");
        } else {
            console.log("collapse:",allSections[i]);
            hide(thisID)
            menu.classList.remove("expand");
        };
    };
};

function show(id){
    let section=document.querySelector("#"+id);
    section.classList.remove("not-shown");
}

function hide(id){
    let section=document.querySelector("#"+id);
    section.classList.add("not-shown");
}