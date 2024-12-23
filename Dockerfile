# Step 1: Build the React app
FROM node:20-alpine AS builder
WORKDIR /app

# Accept build-time environment variables (build args)
ARG VITE_KC_URL
ARG VITE_KC_REALM
ARG VITE_KC_CLIENT_ID

# Set environment variables for the React build process
ENV VITE_KC_URL=$VITE_KC_URL
ENV VITE_KC_REALM=$VITE_KC_REALM
ENV VITE_KC_CLIENT_ID=$VITE_KC_CLIENT_ID

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Step 2: Serve the React app with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
