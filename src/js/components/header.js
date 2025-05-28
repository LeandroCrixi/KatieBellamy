import { fetchResourcesTopic, fetchBgImg } from "../modules/api.js"
import { toggleMenu, addShowClass, removeShowClass } from "../modules/events.js"
import { favicon, mainTitle, formattedTitle, settingBackground } from "../modules/dom.js"
import { createElement } from "../modules/utils.js"

const header = async () => {
    favicon();
    // Render static header structure immediately
    const header = document.querySelector('header');
    header.className = 'europa';
    const headerContent = document.getElementById('header-content');
    headerContent.innerHTML = '';

    // Logo
    const divLogo = createElement('div', { class: 'logo' });
    const aLogo = createElement('a', { href: '/' });
    const imgLogo = createElement('img', {
        src: '/public/assets/logo.png',
        alt: 'Logo'
    });
    aLogo.appendChild(imgLogo);
    divLogo.appendChild(aLogo);
    headerContent.appendChild(divLogo);

    // Title
    const h1Nav = createElement('h1', {
        id: 'title',
        class: 'adonis-web'
    }, mainTitle());
    const spanH1 = createElement('span', { class: 'highlight' });
    spanH1.innerHTML = formattedTitle();
    h1Nav.appendChild(spanH1);
    if (spanH1.textContent.length > 20) {
        h1Nav.style.fontSize = '3rem';
    } else {
        h1Nav.style.fontSize = '4rem';
    }
    header.appendChild(h1Nav);

    // Add nav overlay for mobile
    let navOverlay = document.querySelector('.nav-overlay');
    if (!navOverlay) {
        navOverlay = document.createElement('div');
        navOverlay.className = 'nav-overlay';
        navOverlay.tabIndex = 0;
        document.body.appendChild(navOverlay);
    }
    navOverlay.onclick = (e) => {
        // Only close if click is outside the navBar
        const navBarEl = document.querySelector('.navBar');
        if (navBarEl && !navBarEl.contains(e.target)) {
            navBarEl.classList.remove('active');
            document.querySelector('.burger')?.classList.remove('change');
            navOverlay.classList.remove('active');
        }
    };

    // Render nav asynchronously
    nav().then(navBar => {
        if (navBar) {
            headerContent.appendChild(navBar);
        }
    });

    // Set background asynchronously
    fetchBgImg().then(myData => {
        let backgroundSet = false;
        myData.forEach((data) => {
            if (!backgroundSet && data && data.bg_img) {
                header.style.background = `#F8F4EC url(${data.bg_img}) 87% center/360px no-repeat`;
                settingBackground(header);
                backgroundSet = true;
            }
        });
        if (!backgroundSet) {
            header.style.background = "#F8F4EC url('../../../public/assets/Homepage_Image.webp') 87% center/360px no-repeat";
            settingBackground(header);
        }
    });
}

const nav = async () => {
    try {
        const myData = await fetchResourcesTopic();
        const navBar = document.createElement('nav');

        // Modern burger button
        const divBurger = createElement('button', {
            class: 'burger',
            'aria-label': 'Open navigation menu',
            'aria-expanded': 'false',
            'aria-controls': 'navBar',
            tabIndex: 0
        });
        const bar1 = document.createElement('div');
        bar1.classList.add('bar', 'bar1');
        const bar2 = document.createElement('div');
        bar2.classList.add('bar', 'bar2');
        const bar3 = document.createElement('div');
        bar3.classList.add('bar', 'bar3');
        divBurger.appendChild(bar1);
        divBurger.appendChild(bar2);
        divBurger.appendChild(bar3);

        // Burger click handler
        divBurger.onclick = (e) => {
            const navBarEl = document.querySelector('.navBar');
            const overlay = document.querySelector('.nav-overlay');
            divBurger.classList.toggle('change');
            navBarEl.classList.toggle('active');
            overlay.classList.toggle('active');
            divBurger.setAttribute('aria-expanded', navBarEl.classList.contains('active'));
        };

        // Keyboard accessibility
        divBurger.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                divBurger.click();
            }
        };

        const ulNavBar = createElement('ul', {
            class: 'navBar',
            id: 'navBar'
        });

        navBar.appendChild(divBurger);
        navBar.appendChild(ulNavBar);

        // Helper: close mobile nav
        function closeMobileNav() {
            const navBarEl = document.querySelector('.navBar');
            const overlay = document.querySelector('.nav-overlay');
            const burger = document.querySelector('.burger');
            navBarEl?.classList.remove('active');
            overlay?.classList.remove('active');
            burger?.classList.remove('change');
            burger?.setAttribute('aria-expanded', 'false');
        }

        // Nav links
        const liAbout = document.createElement('li');
        const liTopic = createElement('li', { class: 'dropdown' });
        const liSubmit = document.createElement('li');
        const liContact = document.createElement('li');
        const aAbout = createElement('a', { href: '/src/pages/aboutUs.html' }, 'About Us');
        const aTopic = createElement('a', { href: '#', class: 'dropdown-btn', tabIndex: 0 }, 'Topics');
        const ulDropdown = createElement('ul', { class: 'dropdown-content' });

        // Dropdown for desktop (hover)
        aTopic.addEventListener('mouseover', addShowClass);
        ulDropdown.addEventListener('mouseover', addShowClass);
        aTopic.addEventListener('mouseout', removeShowClass);
        ulDropdown.addEventListener('mouseout', removeShowClass);

        // Dropdown for mobile (click)
        aTopic.addEventListener('click', (e) => {
            if (window.innerWidth <= 820) {
                e.preventDefault();
                ulDropdown.classList.toggle('show');
            }
        });

        // Support for submenus: if resource.children exists, create a nested ul
        myData
            .sort((a, b) => a.title.localeCompare(b.title))
            .forEach(resource => {
                const li = document.createElement('li');
                const a = createElement('a', { href: resource.children && resource.children.length > 0 ? '#' : resource.learnMore, tabindex: 0 }, resource.title);
                li.appendChild(a);
                // If resource.children (array of subtopics), create a submenu
                if (Array.isArray(resource.children) && resource.children.length > 0) {
                    const subUl = createElement('ul', { class: 'dropdown-submenu' });
                    // Always add a Back/Close link for mobile
                    const closeLi = document.createElement('li');
                    const closeBtn = createElement('a', { href: '#', class: 'submenu-close', tabIndex: 0 }, '← Back');
                    closeBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        subUl.classList.remove('show');
                    });
                    closeLi.appendChild(closeBtn);
                    subUl.appendChild(closeLi);
                    resource.children.forEach(child => {
                        const subLi = document.createElement('li');
                        const subA = createElement('a', { href: child.learnMore }, child.title);
                        subLi.appendChild(subA);
                        subUl.appendChild(subLi);
                    });
                    li.appendChild(subUl);
                    // Desktop: show submenu on hover
                    li.addEventListener('mouseenter', () => {
                        if (window.innerWidth > 820) subUl.classList.add('show');
                    });
                    li.addEventListener('mouseleave', () => {
                        if (window.innerWidth > 820) subUl.classList.remove('show');
                    });
                    // Mobile: show submenu on click, close others
                    a.addEventListener('click', (e) => {
                        if (window.innerWidth <= 820) {
                            e.preventDefault();
                            // Prevent event bubbling to parent menu
                            e.stopPropagation();
                            // Close all other open submenus
                            ulDropdown.querySelectorAll('.dropdown-submenu.show').forEach(openSub => {
                                if (openSub !== subUl) openSub.classList.remove('show');
                            });
                            subUl.classList.toggle('show');
                        }
                    });
                }
                ulDropdown.appendChild(li);
            });

        const aSubmit = createElement('a', { href: '/src/pages/submit.html' }, 'Submit a Resource');
        const aContact = createElement('a', { href: '/src/pages/contactUs.html' }, 'Contact Us');
        liAbout.appendChild(aAbout);
        liTopic.appendChild(aTopic);
        liTopic.appendChild(ulDropdown);
        liSubmit.appendChild(aSubmit);
        liContact.appendChild(aContact);

        ulNavBar.appendChild(liAbout);
        ulNavBar.appendChild(liTopic);
        ulNavBar.appendChild(liSubmit);
        ulNavBar.appendChild(liContact);

        // Close menu on link click (mobile)
        ulNavBar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileNav();
            });
        });

        return navBar;
    } catch (error) {
        console.error("Error in NavBar component:", error.message);
    }
}

export { header }