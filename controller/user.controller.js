const pool = require('../config/database.js');
const bcrypt = require('bcrypt');
const {checkCompleteData,
    checkPasswordLength,
    checkUsernameLength} = require('../utils/checkUserData.js');

    const retrieveUserData = (userId) => {
        const rawData = await pool.query(
            `SELECT * FROM customers
            WHERE ID = $1
            `, [userId]
            );
            
            if (retrieveUserData.rows.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }      
            return rawData.rows[0] 
    };
        


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

//get
async function getUser(req, res) {
    const isAuth = req.isAuthenticated();
    if(!isAuth) {
        return res.status(401).json({error: "User isn't authenticated"})
    }
    const userId = req.session.passport.user
    console.log(userId)

    try{
        const  {email, name, address} = retrieveUserData()
        return res.json({isAuth, email, name, address})
    } catch(error) {
        console.error('Error retrieving user Data', error);
        return res.status(500).json({ error: 'Internal error server'})
    }
  };

//put 
async function editUser (req, res) {
    const {id, name, address} = req.body;

    const updateFields = {};

    if(name) updateFields.name = name;
    if(address) updateFields.address = address;

    const query = `
    UPDATE customers
    SET ${Object.keys(updateFields).map((key, index) => `${key} = ${index}`).join(',')}
    WHERE id = ${`${data.length - 1}`}
`
    const data = [...Object.values(updateFields), id]

    try {
        await pool.query(query, data)
        return res.json({'Your profile was updated sucessfully'})

    } catch(err) {
        console.log(err.message)
         res.status(500).json({error: 'We couldn\'\t edit the user'})
    };
};

module.exports = {
    addUser,
    getUser,
    editUser
};
