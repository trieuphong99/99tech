
# Express TypeScript CRUD API

  

This is a simple CRUD API built using ExpressJS and TypeScript. It uses SQLite as a database for data persistence.

  

## Setup

  

1. Clone the repository:

```bash

	git clone <repository-url>

	cd 'Problem 5: A CRUD Server'

```

  

2. Install dependencies:

```bash

	npm install

	npm install -g ts-node nodemon

```

  

3. Run the application:

```bash

	npm start

```

  

The server will start at `http://localhost:3000`.

  

## API Endpoints

  

-  **POST /api/resources**: Create a new resource

- Request Body:

```json

{

	"name": "Resource Name",

	"description": "Resource Description"

}

```

- Example:

```

	curl -X POST http://localhost:3000/api/resources \

	-H "Content-Type: application/json" \

	-d '{

	"name": "New Resource",

	"description": "This is a new resource."

	}'

```

  
  

-  **GET /api/resources**: List resources (with optional filters)

- Query Parameters: `name`, `description`

- Example:

```

	curl http://localhost:3000/api/resources

	curl "http://localhost:3000/api/resources?name=New%20Resource"

```

  

-  **GET /api/resources/:id**: Get a resource by ID

- Example:

```

	curl http://localhost:3000/api/resources/1

```

  

-  **PUT /api/resources/:id**: Update a resource by ID

- Request Body:

```json

{

	"name": "Updated Name",

	"description": "Updated Description"

}

```

- Example:

```

	curl -X PUT http://localhost:3000/api/resources/1 \

	-H "Content-Type: application/json" \

	-d '{

	"name": "Updated Resource",

	"description": "This is the updated resource description."

}'

```

  

-  **DELETE /api/resources/:id**: Delete a resource by ID

- Example:

```

	curl -X DELETE http://localhost:3000/api/resources/1

```

## Database

  

The application uses SQLite and will create a database file named `database.db` in the root directory.