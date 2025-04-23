import { fetchResourcesTopic } from "../modules/api.js"
import { currentYear } from "../modules/dom.js"
import { createElement } from "../modules/utils.js"

const companyName = 'Katie Bellamy LLC'

const footer = async () => {
    const footer = document.querySelector('footer')
    footer.className = 'europa'
    const footerContent = createElement('div', {class: 'footer-content'})
    footer.appendChild(footerContent)

    const div = document.createElement('div')
    footerContent.appendChild(div)

    const h3 = createElement('h3', {class: 'adonis-web'}, companyName)
    div.appendChild(h3)

    const socialMedia = createElement('div', {class: 'social-media'})
    const email = createElement('a', {href: 'mailto:katie@katie-bellamy.com', target: '_blank'})
    const emailIcon = createElement('img', {src: '/public/icons/email_icon.png', alt: 'Email Icon'})
    email.appendChild(emailIcon)
    const facebook = createElement('a', {href: 'https://www.facebook.com/katiebellamytherapy', target: '_blank'})
    const facebookIcon = createElement('img', {src: '/public/icons/facebook_icon.png', alt: 'Facebook Icon'})
    facebook.appendChild(facebookIcon)
    const instagram = createElement('a', {href: 'https://www.instagram.com/katiebellamytherapy/#', target: '_blank'})
    const instagramIcon = createElement('img', {src: '/public/icons/ig_icon.png', alt: 'Instagram Icon'})
    instagram.appendChild(instagramIcon)
    socialMedia.appendChild(email)
    socialMedia.appendChild(facebook)
    socialMedia.appendChild(instagram)
    div.appendChild(socialMedia)

    // Main div for the links
    const divLinks = createElement('div', {class: 'divLinks'})

    // Creating Quick Links Div
    const quickLinks = createElement('div', {class: 'quick-links'})
    const quickLinkP = createElement('p', {}, 'Quick Links')
    quickLinks.appendChild(quickLinkP)
    const quickLinkDiv = createElement('div', {class: 'LinkDiv'})
    quickLinks.appendChild(quickLinkDiv)

    const linkAboutUs = createElement('a', {href: '/src/pages/aboutUs.html'}, 'About Us')
    quickLinkDiv.appendChild(linkAboutUs)
    const linkSubmit = createElement('a', {href: '/src/pages/submit.html'}, 'Submit a Resource')
    quickLinkDiv.appendChild(linkSubmit)
    const linkContactUs = createElement('a', {href: '/src/pages/contactUs.html'}, 'Contact Us')
    quickLinkDiv.appendChild(linkContactUs)

    divLinks.appendChild(quickLinks)

    // Creating Topics Links Div
    const topicsLinks = createElement('div', {class: 'quick-links'})
    const topicP = createElement('p', {}, 'Topics')
    topicsLinks.appendChild(topicP)
    const topicDiv = createElement('div', {class: 'LinkDiv'})
    topicsLinks.appendChild(topicDiv)
    try {
        const myData = await fetchResourcesTopic()
        myData
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((data) => {
                const linkTopics = createElement('a', {href: data.learnMore}, data.title)
                topicDiv.appendChild(linkTopics)
            })

    } catch (error) {
        console.error("Error in NavBar component:", error.message)
    }

    divLinks.appendChild(topicsLinks)

    footerContent.appendChild(divLinks)

    const p = createElement('p', {id: 'textFooter'})
    const span = createElement('span', {id: 'current-year'})
    p.innerHTML = `&copy; `;
    p.appendChild(span); // Append the span element
    p.innerHTML += `, ${companyName}, All rights reserved.`;

    footer.appendChild(p)

    const leoCrixi = createElement('p', {id: 'dev'})
    const devLink = createElement('a', {href: 'https://leandro-crixi.netlify.app/'}, 'Leo Crixi')
    leoCrixi.innerHTML = '<br> Website design and managed by '
    leoCrixi.appendChild(devLink)
    footer.appendChild(leoCrixi)

    currentYear()
}


export { footer }