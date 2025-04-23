import { fetchResourceMedia } from "../modules/api.js"
import { sortByTitleIgnoringPrefixes } from "../modules/utils.js"
import { createElement } from "../modules/utils.js"

const addResource = async () => {
    const myData = await fetchResourceMedia()
    const mainContent = document.querySelector('.main-content')
    mainContent.classList.add('web-bg')

    if (myData) {
        const sortedData = sortByTitleIgnoringPrefixes(myData);
        myData
        sortedData.map(data => {
            const myData = data.resource_media
            const divResource = createElement('a', { class: 'topic-resource', href: myData.url, target: '_blank' })
            const iconImg = createElement('img', {
                id: 'icon',
                src: myData.media_type.media_icon,
                alt: myData.media_type.alt
            })
            const h3Text = createElement('h3', {}, myData.resource)
            const pText = createElement('p', {}, myData.textContent)
            divResource.appendChild(iconImg)
            divResource.appendChild(h3Text)
            divResource.appendChild(pText)

            mainContent.appendChild(divResource)
        })
    } else {
        console.error("❌ Failed to load JSON data.")
    }

    const pageBreak = createElement('div', { class: 'page-break' });
    const pbH2 = createElement('h2', {}, 'Stay in touch!')
    const phP = createElement('p', {}, 'Join our newsletter to receive news and updates.')
    pageBreak.appendChild(pbH2)
    pageBreak.appendChild(phP)

    // Create the form element
    const form = createElement('form', { class: 'signup-form' })
    // First Name
    const firstName = createElement('input', { type: 'text', name: 'first_name', placeholder: 'First Name', required: true });
    // Last Name
    const lastName = createElement('input', { type: 'text', name: 'last_name', placeholder: 'Last Name', required: true });
    // Email
    const email = createElement('input', { type: 'email', name: 'email', placeholder: 'Email Address', required: true });
    // Submit Button
    const submit = createElement('a',
        {
            class: 'button section-button',
            type: 'submit',
            href: 'http://eepurl.com/dK8pQQ',
            target: '_blank'
        },
        "I'M IN!");
    // Append elements to the form
    // form.appendChild(firstName);
    // form.appendChild(lastName);
    // form.appendChild(email);
    form.appendChild(submit);

    const shareP = createElement('p', {}, 'I’ll never share your information.')
    // Append the form to your desired container
    pageBreak.appendChild(form);
    pageBreak.appendChild(shareP)
    mainContent.insertAdjacentElement('afterend', pageBreak);
}

export { addResource }