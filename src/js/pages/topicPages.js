import { fetchResourceMedia } from "../modules/api.js"

const addResource = async () => {
    const myData = await fetchResourceMedia()
    const mainContent = document.querySelector('.main-content')
    
    if (myData) {
        myData.map(data =>{
            const divResource = document.createElement('a')
            divResource.className = 'topic-resource'
            divResource.setAttribute('href', data.url)
            const icon = document.createElement('div')
            icon.className = 'icon'
            const h3Text = document.createElement('h3')
            h3Text.textContent = data.resource
            const pText = document.createElement('p')
            pText.textContent = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
            divResource.appendChild(icon)
            divResource.appendChild(h3Text)
            divResource.appendChild(pText)
            
            mainContent.appendChild(divResource)
        })
    } else {
        console.error("❌ Failed to load JSON data.")
    }
}

export { addResource }