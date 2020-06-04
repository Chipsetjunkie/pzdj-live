document.addEventListener("DOMContentLoaded", () =>{


fetch("/stripe-key",{method:"POST"})
.then(key =>{
    return key.json()
})
.then(json =>{
    return json
})
.then(data => {
    return setup(data);
})
.then(result => {
    var card_info = result.card;
    var stripe_ins = result.stripe;
    console.log("entered");

    document.querySelector("#address-form").onsubmit = e =>{

      e.preventDefault();
      form = new FormData(document.querySelector("#address-form"))
      context = {method:'POST',body:form}
      console.log("entered");
      fetch('address',context)
      .then(response =>response.json())
      .then(result => {
        return result.output;
      })
      .then(output =>{
        console.log(output)
        if (output != 'Nope'){
        document.querySelector('#address').innerHTML = "";
        document.querySelector('.grid-item-1').style.marginTop = '50%';
        document.querySelector('.grid-item-1').style.marginBottom= '60%';
        document.querySelector('#payment-form').innerHTML += stripe_form()
        document.querySelector(".button1").style.display = "none";
        document.querySelector('#checkbutton').innerHTML = '';
        //document.querySelector("#cancel-button").innerHTML = cancelbutton();
        document.querySelector("#cancel-button").style.display="block";
        //document.querySelector("#payment-button").innerHTML = paymentbutton();
        document.querySelector("#payment-button").style.display="block";
        card_info[0].mount(".card-number")
        card_info[1].mount(".card-xp")
        card_info[2].mount(".card-cvv")}

        else{
          root = document.documentElement;
          root.style.setProperty("--color","#FF9999");
          root.style.setProperty("--text-color","#FF0000");
          var errorMsg = document.querySelector(".error-area");
          errorMsg.style.display = "block";
          errorMsg.textContent = "Invalid phone number";

          setTimeout(function() {
            errorMsg.style.display = "none";
            errorMsg.textContent = "";
          }, 4000);

        }});
      };

     card_info[0].on('change',e =>{
        document.querySelector(".card-img").setAttribute("src",cards[e.brand]);

    });

    document.querySelector('#cancel-button').addEventListener('click' ,() =>{
            location.reload()
    });

    document.querySelector('#payment-button').addEventListener('click' ,() =>{

              stripe_ins.createPaymentMethod("card",card_info[0])
              .then(result =>{
                if (result.error){
                  console.log(result.error.messages);
                }
                else{
                      document.querySelector(".paytext").style.display = "none";
                      document.querySelector(".spinner").style.display = "inherit";
                      var form = new FormData(document.querySelector("#payment-form"))
                      form.append("paymentMethodId",result.paymentMethod.id)
                      config = {method:"POST",body:form}
                      fetch('pay',config)
                      .then(result => {
                           return result.json()
                      }).then( response => {
                        if (response.error) {
                          showError(response.error);
                        } else if(response.requiresAction){
                          console.log("entered")
                          handleAction(response.clientSecret)
                        }
                        else {
                            document.querySelector(".paytext").style.display = "inline";
                            document.querySelector(".spinner").style.display = "none";
                            root = document.documentElement;
                            root.style.setProperty("--color","#99FF99");
                            root.style.setProperty("--text-color","#009900");
                            document.querySelector(".error-area").textContent = "Success!! redirecting in 5s";
                            document.querySelector(".error-area").style.display = "block";
                            update_cart();
                            setTimeout(function() {
                              document.querySelector(".error-area").style.display = "none";
                              document.querySelector(".error-area").textContent= "";
                              location.replace("http://127.0.0.1:8000");
                            }, 5000);




                        }
                      })
                }
              }); });
            });
          });

//    HELPER FUNCTIONS

// DOM RELATED

function stripe_form(){

    var img = document.createElement("img");
    var card_n = document.createElement('div');
    var card_xp = document.createElement('div');
    var card_cv = document.createElement('div');
    var form = document.createElement('form');
    var row_1 = document.createElement('div');
    var row_2 = document.createElement('div');

    row_1.setAttribute('class','row1');
    row_2.setAttribute('class','row2');

    card_n.setAttribute("class","card-number");
    card_xp.setAttribute("class","card-xp");
    card_cv.setAttribute("class","card-cvv");
    img.setAttribute("class","card-img");
    img.setAttribute("src",cards["unknown"]);
    form.setAttribute("method","post")
    form.setAttribute("id","payment-form")

    row_1.innerHTML = img.outerHTML +card_n.outerHTML
    row_2.innerHTML = card_xp.outerHTML + card_cv.outerHTML

    return row_1.outerHTML + row_2.outerHTML
}

// PAYMENT RELATED

function setup(data){
        stripe = Stripe(data.KEY)
        element = stripe.elements()

        var style = {
          base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#aab7c4"
            }
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
          },
        }

        cardnumber = element.create("cardNumber", { style: style })
        cardexp = element.create("cardExpiry", { style: style })
        cardcvv = element.create("cardCvc", { style: style })

        return {card:[cardnumber,cardexp,cardcvv],stripe:stripe}

}


function showError(errorMsgText) {
  document.querySelector(".paytext").style.display = "inline";
  document.querySelector(".spinner").style.display = "none";
  root = document.documentElement;
  root.style.setProperty("--color","#FF9999");
  root.style.setProperty("--text-color","#FF0000");
  var errorMsg = document.querySelector(".error-area");
  errorMsg.style.display = "block";
  errorMsg.textContent = errorMsgText;

  setTimeout(function() {
    errorMsg.style.display = "none";
    errorMsg.textContent = "";
  }, 4000);
};


function handleAction(clientSecret) {
  stripe.handleCardAction(clientSecret).then(function(data) {
    if (data.error) {
      showError("Your card was not authenticated, please try again");
    }
    else if (data.paymentIntent.status === "requires_confirmation") {
      var form = new FormData(document.querySelector("#payment-form"))
      form.append("paymentMethodId",result.paymentMethod.id)
      config = {method:"POST",body:form}
      fetch('pay',config)
        .then(function(result) {
          return result.json();
        })
        .then(function(json) {
          if (json.error) {
            showError(json.error);
          } else {
            document.querySelector(".paytext").style.display = "inline";
            document.querySelector(".spinner").style.display = "none";
            root = document.documentElement;
            root.style.setProperty("--color","#99FF99");
            root.style.setProperty("--text-color","#009900");
            document.querySelector(".error-area").textContent = "Success!! redirecting in 5s";
            document.querySelector(".error-area").style.display = "block";
            update_cart();
            setTimeout(function() {
              document.querySelector(".error-area").style.display = "none";
              document.querySelector(".error-area").textContent= "";
              location.replace("http://127.0.0.1:8000");
            }, 5000);
          }
        });
    }
  });
};


function update_cart(){
  fetch('complete',{method:"POST"})
  .then(result =>{
      console.log(result)
  });
}
