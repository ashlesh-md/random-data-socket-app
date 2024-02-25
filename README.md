# Random Point Generator App

The Random Point Generator App is a mobile application built with React Native that allows users to generate and visualize random 3D points in real-time. The app also includes a WebSocket server for efficient communication with connected clients.

## Demo

https://drive.google.com/drive/folders/16IFwOnXk796RFy2TQ5knorF2ToUIUYRv

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Optimization Techniques](#optimization-techniques)
- [WebSocket Server](#websocket-server)
- [Installation](#installation)
- [Screenshots](#screenshots)

## Introduction

The Random Point Generator App leverages React Native to create an engaging mobile experience for users who want to explore and visualize random 3D points dynamically.

## Features

- **User Authentication with Firebase:** Secure user authentication using Firebase for a reliable and secure login/signup process.

- **Real-time 3D Point Generation:** Dynamically generates and visualizes random 3D points in real-time for an interactive experience.

- **Intuitive User Interface:** Designed with an intuitive and user-friendly interface for easy navigation and interaction.

- **Secure Login and Signup Functionality:** Implements secure login and signup functionality to protect user data and privacy.

- **Engaging 3D Splash Screen:** An immersive 3D splash screen enhances the app launch experience.

## Optimization Techniques

To ensure optimal performance and maintainable code, the Random Point Generator App incorporates the following optimization techniques:

- **Chunking** of data is done and first data are stored as a chunks and then updated that data on the sphereGeometry on the screen.

- **instancedMesh** is used to created multiple meshes of sphereGeometry.

- **Reusable Components:** The app follows a component-based architecture, promoting the reuse of components across different parts of the application. This enhances maintainability and reduces redundancy.

- **Efficient WebSocket Communication:** The WebSocket communication for real-time data is optimized to handle points generation efficiently, ensuring a smooth user experience.

## WebSocket Server

The Random Point Generator App includes a WebSocket server implemented using Express and express-ws. The server is responsible for sending random 3D points to connected clients in real-time.

The server code is available in the `server.js` file. It establishes a WebSocket endpoint at `/points` and provides an additional endpoint at `/stop` to stop the WebSocket stream.

## Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js: [Download and install Node.js](https://nodejs.org/)
- npm (Node Package Manager): npm is included with Node.js installation.

### Running Application

```bash
git clone <repository-url>

cd random-point-generator-app

npm install

node server.js

npm start or npx expo start

```
## Screenshots
<img src="https://github.com/ashlesh-md/random-data-socket-app/assets/113172856/ce6bf37f-a811-4f95-9eac-d5f5f215d628" alt="Screenshot_1708873510" style="max-width: 300px; height: 600px;">
<img src="https://github.com/ashlesh-md/random-data-socket-app/assets/113172856/b765caf0-1d1b-4e2a-81a4-143567aff1ed" alt="Screenshot_1708873512" style="max-width: 300px; height: 600px;">
<img src="https://github.com/ashlesh-md/random-data-socket-app/assets/113172856/52ef7084-ad5d-4b83-a78d-d2347fad762b" alt="Screenshot_1708873536" style="max-width: 300px; height: 600px;"">
<img src="https://github.com/ashlesh-md/random-data-socket-app/assets/113172856/536eea13-4b04-4de1-bede-e540c4765c51" alt="Screenshot_1708873605" style="max-width: 300px; height: 600px;"">






