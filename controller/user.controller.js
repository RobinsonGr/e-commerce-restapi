const pool = require('../config/database.js');
const bcrypt = require('bcrypt');
const {checkCompleteData,
    checkPasswordLength,
    checkUsernameLength} = require('../utils/checkUserData.js');
        
 function checkAuthentication(req, res, next) {
        if(req.isAuthenticated()) {
          return next()
        }
        console.log(req.isAuthenticated())
        //console.log(req.isAuthenticated())
        res.status(401).json({ error: 'Unauthorized' });
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
    //it gets the user by deserialize the cookie storage on browser
    const userId = req.session.passport.user

    const rawData = await pool.query(
        `SELECT * FROM customers
        WHERE ID = $1
        `, [userId]
        );
        
        if (rawData.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }      

    try{
        const  {email, name, address} = rawData.rows[0]
        return res.json({isAuth, email, name, address})
    } catch(error) {
        console.error('Error retrieving user Data', error);
        return res.status(500).json({ error: 'Internal error server'})
    }
  };

//put 
async function editUser (req, res) {

console.log(req.session.passport.user)

     const {name, address} = req.body;
    const userId = req.session.passport.user
    
    const updateFields = {}
    if(name) updateFields.name = name;
    if(address) updateFields.address = address;

    // values that goes to the sanitazation 
    const data = [...Object.values(updateFields), userId]
    
    //join works for every iteration, it's no needed in each iteration
    const query = `
    UPDATE customers
    SET ${Object.keys(updateFields).map((key, index) => `${key} = $${index + 1}`).join(',')}
    WHERE id = $${data.length}`

    try {
        await pool.query(query, data)
        
        return res.json({message: 'Your profile was updated sucessfully'})

    } catch(err) {
        console.log(err.message)
         res.status(500).json({error: 'We couldn\'t edit the user'})
    };
};

module.exports = {
    addUser,
    getUser,
    editUser,
    checkAuthentication
};
