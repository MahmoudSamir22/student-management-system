const router = require("express").Router();
const {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const {addUserValidator, updateUserValidator, getUserValidator, deleteUserValidator} = require('../utils/validator/userValidator')

router.route("/").post(addUserValidator, createUser).get(getUsers);

router.route("/:id").get(getUserValidator, getUser).put(updateUserValidator, updateUser).delete(deleteUserValidator, deleteUser);

module.exports = router;
