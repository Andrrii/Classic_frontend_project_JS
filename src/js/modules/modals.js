

// При натисненні на кнопку " Вызвать замерщика " відкривається мод. вікно

const modals = () => {
    function openModal(selector) {
        const modal = document.querySelector(selector)
        modal.style.display = "block"
        document.body.style.overflow = "hidden"
        // use bootstrap class
        //document.body.classList.add('modal-open')
        clearTimeout(timeout)
        window.removeEventListener('scroll',showModalByScroll)
    }
    function bindModal(triggerSelector,modalSelector,closeSelector) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector);
        
        trigger.forEach(item => {
            item.addEventListener("click" , (event) => {
                if (event.target) {
                    event.preventDefault() //  
                }
                openModal(modalSelector)
            })
        });
        close.addEventListener('click', () => {
            modal.style.display = "none"
            document.body.style.overflow = ""
            // use bootstrap class
            //document.body.classList.remove('modal-open')

        })


        modal.addEventListener('click' , (e) => {
            if( e.target === modal ) /* Якщо клікаєм за межі св=амого модального вікна */ {
                modal.style.display = "none"
                document.body.style.overflow = ""
            // use bootstrap class
            //document.body.classList.remove('modal-open')

            }
        })
    }

    
    const showModalByScroll = function  () {
        /* Коли користувач долистав до кінця сторінки ,
            то відкриється модальне вікно */ 
            if (  /* подивитись урок 42 */
                window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) 
            {
            const bottomModalTimerId = setTimeout( () => openModal('.popup_engineer'),2500)
                //    console.log(bottomModalTimerId)
                //    clearInterval(bottomModalTimerId)
            }
        }


    bindModal('.popup_engineer_btn','.popup_engineer',".popup_engineer .popup_close")
    bindModal('.phone_link','.popup',".popup .popup_close")
    const timeout = setTimeout(() => {
        openModal('.popup_engineer')
    }, 60000);
    
    
    window.addEventListener('scroll', showModalByScroll)
}

export default modals