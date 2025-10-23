# Notional Machine Evaluator - Setup Guide

This guide will help you set up the Notional Machine Evaluator web application locally and deploy it to production.

## Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)
- OpenAI API key
- Docker (optional, for containerized deployment)

## Local Development Setup

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd NotionalMachine

# Install dependencies for both frontend and backend
npm run install:all
```

### 2. Environment Configuration

Copy the example environment file and configure your settings:

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your configuration:

```env
NODE_ENV=development
PORT=3001
MONGODB_URI=mongodb://localhost:27017/notional-machine
OPENAI_API_KEY=your_openai_api_key_here
FRONTEND_URL=http://localhost:3000
```

### 3. Database Setup

**Option A: Local MongoDB**
- Install MongoDB locally
- Start MongoDB service: `mongod`

**Option B: MongoDB Atlas**
- Create a MongoDB Atlas account
- Create a new cluster
- Get the connection string and update `MONGODB_URI` in your `.env` file

### 4. OpenAI API Setup

1. Sign up for an OpenAI account at https://platform.openai.com/
2. Generate an API key
3. Add the key to your `.env` file as `OPENAI_API_KEY`

### 5. Start Development Servers

```bash
# Start both frontend and backend simultaneously
npm run dev

# Or start them separately:
npm run dev:backend  # Backend on http://localhost:3001
npm run dev:frontend # Frontend on http://localhost:3000
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Docker Development Setup

If you prefer using Docker:

```bash
# Create .env file with OPENAI_API_KEY
echo "OPENAI_API_KEY=your_key_here" > .env

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

## Production Deployment

### Google Cloud Platform Setup

1. **Create GCP Project**
   ```bash
   gcloud projects create your-project-id
   gcloud config set project your-project-id
   ```

2. **Enable Required APIs**
   ```bash
   gcloud services enable run.googleapis.com
   gcloud services enable containerregistry.googleapis.com
   ```

3. **Set up MongoDB Atlas**
   - Create a MongoDB Atlas cluster
   - Configure network access and database user
   - Get connection string

### GitHub Actions Deployment

1. **Set up Repository Secrets**
   
   Go to your GitHub repository → Settings → Secrets and variables → Actions
   
   Add these secrets:
   - `GCP_PROJECT_ID`: Your Google Cloud project ID
   - `GCP_SA_KEY`: Service account key JSON (base64 encoded)
   - `MONGODB_URI`: MongoDB Atlas connection string
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `FRONTEND_URL`: Your production frontend URL

2. **Create Service Account**
   ```bash
   gcloud iam service-accounts create github-actions \
     --display-name="GitHub Actions"
   
   gcloud projects add-iam-policy-binding your-project-id \
     --member="serviceAccount:github-actions@your-project-id.iam.gserviceaccount.com" \
     --role="roles/run.admin"
   
   gcloud projects add-iam-policy-binding your-project-id \
     --member="serviceAccount:github-actions@your-project-id.iam.gserviceaccount.com" \
     --role="roles/storage.admin"
   
   gcloud iam service-accounts keys create key.json \
     --iam-account=github-actions@your-project-id.iam.gserviceaccount.com
   ```

3. **Deploy**
   
   Push to the main branch to trigger automatic deployment:
   ```bash
   git push origin main
   ```

### Manual Deployment

If you prefer manual deployment:

```bash
# Build the application
npm run build

# Build and push Docker image
docker build -t gcr.io/your-project-id/notional-machine:latest .
docker push gcr.io/your-project-id/notional-machine:latest

# Deploy to Cloud Run
gcloud run deploy notional-machine-api \
  --image gcr.io/your-project-id/notional-machine:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production \
  --set-env-vars MONGODB_URI="your-mongodb-uri" \
  --set-env-vars OPENAI_API_KEY="your-openai-key"
```

## Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment mode | No | development |
| `PORT` | Server port | No | 3001 |
| `MONGODB_URI` | MongoDB connection string | Yes | - |
| `OPENAI_API_KEY` | OpenAI API key | Yes | - |
| `FRONTEND_URL` | Frontend URL for CORS | No | http://localhost:3000 |

### Rate Limiting

The application includes rate limiting:
- General API: 100 requests per 15 minutes per IP
- Evaluation endpoint: 10 requests per hour per IP

## Monitoring and Maintenance

### Health Check

The application provides a health check endpoint:
```
GET /api/health
```

### Database Indexes

The application automatically creates necessary database indexes for optimal performance.

### Logs

- Development: Console logs
- Production: Use `gcloud logs tail` or Google Cloud Console

## Troubleshooting

### Common Issues

1. **MongoDB Connection Issues**
   - Check MongoDB URI format
   - Verify network access for MongoDB Atlas
   - Ensure database user has correct permissions

2. **OpenAI API Issues**
   - Verify API key is correct
   - Check OpenAI account billing and quota
   - Monitor rate limits

3. **CORS Issues**
   - Verify `FRONTEND_URL` environment variable
   - Check origin in CORS configuration

### Getting Help

- Check application logs
- Review MongoDB and OpenAI service status
- Verify environment variables are set correctly

## Security Considerations

- Keep OpenAI API key secure
- Use MongoDB Atlas network restrictions
- Implement proper authentication for production use
- Monitor API usage and costs
- Regularly update dependencies 