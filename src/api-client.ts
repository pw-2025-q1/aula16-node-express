const BASE_URL = 'http://localhost:3000';

['POST', 'PUT', 'DELETE', 'PATCH'].forEach(method => {
    fetch(`${BASE_URL}/api`, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({key: `value sent via ${method}`})
    })
    .then(response => response.json())
    .then(response => console.log(`${method} response:`, response))
    .catch(error => console.error(`${method} error:`, error));
});


