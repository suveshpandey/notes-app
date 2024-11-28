export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const getInitials = (name) => {
    if(!name) return "";
    const words = name.split(" ");
    let initials = "";

    for(let i = 0; i<words.length; i++){
        initials += words[i][0];
    }
    return initials;
}

// export default ;