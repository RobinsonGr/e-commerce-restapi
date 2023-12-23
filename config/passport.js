const pool = require('../config/database.js');
const bcrypt = require('bcrypt');

function authSetup(passport) {

    const userAuthentication = async (username, password, done) => {

        //Retriving user from the db and comparing the password in the db 
        await pool.query(`
            SELECT *
            FROM customers
            WHERE username = $1   
        `, 
        [username],
        async (err, result) => {
            
                const user = result.rows[0];
                const passwordMatch = await bcrypt.compare(password, user.password);

                if(err) {
                    return done(err)
                }
                
                if(!user ) {
                    return done(null, false, {message: 'User was incorrect'});
                };
                
                if(!passwordMatch) {
                    return done(null, false, {message: 'Password was incorrect'});
                };
                
                return done(null, user);
        });

    passport.use(
        new LocalStrategy(userAuthentication)
    );

//Storing the user id inside a cookie for persistence
passport.serializeUser((user, done) => done(null, user.id));

//Authenticating the user id stored a cookie and validating it with the db to grant auth
passport.deserializeUser((id, done) => {
    pool.query(`SELECT * FROM customers WHERE id = $1`, [id], (err, result) => {
        
        if(err) {
            done(err)
        };

        const userId = result.rows[0].id;

        return done(null, userId);
    });
}); 

};
};

module.exports = authSetup;

