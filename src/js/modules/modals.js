
// При натисненні на кнопку " Вызвать замерщика " відкривається мод. вікно
function openModal(selector,scroll) {
    const modal = document.querySelector(selector)
    modal.style.display = "block"
    document.body.style.overflow = "hidden"
    document.body.style.marginRight = `${scroll}px`
    // use bootstrap class
    //document.body.classList.add('modal-open')
    clearTimeout(timeout)
    window.removeEventListener('scroll',showModalByScroll)
}
const modals = (state) => {
    
    function bindModal(triggerSelector,modalSelector,closeSelector,closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll();
        
        
        trigger.forEach(item => {
            item.addEventListener("click" , (event) => {
                if (event.target) {
                    event.preventDefault() //  
                    
                        
                }
                windows.forEach(window => {
                    window.style.display = 'none'
                })
                
                openModal(modalSelector,scroll)
            })
        });
        close.addEventListener('click', () => {
            windows.forEach(window => {
                window.style.display = 'none'
            })
            modal.style.display = "none"
            document.body.style.overflow = ""
            document.body.style.marginRight = `0px`
            // use bootstrap class
            //document.body.classList.remove('modal-open')

        })


        modal.addEventListener('click' , (e) => {
            if( e.target === modal && closeClickOverlay) /* Якщо клікаєм за межі самого модального вікна */ {
                windows.forEach(window => {
                    window.style.display = 'none'
                })
                modal.style.display = "none"
                document.body.style.overflow = ""
                document.body.style.marginRight = `0px`
            // use bootstrap class
            //document.body.classList.remove('modal-open')

            }
        })
    }

    function calcScroll(){ /* Коли викликаєм модальне вікно то скрол заміняється на пустий блок  */
        let div = document.createElement('div')

        div.style.width = "50px"
        div.style.height = "50px"
        div.style.overflowY = "scroll"
        div.style.visibility = "hidden"

        document.body.appendChild(div)

        let scrollWidth = div.offsetWidth-div.clientWidth; // -- Отримуєм ширину прокрутки 
        
        div.remove()
        return scrollWidth;

    }


    bindModal('.popup_engineer_btn','.popup_engineer',".popup_engineer .popup_close")
    bindModal('.phone_link','.popup',".popup .popup_close")
    
    
    
    window.addEventListener('scroll', showModalByScroll)

    bindModal(".popup_calc_btn",".popup_calc",".popup_calc_close") // calculator
    bindModal('.popup_calc_button','.popup_calc_profile','.popup_calc_profile_close',false) //next modal after calc
    bindModal('.popup_calc_profile_button','.popup_calc_end','.popup_calc_end_close',false) //next modal after |next modal after calcalc|

}
const showModalByScroll = function  () {
    /* Коли користувач долистав до кінця сторінки ,
        то відкриється модальне вікно */ 
        if (  /* подивитись урок 42 */
            window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) 
        {
        const bottomModalTimerId = setTimeout( () => openModal('.popup_engineer',scroll),2500)
            //    console.log(bottomModalTimerId)
            //    clearInterval(bottomModalTimerId)
        }
    }
const timeout = setTimeout(() => {
    openModal('.popup_engineer',scroll)
}, 60000);
export default modals
export {timeout,showModalByScroll}