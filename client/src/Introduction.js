import React from 'react';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  minHeight: '100vh',
  padding: '60px 20px',
  backgroundImage: "url('/gators-bg.jpg')",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  overflowY: 'auto',
};

const wrapperStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '16px',
  padding: '40px',
  maxWidth: '1000px',
  width: '100%',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
};

const sectionTitle = {
  fontSize: '22px',
  fontWeight: '600',
  marginTop: '32px',
  marginBottom: '16px',
  color: '#1f2937'
};

const subTitle = {
  fontSize: '18px',
  fontWeight: '500',
  marginTop: '16px',
  marginBottom: '6px',
  color: '#111827'
};

const paragraph = {
  marginBottom: '12px',
  lineHeight: '1.7',
  fontSize: '15px',
  color: '#374151'
};

const codeBlock = {
  backgroundColor: '#f3f4f6',
  fontFamily: 'monospace',
  padding: '12px',
  borderRadius: '8px',
  fontSize: '14px',
  marginBottom: '16px',
  whiteSpace: 'pre-wrap'
};

const codeInline = {
  backgroundColor: '#f3f4f6',
  fontFamily: 'monospace',
  padding: '2px 6px',
  borderRadius: '6px',
  fontSize: '14px'
};

const linkStyle = {
  color: '#2563eb',
  textDecoration: 'underline'
};

const Introduction = () => {
  return (
    <div style={containerStyle}>
      <div style={wrapperStyle}>
        {/* ======== Original Section ======== */}
        <h1 style={{ textAlign: 'center', fontSize: '30px', marginBottom: '10px', color: '#1e3a8a' }}>
          Welcome to the React App
        </h1>
        <p style={{ ...paragraph, textAlign: 'center', marginBottom: '30px' }}>
          This app is bootstrapped with Create React App. Below is your full guide.
        </p>

        <h2 style={sectionTitle}>Available Scripts</h2>
        <p style={paragraph}>In the project directory, you can run:</p>

        <h3 style={subTitle}><code style={codeInline}>npm start</code></h3>
        <p style={paragraph}>
          Runs the app in the development mode. Open <a href="http://localhost:3000" style={linkStyle}>http://localhost:3000</a> to view it in your browser.
          The page will reload when you make changes. You may also see any lint errors in the console.
        </p>

        <h3 style={subTitle}><code style={codeInline}>npm test</code></h3>
        <p style={paragraph}>
          Launches the test runner in the interactive watch mode. See the docs <a href="https://facebook.github.io/create-react-app/docs/running-tests" style={linkStyle}>here</a>.
        </p>

        <h3 style={subTitle}><code style={codeInline}>npm run build</code></h3>
        <p style={paragraph}>
          Builds the app for production to the <code style={codeInline}>build</code> folder. It correctly bundles React in production mode and optimizes the build for the best performance.
        </p>

        <h3 style={subTitle}><code style={codeInline}>npm run eject</code></h3>
        <p style={paragraph}>
          <strong>Note:</strong> this is a one-way operation. Once you eject, you can’t go back! You don't have to ever use eject. The curated feature set is suitable for small and middle deployments.
        </p>

        <h2 style={sectionTitle}>Learn More</h2>
        <p style={paragraph}>
          See the <a href="https://facebook.github.io/create-react-app/docs/getting-started" style={linkStyle}>Create React App documentation</a> to learn more.
          For React itself, check out the <a href="https://reactjs.org/" style={linkStyle}>React documentation</a>.
        </p>

        <h2 style={sectionTitle}>Advanced Topics</h2>
        <ul style={{ ...paragraph, paddingLeft: '20px' }}>
          <li><a href="https://facebook.github.io/create-react-app/docs/code-splitting" style={linkStyle}>Code Splitting</a></li>
          <li><a href="https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size" style={linkStyle}>Analyzing the Bundle Size</a></li>
          <li><a href="https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app" style={linkStyle}>Making a Progressive Web App</a></li>
          <li><a href="https://facebook.github.io/create-react-app/docs/advanced-configuration" style={linkStyle}>Advanced Configuration</a></li>
          <li><a href="https://facebook.github.io/create-react-app/docs/deployment" style={linkStyle}>Deployment</a></li>
          <li><a href="https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify" style={linkStyle}>Build Fails to Minify</a></li>
        </ul>

        {/* ======== Appended Section: Task Manager ======== */}
        <h1 style={{ ...sectionTitle, fontSize: '26px', color: '#1e3a8a', marginTop: '40px' }}>📝 Task Manager Web App</h1>
        <p style={paragraph}>
          This is a collaborative task management web application built with <strong>MERN Stack</strong> (MongoDB, Express.js, React, Node.js). It allows users to register, log in, add, edit, delete, and reorder tasks with a clean, drag-and-drop interface.
        </p>
        <p style={paragraph}><em>Created by: Zengtao Liang, Yiru Chen, Giancarlo Vidal, Diego Curbelo</em></p>

        <h2 style={sectionTitle}>🚀 Features</h2>
        <ul style={{ ...paragraph, paddingLeft: '20px' }}>
          <li>✅ User authentication (Register/Login)</li>
          <li>✅ Token-based session management</li>
          <li>✅ Create, edit, and delete tasks</li>
          <li>✅ Drag and drop to reorder tasks</li>
          <li>✅ Responsive and clean UI</li>
          <li>✅ Backend powered by MongoDB Atlas</li>
        </ul>

        <h2 style={sectionTitle}>🧑‍💻 Technologies Used</h2>
        <ul style={{ ...paragraph, paddingLeft: '20px' }}>
          <li><strong>Frontend:</strong> React, React Router, React Beautiful DnD</li>
          <li><strong>Backend:</strong> Node.js, Express.js</li>
          <li><strong>Database:</strong> MongoDB + Mongoose</li>
          <li><strong>Authentication:</strong> JWT, bcrypt</li>
          <li><strong>Styling:</strong> CSS</li>
        </ul>

        <h2 style={sectionTitle}>🛠️ Getting Started</h2>
        <h3 style={subTitle}>1. Clone the Repository</h3>
        <div style={codeBlock}>
{`git clone https://github.com/YIRU2004CHEN/group5proj.git
cd group5proj`}
        </div>

        <h3 style={subTitle}>2. Set Up the Backend</h3>
        <div style={codeBlock}>
{`cd backend
npm install`}
        </div>

        <p style={paragraph}><strong>Start the backend:</strong></p>
        <div style={codeBlock}>npm start</div>

        <h3 style={subTitle}>3. Set Up the Frontend</h3>
        <div style={codeBlock}>
{`cd ../client
npm install
npm start`}
        </div>

        <p style={paragraph}>
          The React app will open at <a href="http://localhost:3000" style={linkStyle}>http://localhost:3000</a>
        </p>
      </div>
    </div>
  );
};

export default Introduction;
