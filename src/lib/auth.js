module.exports = {
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/usuarios/login');
    },

    isNoLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/usuarios/perfil');

    }



    /*isLoggedInAdministrador(req,res,next){
        if(req.isAuthenticated()){

        }

    }*/
};