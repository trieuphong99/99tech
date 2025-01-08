import express, { Request, Response, NextFunction } from "express";
import { AppDataSource } from "./config/database";
import bodyParser from "body-parser";
import resourceRoutes from "./routes/resource.route";

const app = express();

app.use(express.json());

// Parse incoming JSON requests
app.use(bodyParser.json());

// Set up routes
app.use("/api/resources", resourceRoutes);

// Global error handler (optional)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const port = process.env.PORT || 3000;

// Initialize TypeORM and start the server
AppDataSource.initialize()
  .then(() => {
    console.log("Database connection established");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log("Error initializing database", error));

