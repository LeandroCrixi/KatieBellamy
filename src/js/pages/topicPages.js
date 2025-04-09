import { fetchResourceMedia } from "../modules/api.js"
import { sortByTitleIgnoringPrefixes } from "../modules/utils.js"

const addResource = async () => {
    const myData = await fetchResourceMedia()
    const mainContent = document.querySelector('.main-content')

    if (myData) {
        const sortedData = sortByTitleIgnoringPrefixes(myData);
        myData
        // .sort((a, b) => a.resource.localeCompare(b.resource))
        sortedData.map(data => {
            const divResource = document.createElement('a')
            divResource.className = 'topic-resource'
            divResource.setAttribute('href', data.url)
            divResource.setAttribute('target', '_blank')
            const iconImg = document.createElement('img')
            iconImg.setAttribute('src', data.resource_media.media_type.media_icon)
            iconImg.setAttribute('alt', data.resource_media.media_type.alt)
            iconImg.id = 'icon'
            const h3Text = document.createElement('h3')
            h3Text.textContent = data.resource_media.resource
            const pText = document.createElement('p')
            pText.textContent = data.resource_media.textContent
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