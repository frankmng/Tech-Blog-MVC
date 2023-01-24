
const postFormHandler = async (event) => {
    event.preventDefault();
    
    const name = document.querySelector('#post-name').value;
    const description = document.querySelector('#post-description').value
    try {
        const response = await fetch('/api/post', {
        method: 'POST',
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
  .querySelector('.post-form')
  .addEventListener('submit', postFormHandler);


