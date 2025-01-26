# **Network Intrusion Detection System (NIDS)**

This project is a comprehensive **Network Intrusion Detection System** (NIDS) leveraging deep learning and machine learning models, integrated with a modern web application for anomaly detection. It uses the **NSL-KDD dataset** for binary and multiclass classification of network intrusions.

---

## **Table of Contents**
1. [Description](#description)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup and Installation](#setup-and-installation)
    - [VS Code Setup](#vs-code-setup)
    - [Docker Setup](#docker-setup)
5. [Usage](#usage)
6. [Dataset](#dataset)


---

## **Description**

Large numbers of businesses have been affected by data breaches and cyberattacks due to increasing dependency on the internet. To mitigate such threats, this project provides a **Network Intrusion Detection System** capable of:
- Detecting anomalous network traffic.
- Alerting users about the detected attacks.

This project employs the **NSL-KDD dataset** and utilizes advanced machine learning models, including **Long Short-Term Memory (LSTM)**, **K-Nearest Neighbors (KNN)**, **Convolutional Neural Networks (CNN)**, and **Random Forest (RF)** for classification.

The web interface, built with **ReactJS**, allows users to input parameters, and the system predicts the type of attack, providing insights to the user. Authentication is implemented using **Google OAuth 2.0**, and user data is securely stored in a **MongoDB** database.

---

## **Features**

- Binary and multiclass classification of network intrusions.
- Models used: LSTM, KNN, CNN, and Random Forest.
- Fully responsive user interface with ReactJS.
- Secure user authentication with Google OAuth 2.0.
- Session and cookies-based user login system.
- User-friendly Dockerized setup for hassle-free deployment.

---

## **Technologies Used**

- **Frontend**: ReactJS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Machine Learning Models**: LSTM, KNN, CNN, Random Forest
- **Data**: NSL-KDD Dataset
- **Containerization**: Docker

---

## **Setup and Installation**

### **VS Code Setup**

1. **Pre-requisites**:
   - Install [Node.js](https://nodejs.org/) (version 14+).
   - Install [MongoDB](https://www.mongodb.com/try/download/community) (local or cloud setup).
   - Install Python (version 3.8 or above).
   - Install [VS Code](https://code.visualstudio.com/).
   - Install required extensions:
     - **Prettier** (for code formatting).
     - **ESLint** (for JavaScript linting).
     - **Python** (for Python development).

2. **Steps**:
   - Clone the repository:
     ```bash
     git clone https://github.com/srutakeerthi3/NIDS_Network-intrusion-detection-system.git
     cd nids-project
     ```
   - **Install dependencies**:
     For the frontend:
     ```bash
     cd frontend
     npm install
     ```
     For the backend:
     ```bash
     cd backend
     npm install
     ```
   - **Install Python libraries** (for ML models):
     ```bash
     pip install -r requirements.txt
     ```
   - **Run the project**:
     - Start the MongoDB server.
     - Start the web application to run it in locally:
       ```bash
       node app.js
       ```
   - Access the application at `http://localhost:3000`.

---

### **Docker Setup**

1. **Pre-requisites**:
   - Install [Docker](https://www.docker.com/products/docker-desktop).

2. **Steps**:
   - Clone the repository:
     ```bash
     git clone https://github.com/srutakeerthi3/NIDS_Network-intrusion-detection-system.git
     cd nids-project
     ```
   - Build and run Docker containers:
     ```bash
     docker build -t nids-project .
     docker run -d -p 3000:3000 -p 3000:3000 --name nids nids-project
     ```
   - Access the application at `http://localhost:3000`.

---

## **Usage**

1. Launch the application through Docker or VS Code.
2. **Frontend**: Navigate to the homepage to enter network parameters.
3. **Backend**: Handles user requests and interacts with ML models.
4. **Authentication**: Use Google OAuth 2.0 for secure login.
5. Get real-time predictions of network intrusions.

---

## **Dataset**

- **NSL-KDD Dataset**: A benchmark dataset for network intrusion detection, which contains labeled records of normal and attack traffic.

---
