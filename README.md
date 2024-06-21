# Native Grocery App

Native Grocery App is a mobile application developed using Expo, React Native, and Firebase. It allows users to browse different grocery shops and select items for purchase.

## Features

- **Shop Selection**: Browse through various grocery shops listed in the app.
- **Browse Grocery Items**: View categories of grocery items offered by each shop.
- **Add to Cart**: Add items to the shopping cart for eventual checkout.
- **Manage Cart**: Edit quantities and remove items from the cart.
- **Order Placement**: Place orders for selected items.
- **Order History**: View past orders and order details.
- **Responsive Design**: Ensure a seamless experience across different screen sizes and orientations.

## Technologies Used

- **React Native**: For building cross-platform mobile applications.
- **Expo**: Toolchain for simplifying React Native development.
- **Firebase**: Backend-as-a-Service for user authentication, real-time database, and cloud functions.
- **Redux**: State management for predictable application state.
- **React Navigation**: Routing and navigation for smooth user experience.
- **Styled Components**: Styling solution for React Native components.
- **Formik and Yup**: Form handling and validation for user inputs.

## Getting Started

### Prerequisites

- Node.js
- Expo CLI

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/PradeepJoshiFreelancer/native-grocery-app.git
   cd native-grocery-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Firebase:

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Set up Firebase Authentication and Realtime Database.
   - Copy your Firebase config keys into the project's configuration file (`/src/firebase/config.js`).

4. Start the Expo development server:

   ```bash
   expo start
   ```

5. Follow the Expo CLI instructions to run the app on an emulator or physical device.

## Folder Structure

- **/assets**: Contains static assets such as images and fonts.
- **/components**: Reusable UI components.
- **/screens**: Screens of the application.
- **/redux**: Redux actions, reducers, and store configuration.
