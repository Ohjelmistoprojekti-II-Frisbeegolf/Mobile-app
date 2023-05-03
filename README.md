# Frontend

## Installation guide

1. Clone the repository to your your local machine with the following command: 
```
git clone <repository_link>
```
You can get the link by pressing the green button that says <>code. Picture below

![image](https://user-images.githubusercontent.com/112404201/224038637-ad07c060-9ba8-4815-aaf3-fa74a5dfb639.png)

2. Open the project directory in your terminal.
3. To install the project dependencies, run the following command: 
```
npm install
```

## Setting up Expo

1. To use the Expo CLI, you will need to create an account on [Expo](https://expo.dev/signup). Click the link and follow the instructions to create your account.
2. Once you have created your account, install the Expo CLI by running the following command in your terminal:
```
npm install -g expo-cli
```
3. Verify that the Expo CLI is installed by running the following command:
```
expo --version
```
4. Log in to your Expo account by running the following command and following the prompts:
```
npx expo login
```

## Running the project

1. Open the project directory in your terminal. 
2. To start Expo App, run the following command: 
```
npx expo start
```
3. To run the app on your physical device: 
* Download the Expo Go App from [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US&pli=1) or [App Store](https://apps.apple.com/us/app/expo-go/id982107779).
* Scan the QR code that appears in the terminal or the Expo Dev Tools website with your phone's camera.
* The app will open in Expo Go.
4. To run the app on the emulator: 
* Make sure you have an emulator set up on your computer, such as [Android Studio Emulator](https://docs.expo.dev/workflow/android-studio-emulator/) or [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/).
* In the terminal, press the key `a` to run the app on an Android emulator or `i` to run it on an iOS simulator. Alternatively, you can click the `Run on Android device/emulator` or `Run on iOS simulator` button in the Expo Dev Tools website.

## Important

This app is optimized to use iOS-devices.

## API Documentation

Development deployment: https://dev-discgolf.herokuapp.com/swagger-ui/index.html

Production deployment: https://disc-golf-database.herokuapp.com/swagger-ui/index.html

## Backend

If you want to visit the Backend of this project, click [here](https://github.com/Ohjelmistoprojekti-II-Frisbeegolf/Backend).
