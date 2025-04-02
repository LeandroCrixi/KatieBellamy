// Dynamically adding the Favicon
const favicon = () => {
    const link = document.createElement('link'); // Create a <link> element
    link.rel = 'shortcut icon'; // Set the rel attribute
    link.href = '../../../public/icons/Favicon.png'; // Set the href attribute to the path of your favicon
    link.type = 'image/x-icon'; // Set the type attribute

    document.head.appendChild(link);
}

/* Update the year at the footer dynamically */
const currentYear = () => {
    return document.getElementById('current-year').textContent = new Date().getFullYear();
}

export { currentYear, favicon }