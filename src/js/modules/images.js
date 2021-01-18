const images = () => { // Збільшуєм зображення при кліку на них

    const imgPopup = document.createElement('div'),
          workSection = document.querySelector('.works'),
          bigImage = document.createElement('img');

    imgPopup.classList.add('popup')
    workSection.appendChild(imgPopup)

    bigImage.style.width = "600px"
    bigImage.style.height = "600px"
    imgPopup.style.justifyContent = 'center' // {   Вирівнюєм
    imgPopup.style.alignItems = 'center'      //              строго по центру  }
    
    imgPopup.style.display = 'none'

    imgPopup.appendChild(bigImage)

    workSection.addEventListener('click' , (event) => {
        event.preventDefault()
        let target = event.target
        

        if (target && target.classList.contains('preview')) {
            imgPopup.style.display = 'flex'
            const path = target.parentNode.getAttribute('href')
            bigImage.setAttribute('src',path)
            
        }

        if (target && target.matches('div.popup')) // Click за межі картинки
            {
                imgPopup.style.display = 'none'

            }
    })

}
export default images