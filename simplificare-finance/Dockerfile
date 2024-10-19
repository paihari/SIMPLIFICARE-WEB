# Use the official Node.js image
FROM node:16

# Create and set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . ./

# Pass build-time environment variables to React using ARG and ENV
# The ARG is passed in at build-time, and ENV makes it available to npm scripts
# ARG APP_API_TOKEN
# ENV REACT_APP_API_TOKEN=${APP_API_TOKEN}
# ARG APP_BASE_URL
# ENV REACT_APP_BASE_URL=${APP_BASE_URL}

# Build the React app
RUN npm run build

# Install a lightweight HTTP server to serve the app
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Serve the app
CMD ["serve", "-s", "build"]
