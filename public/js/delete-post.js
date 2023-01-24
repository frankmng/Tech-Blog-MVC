const deletePostHandler = async (event) => {
	// get post id from the data attribute
	try {
			const id = event.target.getAttribute('data-id');
	
			const response = await fetch(`/api/post/delete/${id}`, {
				method: 'DELETE',
			});

		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert('Failed to delete post');
			}
	} catch (err) {
		res.status(400).json(err);
	}

}

document
  .querySelector('#delete-post')
  .addEventListener('click', deletePostHandler)

