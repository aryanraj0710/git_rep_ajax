# 🌐 Full Stack AJAX + Node.js XML App

A simple full-stack web application demonstrating **client-server architecture** using **Node.js**, **Express**, and **AJAX**.  
The project showcases how a frontend can asynchronously fetch and display **XML-formatted data** from a backend API without reloading the page.

---

## 🚀 Project Overview

This project is built to demonstrate the fundamentals of **asynchronous communication** between a client and a server.

- The **backend** is a Node.js + Express server that sends XML data via an API endpoint.  
- The **frontend** is a static webpage (HTML, CSS, JavaScript) that uses **AJAX (XMLHttpRequest)** to fetch and render this XML data dynamically.

It’s a minimal yet complete example of how frontend and backend components interact in a real-world web application.

---

## 🏗️ Architecture

```
Client (Frontend)
│
│   index.html
│   script.js
│   styles (internal)
│
└───> Sends AJAX (XHR) request → Backend (API)
                              ↓
                     Responds with XML data
```

---

### **Frontend: HTML + JavaScript**
- Handles UI and user interaction  
- Uses `XMLHttpRequest` to fetch data asynchronously  
- Manipulates the DOM to display XML responses dynamically  

### **Backend: Node.js (Express.js)**
- Provides an `/api/data` endpoint that serves structured XML data  
- Uses **xmlbuilder2** for XML generation  
- Uses **CORS** middleware to handle cross-origin requests  

---

## 🧩 Key Features

✅ Fetches and displays XML data dynamically using AJAX  
✅ Demonstrates CORS handling between different ports  
✅ Implements asynchronous client-server communication  
✅ Uses Express.js for clean routing and API creation  
✅ Includes xmlbuilder2 for XML data generation  

---

## 📁 Project Structure

```
📦 full-stack-xml-app
├── backend
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── index.html
│   ├── script.js
│   └── style.css (optional)
│
└── README.md
```

---

## ⚙️ Backend Setup (Node.js Server)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install express cors xmlbuilder2
   ```

3. Run the server:
   ```bash
   node server.js
   ```

The backend will start at:  
👉 **http://localhost:3000**

---

## 🧠 server.js Explained

```js
const express = require('express');
const cors = require('cors');
const { create } = require('xmlbuilder2');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/data', (req, res) => {
  const xmlData = create({ version: '1.0' })
    .ele('root')
      .ele('message').txt('Hello from the XML Server!').up()
      .ele('status').txt('success').up()
      .ele('timestamp').txt(new Date().toISOString()).up()
    .end({ prettyPrint: true });

  res.header('Content-Type', 'application/xml');
  res.send(xmlData);
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
```

---

## 🌐 Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Run a live server (using VS Code Live Server extension or `npx live-server`):
   ```bash
   npx live-server
   ```

The frontend will be served at:  
👉 **http://127.0.0.1:8080** *(or similar)*  

Make sure your backend (`server.js`) is also running simultaneously.

---

## 🧠 script.js Explained

- Uses `XMLHttpRequest` for asynchronous API calls  
- Parses XML response using `responseXML`  
- Extracts `<message>`, `<status>`, and `<timestamp>` nodes  
- Updates DOM dynamically to display fetched data  

```js
const fetchButton = document.getElementById('fetch-btn');
const resultContainer = document.getElementById('result-container');

fetchButton.addEventListener('click', () => {
  resultContainer.innerHTML = '<p>Loading...</p>';
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000/api/data', true);

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const xmlDoc = xhr.responseXML;
      const message = xmlDoc.getElementsByTagName('message')[0].textContent;
      const status = xmlDoc.getElementsByTagName('status')[0].textContent;
      const timestamp = xmlDoc.getElementsByTagName('timestamp')[0].textContent;

      resultContainer.innerHTML = `
        <h3>Response from Server</h3>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Status:</strong> ${status}</p>
        <p><strong>Timestamp:</strong> ${timestamp}</p>
      `;
    }
  };

  xhr.onerror = () => {
    resultContainer.innerHTML = '<p style="color:red;">Error fetching data.</p>';
  };

  xhr.send();
});
```

---

## 🔐 Understanding CORS

**Problem:**  
Browser security policies block requests between different origins.  
(e.g., Frontend: `http://127.0.0.1:8080` → Backend: `http://localhost:3000`)

**Solution:**  
The backend uses the `cors()` middleware to include the header:
```
Access-Control-Allow-Origin: *
```
This tells the browser it’s safe to share data between these two origins.

---

## 💡 Learning Outcomes

By the end of this project, you’ll understand:
- The **client-server model** in web development  
- How **AJAX** enables asynchronous data fetching  
- Working with **XML** data format and DOM parsing  
- Importance of **CORS** and how to configure it  
- Basic **Express.js API structure** and routes  

---

## 🧰 Tools & Technologies Used

| Category | Technology |
|-----------|-------------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Data Format | XML (via xmlbuilder2) |
| Communication | AJAX (XMLHttpRequest) |
| Utility | CORS Middleware |
| Hosting (Local) | live-server |

---

## 🪄 Future Enhancements

- Add a JSON endpoint for modern API standards  
- Replace `XMLHttpRequest` with the `Fetch API`  
- Add simple database integration (e.g., MongoDB or MySQL)  
- Deploy to Render, Vercel, or Heroku  

---



---

## 🧑‍💻 Author

**Aryan Raj**  
_As an undergraduate in Computer Science, I built this project to explore the fundamentals of web communication, data exchange, and client-server interaction using XML._
