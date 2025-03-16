import { currentYear } from './modules/dom.js'
import { navBar } from './components/navBar.js'
import { addCircles } from './pages/indexPage.js'
import { footer } from './components/footer.js'


document.addEventListener('DOMContentLoaded', () => {
    // header
    // Adding Nav Bar
    navBar()

    // main
    // section resources on index.html
    addCircles()

    // footer
    footer()
    currentYear()
})