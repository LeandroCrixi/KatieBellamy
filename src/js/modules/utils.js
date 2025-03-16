// Formatting the Page Title based on the pathname
const path = document.location.pathname; // Get "/src/pages/disability_justice.html"

const formattedTitle = () => {
    if (!path.includes("/src/pages/")) {
        return "Resources";
    }

    const pageName = path.split("/").pop().replace(".html", ""); // Get "disability_justice"
    const formatingTitle = pageName
        .split("_") // Split by underscore ["disability", "justice"]
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(" "); // Join with a space
    return formatingTitle
}

export { formattedTitle }