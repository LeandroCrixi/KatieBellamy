// Formatting the Page Title based on the pathname
const path = document.location.pathname; // Get "/src/pages/disability_justice.html"

const formatingPathName = () => {
    const pageName = path.split("/").pop().replace(".html", ""); // Extract last part of the path

    const exceptions = ["and", "or", "the", "a", "to", "of"]; // List of words to keep lowercase

    const formattedTitle = pageName
        .split("_") // Split by underscores
        .map(word =>
            word
                .split(/(-|&)/) // Split by hyphens or ampersand, while keeping delimiters
                .map(part => {
                    // Keep "&" as-is, capitalize other words
                    if (part === "&") {
                        return part; // Leave "&" untouched
                    }
                    return part.charAt(0).toUpperCase() + part.slice(1); // Capitalize each part
                })
                .join("") // Join back hyphenated/ampersand-separated parts
        )
        .join(" ") // Join words with spaces
        .split(" ") // Split final title into words to handle exceptions
        .map((word, index, arr) =>
            exceptions.includes(word.toLowerCase()) && index !== 0 && index !== arr.length - 1
                ? word.toLowerCase() // Keep exceptions in lowercase if they're not first/last
                : word.charAt(0).toUpperCase() + word.slice(1) // Capitalize other words
        )
        .join(" "); // Rejoin the words into a single string

    return formattedTitle;
}

const mainTitle = () => {
    if (path === "/") {
        return "Bellamy & Associates"
    }
}

const formattedTitle = () => {
    if (path.includes('/src/pages/about')) {
        return 'About Us'
    } else if (path.includes('/src/pages/submit')) {
        return 'Submit a Resource'
    } else if (path.includes('/src/pages/contact')) {
        return 'Contact Us'
    } else if (!path.includes("/src/pages/topics/")) {
        return "<br><br><span>Community Resources Hub</span>";
    }

    return formatingPathName()
};

const settingBackground = (element) => {
    if (window.matchMedia("(max-width: 420px)").matches) {
        element.style.background = 'none'
        element.style.backgroundColor = '#DCD9D0'
    }
}

const ignorePrefixes = ["a ", "an ", "the ", "dr. "];

const sortByTitleIgnoringPrefixes = (dataArray) => {
    return dataArray.slice().sort((a, b) => {
        const normalize = (str) => {
            const lower = str?.toLowerCase();
            for (const prefix of ignorePrefixes) {
                if (lower?.startsWith(prefix)) {
                    return lower.slice(prefix.length);
                }
            }
            return lower;
        };
        return normalize(a.resource_media.resource)?.localeCompare(normalize(b.resource_media.resource));
    });
}


export { mainTitle, formattedTitle, formatingPathName, settingBackground, sortByTitleIgnoringPrefixes }