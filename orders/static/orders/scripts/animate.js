document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#Other-items").onmouseover = () => {

        document.querySelector("#Sub-card").style.marginLeft = "3%";
        document.querySelector("#Sub-card").style.transform = "rotateZ(0)";
        document.querySelector("#Pasta-card").style.marginLeft = "27%";
        document.querySelector("#Pasta-card").style.transform = "rotateZ(0)";
        document.querySelector("#Salad-card").style.marginLeft = "51%";
        document.querySelector("#Salad-card").style.transform = "rotateZ(0)";
        document.querySelector("#Dinner-card").style.marginLeft = "75%";
        document.querySelector("#Dinner-card").style.transform = "rotateZ(0)";

    }

    document.querySelector("#Other-items").onmouseout = () => {

        document.querySelector("#Sub-card").style.marginLeft = "31%";
        document.querySelector("#Sub-card").style.transform = "rotateZ(-10deg)";
        document.querySelector("#Pasta-card").style.marginLeft = "34%";
        document.querySelector("#Pasta-card").style.transform = "rotateZ(0)";
        document.querySelector("#Salad-card").style.marginLeft = "37%";
        document.querySelector("#Salad-card").style.transform = "rotateZ(10deg)";
        document.querySelector("#Dinner-card").style.marginLeft = "40%";
        document.querySelector("#Dinner-card").style.transform = "rotateZ(20deg)";

    }




});
