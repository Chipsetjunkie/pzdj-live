document.addEventListener("DOMContentLoaded", () =>{
      var server_response = ["potato"];
      console.log("server comm loaded")
      document.querySelector("#regular-form").onsubmit = function(event){

            event.preventDefault();
            console.log(server_response);
            process("#regular-form")

      }


});

function process(tag){
    var server_response ="none";
    var request = new XMLHttpRequest();
    request.open('POST','added/');
    request.onload = () => {
        console.log(server_response)
        server_response = JSON.parse(request.responseText);
        console.log(server_response.data)// this shit wont work better create a url route for cart click
        // which redirects to index and use java to show modal simple!!
    }


    var formdata = new FormData(document.querySelector(tag))
    request.send(formdata);

}
