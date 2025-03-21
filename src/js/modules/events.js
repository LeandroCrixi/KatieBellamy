const toggleMenu = () => {
    const menu = document.querySelector(".navBar");
    menu.classList.toggle("active");

    const burger = document.querySelector('.burger')
    burger.classList.toggle('change')
}


const addShowClass = () => {
    const dropdownContent = document.querySelector(".dropdown-content");
    dropdownContent.classList.add("show");
}

const removeShowClass = (event) => {
    const dropdownContent = document.querySelector(".dropdown-content");

    if (!event.relatedTarget || (!dropdownContent.contains(event.relatedTarget) && event.relatedTarget.className !== 'dropdown-btn')) {
        dropdownContent.classList.remove("show");
    }
}

export { toggleMenu, addShowClass, removeShowClass }