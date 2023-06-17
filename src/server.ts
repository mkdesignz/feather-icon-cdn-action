import express from 'express';
import rateLimit from 'express-rate-limit';
import http from 'http';
import { api } from './api/api-index';
import * as variables from './config/variables';
import { environment } from './config/environment';

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
const app = express();
app.use(environment);
const server = new http.Server(app);
app.use(apiLimiter);
app.use('/', api);
app.set('port', variables.Server.httpPort || 3000);

server.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});
