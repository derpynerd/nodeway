FROM node:22-alpine

# Run as non-privileged user
RUN useradd -ms /bin/sh -u 1001 app
USER app

# Set working directory inside docker container to /app
WORKDIR /app

# Copy package*.json files into working directory
COPY package.json package-lock.json ./
RUN npm install

# COPY all application files into working directory
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]