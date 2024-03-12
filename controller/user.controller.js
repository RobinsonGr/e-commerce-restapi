const pool = require('../config/database.js');
const bcrypt = require('bcrypt');
const {checkCompleteData,
    checkPasswordLength,
    checkUsernameLength} = require('../utils/checkUserData.js');


async function addUser (req, res){
   try {
   const {email, name, password, address} = req.body

    console.log(req)
    
    if(!checkCompleteData(req.body)) {
        return res.status(400).json({ message: 'Incomplete data, please fill in all fields' });
    };

    if(!checkPasswordLength(req.body)) {
        return res.status(400).json({message: 'The password must contain more than 8 characteres'})
    };

    if(!checkUsernameLength(req.body)) {
        return res.status(400).json({message: 'The email must contain more than 5 characteres'})
    };


    let hashedPassword = await bcrypt.hash(password, 10)
    
    await pool.query(`
        INSERT INTO customers(email, name, password, address) 
        VALUES($1, $2, $3, $4)
    `, 
    [email, name, hashedPassword, address]);

    return res.json({message: 'User successfully created'});
   } catch (err) {
    res.status(500).json({error: err.message})
   };
};


async function editUser (req, res) {
    const {username, name, password, address} = req.body

    const updateFields = {};

    if(username) updateFields.username = username;
    if(name) updateFields.name = name;
    if(password) updateFields.password = password;
    if(address) updateFields.address = address;


    try {
        query = `
            UPDATE customers
            SET ${Object.keys(updateFields).map()}
            WHERE 
        `
    } catch(err) {
        console.log(err.message)
         res.status(500).json({error: 'We couldn\'\t edit the user'})
    };
};

module.exports = {
    addUser
};
