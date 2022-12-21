import { DataTypes } from 'sequelize'

const Users = (sequelize) => {
    const Schema = {
        full_name: {
            type: DataTypes.STRING, //=VARCHAR(255)
            allowNull: false //neleidžiamas tuščias laukas - Standartinė reikšmė true
        },
        user_name: {
            type: DataTypes.STRING, //=VARCHAR(255)
            allowNull: false //neleidžiamas tuščias laukas - Standartinė reikšmė true
        },
        email: {
            type: DataTypes.STRING, //= TEXT
            allowNull: false
        },
        password: {
            type: DataTypes.STRING, //= TEXT
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bio: {
            type: DataTypes.STRING()
        }
    }

    return sequelize.define('users', Schema)
}

export default Users