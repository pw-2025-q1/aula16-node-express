import * as http from 'http';
import * as url from 'url';

const port: number = 3000;

interface User {
  id: number;
  name: string;
}

const server: http.Server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  // Parse the request URL
  const parsedUrl: url.UrlWithParsedQuery = url.parse(req.url || '', true);
  const path: string = parsedUrl.pathname || '';

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Home Page</h1><p>Welcome to our Node.js server</p>');
  
  // Route handling
  // if (path === '/' || path === '/home') {
  //   // Home route
  //   res.statusCode = 200;
  //   res.setHeader('Content-Type', 'text/html');
  //   res.end('<h1>Home Page</h1><p>Welcome to our Node.js server</p>');
  // } else if (path === '/api/users') {
  //   // API route that returns JSON data
  //   const users: User[] = [
  //     { id: 1, name: 'Maria Santos' },
  //     { id: 2, name: 'João Silva' }
  //   ];
    
  //   res.statusCode = 200;
  //   res.setHeader('Content-Type', 'application/json');
  //   res.end(JSON.stringify(users));
  // } else {
  //   // Not found route
  //   res.statusCode = 404;
  //   res.setHeader('Content-Type', 'text/plain');
  //   res.end('404 - Página não encontrada');
  // }
}
);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});