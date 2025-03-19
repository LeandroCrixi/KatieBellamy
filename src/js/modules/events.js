const toggleMenu = () => {
    const menu = document.querySelector(".navBar");
    menu.classList.toggle("active");

    const burger = document.querySelector('.burger')
    burger.classList.toggle('change')
}

    const dropdownBtn = document.querySelector(".dropdown-btn");
    const dropdownContent = document.querySelector(".dropdown-content");

    const togleDropdownMenu = ()=>{
        dropdownBtn.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent the default anchor behavior
            dropdownContent.classList.toggle("show");
        });
    
        // Close dropdown when clicking outside
        window.addEventListener("click", function(event) {
            if (!dropdownBtn.contains(event.target) && !dropdownContent.contains(event.target)) {
                dropdownContent.classList.remove("show");
            }
        });
    }


export { toggleMenu, togleDropdownMenu }