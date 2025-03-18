import { currentYear } from './modules/dom.js'
import { header } from './components/header.js'
import { addCircles } from './pages/indexPage.js'
import { footer } from './components/footer.js'


document.addEventListener('DOMContentLoaded', () => {
    // header section
    // Adding header
    header()

    // main section
    // section resources on index.html
    addCircles()

    // footer section
    footer()
    currentYear()
})