import checkNumInputs from "./checkNumInputs"

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
          windowWidth = document.querySelectorAll('#width'),
          windowHeight = document.querySelectorAll('#height'),
          windowType = document.querySelectorAll('#view_type'),
          btnCalcValidate = document.querySelector(".popup_calc_button"),
          windowProfile = document.querySelectorAll('.checkbox');

          
    
    checkNumInputs('#width')
    checkNumInputs('#height')
    
    function postStaticToElems(elem,prop,i=0) {
                switch(elem[0].nodeName) { // Оскільки багато різних типів форми то юзаєм switch
                    case "SPAN":
                        state[prop] = i // Дивитись урок 007
                        break
                    case "INPUT" :
                        if(elem[0].getAttribute('type') === 'checkbox'){
                            i===0 ? state[prop] = "Cold" : state[prop] = "Warm"
                            elem.forEach((box,j) => { /* User може вибрати тільки один radiobutton */
                                box.checked = false
                                if (+i==+j){
                                    box.checked = true
                                }
                            })
                            
                        }else{
                            btnCalcValidate.setAttribute("disabled", "true");
                            state[prop] = "" // Дивитись урок 007

                        }
                        break
                    case "SELECT" :
                        state[prop] = elem[0].value // Дивитись урок 007
                        break
                }
                console.log(state)
            
        
    }

    function bindActionToElems(event,elem,prop) {
        elem.forEach((item,i) => {
            item.addEventListener(event, () => {
                switch(item.nodeName) { // Оскільки багато різних типів форми то юзаєм switch
                    case "SPAN":
                        state[prop] = i // Дивитись урок 007
                        break
                    case "INPUT" :
                        if(item.getAttribute('type') === 'checkbox'){
                            i===0 ? state[prop] = "Cold" : state[prop] = "Warm"
                            elem.forEach((box,j) => { /* User може вибрати тільки один radiobutton */
                                box.checked = false
                                if (+i==+j){
                                    box.checked = true
                                }
                            })
                            
                        }else{
                            state[prop] = item.value
                            if (state[prop]  == "" || item.value == null){
                                btnCalcValidate.setAttribute("disabled", "true");
                                }
                            else if (state['height'] && state['width']){
                                btnCalcValidate.removeAttribute("disabled");
                            }
                        }
                        break
                    case "SELECT" :
                        state[prop] = item.value // Дивитись урок 007
                        break
                }
                console.log(state)
            })
        })
    }

    postStaticToElems(windowForm,'form')
    postStaticToElems(windowHeight,'height')
    postStaticToElems(windowWidth,'width')
    postStaticToElems(windowType,'type')
    postStaticToElems(windowProfile,'profile')
    bindActionToElems('click',windowForm,'form')
    bindActionToElems('input',windowHeight,'height')
    bindActionToElems('input',windowWidth,'width')
    bindActionToElems('change',windowType,'type')
    bindActionToElems('change',windowProfile,'profile')



}

export default changeModalState;