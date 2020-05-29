document.addEventListener("DOMContentLoaded", () => {

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
