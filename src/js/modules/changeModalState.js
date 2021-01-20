import checkNumInputs from "./checkNumInputs"
function postStaticToElems(state,btnCalcValidate,elem,prop,i=0) {
    
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
                elem[0].value = ""
                elem[0].value = ""
                btnCalcValidate.setAttribute("disabled", "true");
                state[prop] = "" // Дивитись урок 007
                    }
            break
        case "SELECT" :
            state[prop] = elem[0].value // Дивитись урок 007
            break
    }
    console.log(state)

    return

}
const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
          windowWidth = document.querySelectorAll('#width'),
          windowHeight = document.querySelectorAll('#height'),
          windowType = document.querySelectorAll('#view_type'),
          btnCalcValidate = document.querySelector(".popup_calc_button"),
          windowProfile = document.querySelectorAll('.checkbox');

    const trigger = document.querySelectorAll(".popup_calc_btn")
    trigger.forEach(item => {
        item.addEventListener("click" , (event) => {
            
            postStaticToElems(state,btnCalcValidate,windowForm,'form')
            postStaticToElems(state,btnCalcValidate,windowHeight,'height')
            postStaticToElems(state,btnCalcValidate,windowWidth,'width')
            postStaticToElems(state,btnCalcValidate,windowType,'type')
            postStaticToElems(state,btnCalcValidate,windowProfile,'profile')
            let div = document.createElement('div')
        div.classList.add('testing')
        div.style.display = "block" 
        div.innerHTML = "Не введені всі значення"
        div.style.marginTop = "10px"
        div.style.marginBottom = "15px"
        div.style.color = "red"
        btnCalcValidate.before(div)
        }) })
    
        
    
    

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
                            checkNumInputs('#width')
                            checkNumInputs('#height')
                            let div = document.querySelector('.testing')
                            state[prop] = item.value
                            if (state[prop]  == "" || item.value == null){
                                
                                if(!div){
                                    div = document.createElement('div')
                                        div.classList.add('testing')
                                        div.style.display = "block" 
                                        div.innerHTML = "Не введені всі значення"
                                        div.style.marginTop = "10px"
                                        div.style.marginBottom = "15px"
                                        div.style.color = "red"
                                        btnCalcValidate.before(div)
                                    }
                                btnCalcValidate.before(div)
                                btnCalcValidate.setAttribute("disabled", "true");
                                }
                            else if (state['height'] != "" && state['width'] != ""){
                                try{
                                btnCalcValidate.removeAttribute("disabled");
                                div.remove() }
                                catch(e) {}
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

    
    bindActionToElems('click',windowForm,'form')
    bindActionToElems('input',windowHeight,'height')
    bindActionToElems('input',windowWidth,'width')
    bindActionToElems('change',windowType,'type')
    bindActionToElems('change',windowProfile,'profile')



}

export default changeModalState;
export {postStaticToElems}