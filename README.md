# Notional Machine Evaluator

A modern, interactive web application that allows users to submit their notional machines and receive comprehensive AI-powered evaluations for computer science education.

## 🎯 Overview

A notional machine is a simplified, conceptual model of how a computer or programming language works, used as a pedagogical tool in computer science education. This application provides an automated evaluation system using OpenAI's GPT-4 to assess the quality, clarity, and pedagogical value of notional machine descriptions.

## ✨ Features

- **Interactive Web Interface**: Clean, modern UI built with React and Tailwind CSS
- **AI-Powered Evaluation**: Comprehensive analysis using OpenAI GPT-4
- **Detailed Feedback**: Scores and suggestions based on educational criteria
- **Reference Library**: Curated collection of academic resources
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Rate Limiting**: Built-in protection against abuse
- **Database Storage**: Persistent storage of evaluations and analytics

## 🏗️ Architecture

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js with Express
- **Database**: MongoDB with Mongoose
- **AI Integration**: OpenAI GPT-4 API
- **Security**: Helmet, CORS, Rate limiting

### Deployment
- **Hosting**: Google Cloud Run
- **CI/CD**: GitHub Actions
- **Database**: MongoDB Atlas
- **Container**: Docker

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- OpenAI API key

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd NotionalMachine

# Install all dependencies
npm run install:all

# Set up environment variables
cp backend/.env.example backend/.env
# Edit backend/.env with your configuration

# Start development servers
npm run dev
```

Visit http://localhost:3000 to see the application.

For detailed setup instructions, see [SETUP.md](SETUP.md).

## 🎮 Usage

1. **Home Page**: Learn about notional machines and how to use the evaluator
2. **Evaluation Page**: Submit your notional machine description for AI analysis
3. **References Page**: Explore academic resources and research papers

### Evaluation Process

1. Fill out the evaluation form with:
   - Title of your notional machine
   - Programming language/concept
   - Target audience (optional)
   - Detailed description

2. Submit for AI analysis

3. Receive comprehensive feedback including:
   - Overall score (0-100)
   - Detailed analysis
   - Specific suggestions for improvement

## 📊 Evaluation Criteria

The AI evaluates notional machines based on four key criteria:

- **Clarity and Accuracy** (25 points): How clearly and accurately the notional machine represents the programming concept
- **Pedagogical Value** (25 points): Effectiveness for teaching the target audience
- **Completeness** (25 points): Coverage of essential aspects of the concept
- **Accessibility** (25 points): Appropriateness for the target audience and ease of understanding

## 🛠️ Development

### Scripts

```bash
# Install dependencies
npm run install:all

# Development
npm run dev              # Start both frontend and backend
npm run dev:frontend     # Frontend only
npm run dev:backend      # Backend only

# Building
npm run build           # Build both
npm run build:frontend  # Frontend only
npm run build:backend   # Backend only

# Production
npm start              # Start production server
```

### Project Structure

```
NotionalMachine/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   └── ...
│   └── ...
├── backend/            # Express backend API
│   ├── routes/         # API routes
│   ├── models/         # Database models
│   └── ...
├── .github/workflows/  # GitHub Actions
└── ...
```

## 🚢 Deployment

The application is designed for deployment on Google Cloud Platform with MongoDB Atlas:

### Automatic Deployment
- Push to `main` branch triggers GitHub Actions workflow
- Builds Docker image and deploys to Google Cloud Run
- Serves both frontend and backend from single container

### Manual Deployment
See [SETUP.md](SETUP.md) for detailed deployment instructions.

## 🔒 Security

- Rate limiting on API endpoints
- Input validation and sanitization
- Secure environment variable handling
- CORS configuration
- Helmet.js security headers

## 📈 Monitoring

- Health check endpoint: `/api/health`
- Evaluation statistics: `/api/evaluate/stats`
- Google Cloud logging integration
- Performance monitoring via Cloud Run metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Research on notional machines by Juha Sorva and other CS education researchers
- OpenAI for providing the GPT-4 API for evaluations
- The computer science education community for inspiring this tool

## 📚 References

See the [References page](src/pages/References.jsx) in the application for a comprehensive list of academic resources on notional machines and computer science education research.
