function collapsible(id){
    let expandSection=document.querySelector("#"+id);
    expandSection.classList.toggle("collapsed");
    console.log(expandSection);
    let allsections=document.querySelectorAll(".content")
    for (let i=0;i<allsections.length;i++){
        console.log(allsections[i].id)
        if (allsections[i]!==expandSection){
            allsections[i].classList.add("collapsed");
        };
    };
    // let sections=["filters","graphs","predict"].filter(each=>{
    //     return each!=section;
    // });
    // console.log("Remaining sections",sections);
    // if (d3.select(`#${section}`).style("width")=="0px"){
    //     sections.forEach(each=>{
    //         d3.select(`#${each}`).style("width",0);
    //         d3.select(`#${each}`).style("height",0);
    //     });
    //     d3.select(`#${section}`).style("width","450px");
    //     d3.select(`#${section}`).style("height","auto");

    // } else {
    //     console.log(`collapse ${section}`)
    //     d3.select(`#${section}`).style("width",0);
    //     d3.select(`#${section}`).style("height",0);
    //     d3.select(`#${section}`).style("marginLeft",0);
    // }
}