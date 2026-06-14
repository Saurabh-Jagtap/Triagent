import express, {type Application, type Request, type Response, type NextFunction} from 'express'
import { ApiError } from './utils/ApiError.js';

const app:Application = express();

app.get('/', (req: Request, res: Response) => res.json({ message: "Hello from server",status: "ok" }))
app.get("/health", (req: Request, res: Response) => res.json({ status: "ok" }));

app.use(express.json());

// global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
    return;
  }
  console.error(err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

export default app;