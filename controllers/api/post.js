const { Router } = require('express');
const { Post, Comment } = require('../../models');
const isLoggedIn = require('../../middleware/auth');

const postRouter = new Router();

// add a new post
postRouter.post('/', isLoggedIn, async (req, res) => {
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

// edit a single post
postRouter.put('/edit/:id', isLoggedIn, async (req, res) => {
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

// add a comment
postRouter.post('/:id', isLoggedIn, async (req, res) => {
    const { description } = req.body;
		const { id } = req.params;

    try {
			const commentData =  await Comment.create({
					description,
					post_id: id,
					user_id: req.session.user_id,
			});
			res.status(200).json(commentData);
    } catch(err){
			res.status(400).json(err)
    }
})

// delete a single post
postRouter.delete('/delete/:id', isLoggedIn, async (req, res) => {
	try {
		const post = await Post.destroy({
			where: {
				id: req.params.id,
				user_id: req.session.user_id,
			}
		});

		if (!post) {
			res.status(404).json({ message: 'No post found with this id!' });
			return;
		  }
		  res.status(200).json(post);

	} catch(err) {
		res.status(500).json(err);
	}
});

module.exports = postRouter;