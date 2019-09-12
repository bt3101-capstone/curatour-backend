# Select particular version instead of latest
FROM node:12.9.0-slim as base
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y build-essential && apt-get install -y python
RUN mkdir -p /srv/app
COPY . /srv/app
WORKDIR /srv/app

# Install production dependencies
RUN npm install --production
RUN npm install bcrypt

# Expose port for access outside of container
ENV PORT 3000
EXPOSE $PORT

CMD ["npm", "start"]