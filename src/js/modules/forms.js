import {timeout,showModalByScroll} from "./modals"

const forms = () => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          phoneInputs = document.querySelectorAll("input[name='user_phone']"),
          message ={
            loading : "assets/img/forms/spinner.svg",
            success: "Дякуємо ! Найбижчим часом  ми   зателефонуємо вам",
            fail:"Ой! Щось не так :( "
        };
    
    phoneInputs.forEach(phone => {
        phone.addEventListener("input",() => {
            phone.value =phone.value.replace(/\D/,"") // Якщо в полі для вводу номеру є літери то заміняєм іх на пустий рядок
        })
    })
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
                    
                    statusMessage.remove()} ,2000)
                })

        })
    })

    
    
}

export default forms;