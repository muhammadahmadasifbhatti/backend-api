import express from 'express';
import BusinessRouter from '@routes/business.router';

const app = express();

// Can get from environment variable, but for simplicity, I am hardcoding.
const PORT = 3000; 
const VERSION = 'v1';

app.use(express.json());
app.use(`/api/${VERSION}/business`, BusinessRouter);

// Error middle ware
app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.statusCode || 500).send(err.message);
})

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});