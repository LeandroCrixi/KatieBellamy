import { fetchResourceMedia } from "../modules/api.js"
import { sortByTitleIgnoringPrefixes } from "../modules/utils.js"
import { createElement } from "../modules/utils.js"

const addResource = async () => {
    const myData = await fetchResourceMedia()
    const mainContent = document.querySelector('.main-content')

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
}

export { addResource }