document.addEventListener("DOMContentLoaded", () => {
  var animate = 0;

  window.onscroll = () =>{
     if (window.scrollY > 1300 && window.scrollY < 1750){
        if(animate == 0){
          animate_cards();
          animate = 1;
        }}
      else{
          if(animate == 1){
            unanimate_cards();
            animate = 0;
          }
      }
    }

cards = document.querySelectorAll(('.card-cover'));
cards[1].style.background="#FFFF99";
cards[2].style.background="#CCFF99";
cards[3].style.background="#FF9999";


function animate_cards(){
  document.querySelector("#Sub-card").style.marginLeft = "3%";
  document.querySelector("#Sub-card").style.transform = "rotateZ(0)";
  document.querySelector("#Pasta-card").style.marginLeft = "27%";
  document.querySelector("#Pasta-card").style.transform = "rotateZ(0)";
  document.querySelector("#Salad-card").style.marginLeft = "51%";
  document.querySelector("#Salad-card").style.transform = "rotateZ(0)";
  document.querySelector("#Dinner-card").style.marginLeft = "75%";
  document.querySelector("#Dinner-card").style.transform = "rotateZ(0)";

  setTimeout(()=>{
    document.querySelectorAll('#img').forEach(i => {
          i.style.transform="translateY(-200px)";
    });
    document.querySelectorAll('.card-cover').forEach(j => {
          j.style.marginTop="0%";
          j.style.height="30%";
          j.style.borderBottomLeftRadius  = "100%";
          j.style.borderBottomRightRadius  = "100%";
    });
    document.querySelectorAll('.cardfooter-others').forEach(k => {
          k.style.display="block";
    });
    document.querySelectorAll('.cardbody-others').forEach(l => {
          l.style.display="block";
    });

  },300);
}

function unanimate_cards(){
  document.querySelector("#Sub-card").style.marginLeft = "31%";
  document.querySelector("#Sub-card").style.transform = "rotateZ(-10deg)";
  document.querySelector("#Pasta-card").style.marginLeft = "34%";
  document.querySelector("#Pasta-card").style.transform = "rotateZ(0)";
  document.querySelector("#Salad-card").style.marginLeft = "37%";
  document.querySelector("#Salad-card").style.transform = "rotateZ(10deg)";
  document.querySelector("#Dinner-card").style.marginLeft = "40%";
  document.querySelector("#Dinner-card").style.transform = "rotateZ(20deg)";
  setTimeout(()=>{
    document.querySelectorAll('#img').forEach(i => {
          i.style.transform="translateY(0)";
    });
    document.querySelectorAll('.card-cover').forEach(j => {
          j.style.marginTop="10%";
          j.style.height="400px";
          j.style.borderBottomLeftRadius  = "0%";
          j.style.borderBottomRightRadius  = "0%";
    });
    document.querySelectorAll('.cardfooter-others').forEach(k => {
          k.style.display="none";
    });
    document.querySelectorAll('.cardbody-others').forEach(l => {
          l.style.display="none";
    });
  },300);

}

    st = document.querySelectorAll(".mini-cards");

    let reg_stack=[...st][0];
    let sci_stack=[...st][1];


    [...reg_stack.children].forEach(i => {
        reg_stack.prepend(i)
      });

    [...sci_stack.children].forEach(i => {
          sci_stack.prepend(i)
        });

    document.querySelector(".reg-next").onclick= () => {
          card = reg_stack.lastElementChild;
          card.style.animation= "shuffle 600ms";
          setTimeout(() =>{
              card.style.animation= "";
              reg_stack.prepend(card)
          },600)

    }

    document.querySelector(".sci-next").onclick= () => {
          card = sci_stack.lastElementChild;
          card.style.animation= "shuffle 600ms";
          setTimeout(() =>{
              card.style.animation= "";
              sci_stack.prepend(card);
          },600)

    }




});
