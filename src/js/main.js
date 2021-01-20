import "./slider"
import modals from "./modules/modals"
import tabs from "./modules/tabs"
import forms from "./modules/forms"
import changeModalState from './modules/changeModalState'
import timer from "./modules/timer"
import images from "./modules/images"

window.addEventListener('DOMContentLoaded', () => {
"use strict"
   
    let deadline = "2021-03-25"
    let modalState = {
        
    } /* в калькулятора є 3 форми */
    changeModalState(modalState)


    modals()

    tabs('.glazing_slider', '.glazing_block', '.glazing_content' , 'glazing-a-active')
    tabs('.decoration_slider', '.no_click' , '.decoration_content > div > div', 'after_click')
    tabs(".balcon_icons",'.balcon_icons_img',".big_img > img", "do_image_more","inline-block")
    forms(modalState)
    images()

    timer('.container1',deadline)

})
