//This is cart controller of our project..
const { Router } = require("express")
const redis = require("../Configs/redis")
const router = Router()

router.post("", (req, res) => {
  try {
    redis.set(req.body.email, JSON.stringify(req.body.userData))
    return res.status(201).send({ message: "data updated" })
  } catch (error) {
    console.log(error.message)
    return res.status(500).send(error.message)
  }
})

router.get("/:email", (req, res) => {
  try {
    redis.get(req.params.email, (err, value) => {
      if (err) console.log(err.message)
      value = JSON.parse(value)
      return res.status(200).send(value)
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).send(error.message)
  }
})

module.exports = router