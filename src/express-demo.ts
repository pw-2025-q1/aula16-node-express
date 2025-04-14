import express, { NextFunction, Request, Response } from 'express';
import path from 'path';

const app = express();
const port: number = 3000;

// routes must be associated with middleware
app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Home Page</h1><p>Welcome to our Express server</p>');
});

// response with headers and status code
app.get('/header', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/html');
    res.send('<h1>Header Example</h1><p>This response has a custom header</p>');
});

/**
 * Dynamic route with different status code
 */
app.get("/internal-error", (req: Request, res: Response) => {
    res.status(500).send("Internal server error")
});

// routes should have reponses, otherwise they will be dangling
app.get('/dangling', (req: Request, res: Response) => {
    // Não envia uma resposta
    console.log('Rota pendente');
});

// router only match the first middleware on the stack
app.get('/route1', (req: Request, res: Response) => {
    res.send('First match');
});

app.get('/route1', (req: Request, res: Response) => {
    res.send('Second match');
});

// routes can be linked together
app.get('/route2', (req: Request, res: Response, next: NextFunction) => {
    res.write('First match\n');
    next();
});

app.get('/route2', (req: Request, res: Response, next: NextFunction) => {
    res.write('Second match\n');
    next();
});

app.get('/route2', (req: Request, res: Response) => {
    res.end('Third match\n');
});

// A middleware that logs the request method and path for all incoming requests
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Method: ${req.method}, Path: ${req.path}`);
    next();
});


/**
 * Using a middleware without router
 */
app.use('/static', express.static(path.join(__dirname, '../public')));



/**
 * Route that accepts a POST method
 * Additionally, it ends a chain
 */
// app.post("/", (req, res) => {
//     res.write("<p>You made a POST request</p>")
//     res.end()
// })

/**
 * Route with string pattern matching
 * Will match: /userdetails, /userrrrrrrDetails, etc.
 */
// app.get("/user+details", (req, res) => res.send(req.originalUrl))

/**
 * Route with regular expression pattern matching
 * Will match any path that contains ufabc
 */
// app.get(/ufabc/, (req, res) => res.send(req.originalUrl))

/**
 * Middleware that parses a query string
 */
// app.get('/query', (req, res) => res.json(req.query))

/**
 * Middleware that renders data extracted from the query string
 */
// app.get('/hello', (req, res) => {
//     if (req.query && "fname" in req.query && "lname" in req.query) {
//         res.send(`<p>Hello, ${req.query.fname} ${req.query.lname}!</p>`)
//     }
//     res.send("Usage: /hello/<first-name>/<last-name>")        
// })

// middleware to parse request bodies (only parse those which are url-encoded)


/**
 * Middleware that process form data
 */
// declare global {
//     namespace Express {
//         export interface Request {
//             data?: any
//         }
//     }
// }

// app.get("/process2", (req, res, next) => {
//     req.data = req.query
//     next()
// })

// app.post("/process2", e.urlencoded({extended: true}), (req, res, next) => {
//     req.data = req.body
//     next()
// })

// app.all("/process2", (req, res) => {
//     const data = req.data
//     const isValid = data
//         && "first-name" in data
//         && "last-name" in data
//         && (data["first-name"]?.toString().trim().length || 0) > 0
//         && (data["last-name"]?.toString().trim().length || 0) > 0

//     if (isValid) {
//         res.send(`Hello, ${data['first-name']} ${data['last-name']}.
//             Welcome to our Website.`)
//     } else {
//         res.send("Both first name and last name are required")
//     }
// })

/**
 * Route parameters
 */
// app.get('/name/:fname/:lname', (req, res) => {
//     console.info(req.params)
//     res.send(`Hello, ${req.params.fname} ${req.params.lname}!`)
// })

/**
 * Serving static files with route params
 */
// app.get('/users/:userid/profile_photo', (req, res) => 
//     res.sendFile(path.join(IMG_DIR, `profile_photo_${req.params.userid}.jpeg`)))

/**
 * Middleware that throws an error
 */
// app.get('/break-it', (req, res) => {
//     throw new Error('Uh-oh')
// })

/**
 * Error handling middleware
 * (Always has 4 parameters)
 */
// app.use((err: Error, req: e.Request, res: e.Response, next: e.NextFunction) => {
//     console.error(err)
//     res.status(500).send('Something broke!')
// })

/**
 * Routes for the same path `/api` with different HTTP methods
 */
app.use('/api', express.json()); // Middleware to parse JSON bodies
app.use('/api', express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.post('/api', (req: Request, res: Response) => {
    res.send({ message: 'POST request received', data: req.body });
});

app.put('/api', (req: Request, res: Response) => {
    res.send({ message: 'PUT request received', data: req.body });
});

app.delete('/api', (req: Request, res: Response) => {
    res.send({ message: 'DELETE request received', data: req.body });
});

app.patch('/api', (req: Request, res: Response) => {
    res.send({ message: 'PATCH request received', data: req.body });
});

// route with query string parsing
app.get('/query', (req, res) => {
    res.json(req.query)
});

// route with headers parsing
app.get('/headers', (req, res) => {
    res.json(req.headers)
})

// route with route params
app.get('/name/:fname/:lname', (req, res) => {
    res.send(`Hello, ${req.params.fname} ${req.params.lname}!`)
})

// route with optional params
app.get('/user{/:userid}', (req, res) => {
    if (req.params.userid) {
        res.send(`User ID: ${req.params.userid}`);
    } else {
        res.send('No User ID provided');
    }
})

/**
 * Middleware that throws an error
 */
app.get('/break-it', (req, res) => {
    throw new Error('Uh-oh')
})

/**
 * Error handling middleware
 * (Always has 4 parameters)
 */
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err)
    res.status(500).send('Something broke! Our developers are working on it!')
})



// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});