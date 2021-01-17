const checkNumInputs = (selector) => {
    
    
        const elems = document.querySelectorAll(selector)
    elems.forEach(item => {
        item.addEventListener("input",() => {
            item.value =item.value.replace(/\D/,"") // Якщо в полі для вводу номеру є літери то заміняєм іх на пустий рядок
        })
    }) 
}

export default checkNumInputs