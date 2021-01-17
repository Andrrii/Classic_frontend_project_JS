import checkNumInputs from "./checkNumInputs"

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
          windowWidth = document.querySelectorAll('#width'),
          windowHeight = document.querySelectorAll('#height'),
          windowType = document.querySelectorAll('#view_type'),
          windowProfile = document.querySelectorAll('.checkbox');

          
    checkNumInputs('#width')
    checkNumInputs('#height')
    
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
                            state[prop] = item.value // Дивитись урок 007

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