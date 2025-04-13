import { fetchResourcesTopic } from "../modules/api.js"

const addCircles = async () => {
    const myData = await fetchResourcesTopic()
    const resourceItem = document.querySelector('.resources')

    if (myData) {
        myData
            .sort((a, b) => a.title.localeCompare(b.title))
            .map(resource => {
                const resourceDiv = createElement('div', { className: "resource-item resource-button" })
                const aLearnB = createElement('a', { className: 'area-click', href: resource.learnMore })


                const topicImg = createElement('img', { id: "circle", src: resource.image, alt: resource.alt })

                const h3Title = document.createElement('h3')
                h3Title.innerHTML = resource.title
                const aLearn = document.createElement('a', {class: 'button', href: resource.learnMore})
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