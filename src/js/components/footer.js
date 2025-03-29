import { fetchResourcesTopic } from "../modules/api.js"
import { currentYear } from "../modules/dom.js"

const companyName = 'Katie Bellamy LLC'

const footer = async () => {
    const footer = document.querySelector('footer')
    const footerContent = document.createElement('div')
    footerContent.className = 'footer-content'
    footer.appendChild(footerContent)

    const div = document.createElement('div')
    footerContent.appendChild(div)

    const h3 = document.createElement('h3')
    h3.textContent = companyName
    div.appendChild(h3)

    const socialMedia = document.createElement('div')
    socialMedia.className = 'social-media'
    const email = document.createElement('a')
    const emailIcon = document.createElement('img')
    emailIcon.setAttribute('src', '/public/icons/email_icon.png')
    emailIcon.setAttribute('alt', 'Email Icon')
    email.appendChild(emailIcon)
    email.setAttribute('href', 'mailto:katie@katie-bellamy.com')
    email.setAttribute('target', '_blank')
    const facebook = document.createElement('a')
    const facebookIcon = document.createElement('img')
    facebookIcon.setAttribute('src', '/public/icons/facebook_icon.png')
    facebookIcon.setAttribute('alt', 'Facebook Icon')
    facebook.appendChild(facebookIcon)
    facebook.setAttribute('href', 'https://www.facebook.com/katiebellamytherapy')
    facebook.setAttribute('target', '_blank')
    const instagram = document.createElement('a')
    const instagramIcon = document.createElement('img')
    instagramIcon.setAttribute('src', '/public/icons/ig_icon.png')
    instagramIcon.setAttribute('alt', 'Instagram Icon')
    instagram.appendChild(instagramIcon)
    instagram.setAttribute('href', 'https://www.instagram.com/katiebellamytherapy/#')
    instagram.setAttribute('target', '_blank')
    socialMedia.appendChild(email)
    socialMedia.appendChild(facebook)
    socialMedia.appendChild(instagram)
    div.appendChild(socialMedia)

    // Main div for the links
    const divLinks = document.createElement('div')
    divLinks.className = 'divLinks'

    // Creating Quick Links Div
    const quickLinks = document.createElement('div')
    quickLinks.className = 'quick-links'
    const quickLinkP = document.createElement('p')
    quickLinkP.textContent = 'Quick Links'
    quickLinks.appendChild(quickLinkP)
    const quickLinkDiv = document.createElement('div')
    quickLinkDiv.className = 'LinkDiv'
    quickLinks.appendChild(quickLinkDiv)

    const linkAboutUs = document.createElement('a')
    linkAboutUs.textContent = 'About Us'
    linkAboutUs.setAttribute('href', '/src/pages/aboutUs.html')
    quickLinkDiv.appendChild(linkAboutUs)
    const linkSubmit = document.createElement('a')
    linkSubmit.textContent = 'Submit a Resource'
    linkSubmit.setAttribute('href', '/src/pages/submit.html')
    quickLinkDiv.appendChild(linkSubmit)
    const linkContactUs = document.createElement('a')
    linkContactUs.textContent = 'Contact Us'
    linkContactUs.setAttribute('href', '/src/pages/contactUs.html')
    quickLinkDiv.appendChild(linkContactUs)

    divLinks.appendChild(quickLinks)

    // Creating Topics Links Div
    const topicsLinks = document.createElement('div')
    topicsLinks.className = 'quick-links'
    const topicP = document.createElement('p')
    topicP.textContent = 'Topics'
    topicsLinks.appendChild(topicP)
    const topicDiv = document.createElement('div')
    topicDiv.className = 'LinkDiv'
    topicsLinks.appendChild(topicDiv)
    try {
        const myData = await fetchResourcesTopic()
        myData
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((data) => {
                const linkTopics = document.createElement('a')
                linkTopics.textContent = data.title
                linkTopics.setAttribute('href', data.learnMore)
                topicDiv.appendChild(linkTopics)
            })

    } catch (error) {
        console.error("Error in NavBar component:", error.message)
    }

    divLinks.appendChild(topicsLinks)

    footerContent.appendChild(divLinks)

    const p = document.createElement('p')
    p.id = 'textFooter'
    const span = document.createElement('span')
    span.id = 'current-year'
    p.innerHTML = `&copy; `;
    p.appendChild(span); // Append the span element
    p.innerHTML += `, ${companyName}, All rights reserved.`;
    footer.appendChild(p)

    currentYear()
}


export { footer }