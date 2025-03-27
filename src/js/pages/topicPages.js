import { fetchResourceMedia } from "../modules/api.js"

const addResource = async () => {
    const myData = await fetchResourceMedia()
    const mainContent = document.querySelector('.main-content')
    
    if (myData) {
        myData.map(data =>{
            const divResource = document.createElement('a')
            divResource.className = 'topic-resource'
            divResource.setAttribute('href', data.url)
            divResource.setAttribute('target', '_blank')
            const iconImg = document.createElement('img')
            iconImg.setAttribute('src', data.media_type.media_icon)
            iconImg.setAttribute('alt', data.media_type.alt)
            iconImg.id = 'icon'
            const h3Text = document.createElement('h3')
            h3Text.textContent = data.resource
            const pText = document.createElement('p')
            pText.textContent = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
            divResource.appendChild(iconImg)
            divResource.appendChild(h3Text)
            divResource.appendChild(pText)
            
            mainContent.appendChild(divResource)
            // console.log(data.media_type.media_icon)
        })
    } else {
        console.error("❌ Failed to load JSON data.")
    }
}

export { addResource }