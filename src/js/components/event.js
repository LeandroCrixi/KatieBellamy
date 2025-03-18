const toggleMenu = () => {
    const menu = document.querySelector(".navBar");
    menu.classList.toggle("active");

    const burger = document.querySelector('.burger')
    burger.classList.toggle('change')
}

export { toggleMenu }