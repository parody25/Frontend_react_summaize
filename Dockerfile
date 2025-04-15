# Use an official Node runtime as a parent image
FROM node:16

COPY frontend/ReactUIGenAI /app/

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and install dependencies
# COPY package*.json /app/
RUN npm install

# Copy the rest of the React app code
# COPY . /app/

# Build the React app for production
RUN npm run build

# Serve the app using a simple static server
RUN npm install -g serve

# Expose port 5000 to access the frontend
EXPOSE 5000

# Command to run the application
CMD ["serve", "-s", "build", "-l", "5000"]
