import { fetchResourcesTopic } from "../modules/api.js"

const addCircles = async () => {
    const myData = await fetchResourcesTopic()
    const resourceItem = document.querySelector('.resources')

    if (myData) {
        myData.map(resource => {
            const resourceDiv = document.createElement('div')
            resourceDiv.className = "resource-item"

            const pCircle = document.createElement('p');
            pCircle.id = "circle"

            const h3Title = document.createElement('h3');
            h3Title.innerHTML = resource.title
            const aLearn = document.createElement('a');
            aLearn.setAttribute('href', resource.learnMore)
            aLearn.innerHTML = 'Learn More'

            resourceDiv.appendChild(pCircle)
            resourceDiv.appendChild(h3Title)
            resourceDiv.appendChild(aLearn)

            resourceItem.appendChild(resourceDiv)
        })
        console.log("✅ JSON Data Loaded:", myData);
    } else {
        console.error("❌ Failed to load JSON data.");
    }
}

export { addCircles }