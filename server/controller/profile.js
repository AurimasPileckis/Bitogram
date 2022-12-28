import express from 'express'
import db from '../database/connect.js'
import upload from '../middleware/multer.js'

const Router = express.Router()

Router.get('/', async (req, res) => {
    try {
        const profiles = await db.Profile.findAll()
        res.json(profiles)
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

Router.get('/single/:id', async (req, res) => {
    try {
        const profiles = await db.Profile.findByPk(req.params.id)
        res.json(profiles)
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

Router.post('/new', upload.single('photo'), async (req, res) => {
    try {
        if(req.file)
            req.body.photo = '/uploads/' + req.file.filename

        await db.Profile.create(req.body)
        res.send('Profilis sėkmingai sukurtas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.put('/edit/:id', upload.single('photo'), async (req, res) => {
    try {
        if(req.file)
            req.body.photo = '/uploads/' + req.file.filename

        const profiles = await db.Profile.findByPk(req.params.id)
        await profiles.update(req.body)
        res.send('Profilis sėkmingai atnaujintas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.delete('/delete/:id', async (req, res) => {
    try {
        const profile = await db.Profile.findByPk(req.params.id)
        await profile.destroy()
        res.send('Profilis sėkmingai ištrintas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

export default Router