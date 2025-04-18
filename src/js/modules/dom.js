import { formatingPathName } from "./utils.js";

const path = document.location.pathname; // Get "/src/pages/disability_justice.html"

// Dynamically adding the Favicon
const favicon = () => {
    const link = document.createElement('link'); // Create a <link> element
    link.rel = 'shortcut icon'; // Set the rel attribute
    link.href = '../../../public/icons/Favicon.png'; // Set the href attribute to the path of your favicon
    link.type = 'image/x-icon'; // Set the type attribute

    document.head.appendChild(link);
}

const settingBackground = (element) => {
    if (window.matchMedia("(max-width: 420px)").matches) {
        element.style.background = 'none'
        element.style.backgroundColor = '#DCD9D0'
    }
}

/* Update the year at the footer dynamically */
const currentYear = () => {
    return document.getElementById('current-year').textContent = new Date().getFullYear();
}

// Setting the main Title
const mainTitle = () => {
    if (path === "/") {
        return "Bellamy & Associates"
    }
}

const formattedTitle = () => {
    if (path.includes('/src/pages/about')) {
        return 'About Us'
    } else if (path.includes('/src/pages/submit')) {
        return 'Submit a Resource'
    } else if (path.includes('/src/pages/contact')) {
        return 'Contact Us'
    } else if (!path.includes("/src/pages/topics/")) {
        return "<br><br><span>Community Resources Hub</span>";
    }

    return formatingPathName()
} 

export { currentYear, favicon, mainTitle, formattedTitle, settingBackground }