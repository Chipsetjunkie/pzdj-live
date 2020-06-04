document.addEventListener("DOMContentLoaded", () =>{

      console.log("server comm loaded")
      document.querySelector("#regular-form").onsubmit = function(event){

            event.preventDefault();
            pizza_process("#regular-form",'added/',"450px","1100px")

      }

      document.querySelector("#sicillian-form").onsubmit = function(event){
            event.preventDefault();
            pizza_process("#sicillian-form",'addeds/',"800px","1100px")
      }

      document.querySelector("#pasta-form").onsubmit = function(event){
            event.preventDefault();
            other_process("#pasta-form",'pasta/',"500px","2100px");
      }
      document.querySelector("#salad-form").onsubmit = function(event){
            event.preventDefault();
            other_process("#salad-form",'salad/',"800px","2100px")
      }
      document.querySelector("#sub-form").onsubmit = function(event){
            event.preventDefault();
            other_process("#sub-form",'subs/',"200px","2100px")
      }
      document.querySelector("#dinner-form").onsubmit = function(event){
            event.preventDefault();
            other_process("#dinner-form",'dine/',"1100px","2100px")
      }


});


function pizza_process(tag,route,left,top){
    var request = new XMLHttpRequest();
    request.open('POST',route);
    var formdata = new FormData(document.querySelector(tag));
    fetch(route,{method:"POST",body:formdata})
    request.send(formdata);
    document.querySelector("#float").style.left=left;
    document.querySelector("#float").style.top=top;
    document.querySelector("#float").style.animation ="pop 2s";
    document.querySelector("#float").style.display="inline";
    setTimeout(()=>{
        document.querySelector("#float").style.animation ="";
        document.querySelector("#float").style.display="none";
      },2000);
    document.querySelector(".cartbutton").style.border="1px solid black";
    document.querySelector(".cartbutton").style.borderRadius= "10px";
    document.querySelector(".cartbutton").style.paddingLeft= "4px";
    document.querySelector(".cartbutton").style.paddingRight="4px";


}



function other_process(tag,route,left,top){
    var formdata = new FormData(document.querySelector(tag));
    fetch(route,{method:"POST",body:formdata})
    .then(response => response.json())
    .then(output =>{

        if (output.output != "Fail"){
          document.querySelector(".cartbutton").style.border="1px solid black";
          document.querySelector(".cartbutton").style.borderRadius= "10px";
          document.querySelector(".cartbutton").style.paddingLeft= "4px";
          document.querySelector(".cartbutton").style.paddingRight="4px";
          document.querySelector("#float").innerHTML="+ Added";
        }
        else{
          document.querySelector("#float").innerHTML="Not Added";
        }
        document.querySelector("#float").style.left=left;
        document.querySelector("#float").style.top=top;
        document.querySelector("#float").style.animation ="pop 2s";
        document.querySelector("#float").style.display="inline";
        setTimeout(()=>{
            document.querySelector("#float").style.animation ="";
            document.querySelector("#float").style.display="none";
          },2000);



    });
}


function button(){
    var button = document.createElement("button");
    var a = document.createElement("a");
    a.setAttribute("href","cart/");
    button.setAttribute("type","button");
    button.setAttribute("class","btn btn-warning");

    button.innerHTML = "Cart";
    a.innerHTML = button.outerHTML;

    return a.outerHTML;

}
