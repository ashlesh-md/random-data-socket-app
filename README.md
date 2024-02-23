# Random Point Generator App

The Random Point Generator App is a mobile application built with React Native that allows users to generate and visualize random 3D points in real-time. The app also includes a WebSocket server for efficient communication with connected clients.

## Demo

https://github.com/ashlesh-md/random-data-socket-app/assets/113172856/452176fd-f6ac-4768-9549-e42f4443229c

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

- **Memoization with `useMemo`:** The app uses `React.memo` to memoize the rendering of components, preventing unnecessary re-renders and improving performance.

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
![1](https://github.com/ashlesh-md/random-data-socket-app/assets/113172856/9d023412-b84f-46b0-8a34-d24fd31932de)
![2](https://github.com/ashlesh-md/random-data-socket-app/assets/113172856/6cd207ce-d7ad-402c-9f3e-1259c79c3820)
![3](https://github.com/ashlesh-md/random-data-socket-app/assets/113172856/e06b6999-62e8-479b-b760-0ba4caf396a8)
![4](https://github.com/ashlesh-md/random-data-socket-app/assets/113172856/f99dd8d3-d465-455d-9e7f-2f4c55dc7ffa)





