import { header } from './components/header.js'
import { footer } from './components/footer.js'
import { handleSubmit } from './modules/events.js'

document.addEventListener('DOMContentLoaded', async () => {

    // header section
    // Adding header
    header()

    // main section
    const path = document.location.pathname
    // Page-specific components
    switch (path) {
        case '/':
            const { addCircles } = await import('./pages/indexPage.js');
            addCircles();
            break;
        case '/src/pages/topics/anti-fat_bias.html':
        case '/src/pages/topics/black_educators_&_orgs.html':
        case '/src/pages/topics/climate_change.html':
        case '/src/pages/topics/couples_&_relationship.html':
        case '/src/pages/topics/disability_justice.html':
        case '/src/pages/topics/educators_&_orgs_to_know.html':
        case '/src/pages/topics/intersectionality.html':
        case '/src/pages/topics/mental_health.html':
        case '/src/pages/topics/mindfulness.html':
        case '/src/pages/topics/queer_inclusion.html':
        case '/src/pages/topics/recovery_resources.html':
        case '/src/pages/topics/somatic_healing.html':
            const { addResource } = await import('./pages/topicPages.js');
            addResource();
            break;
        // Add more cases as needed
        default:
            console.warn('No specific scripts for this page.');
    }
    // footer section
    footer()
    handleSubmit()
})