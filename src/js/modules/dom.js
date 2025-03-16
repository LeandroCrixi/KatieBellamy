/* Update the year at the footer dynamically */
const currentYear = () => {
    return document.getElementById('current-year').textContent = new Date().getFullYear();
}

export { currentYear }