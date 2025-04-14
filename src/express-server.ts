import express, { Request, Response } from 'express';

const app = express();
const port: number = 3000;

// Home route
app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Home Page</h1><p>Welcome to our Express server</p>');
});

// API route
app.get('/api/users', (req: Request, res: Response) => {
  const users = [
    { id: 1, name: 'Maria Santos' },
    { id: 2, name: 'João Silva' }
  ];
  res.json(users);
});

// 404 route
app.use((req: Request, res: Response) => {
  res.status(404).send('<h1>404 - Not Found</h1><p>The page you are looking for does not exist.</p>');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});