const editPostFormHandler = async (event) => {
	event.preventDefault();
	const id = window.location.toString().split('/')[
  window.location.toString().split('/').length - 1];

	const name = document.querySelector('#post-name').value;
	const description = document.querySelector('#post-description').value
	try {
		const response = await fetch(`/api/post/${id}`, {
			method: 'PUT',
			body: JSON.stringify({ 
				name, 
				description, 
			}),
			headers: { 'Content-Type': 'application/json' },
	});
	if (response.ok) {
			window.location.replace('/dashboard');
	} else {
			alert('Failed to create post');
			}
	}
	catch(err) {
			res.status(400).json(err);
	}
};
        

document
  .querySelector('.edit-post-form')
  .addEventListener('submit', editPostFormHandler);