const express = require("express");

const router = express.Router();

const database = require("../Utils/database");

router.get("/", async (req, res) => {
  try {
    let data = await database.execute("SELECT * FROM `api-task`.users");

    let [users] = data;

    console.log(users, "-----------");

    res.json({ status: "success", users });
  } catch (error) {
    res.json(error);
  }
});

router.get("/:id", checkExist, (req, res) => {
  res.json({ mess: "doc mot du lieu thanh cong" });
});

router.post("/", async (req, res) => {
  try {
    const { content, date, status, user_name } = req.body;

    await database.execute(
      "INSERT INTO `api-task`.`users` (`content`, `date`, `status`, `user_name`) VALUES (?,?,?,?)",
      [content, date, status, user_name]
    );
    res.json({ mess: "post thanh cong" });
  } catch (error) {
    res.json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { content, date, status, user_name } = req.body;

    await database.execute(
      "UPDATE `api-task`.`users` SET `content` = ?, `date` = ?, `status` = ?, `user_name` = ? WHERE (`users_id` =?)",
      [content, date, status, user_name, id]
    );
    res.json({ mess: "update thanh cong" });
  } catch (error) {
    res.json(error);
  }
});

router.delete("/:users_id", async (req, res) => {
  try {
    const { users_id } = req.params;

    await database.execute(
      "DELETE FROM `api-task`.`users` WHERE `users_id` = ?",
      [users_id]
    );

    res.json({ message: "Delete successful" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user" });
  }
});

//Middleware
function checkExist(req, res, next) {
  let { content, user_name } = req.body;
  let data = database.execute("SELECT * FROM `api-keeper`.users");

  let find = data.find((e, i) => e.user_name === user_name);
  let findd = data.find((e, i) => e.content === content);

  if (find || findd) {
    res.json({ mess: "da ton tai " });
  } else {
    next();
  }
}

//validate
function validate(req, res, next) {
  let { content, user_name } = req.body;
  let validateSchems = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    content: Joi.string().alphanum().min(3).max(30).required(),
    user_name: Joi.string().alphanum().min(3).max(30).required(),
  });

  let validateResult = validateSchems.validate({
    content,
    user_name,
  });
  if (!validateResult.error) {
    next();
  } else {
    res.json({
      mess: "ok",
    });
  }
}

module.exports = router;
