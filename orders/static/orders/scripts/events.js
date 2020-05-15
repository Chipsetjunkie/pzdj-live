document.addEventListener("DOMContentLoaded",() => {
      console.log("loaded js!!")
      var reg_top_cnt = 0;
      var reg_spc_cnt = 0;
      var reg_base_cnt = 0;
      var reg_top_disable = 0;
      var reg_sp_disable = 0;
      var reg_base_disable = 0;

      var sci_top_cnt = 0;
      var sci_spc_cnt = 0;
      var sci_base_cnt = 0;
      var sci_top_disable = 0;
      var sci_sp_disable = 0;
      var sci_base_disable = 0;
      var classitems = [".sizespan",".specialspan",".basespan",".sci-sizespan",".sci-specialspan",".sci-basespan"]


      // Initial disable of size checkboxes
      for(i=0; i<classitems.length; i++){
        document.querySelectorAll(classitems[i]).forEach(i => {
            document.querySelector("#"+i.id).style.visibility="hidden";
        });
      }



      // initial Base-sizes radio enable

      document.querySelectorAll("#sci-base-item").forEach(i => {
        if (i.checked == true){
          reveal(i.value,".sci-basespan","data-base")
        }
      });
      // Regular Contents
      document.querySelectorAll("#items").forEach(i => {
          i.onclick = () => {
            if (i.checked == true){
              reg_top_cnt +=1;
              reveal(i.value,".sizespan","data-value")
              if (reg_top_cnt == 3){
                reg_top_disable = 1
                disable("#items")
              }
            }
            else{
              reg_top_cnt -=1;
              hide(i.value,".sizespan","data-value")
              if (reg_top_disable ==1 && reg_top_cnt < 3){
                enable("#items")
                reg_top_disable=0
              }
            }
          }
        });

        document.querySelectorAll("#special-items").forEach(i => {
            i.onclick = () => {
              if (i.checked == true){
                reg_spc_cnt +=1;
                reveal(i.value,".specialspan","data-special")
                if (reg_spc_cnt == 1){
                  disable("#special-items")
                  reg_sp_disable = 1
                }
              }
              else{
                reg_spc_cnt -=1;
                hide(i.value,".specialspan","data-special")
                if (reg_sp_disable ==1 && reg_spc_cnt < 1){
                  enable("#special-items")
                  reg_sp_disable = 0
                }
              }
            }
          });

        document.querySelectorAll("#base-item").forEach(i => {
              if (i.checked == true){
                reveal(i.value,".basespan","data-base")
              }
              else{
                hide(i.value,".basespan","data-base")
              }
            });

        // Sicillian Contents

        document.querySelectorAll("#sci-items").forEach(i => {
            i.onclick = () => {
              if (i.checked == true){
                sci_top_cnt +=1;
                reveal(i.value,".sci-sizespan","data-value")
                if (sci_top_cnt == 3){
                  sci_top_disable = 1
                  disable("#sci-items")
                }
              }
              else{
                sci_top_cnt -=1;
                hide(i.value,".sci-sizespan","data-value")
                if (sci_top_disable ==1 && sci_top_cnt < 3){
                  enable("#sci-items")
                  sci_top_disable=0
                }
              }
            }
          });

          document.querySelectorAll("#sci-special-items").forEach(i => {
              i.onclick = () => {
                if (i.checked == true){
                  sci_spc_cnt +=1;
                  reveal(i.value,".sci-specialspan","data-special")
                  if (sci_spc_cnt == 1){
                    disable("#sci-special-items")
                    sci_sp_disable = 1
                  }
                }
                else{
                  sci_spc_cnt -=1;
                  hide(i.value,".sci-specialspan","data-special")
                  if (sci_sp_disable ==1 && sci_spc_cnt < 1){
                    enable("#sci-special-items")
                    sci_sp_disable = 0
                  }
                }
              }
            });


          document.querySelectorAll("#sci-base-item").forEach(i => {
                i.onclick = () => {
                  document.querySelectorAll("#sci-base-item").forEach(i => {
                    if (i.checked == true){
                      reveal(i.value,".sci-basespan","data-base")
                    }
                    else{
                      hide(i.value,".sci-basespan","data-base")
                    }
                  });
                }
              });


        //************************  Helper functions ********************
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
