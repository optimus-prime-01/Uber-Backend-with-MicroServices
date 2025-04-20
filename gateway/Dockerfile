FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Replace app.js with a version that uses environment variables
RUN cp app.js app.js.original
RUN cat <<EOF > app.js
const express = require('express');
const expressProxy = require('express-http-proxy');

const app = express();

// Use environment variables for service URLs
const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:3001';
const captainServiceUrl = process.env.CAPTAIN_SERVICE_URL || 'http://localhost:3002';
const rideServiceUrl = process.env.RIDE_SERVICE_URL || 'http://localhost:3003';

app.use('/user', expressProxy(userServiceUrl));
app.use('/captain', expressProxy(captainServiceUrl));
app.use('/ride', expressProxy(rideServiceUrl));

app.listen(3000, () => {
    console.log('Gateway server listening on port 3000');
});
EOF

EXPOSE 3000

CMD ["node", "app.js"]
