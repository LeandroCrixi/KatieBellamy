// Formatting the Page Title based on the pathname
const path = document.location.pathname; // Get "/src/pages/disability_justice.html"

const formattedTitle = () => {
    if (!path.includes("/src/pages/topics/")) {
        return "Resources";
    }

    const pageName = path.split("/").pop().replace(".html", ""); // Extract last part of the path
    const exceptions = ["and", "or", "the", "a", "to", "of"]; // List of words to keep in lowercase
    const formattedTitle = pageName
        .split("_") // Split by underscores
        .map(word =>
            word
                .split("-") // Split by hyphens
                .map(part => part.charAt(0).toUpperCase() + part.slice(1)) // Capitalize hyphenated parts
                .join("-") // Join hyphenated parts back with hyphen
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
};

export { formattedTitle }