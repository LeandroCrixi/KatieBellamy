import { fetchResourcesTopic } from "../modules/api.js"

const addCircles = async () => {
    const myData = await fetchResourcesTopic()
    const resourceItem = document.querySelector('.resources')

    if (myData) {
        myData
            .sort((a, b) => a.title.localeCompare(b.title))
            .map(resource => {
                const resourceDiv = document.createElement('div')
                const aLearnB = document.createElement('a')
                aLearnB.setAttribute('href', resource.learnMore)
                aLearnB.className = 'area-click'
                resourceDiv.className = "resource-item resource-button"
                

                const topicImg = document.createElement('img')
                topicImg.setAttribute('src', resource.image)
                topicImg.setAttribute('alt', resource.alt)
                topicImg.id = "circle"

                const h3Title = document.createElement('h3')
                h3Title.innerHTML = resource.title
                const aLearn = document.createElement('a')
                aLearn.className = 'button'
                aLearn.setAttribute('href', resource.learnMore)
                aLearn.innerHTML = 'Learn More'

                resourceDiv.appendChild(topicImg)
                resourceDiv.appendChild(h3Title)
                resourceDiv.appendChild(aLearn)

                aLearnB.appendChild(resourceDiv)

                resourceItem.appendChild(aLearnB)
            })
        // console.log("✅ JSON Data Loaded:", myData)
    } else {
        console.error("❌ Failed to load JSON data.")
    }
}

export { addCircles }