# Use the official Node.js image as a base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY . . 
RUN npm install

# Install the dependencies
# Copy the prisma directory and other application code (including src)
RUN npx prisma generate
# Generate Prisma client
RUN npm run build

# Expose port 3000
EXPOSE 3000
# Run the application
CMD ["/app/entrypoint.sh"]