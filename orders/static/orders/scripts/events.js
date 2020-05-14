document.addEventListener("DOMContentLoaded",() => {
      console.log("loaded js!!")
      var top_cnt = 0;
      var spc_cnt = 0;
      var base_cnt = 0;
      var top_disable = 0;
      var sp_disable = 0;
      var base_disable = 0;
      var classitems = [".sizespan",".specialspan",".basespan"]

      for(i=0; i<classitems.length; i++){
        document.querySelectorAll(classitems[i]).forEach(i => {
            document.querySelector("#"+i.id).style.visibility="hidden";
        });

      }


      document.querySelectorAll("#items").forEach(i => {
          i.onclick = () => {
            if (i.checked == true){
              top_cnt +=1;
              reveal(i.value,".sizespan","data-value")
              if (top_cnt == 3){
                top_disable = 1
                disable("#items")
              }
            }
            else{
              top_cnt -=1;
              hide(i.value,".sizespan","data-value")
              if (top_disable ==1 && top_cnt < 3){
                enable("#items")
                top_disable=0
              }
            }
          }
        });

        document.querySelectorAll("#special-items").forEach(i => {
            i.onclick = () => {
              if (i.checked == true){
                spc_cnt +=1;
                reveal(i.value,".specialspan","data-special")
                if (spc_cnt == 1){
                  disable("#special-items")
                  sp_disable = 1
                }
              }
              else{
                spc_cnt -=1;
                hide(i.value,".specialspan","data-special")
                if (sp_disable ==1 && spc_cnt < 1){
                  enable("#special-items")
                  sp_disable = 0
                }
              }
            }
          });

        document.querySelectorAll("#base-item").forEach(i => {
              if (i.checked == true){
                reveal(i.value,".basespan","data-base")
              }
              else{
                hidden(i.value,".basespan","data-base")
              }
            });


        function reveal(e,selector,data){

          document.querySelectorAll(selector).forEach(j => {
                    if (document.querySelector("#"+j.id).getAttribute(data) == e){
                        document.querySelector("#"+j.id).style.visibility="visible";
          }
        });
        }

        //.sizespan, .specialspan attr,data-value,data-special
        function hide(e,selector,data){

          document.querySelectorAll(selector).forEach(j => {
                  if (document.querySelector("#"+j.id).getAttribute(data) == e){
                      document.querySelector("#"+j.id).style.visibility="hidden";
                    }
                  });
        }

        function disable(tag){
            const actions = document.querySelectorAll(tag); //test
            for(i=0; i<actions.length; i++){
                if (actions[i].checked == false){
                    actions[i].disabled = true;
                }
            }


        }

        //tag = #items,#special-items
        function enable(tag){
            const actions = document.querySelectorAll(tag);
            for(i=0; i<actions.length; i++){
                if (actions[i].disabled == true){
                    actions[i].disabled = false;
                }
            }

        }


});
