const tabs = (headerSelector,tabSelector,contentSelector,activeClass,display = "block") => {
    const header = document.querySelector(headerSelector),
          tabs = document.querySelectorAll(tabSelector),
          contents = document.querySelectorAll(contentSelector);

        function hideTabContent() {
            contents.forEach(item =>{
                item.style.display = 'none'
                
            })

            tabs.forEach(item => {
                item.classList.remove(activeClass)
            })
        }

    function showTabContent(i = 0) {
            contents[i].style.display = display
            tabs[i].classList.add(activeClass)
      }
    hideTabContent()
    showTabContent()


    header.addEventListener('click',(e) => {
       const target = e.target
       /* Перевіряєм чи юзер точно клікнув в |tab| */
       if ( target && 
           (target.classList.contains(tabSelector.replace(/\./,'')) ||               target.parentNode.classList.contains(tabSelector.replace(/\./,''))))
       {
        tabs.forEach((item,i) => {
            if(target === item || target.parentNode === item){
                hideTabContent()
                showTabContent(i)
            }
        })
       }
    })
}

export default tabs