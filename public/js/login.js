
const signupFormHandler = async (event) => {
    event.preventDefault();

    // get sign up values from input form using value
    const name = document.querySelector('#username-signup').value
    const password = document.querySelector('#password-signup').value

    try {
		const response = await fetch('/api/user/signup', {
			method: 'POST',
			body: JSON.stringify({ 
				name, 
				password 
			}),
				headers: { 'Content-Type': 'application/json' },
   		});
		if (response.ok) {
			window.location.replace('/');
		} else {
			alert(response.statusText);
			}
		}
		catch(err) {
			res.status(400).json(err);
		}
	}

  const loginFormHandler = async (event) => {
      event.preventDefault();

	  const name = document.querySelector('#name-login').value
	  const password = document.querySelector('#password-login').value

	try {
		const response =  await fetch('/api/user/login', {
			method: 'POST',
			body: JSON.stringify({ 
				name, 
				password 
			}),
				headers: { 'Content-Type': 'application/json' },
		});
		if (response.ok){
			window.location.replace('/')
		}
		else {
			alert('Incorrect username or password.');
		}
	}
	catch(err){
		res.status(400).json(err);
	}
  }

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

