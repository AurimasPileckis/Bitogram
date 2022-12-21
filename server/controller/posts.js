import express from 'express'
import db from '../database/connect.js'
import upload from '../middleware/multer.js'

const Router = express.Router()

Router.get('/', async (req, res) => {
  
    try {
        const post = await db.Posts.findAll({
            include: [
                { 
                    model: db.Users,
                    attributes: ['first_name', 'last_name', 'photo']
                },
            ]
        })
        res.json(post)
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

Router.get('/:id', async (req, res) => {
    try {
        const post = await db.Posts.findByPk(req.params.id)
        res.json(post)
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

Router.post('/', upload.single('post_photo'), async (req, res) => {
    try {
        if(req.file)
            req.body.post_photo = '/uploads/' + req.file.filename

        await db.Posts.create(req.body)
        res.send('Naujas įrašas sėkmingai paskelbtas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išsaugant duomenis')
    }
})



export default Router