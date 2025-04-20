FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Create a server.js file to start the application
RUN cat <<EOF > server.js
const app = require('./app');

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    console.log(\`Ride service running on port \${PORT}\`);
});
EOF

EXPOSE 3003

CMD ["node", "server.js"]
