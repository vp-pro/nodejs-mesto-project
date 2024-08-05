import express, { Response, Request, NextFunction } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import router from './routes';
import errorHandler from './middlewares/error-handler';
import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})



const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(limiter)
app.use(helmet());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '66b0796f46f2e3e1a48da2e6',
  };
  next();
});

app.use('/', router);
app.use(errorHandler);

app.listen(PORT);
