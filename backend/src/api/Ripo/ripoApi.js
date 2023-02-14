const { SERVER_ERR_CODE } = require("../../utils/errorsCode")

const { getUserRipos } = require("./ripoController")

module.exports = {
  async getUserRipos(req, res) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    try {
      const userRiposResponse = await getUserRipos(token)

      return res.status(200).json(userRiposResponse)
    } catch(err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message })
    }
  }
}
