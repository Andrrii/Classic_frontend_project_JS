import {timeout,showModalByScroll} from "./modals"
import checkNumInputs from "./checkNumInputs"
import postStaticToElems from "./changeModalState"

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          phoneInputs = document.querySelectorAll("input[name='user_phone']"),
          windows = document.querySelectorAll('[data-modal]'),
          message ={
            loading : "assets/img/forms/spinner.svg",
            success: "Дякуємо ! Найбижчим часом  ми   зателефонуємо вам",
            fail:"Ой! Щось не так :( "
        };
    const windowForm = document.querySelectorAll('.balcon_icons_img'),
    
    btnCalcValidate = document.querySelector(".popup_calc_button");
    
    
    checkNumInputs("input[name='user_phone']")

    const postData = async (url,data) => {
        const load =  document.querySelector('.status')
        const loadMessage = document.createElement('img')
        loadMessage.src=message.loading
        loadMessage.style.cssText =`
            display: block;
            margin: 0 auto;
        `
        load.appendChild(loadMessage)
        let res = await fetch(url,{
            method: "POST",
            body: data
        });   

        return await res.text()
    }

    const clearInput = () => {
        inputs.forEach(input => {
            input.value = ""
        })
    }
    
    form.forEach(item => {
        item.addEventListener('submit',(event) => {
            event.preventDefault()

            let statusMessage = document.createElement('div')
            statusMessage.classList.add('status')
            item.appendChild(statusMessage) 
            const formData = new FormData(item)
            if (item.getAttribute('data-calc') === 'end') { /* Якщо форма-калькулятор то добавляєм ще дані */
                for(let key in state) {
                    formData.append(key,state[key])
                }
                        }

            postData('assets/server.php',formData)
            .then(res =>{
                console.log(res)
                statusMessage.textContent = message.success
                clearTimeout(timeout)
                window.removeEventListener('scroll',showModalByScroll)
            }).catch((e) =>{
                console.log(e)
                statusMessage.textContent = message.fail
            }).finally(() => {
                clearInput()
                setTimeout(() => {
                    statusMessage.remove()
                } ,2000)
                    
                if (item.getAttribute('data-calc') === 'end') {
                    setTimeout(() => {   
                    windows.forEach(window => {
                        window.style.display = 'none'
                    })
                    document.body.style.overflow = ""
                    document.body.style.marginRight = `0px` },3500)
                  
                  for (const prop of Object.getOwnPropertyNames(state)) {
                    delete state[prop];
                  }
                  //postStaticToElems(state,btnCalcValidate,windowForm,'form')

                } 
                    
                        
                
            })        
            
        })
    })

    
    
}

export default forms;