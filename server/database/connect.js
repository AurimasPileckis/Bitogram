import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise'
import Profile from '../model/profile.js'
import Users from '../model/users.js'
import Posts from '../model/posts.js'
import Comments from '../model/comments.js'


const database = {}

const credentials = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'instagram'
}

try {
    const connection = await mysql.createConnection({
        host: credentials.host,
        user: credentials.user,
        password: credentials.password
    })

    await connection.query('CREATE DATABASE IF NOT EXISTS ' + credentials.database)

    const sequelize = new Sequelize(credentials.database, credentials.user, credentials.password, { dialect: 'mysql'})

    database.Users = Users(sequelize)
    database.Profile = Profile(sequelize)
    database.Posts = Posts(sequelize)
    database.Comments = Comments(sequelize)

    database.Users.hasMany(database.Posts)
    database.Posts.belongsTo(database.Users)

    database.Posts.hasMany(database.Comments)
    database.Comments.belongsTo(database.Users)
    
    await sequelize.sync({ alter: true })

} catch (error) {
    console.log(error)
    console.log('Failed connect to database')

}
export default database