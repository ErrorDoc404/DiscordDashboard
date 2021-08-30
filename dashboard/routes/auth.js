const router = require('express').Router();
const passport = require('passport');

router.get('/discord', passport.authenticate('discord'));

router.get('/discord/redirect', passport.authenticate('discord', {
    failureRedirect: '/'
}), function(req, res) {
    res.redirect('http://localhost:3000/menu') // Successful auth
});

router.get('/', (req, res) => {
  if(req.user) res.send(req.user);
  else res.status(401).send({msg: `Unauthorized`});
});

module.exports = router;
