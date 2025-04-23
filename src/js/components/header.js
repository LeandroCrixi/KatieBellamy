import { fetchResourcesTopic, fetchBgImg } from "../modules/api.js"
import { toggleMenu, addShowClass, removeShowClass } from "../modules/events.js"
import { favicon, mainTitle, formattedTitle, settingBackground } from "../modules/dom.js"
import { createElement } from "../modules/utils.js"

const header = async () => {
    favicon()

    try {
        const myData = await fetchBgImg()
        const header = document.querySelector('header')
        header.className = 'europa'

        let backgroundSet = false; // Track if a valid background is set

        myData.forEach((data) => {
            if (!backgroundSet && data && data.bg_img) {
                // header.style.background = `#F8F4EC url(${data.bg_img}) 87% center/360px no-repeat`;
                header.style.background = `#F8F4EC url(${data.bg_img}) 87% center/360px no-repeat`;
                settingBackground(header)
                backgroundSet = true; // Mark as set
            }
        });
        if (!backgroundSet) {
            // header.style.background = "url('../../../public/assets/Homepage_Banner.png') no-repeat center center / cover";
            header.style.background = "#F8F4EC url('../../../public/assets/Homepage_Image.png') 87% center/360px no-repeat";
            settingBackground(header)
        }
        const headerContent = document.getElementById('header-content')

        // Create logo
        const divLogo = createElement('div', { class: 'logo' })
        const aLogo = createElement('a', { href: '/' })
        const imgLogo = createElement('img', {
            src: '/public/assets/logo.png',
            alt: 'Logo'
        })
        aLogo.appendChild(imgLogo)
        divLogo.appendChild(aLogo)

        // Create the title
        const h1Nav = createElement('h1', {
            id: 'title',
            class: 'adonis-web'
        }, mainTitle())
        const spanH1 = createElement('span', { class: 'highlight' })
        spanH1.innerHTML = formattedTitle()
        h1Nav.appendChild(spanH1)

        if (spanH1.textContent.length > 20) {
            h1Nav.style.fontSize = '3rem'
        } else {
            h1Nav.style.fontSize = '4rem'
        }

        // Create the nav bar and append elements
        const navBar = await nav()
        headerContent.appendChild(divLogo)
        if (navBar) {
            headerContent.appendChild(navBar);
        }
        header.appendChild(h1Nav)
    } catch (error) {
        console.error("Error in header function:", error.message);
    }
}

const nav = async () => {
    try {
        const myData = await fetchResourcesTopic()

        const navBar = document.createElement('nav')

        const divBurger = createElement('div', { class: 'burger' })
        divBurger.addEventListener('click', toggleMenu)
        const bar1 = document.createElement('div')
        bar1.classList.add('bar', 'bar1')
        const bar2 = document.createElement('div')
        bar2.classList.add('bar', 'bar2')
        const bar3 = document.createElement('div')
        bar3.classList.add('bar', 'bar3')
        divBurger.appendChild(bar1)
        divBurger.appendChild(bar2)
        divBurger.appendChild(bar3)

        const ulNavBar = createElement('ul', {
            class: 'navBar',
            id: 'navBar'
        })
        navBar.appendChild(divBurger)
        navBar.appendChild(ulNavBar)

        const liAbout = document.createElement('li')
        const liTopic = createElement('li', { class: 'dropdown' })
        const liSubmit = document.createElement('li')
        const liContact = document.createElement('li')
        const aAbout = createElement('a', { href: '/src/pages/aboutUs.html' }, 'About Us')
        const aTopic = createElement('a', { class: 'dropdown-btn' }, 'Topics')
        const ulDropdown = createElement('ul', { class: 'dropdown-content' })
        aTopic.addEventListener('mouseover', addShowClass);
        ulDropdown.addEventListener('mouseover', addShowClass); // Keep menu open when inside

        aTopic.addEventListener('mouseout', removeShowClass);
        ulDropdown.addEventListener('mouseout', removeShowClass);

        myData
            .sort((a, b) => a.title.localeCompare(b.title))
            .map(resource => {
                const li = document.createElement('li')
                const a = createElement('a', { href: resource.learnMore }, resource.title)

                li.appendChild(a)
                ulDropdown.appendChild(li)
            })

        const aSubmit = createElement('a', { href: '/src/pages/submit.html' }, 'Submit a Resource')
        const aContact = createElement('a', { href: '/src/pages/contactUs.html' }, 'Contact Us')
        liAbout.appendChild(aAbout)
        liTopic.appendChild(aTopic)
        liTopic.appendChild(ulDropdown)
        liSubmit.appendChild(aSubmit)
        liContact.appendChild(aContact)

        ulNavBar.appendChild(liAbout)
        ulNavBar.appendChild(liTopic)
        ulNavBar.appendChild(liSubmit)
        ulNavBar.appendChild(liContact)
        return navBar
    } catch (error) {
        console.error("Error in NavBar component:", error.message)
    }
}

export { header }