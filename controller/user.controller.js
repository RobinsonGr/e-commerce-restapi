const pool = require('../config/database.js');
const bcrypt = require('bcrypt');
const {checkCompleteData,
    checkPasswordLength,
    checkUsernameLength} = require('../utils/checkUserData.js');


async function addUser (req, res){
   try {
   const {email, name, password, address} = req.body
    
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


async function getUser(req, res) {
    const isAuth = req.isAuthenticated();
    if(!isAuth) {
        return res.status(401).json({error: "User isn't authenticated"})
    }
    const userId = req.session.passport.user
    console.log(userId)

    try{
        const retrieveUserData = await pool.query(
            `SELECT * FROM customers
            WHERE ID = $1
            `, [userId]
            )
        if (retrieveUserData.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });}      

        const {email, name, address} = retrieveUserData.rows[0]
        const userData = {isAuth, email, name, address}
        return res.json(userData)
    } catch(error) {
        console.error('Error retrieving user Data', error);
        return res.status(500).json({ error: 'Internal error server'})
    }
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
    addUser,
    getUser
};
