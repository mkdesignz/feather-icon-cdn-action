import express from 'express';
import rateLimit from 'express-rate-limit';
import http from 'http';
// import posthog from 'posthog-js';
import helmet from 'helmet';
import { api } from './api/api-index';
import * as variables from './config/variables';
import { environment } from './config/environment';
import { notFound } from './views/errors/404';
import { iconsView } from './views/icons/icons';

const apiLimiter = rateLimit({
  windowMs: variables.rateLimit.windowMs,
  max: variables.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: any, _res) => {
    return req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  },
});
const app = express();

const cspOptions = {
  directives: {
    defaultSrc: ["'self'"],
    imgSrc: ["'self'", "data:", "https://images.unsplash.com"],
    // Add other directives as needed
  },
};
// posthog.init(variables.posthog.public_key, {
//   api_host: 'https://us.i.posthog.com',
//   person_profiles: variables.posthog.person_profiles,
// });

// app.use((req, _res, next) => {
//   posthog.capture('$pageview', {
//     distinct_id: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
//     page: req.originalUrl,
//   });
//   console.log(req.headers['x-forwarded-for'], req.socket.remoteAddress);
//   next();
// });

app.use(environment);
app.use(helmet.contentSecurityPolicy(cspOptions));

app.use('/assets', express.static('public/assets'));
app.use(apiLimiter);
const server = new http.Server(app);
app.use('/api', api);
app.use('/icons', iconsView);
app.use(notFound);
app.set('port', variables.Server.httpPort || 3000);

server.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});
