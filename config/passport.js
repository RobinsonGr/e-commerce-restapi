        //Retriving user from the db and comparing the password in the db 

        const pool = require('../config/database.js');
        const bcrypt = require('bcrypt');
        const LocalStrategy = require("passport-local").Strategy;
        
        function authSetup(passport) {
        
                    //Retriving user from the db and comparing the password in the db 
            const userAuthentication = async (email, password, done) => {
                try {
                    const result = await pool.query(`
                        SELECT *
                        FROM customers
                        WHERE email = $1   
                    `, [email]);
        
                    if (result.rows.length === 0) {
                        return done(null, false, { message: 'User was incorrect' });
                    }
        
                    const user = result.rows[0];
                    const passwordMatch = await bcrypt.compare(password, user.password);
        
                    if (!passwordMatch) {
                        return done(null, false, { message: 'Password was incorrect' });
                    }
        
                    return done(null, user);
                } catch (err) {
                    return done(err);
                }
            }
        
            passport.use(
                new LocalStrategy({ usernameField: "email", passwordField: "password" }, userAuthentication)
            );
        
            // Storing the user id inside a cookie for persistence
            passport.serializeUser((user, done) => {
                done(null, user.id);
            });
        
            // Authenticating the user id stored within the cookie and validating it with the db to grant auth
            passport.deserializeUser(async (id, done) => {
                try {
                    const result = await pool.query(`SELECT * FROM customers WHERE id = $1`, [id]);
        
                    if (result.rows.length === 0) {
                        return done(null, false);
                    }
        
                    const user = result.rows[0];
                    return done(null, user);
                } catch (err) {
                    return done(err);
                }
            });
        }
        
        module.exports = authSetup;
        


