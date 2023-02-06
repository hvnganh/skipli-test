const userController = require("../controllers");
const router = require("express").Router();

router.get('/', (req, res) => {
    res.status(200).json('OK');
})

router.post('/verify', userController.CreateNewAccessCode)

router.post('/check-verify', userController.ValidateAccessCode)


module.exports = router;