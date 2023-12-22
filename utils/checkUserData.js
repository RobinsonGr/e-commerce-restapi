
const checkCompleteData = ({username, name, password, address}) => {
    return username && name && password && address 
};

const checkUsernameLength = ({username}) => {
    return username.length >= 5; 
};

const checkPasswordLength = ({password}) => {
    return password.length >= 8;
};

module.exports = {
    checkCompleteData,
    checkPasswordLength,
    checkUsernameLength
}