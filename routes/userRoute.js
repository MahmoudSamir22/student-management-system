const router = require("express").Router();
const {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// const {
//   addUserValidator,
//   updateUserValidator,
//   getUserValidator,
//   deleteUserValidator,
// } = require("../utils/validator/userValidator");

router.route("/").post( createUser).get(getUsers);

router
  .route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
