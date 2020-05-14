document.addEventListener("DOMContentLoaded", () =>{

        document.querySelector('.checkbutton').addEventListener('click', () => {
          document.querySelector('#address').innerHTML = "";
          document.querySelector('.grid-item-1').style.marginTop = '50%';
          document.querySelector('.grid-item-1').style.marginBottom= '60%';
          document.querySelector('#address').innerHTML = form();
          document.querySelector(".button1").style.display = "none";
          document.querySelector('.checkbutton').innerHTML = '';
          document.querySelector("#cancel-button").innerHTML = cancelbutton();
          document.querySelector("#payment-button").innerHTML = paymentbutton();

          });



      document.querySelector('#cancel-button').addEventListener('click' ,() =>{
              location.reload()
      });

      document.querySelector('#payment-button').addEventListener('click' ,() =>{
              console.log("payment clicked");
      });

});


function form(){

      var card_input = document.createElement('input');
      var row_1 = document.createElement('div');
      var row_2 = document.createElement('div');
      var month_input = document.createElement('input');
      var year_input = document.createElement('input');
      var cvv_input = document.createElement('input');
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
