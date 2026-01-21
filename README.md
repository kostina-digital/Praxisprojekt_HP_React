# Hogwarts Paradise

A comprehensive React-based web application dedicated to the Harry Potter universe, featuring character exploration, house information, interactive quiz, forum discussions, and user profiles.

## 🚀 Live Demo

The application is hosted on Vercel: [View Live Site](https://your-vercel-url.vercel.app)

## 📋 Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Project Requirements](#project-requirements)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Firebase Configuration](#firebase-configuration)
- [Scripts](#scripts)
- [Deployment](#deployment)

## ✨ Features

- **Character Gallery**: Browse and filter characters by house, staff, or students
- **Houses Information**: Explore detailed information about all four Hogwarts houses
- **Interactive Quiz**: Take a quiz to discover which house you belong to
- **Forum**: Create topics and engage in discussions with other users
- **User Authentication**: Sign up, sign in, and manage your profile
- **Responsive Design**: Fully responsive layout with mobile hamburger menu
- **Image Galleries**: Browse wallpapers and house-related images

## 🛠 Technologies

### Core
- **React** 19.2.0 - UI library
- **React Router DOM** 7.11.0 - Client-side routing
- **Vite** 7.2.4 - Build tool and development server

### UI Libraries & Styling
- **Chakra UI** 3.31.0 - Component library
- **Material-UI (MUI)** 7.3.7 - Additional UI components
- **Tailwind CSS** 3.4.19 - Utility-first CSS framework
- **Emotion** 11.14.0 - CSS-in-JS library

### Forms & Validation
- **React Hook Form** 7.71.1 - Form validation and management

### Backend & Database
- **Firebase** 12.8.0
  - Firebase Authentication - User authentication
  - Cloud Firestore - User data and quiz results storage
  - Realtime Database - Forum topics and replies storage

### Additional Libraries
- **React Icons** 5.5.0 - Icon library
- **React Image Gallery** 1.4.0 - Image gallery component
- **Next Themes** 0.4.6 - Theme management

## 📝 Project Requirements

This project fulfills all the specified requirements:

### ✅ Minimum 3 Pages with Navigation via react-router-dom
- **Implemented**: 15+ pages with full routing
  - Home (`/`)
  - Characters (`/characters`, `/characters/staff`, `/characters/students`)
  - Houses (`/houses`, `/houses/:houseName`)
  - Forum (`/forum`, `/forum/topic/:topicId`, `/forum/create-topic`)
  - Quiz (`/quiz`)
  - Profile (`/profile`)
  - Sign In (`/sign-in`)
  - Sign Up (`/sign-up`)
  - Forgot Password (`/forgot-password`)
  - Contact Us (`/contact-us`)
  - Terms of Service (`/terms-of-service`)
  - Privacy Policy (`/privacy-policy`)
  - 404 Not Found (`*`)

### ✅ Minimum 1 Master View with List/Grid, Minimum 1 Detail View
- **Master Views**:
  - Characters page with grid layout and filtering
  - Houses page with card grid layout
  - Forum page with topic list
- **Detail Views**:
  - House detail page (`/houses/:houseName`) - Shows detailed house information
  - Topic detail page (`/forum/topic/:topicId`) - Shows topic content and replies

### ✅ Minimum 5 Reusable Components
- **Implemented**: 10+ reusable components
  1. `CTAButton` - Call-to-action button with link/onClick support
  2. `CharacterCard` - Character display card
  3. `HouseCard` - House information card
  4. `InfoSection` - Reusable section with image, title, and CTA button
  5. `PaginationComponent` - Pagination controls
  6. `QuizResultsSection` - Quiz results display
  7. `DocumentPage` - Reusable document page layout
  8. `Gallery` - Image gallery component
  9. `TopicCard` - Forum topic card
  10. `ReplyCard` - Forum reply card

### ✅ Minimum 1 Custom Hook
- **Implemented**: `useCharacters` hook
  - Location: `src/hooks/useCharacters.js`
  - Fetches characters data from external API
  - Returns: `{ characters, staff, students, loading, error }`

### ✅ Minimum 1 Form with Validation for Content Creation
- **Implemented**: Multiple forms with validation
  1. **Contact Us Form** (`ContactUsForm.jsx`)
     - Uses React Hook Form for validation
     - Validates: firstName, lastName, email (with pattern), message, agreeToTerms
  2. **Create Topic Form** (`CreateTopic.jsx`)
     - Native HTML5 validation
     - Validates: title (required, maxLength), content (required)
  3. **Sign Up Form** (`SignUp.tsx`)
     - Email, password, and name validation
     - Firebase authentication integration
  4. **Sign In Form** (`SignInSide.tsx`)
     - Email and password validation

### ✅ Usage of useState, useEffect, useContext
- **useState**: Used extensively throughout the application for local component state
- **useEffect**: Used for:
  - Data fetching (`useCharacters` hook)
  - Authentication state tracking
  - URL parameter reading
  - Side effects management
- **useContext**: 
  - `CharactersFilterContext` - Manages character filter state globally
  - `FirebaseContext` - Provides Firebase instance

### ✅ Persistence via Firebase
- **Firebase Authentication**: User sign up, sign in, password reset
- **Cloud Firestore**: 
  - User profiles (`users` collection)
  - Quiz results (stored per user document)
- **Realtime Database**: 
  - Forum topics (`forum/topics`)
  - Forum replies (`forum/replies`)

### ✅ Component Library and/or Tailwind
- **Component Libraries**:
  - Chakra UI - Primary component library
  - Material-UI - Additional components (icons, cards, etc.)
- **Tailwind CSS**: 
  - Utility classes throughout the application
  - Responsive design utilities
  - Custom styling combined with component libraries

### ✅ Hosted on Vercel
- **Deployment**: Application is deployed and accessible on Vercel
- Build command: `npm run build`
- Output directory: `dist`

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase project (for backend functionality)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Praxisprojekt_HP_React
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create Firestore database
   - Create Realtime Database
   - Copy your Firebase configuration to `config/firebase.js`

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

## 📁 Project Structure

```
src/
├── assets/
│   └── images/          # Image assets
├── components/
│   ├── common/          # Reusable components
│   │   ├── CTAButton.jsx
│   │   ├── CharacterCard.jsx
│   │   ├── Gallery.jsx
│   │   ├── InfoSection.jsx
│   │   ├── PaginationComponent.jsx
│   │   └── QuizResultsSection.jsx
│   ├── layout/          # Layout components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Navigation/
│   │   └── MainLayout.jsx
│   └── ui/              # UI provider components
├── config/
│   └── firebase.js      # Firebase configuration
├── context/             # React Context providers
│   ├── CharactersFilterContext.jsx
│   └── Firebase.jsx
├── firebase/            # Firebase utility functions
│   ├── quiz.js
│   └── users.js
├── hooks/               # Custom hooks
│   └── useCharacters.js
├── pages/               # Page components
│   ├── Characters/
│   ├── ContactUSPage/
│   ├── ForumPage/
│   ├── Houses/
│   ├── ProfilePage/
│   ├── QuizPage/
│   ├── SignInPage/
│   └── SignUp/
├── App.jsx              # Main app component with routing
├── main.jsx             # Application entry point
└── index.css            # Global styles
```

## 🎯 Key Features

### Character Management
- Fetch characters from external API (HP API)
- Filter by house (Gryffindor, Hufflepuff, Ravenclaw, Slytherin)
- Filter by type (All, Staff, Students)
- Pagination support (12, 24, 48 per page or all)
- Responsive grid layout

### Houses Information
- Detailed information about each house
- House-specific character lists
- House gallery with images
- Hero sections with house imagery

### Interactive Quiz
- Multiple-choice questions
- House determination based on answers
- Results saved to user profile
- Visual results display with house images

### Forum System
- Create new topics (authenticated users only)
- View topic details
- Reply to topics
- Real-time updates via Firebase Realtime Database

### User Authentication & Profiles
- Email/password authentication
- User registration with validation
- Password reset functionality
- User profile page with quiz results
- Protected routes

### Responsive Design
- Mobile-first approach
- Hamburger menu for mobile navigation
- Responsive text sizing using `clamp()`
- Adaptive layouts for all screen sizes

## 🔥 Firebase Configuration

### Required Firebase Services

1. **Authentication**
   - Enable Email/Password provider

2. **Cloud Firestore**
   - Collection: `users`
     - Document ID: User UID
     - Fields: `email`, `name`, `quizResult`, `quizCompletedAt`

3. **Realtime Database**
   - Structure:
     ```
     forum/
       topics/
         {topicId}/
           title, content, author, createdAt, views, repliesCount
       replies/
         {replyId}/
           topicId, content, author, createdAt
     ```

### Firebase Rules (Example)

**Firestore:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

**Realtime Database:**
```json
{
  "rules": {
    "forum": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

## 📜 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚢 Deployment

### Vercel Deployment

1. **Connect Repository**
   - Push code to GitHub/GitLab/Bitbucket
   - Import project in Vercel dashboard

2. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables** (if needed)
   - Add Firebase configuration as environment variables
   - Update `config/firebase.js` to use environment variables

4. **Deploy**
   - Vercel will automatically deploy on every push to main branch

### Manual Build

```bash
npm run build
# Output will be in dist/ directory
```

## 📄 License

This project is created for educational purposes as part of a practical project (Praxisprojekt).

## 👤 Author

Created as part of a web development course project.

---

**Note**: This project uses external APIs (HP API) for character data. Ensure stable internet connection for full functionality.
