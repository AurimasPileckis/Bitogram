import express from 'express'
import { auth } from '../middleware/auth.js'
import { commentsValidator } from '../middleware/validate.js'
import db from '../database/connect.js'

const Router = express.Router()

Router.post('/new/:postId', auth, commentsValidator,  async (req, res) => {
    try {
        req.body.postId = req.params.postId
        new db.Comments(req.body).save();
        res.send('Comment saved successfully')
    } catch (error) {
        console.log(error)
        res.status(500).send('Įvyko serverio klaida')
    }
})

Router.delete('/delete/:id', auth, async (req, res) => {
	try {
		const comment = await db.Comments.findByPk(req.params.id);
		comment.destroy();
		res.send('Comment deleted');
	} catch (error) {
		console.log(error);
		res.status(500).send('Server error');
	}
});



export default Router