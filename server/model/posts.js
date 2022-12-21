import { DataTypes } from 'sequelize'

const Posts = (sequelize) => {
    const Schema = {
        post_photo: {
            type: DataTypes.STRING, //=VARCHAR(255)
            allowNull: false //neleidžiamas tuščias laukas - Standartinė reikšmė true
        },
        post_caption: {
            type: DataTypes.STRING
        }
    }

    return sequelize.define('posts', Schema)
}

export default Posts