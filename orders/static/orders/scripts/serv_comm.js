document.addEventListener("DOMContentLoaded", () =>{

      console.log("server comm loaded")
      document.querySelector("#regular-form").onsubmit = function(event){

            event.preventDefault();
            process("#regular-form",'added/')
            document.querySelector("#cart-section").innerHTML = button();

      }

      document.querySelector("#sicillian-form").onsubmit = function(event){
            event.preventDefault();
            process("#sicillian-form",'addeds/')
            document.querySelector("#cart-section").innerHTML = button();

      }

      document.querySelector("#pasta-form").onsubmit = function(event){
            event.preventDefault();
            process("#pasta-form",'pasta/')
            document.querySelector("#cart-section").innerHTML = button();

      }
      document.querySelector("#salad-form").onsubmit = function(event){
            event.preventDefault();
            process("#salad-form",'salad/')
            document.querySelector("#cart-section").innerHTML = button();

      }
      document.querySelector("#sub-form").onsubmit = function(event){
            event.preventDefault();
            process("#sub-form",'subs/')
            document.querySelector("#cart-section").innerHTML = button();

      }
      document.querySelector("#dinner-form").onsubmit = function(event){
            event.preventDefault();
            process("#dinner-form",'dine/')
            document.querySelector("#cart-section").innerHTML = button();

      }


});

function process(tag,route){
    var request = new XMLHttpRequest();
    request.open('POST',route);
    var formdata = new FormData(document.querySelector(tag));
    request.send(formdata);
    console.log(request.response);
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
