document.addEventListener("DOMContentLoaded", () =>{


fetch("/stripe-key")
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

    document.querySelector('.checkbutton').addEventListener('click', () => {
        document.querySelector('#address').innerHTML = "";
        document.querySelector('.grid-item-1').style.marginTop = '50%';
        document.querySelector('.grid-item-1').style.marginBottom= '60%';
        document.querySelector('#payment-form').innerHTML += stripe_form()
        document.querySelector(".button1").style.display = "none";
        document.querySelector('.checkbutton').innerHTML = '';
        document.querySelector("#cancel-button").innerHTML = cancelbutton();
        document.querySelector("#payment-button").innerHTML = paymentbutton();
        card_info[0].mount(".card-number")
        card_info[1].mount(".card-xp")
        card_info[2].mount(".card-cvv")
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
                      var form = new FormData(document.querySelector("#payment-form"))
                      form.append("paymentMethodId",result.paymentMethod.id)
                      config = {method:"POST",body:form}
                      fetch('pay',config)
                      .then(response => {
                           return response.json()
                      }).then( json => {
                        if (json.error) {
                          showError(json.error);
                        } else {
                          console.log("Payment succeded");

                        }
                      })
                }
      })
    });



    });
});

function stripe_form(){

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

    form.setAttribute("method","post")
    form.setAttribute("id","payment-form")

    row_1.innerHTML = card_n.outerHTML
    row_2.innerHTML = card_xp.outerHTML + card_cv.outerHTML

    return row_1.outerHTML + row_2.outerHTML
}


function paymentbutton(){
      var pay = document.createElement("button");
      pay.innerHTML = "Pay";

      return pay.outerHTML;
}

function cancelbutton(){
      var cancel = document.createElement("button");
      cancel.innerHTML = "Cancel";
      return cancel.outerHTML;
}


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



function form(){

      var card_input = document.createElement('input');
      var row_1 = document.createElement('div');
      var row_2 = document.createElement('div');
      var month_input = document.createElement('input');// cardn-input
      var year_input = document.createElement('input');// cardex_input
      var cvv_input = document.createElement('input');//cardcvv_input
      var form = document.createElement('form');
      var space = document.createElement('span');

      card_input.setAttribute('type','text')
      card_input.setAttribute('class','innertext')
      card_input.setAttribute('placeholder','card number')
      month_input.setAttribute('type','text')
      month_input.setAttribute('class','innertext')
      month_input.setAttribute('placeholder','Month')
      year_input.setAttribute('type','text')
      year_input.setAttribute('class','innertext')
      year_input.setAttribute('placeholder','Year')
      cvv_input.setAttribute('type','text')
      cvv_input.setAttribute('class','innertext')
      cvv_input.setAttribute('placeholder','cvv')

      row_1.setAttribute('class','row1');
      row_2.setAttribute('class','row2');

      form.setAttribute('method','post')

      row_1.innerHTML = card_input.outerHTML;
      row_2.innerHTML = month_input.outerHTML + space.outerHTML+ year_input.outerHTML+ space.outerHTML + cvv_input.outerHTML;
      form.innerHTML = row_1.outerHTML + row_2.outerHTML;

      return form.outerHTML;
}
