export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const getInitials = (name) => {
    if (!name) return ""; // Handle empty or undefined name

    // Split name into words, filter out empty strings, and map to initials
    const initials = name
        .trim()
        .split(/\s+/) // Split by one or more spaces
        .map(word => word[0]?.toUpperCase()) // Get the first character of each word and convert to uppercase
        .join(""); // Join all initials into a single string

    return initials || ""; // Fallback to empty string if no initials are generated
};

export const getFirstName = (name) => {
    return name.split(" ")[0];
}

export const url = "https://neura-notes-backend.onrender.com/user";

// export default ;