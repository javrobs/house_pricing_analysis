const menu=document.querySelector("#menu");

function collapsible(ids){
    let showSections=ids.map(id=>document.querySelector("#"+id));
    let allSections=document.querySelectorAll(".content");
    for (let i=0;i<allSections.length;i++){
        console.log(allSections[i]);
        if (showSections.includes(allSections[i])===false){
            console.log("remove:",allSections[i]);
            allSections[i].classList.add("not-shown");
        } else if (allSections[i].classList.contains("not-shown")){
            console.log("expand:",allSections[i]);
            allSections[i].classList.remove("not-shown");
            menu.classList.add("expand");
        } else {
            console.log("collapse:",allSections[i]);
            allSections[i].classList.add("not-shown");
            menu.classList.remove("expand");
        };
    };
};