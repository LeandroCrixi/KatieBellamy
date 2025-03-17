import { fetchResourcesTopic } from "../modules/api.js"
import { formattedTitle } from "../modules/utils.js"

const navBar = async () => {
    try {
        const myData = await fetchResourcesTopic()
        const header = document.querySelector('header')
        const nav = document.getElementById('header-content')

        const divLogo = document.createElement('div')
        divLogo.className = 'logo'
        const aLogo = document.createElement('a')
        aLogo.setAttribute('href', 'http://127.0.0.1:5501/')
        const imgLogo = document.createElement('img')
        aLogo.appendChild(imgLogo)
        imgLogo.setAttribute('src', '/public/assets/logo.png')
        imgLogo.setAttribute('alt', 'Logo')
        divLogo.appendChild(aLogo)

        const navBar = document.createElement('nav')
        const ulNavBar = document.createElement('ul')
        ulNavBar.className = 'navBar'
        ulNavBar.id = 'navBar'
        navBar.appendChild(ulNavBar)
        myData.map(resource => {
            const li = document.createElement('li')
            ulNavBar.appendChild(li)
            const a = document.createElement('a')
            a.setAttribute('href', resource.learnMore)
            a.textContent = resource.title
            
            if (window.location.pathname === resource.learnMore) {
                a.className = 'active'; // Add the 'active' class
            }

            li.appendChild(a)
        })

        const h1Nav = document.createElement('h1')
        h1Nav.id = 'title'
        const spanH1 = document.createElement('span')
        spanH1.className = 'highlight'
        h1Nav.appendChild(spanH1)
        spanH1.textContent = formattedTitle()

        nav.appendChild(divLogo)
        nav.appendChild(navBar)
        header.appendChild(h1Nav)

    } catch (error) {
        console.error("Error in NavBar component:", error.message)
    }
}

export { navBar }