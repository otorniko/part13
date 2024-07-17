const Blog = require("./blog")
const User = require("./user")
const Readinglist = require("./readinglist")
const Session = require("./session")

User.hasMany(Blog)
Blog.belongsTo(User)

User.hasOne(Readinglist, { foreignKey: "userId", as: "reading_list" })
Readinglist.belongsTo(User, { foreignKey: "userId", as: "user" })
User.belongsToMany(Blog, { through: Readinglist, as: "reading" })
Blog.belongsToMany(User, { through: Readinglist, as: "user_readinglist" })


User.hasMany(Session)
Session.belongsTo(User)


module.exports = {
    User,
    Blog,
    Readinglist,
    Session
}
