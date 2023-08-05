

fetch('https://tu-sitio-web.com/api/user/v1/login_session', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'david.torres@avanxa.com',
    password: '123momiaes'
  })
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
