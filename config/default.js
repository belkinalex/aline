module.exports = {
  db: {
    host     : process.env.DB_HOST || 'eu-cdbr-west-02.cleardb.net',
    user     : process.env.DB_USER || 'bc7e1df34d77af',
    password : process.env.DB_PASSWORD || 'b6399cc8',
    database : process.env.DB_NAME || 'heroku_ac468cfa66a9631'
  }
}