const router = require("express").Router();
const {
  createUser,
  getUser,
  getUsers,
} = require("../controllers/userController");

router.route('/').post(createUser).get(getUsers)

router.route('/:id').get(getUser)

module.exports = router;
