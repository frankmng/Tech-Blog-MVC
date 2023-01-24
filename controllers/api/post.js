const { Router } = require('express');
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

const postRouter = new Router();

postRouter.post('/', withAuth, async (req, res) => {
    const { name, description } = req.body;

    try {
			const postData =  await Post.create({
					name,
					description,
					user_id: req.session.user_id,
			});
			res.status(200).json(postData);
    } catch(err){
			res.status(400).json(err)
    }
})

postRouter.put('/:id', withAuth, async (req, res) => {
	const { name, description } = req.body;
	try {
		
			const post = await Post.update(
				{
					name,
					description,
				},
				{
					where: {
							id: req.params.id,
					},
				}
		);
			res.status(200).json(post);
	} catch (err) {
			res.status(500).json(err);
	}
});

module.exports = postRouter;