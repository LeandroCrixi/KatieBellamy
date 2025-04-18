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

// Handle form submission
const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const confirmationMessage = document.getElementById('confirmation-message');

    const formData = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
            Accept: "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                confirmationMessage.style.display = 'block';
                form.reset();
                window.scrollTo(0, document.body.scrollHeight);
            } else {
                alert("There was a problem submitting your form. Please try again later.");
            }
        })
        .catch(error => {
            console.error("Form submission error:", error);
            alert("Something went wrong!");
        });
}

window.handleSubmit = handleSubmit;

export { toggleMenu, addShowClass, removeShowClass, handleSubmit }