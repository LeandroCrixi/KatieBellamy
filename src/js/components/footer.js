const companyName = 'Katie Bellamy LLC'

const footer = () => {
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
    email.setAttribute('href', 'mailto:katie@katie-bellamy.com')
    email.setAttribute('target', '_blank')
    email.textContent = 'Email '
    const facebook = document.createElement('a')
    facebook.setAttribute('href', 'https://www.facebook.com/katiebellamytherapy')
    facebook.setAttribute('target', '_blank')
    facebook.textContent = 'Facebook '
    const instagram = document.createElement('a')
    instagram.setAttribute('href', 'https://www.instagram.com/katiebellamytherapy/#')
    instagram.setAttribute('target', '_blank')
    instagram.textContent = 'Instagram '
    socialMedia.appendChild(email)
    socialMedia.appendChild(facebook)
    socialMedia.appendChild(instagram)
    div.appendChild(socialMedia)

    const divLinks = document.createElement('div')
    footerContent.appendChild(divLinks)

    const p = document.createElement('p')
    const span = document.createElement('span')
    span.id = 'current-year'
    p.innerHTML = `&copy; `;
    p.appendChild(span); // Append the span element
    p.innerHTML += `, ${companyName}, All rights reserved.`;
    footer.appendChild(p)
}

export { footer }