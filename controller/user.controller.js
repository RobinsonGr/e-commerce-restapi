const pool = require('../config/database.js');
const bcrypt = require('bcrypt');
const {checkCompleteData,
    checkPasswordLength,
    checkUsernameLength} = require('../utils/checkUserData.js');

async function addUser (req, res){
   try {
    const {username, name, password, address} = req.body
    
    if(!checkCompleteData(req.body)) {
        return res.status(400).json({ message: 'Incomplete data, please fill in all fields' });
    };

    if(!checkPasswordLength(req.body)) {
        return res.status(400).json({message: 'The password mmust contain more than 8 characteres'})
    };

    if(!checkUsernameLength(req.body)) {
        return res.status(400).json({message: 'The username mmust contain more than 5 characteres'})
    };


    let hashedPassword = await bcrypt.hash(password, 10)
    
    await pool.query(`
        INSERT INTO customers(username, name, password, address) 
        VALUES($1, $2, $3, $4)
    `, 
    [username, name, hashedPassword, address]);

    return res.json({message: 'User successfully created'})
   } catch (err) {
    console.log(err.message)
    res.status(500).json({error: 'We couldn\'\t create the user'})
   };
};

module.exports = {
    addUser
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
            SET 
            WHERE 
        `
    } catch(err) {
        console.log(err.message)
         res.status(500).json({error: 'We couldn\'\t edit the user'})
    };
};
