import { formatingPathName } from "./utils.js";
import { createElement } from "./utils.js";

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
        // element.style.backgroundColor = '#DCD9D0'
        element.style.backgroundColor = '#F8F4EC'
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
        return "<br><span>Community Resources Hub</span>";
    }

    return formatingPathName()
}

const pageBreak = () => {
    const pageBreak = createElement('div', { class: 'page-break abhaya' });
    const pbH2 = createElement('h2', {class: 'text-color-2'}, 'Stay in touch!')
    const phP = createElement('p', {class: 'text-color-4'}, 'Join our newsletter to receive news and updates.')
    pageBreak.appendChild(pbH2)
    pageBreak.appendChild(phP)

    // Create the form element
    const form = createElement('form', { class: 'signup-form' })
    // Submit Button
    const submit = createElement('a',
        {
            class: 'button section-button',
            type: 'submit',
            href: 'http://eepurl.com/dK8pQQ',
            target: '_blank'
        },
        "I'M IN!");
    form.appendChild(submit);

    const shareP = createElement('p', {class: 'text-color-4'}, 'I’ll never share your information.')
    // Append the form to your desired container
    pageBreak.appendChild(form);
    pageBreak.appendChild(shareP)

    return pageBreak
}

export { currentYear, favicon, mainTitle, formattedTitle, settingBackground, pageBreak }