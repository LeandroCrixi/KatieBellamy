import { fetchResourcesTopic, fetchBgImg } from "../modules/api.js"
import { formattedTitle, settingBackground } from "../modules/utils.js"
import { toggleMenu, addShowClass, removeShowClass } from "../modules/events.js"

const header = async () => {
    const link = document.createElement('link'); // Create a <link> element
    link.rel = 'shortcut icon'; // Set the rel attribute
    link.href = '../../../public/icons/Favicon.png'; // Set the href attribute to the path of your favicon
    link.type = 'image/x-icon'; // Set the type attribute

    document.head.appendChild(link);

    try {
        const myData = await fetchBgImg()
        const header = document.querySelector('header')

        let backgroundSet = false; // Track if a valid background is set

        myData.forEach((data) => {
            if (!backgroundSet && data && data.bg_img) {
                header.style.background = `#DCD9D0 url(${data.bg_img}) 87% center/360px no-repeat`;
                settingBackground(header)
                backgroundSet = true; // Mark as set
            }
        });
        if (!backgroundSet) {
            header.style.background = "url('../../../public/assets/Homepage_Banner.png') no-repeat center center / cover";
            settingBackground(header)
        }
        const headerContent = document.getElementById('header-content')

        // Create logo
        const divLogo = document.createElement('div')
        divLogo.className = 'logo'
        const aLogo = document.createElement('a')
        aLogo.setAttribute('href', '/')
        const imgLogo = document.createElement('img')
        imgLogo.setAttribute('src', '/public/assets/logo.png')
        imgLogo.setAttribute('alt', 'Logo')
        aLogo.appendChild(imgLogo)
        divLogo.appendChild(aLogo)

        // Create the title
        const h1Nav = document.createElement('h1')
        h1Nav.id = 'title'
        const spanH1 = document.createElement('span')
        spanH1.className = 'highlight'
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

        const divBurger = document.createElement('div')
        divBurger.className = 'burger'
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

        const ulNavBar = document.createElement('ul')
        ulNavBar.className = 'navBar'
        ulNavBar.id = 'navBar'
        navBar.appendChild(divBurger)
        navBar.appendChild(ulNavBar)

        const liAbout = document.createElement('li')
        const liTopic = document.createElement('li')
        liTopic.className = 'dropdown'
        const liSubmit = document.createElement('li')
        const liContact = document.createElement('li')
        const aAbout = document.createElement('a')
        aAbout.textContent = 'About Us'
        aAbout.setAttribute('href', '/src/pages/aboutUs.html')
        const aTopic = document.createElement('a')
        aTopic.textContent = 'Topics'
        aTopic.className = 'dropdown-btn'
        const ulDropdown = document.createElement('ul')
        ulDropdown.classList.add('dropdown-content')
        aTopic.addEventListener('mouseover', addShowClass);
        ulDropdown.addEventListener('mouseover', addShowClass); // Keep menu open when inside

        aTopic.addEventListener('mouseout', removeShowClass);
        ulDropdown.addEventListener('mouseout', removeShowClass);

        myData
            .sort((a, b) => a.title.localeCompare(b.title))
            .map(resource => {
                const li = document.createElement('li')
                const a = document.createElement('a')
                a.setAttribute('href', resource.learnMore)
                a.textContent = resource.title

                li.appendChild(a)
                ulDropdown.appendChild(li)
            })

        const aSubmit = document.createElement('a')
        aSubmit.textContent = 'Submit a Resource'
        aSubmit.setAttribute('href', '/src/pages/submit.html')
        const aContact = document.createElement('a')
        aContact.textContent = 'Contact Us'
        aContact.setAttribute('href', '/src/pages/contactUs.html')
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