# Multi-stage build for React frontend and Node.js backend

# Stage 1: Build frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

# Stage 2: Setup backend
FROM node:18-alpine AS backend-builder

WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --only=production

# Stage 3: Production image
FROM node:18-alpine

WORKDIR /app

# Copy backend files
COPY backend/ ./backend/
COPY --from=backend-builder /app/backend/node_modules ./backend/node_modules

# Copy built frontend files
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Install serve to serve frontend files
RUN npm install -g serve

# Create a simple script to run both frontend and backend
RUN echo '#!/bin/sh' > start.sh && \
    echo 'serve -s frontend/dist -l 3000 &' >> start.sh && \
    echo 'cd backend && node server.js' >> start.sh && \
    chmod +x start.sh

EXPOSE 3001

CMD ["./start.sh"] 