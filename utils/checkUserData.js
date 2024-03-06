
const checkCompleteData = ({email, name, password, address}) => {
    return email && name && password && address 
};

const checkUsernameLength = ({email}) => {
    return email.length >= 5; 
};

const checkPasswordLength = ({password}) => {
    return password.length >= 8;
};

module.exports = {
    checkCompleteData,
    checkPasswordLength,
    checkUsernameLength
}