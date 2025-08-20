# ATS Resume Checker

![login](https://github.com/user-attachments/assets/ab2804c2-c171-473e-a110-47f84af71165)
Basic Modal Login



https://github.com/user-attachments/assets/5c57f02f-fb23-47cc-800b-a0b34e7c1ba0
Analyzing Resume


![cover_letter](https://github.com/user-attachments/assets/fb225e8c-c813-434f-9f73-1dd0b2994b42)
Cover Letter Generation

## 📋 Overview

ATS Resume Checker is a powerful web application that helps job seekers optimize their resumes for Applicant Tracking Systems (ATS). The application analyzes resumes against job descriptions using Google's Gemini AI, providing detailed feedback, scores, and suggestions to improve resume compatibility with automated screening systems.

## ✨ Features

- **Resume Analysis**: Upload your resume and get a detailed ATS compatibility analysis
- **Keyword Analysis**: Identify matched and missing keywords from the job description
- **Skill Gap Analysis**: Understand the gaps between your skills and job requirements
- **ATS Compatibility Score**: Get an overall score for how well your resume matches the job
- **Detailed Suggestions**: Receive actionable recommendations to improve your resume
- **Cover Letter Generation**: Automatically generate tailored cover letters based on your resume and job descriptions
- **Resume Storage**: Save and manage multiple resumes in your account
- **User Authentication**: Secure login and user-specific resume storage

## 🛠️ Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js Server Actions
- **AI**: Google Gemini 2.5 Flash (via Genkit and Google AI SDK)
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore (NoSQL)
- **Storage**: Firebase Storage (for resume files and images)
- **PDF Processing**: PDF.js, pdf-to-img

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Google Cloud account with Gemini API access
- Firebase project with Authentication, Firestore, and Storage enabled

### Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   # Google Gemini API Key
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=1:your_app_id_here
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 📊 How It Works

1. **Upload Resume**: Users upload their resume in PDF format
2. **Enter Job Details**: Users enter the job description, company name, and job title
3. **AI Analysis**: Google Gemini AI analyzes the resume against the job description
4. **Results**: The application displays detailed analysis results, including:
   - Overall ATS compatibility score
   - Matched and missing keywords
   - Skill gap analysis
   - Experience and qualification match
   - Detailed suggestions for improvement
5. **Cover Letter**: Users can generate a tailored cover letter based on their resume and job details

## 🔒 Firebase Setup

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Authentication, Firestore Database, and Storage services
3. Set up Firestore security rules to protect user data
4. Configure Firebase Storage CORS settings using the provided `cors.json` file

### Firebase Configuration

Replace the placeholder values in `firebase.ts` with your own Firebase project configuration by setting up environment variables:

```typescript
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};
```

### Firebase Storage Security Rules

Set up the following security rules in your Firebase Storage console to ensure only authenticated users can access their own resumes:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /resumes/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Firestore Security Rules

Set up the following security rules in your Firestore console to protect user data:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /resumes/{resumeId} {
      // A user can read a resume document if their UID matches the one in the document
      allow read: if request.auth != null && request.auth.uid == resource.data.uid;

      // A user can create a resume document if their UID is in the new document
      allow create: if request.auth != null && request.auth.uid == request.resource.data.uid;
      
      // A user can update their own resume document
      allow update: if request.auth != null && request.auth.uid == resource.data.uid;
      
      // A user can delete their own resume document
      allow delete: if request.auth != null && request.auth.uid == resource.data.uid;
    }
  }
}
```

### Firebase Storage CORS Configuration

For development, use the provided `cors.json` file. For production, update the origins in the `cors.json` file with your production domain and then run:

```bash
# Install Google Cloud SDK if you haven't already
# https://cloud.google.com/sdk/docs/install

# Authenticate with Google Cloud
gcloud auth login

# Set your project ID
gcloud config set project YOUR_PROJECT_ID

# Set CORS configuration for your storage bucket
gcloud storage buckets update gs://YOUR_STORAGE_BUCKET_NAME --cors-file=cors.json
```

The `cors.json` file should look like this:

```json
[
  {
    "origin": ["http://localhost:3000", "https://your-production-domain.com"],
    "method": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    "maxAgeSeconds": 3600,
    "responseHeader": ["Content-Type", "Authorization"]
  }
]
```

## 🧠 Google Gemini AI Integration

The application uses Google's Gemini 2.5 Flash model for:
1. Analyzing resumes against job descriptions
2. Generating tailored cover letters
3. Providing detailed feedback and suggestions

### Getting a Gemini API Key

To obtain a GEMINI_API_KEY:

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key and add it to your `.env.local` file as `GEMINI_API_KEY`

## 📂 Project Structure

```
ats-resume-checker/
├── app/                    # Next.js App Router
│   ├── components/         # React components
│   │   ├── CoverLetterCard.tsx
│   │   ├── Navbar.tsx
│   │   ├── Resume.tsx
│   │   ├── ResumeCard.tsx
│   │   ├── ResumeDetailCard.tsx
│   │   ├── Score.tsx
│   │   └── SignIn.tsx
│   ├── lib/                # Utility functions
│   │   ├── actions.ts      # Server actions for AI processing
│   │   └── utils.tsx       # Helper functions
│   ├── resumes/            # Resume detail pages
│   │   └── [title]/        # Dynamic route for resume details
│   ├── firebase.ts         # Firebase configuration
│   ├── page.tsx            # Home page
│   └── layout.tsx          # Root layout
├── public/                 # Static assets
├── package.json            # Project dependencies
└── next.config.ts          # Next.js configuration
```

## 🚀 Tech Stack

<div align="center">
  <h3>Frontend & Backend</h3>
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript 5" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS 4" />
  
  <h3>AI & Cloud Services</h3>
  <img src="https://img.shields.io/badge/Google_Gemini-2.5_Flash-4285F4?style=for-the-badge&logo=google" alt="Google Gemini 2.5 Flash" />
  <img src="https://img.shields.io/badge/Firebase-Authentication-FFCA28?style=for-the-badge&logo=firebase" alt="Firebase Authentication" />
  <img src="https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase" alt="Firebase Firestore" />
  <img src="https://img.shields.io/badge/Firebase-Storage-FFCA28?style=for-the-badge&logo=firebase" alt="Firebase Storage" />
  
  <h3>Development Tools</h3>
  <img src="https://img.shields.io/badge/ESLint-9-4B32C3?style=for-the-badge&logo=eslint" alt="ESLint 9" />
  <img src="https://img.shields.io/badge/PostCSS-4-DD3A0?style=for-the-badge&logo=postcss" alt="PostCSS 4" />
  
  <h3>PDF Processing</h3>
  <img src="https://img.shields.io/badge/PDF.js-5.4.54-red?style=for-the-badge&logo=adobe-acrobat-reader" alt="PDF.js 5.4.54" />
  <img src="https://img.shields.io/badge/pdf--to--img-4.5.0-blue?style=for-the-badge&logo=adobe-acrobat-reader" alt="pdf-to-img 4.5.0" />
</div>

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Firebase Documentation](https://firebase.google.com/docs) - learn about Firebase services.
- [Google Generative AI SDK](https://ai.google.dev/docs) - learn about Google's AI capabilities.
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework.
