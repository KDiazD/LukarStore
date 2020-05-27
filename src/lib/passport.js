const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');

const helpers = require('../lib/helpers');


  passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pass',
    passReqToCallback: true
  }, async (req, email, pass, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (rows.length > 0) {
      const user = rows[0];
      const validPassword = await helpers.matchPassword(pass, user.pass)

      if (validPassword) {
         done(null, user, req.flash('success', 'Bienvenido ' + user.nombre_usuario));
      } else {
        done(null, false, req.flash('message', 'Contraseña Incorrecta'));
      }
    } else {
      return done(null, false, req.flash('message', 'The Username does not exists.'));
    }
  }));


passport.use('local.registro', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pass',
    passReqToCallback: true
  }, async (req, email, pass, done) => {

    const { nombre_usuario } = req.body;
    let newUser = {
      nombre_usuario,
      email,
      pass
    };

newUser.pass = await helpers.encryptPassword(pass);
    // guardando en la Database
    const result = await pool.query(`INSERT INTO usuarios SET ?`, [newUser]);
    newUser.id_usuario = result.insertId;
    return done(null, newUser);
  }));

  passport.serializeUser((user, done)=>{
      done(null, user.id_usuario);

  });

  passport.deserializeUser(async(id_usuario, done)=>{
      const rows = await pool.query(`SELECT * FROM usuarios WHERE id_usuario = ?`, [id_usuario]);
     
      done(null, rows[0]);
});
