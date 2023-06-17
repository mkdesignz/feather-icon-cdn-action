import express from 'express';
import rateLimit from 'express-rate-limit';
import http from 'http';
import { api } from './api/api-index';
import * as variables from './config/variables';
import { environment } from './config/environment';

const apiLimiter = rateLimit({
  windowMs: variables.rateLimit.windowMs, // 15 minutes
  max: variables.rateLimit.max, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
const app = express();
app.use(environment);
app.use('/assets', express.static('public/assets'));
const server = new http.Server(app);
app.use(apiLimiter);
app.use('/api', api);
app.set('port', variables.Server.httpPort || 3000);

server.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});
