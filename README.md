# 🏡 Real Estate MERN Application

A full-stack real estate web platform built using the **MERN stack** (MongoDB, Express, React, Node.js). It enables users to **browse, search, list, and manage** properties with a clean and responsive UI.

🔗 **Live Demo**: [https://real-estate-mern-frontend-k5v3.onrender.com](https://real-estate-mern-frontend-k5v3.onrender.com)
<!--
---
## 📸 Screenshots

### 🔹 Homepage
![Homepage](./images/home.png)

### 🔹 Property Listings
![Property Listing](./images/properties.png)

### 🔹 User Profile
![User Profile](./images/user_profile.png)

### 🔹 Property Details
![Property Details](./images/property.png)
-->
---

## 🚀 Features

- 🏠 **Property Listings** – Browse all real estate properties
- 🔍 **Smart Search & Filters** – Search by location, price, BHK, type, and more
- 🧾 **Property Management** – Add, update, delete properties (for authenticated users)
- 👤 **User Authentication** – JWT-based login, signup, logout, session validation
- 🔐 **Rate Limiting** – Protects API from abuse and excessive traffic
- 📦 **Caching with Redis** – Caches repeated search results and property fetches for fast access
- 📄 **Pagination** – Efficiently handles large data for property listings
- 📸 **Image Upload** – Upload property images and user profile avatars
- 🌍 **Map Integration** – Visualize location using maps
- 📱 **Responsive UI** – Works seamlessly on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- **React Router DOM**
- **Axios**
- **Bootstrap + Custom CSS**
- **Toastify** (notifications)
- **React Slick** (carousel)
- **React Select** (dropdowns)
- **Google Maps API** (MapComponent)

### Backend
- **Node.js + Express**
- **MongoDB + Mongoose**
- **JWT** (Authentication)
- **Redis** (Caching)
- **Express-Rate-Limit** (API rate limiting)
- **Pagination Logic** (MongoDB + query params)
- **Multer** (File uploads)
- **Cors + Cookie-Parser**
- **dotenv** (Environment config)

---

### ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone -b cleanup/main-structure https://github.com/Dharmik090/real-estate-mern.git

2. **Backend Setup**<br>
Navigate to the backend directory
    ```bash
    cd real-estate-mern/backend
    ```

   Configure Environment Variables
   ```bash
   cp .env.example .env
   ```
   
   Install the backend dependencies & Start server
      ```bash
      npm install
      node server.js
      ```

4. **Frontend Setup**<br>
Open a new terminal and navigate to the client directory and install frontend dependencies
   ```bash
   cd ../frontend
   npm install
   ```
      
   Start the react application
      ```bash
      npm start
      ```

5. **Access the Application**
Open your browser and go to http://localhost:3000 to view the app.


<br>

### 📝 Note
☁️ Redis Setup:
This project uses Redis Cloud for caching.
You can create a free Redis instance from [Redis Cloud](https://redis.io/try-free/) and add the host, port, and password to your .env.

🗃️ Seed Data:
Use the [sample_data.json](./static/sample_data.json) file to import initial property or user data into your MongoDB database.
You can use tools like MongoDB Compass or a script to import the JSON data.
