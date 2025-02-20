export async function fetchData(filePath) {
    try {
        const response = await fetch(filePath);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status} (${response.statusText})`);
        }

        const data = await response.json(); // Parse JSON
        return data;
    } catch (error) {
        console.error("Error fetching local JSON:", error.message);
        return null; // Return null to handle errors gracefully
    }
}


