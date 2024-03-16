const pool = require('../config/database.js');
const bcrypt = require('bcrypt');
const LocalStrategy = require("passport-local").Strategy

function authSetup(passport) {

    const userAuthentication = async (email, password, done) => {

       

        //Retriving user from the db and comparing the password in the db 
        await pool.query(`
        SELECT *
        FROM customers
        WHERE email = $1   
        `, 
        [email],
        async (err, result) => {            
                const user = result.rows[0];
                const passwordMatch = await bcrypt.compare(password, user.password);

                if(err) {
                    return done(err)
                }
                if(!user) {
                    return done(null, false, {message: 'User was incorrect'});
                };
                
                if(!passwordMatch) {
                    return done(null, false, {message: 'Password was incorrect'});
                };
                
                return done(null, user);
        });
    }

    passport.use(
        new LocalStrategy({ usernameField: "email", passwordField: "password" }, userAuthentication)
    );
 
//Storing the user id inside a cookie for persistence
passport.serializeUser((user, done) => {
    done(null, user.id)
});

//Authenticating the user id stored within the cookie and validating it with the db to grant auth
passport.deserializeUser((id, done) => {
    pool.query(`SELECT * FROM customers WHERE id = $1`, [id], (err, result) => {
        
        if(err) {
            done(err)
        };
        //CHECK id for object
        const userId = result.rows[0].id;
        return done(null, userId);
    });
}); 

};

module.exports = authSetup;

