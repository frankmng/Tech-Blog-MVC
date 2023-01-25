const commentFormHandler = async (event) => {

	event.preventDefault();
	const id = window.location.toString().split('/')[
 	window.location.toString().split('/').length - 1];

	const description = document.querySelector('#comment-description').value
	try {
		const response = await fetch(`/api/post/${id}`, {
			method: 'POST',
			body: JSON.stringify({ 
				description, 
			}),
			headers: { 'Content-Type': 'application/json' },
	});
	if (response.ok) {
			window.location.replace(`/post/${id}`);
	} else {
			alert('Failed to add comment');
			}
	}
	catch(err) {
			res.status(400).json(err);
	}
};
        

document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);