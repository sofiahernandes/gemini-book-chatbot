<div align="center">
  <h1>📚 Gemini Book Chatbot</h1>
  <p align="center">
    AI-powered chatbot that recommends books using Gemini API, with Google authentication
    <br />
    <a href="https://github.com/sofiahernandes/gemini-book-chatbot/issues">Report Bug</a>
    |
    <a href="https://github.com/sofiahernandes/gemini-book-chatbot/issues">Request Feature</a>
  </p>
  
  [![Video Title](https://github.com/sofiahernandes/gemini-book-chatbot/blob/main/public/bookie-thumbnail.jpg)](https://www.youtube.com/watch?v=EJLQIQ8aoFc)
</div>

## 🚀 Tech Stack
- Gemini API – AI book recommendation chatbot agent (Bookie <3)
- Next.js, TypeScript & Tailwind CSS
- NextAuth – Auth with Google OAuth
<br/>

## ✨ Features
📚 Smart book recommendations using Gemini  
🔐 Google login with NextAuth  
🧠 Personalized chatbot responses  
📄 Environment variable support  
💻 Fully responsive (mobile + desktop)  
<br/>

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [Yarn](https://classic.yarnpkg.com/lang/en/)
<br/>

1. Clone the Repository
```bash
git clone https://github.com/sofiahernandes/gemini-book-chatbot.git
cd gemini-book-chatbot
```

2. Install Dependencies
```bash
npm install
# or
yarn install
```

3. Set Up Environment Variables
Create a `.env.local` file at the root of your project:
```bash
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
NODE_TLS_REJECT_UNAUTHORIZED=0 # For local testing only!!
GEMINI_API_KEY=
```

### 🔑 How to Get Your Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services > Credentials**
4. Click **Create Credentials > OAuth 2.0 Client IDs**
5. Set the application type to **Web Application**
6. Under “Authorized redirect URIs”, add:
http://localhost:3000/api/auth/callback/google

7. Copy the **Client ID** and **Client Secret** into your `.env.local` file as `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
8. For `NEXTAUTH_SECRET`, generate a secret running in your Git Bash:  
   `openssl rand -base64 32`

<br/>

4. Start the Development Server
```bash
npm run dev
# or
yarn dev
```

<br/>

## 🤝 Contributing
Contributions are what make the open-source community amazing. Any contributions you make are greatly appreciated.

1. Fork the Project  
2. Create your Feature Branch (`git checkout -b feature/my-feature`)  
3. Commit your Changes (`git commit -m 'Add some feature'`)  
4. Push to the Branch (`git push origin feature/my-feature`)  
5. Open a Pull Request  
<br/>

## 📄 License
This project is licensed under the [MIT License](LICENSE).  
You are free to use, modify, and share this project — just give proper credit!

<br/>

---

<div align="center">
  <h1>📩 Let's connect!</h1>
  <a href="https://github.com/sofiahernandes"><img height="30px" src="https://skillicons.dev/icons?i=github"/></a><span> ∙ </span>
  <a href="https://www.linkedin.com/in/sofiahernandes"><img height="30px" src="https://skillicons.dev/icons?i=linkedin"/></a><span> ∙ </span>
  <a href="mailto:sofiahernandes.dev@gmail.com"><img height="30px" src="https://skillicons.dev/icons?i=gmail"/></a><span> ∙ </span>
  <a href="https://www.instagram.com/sofiabotechiaa/"><img height="30px" src="https://skillicons.dev/icons?i=instagram"/></a>
</div>


