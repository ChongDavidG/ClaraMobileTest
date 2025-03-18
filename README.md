# ClaraMobileTest

Mobile Automation Project with Appium & WebdriverIO

## 📖 Description
This project automates the testing of a mobile application using Appium and WebdriverIO. The Page Object Model (POM) pattern is implemented for better maintainability and reusability. Additionally, data-driven testing is used to validate various test scenarios efficiently.

## 🛠️ Technologies & Tools
- **Node.js** (for running WebdriverIO)
- **WebdriverIO** (for test automation)
- **Appium** (for executing tests on mobile devices/emulators)
- **TypeScript** (for better code structure and type safety)
- **Allure Reporter** (for generating test execution reports)
- **Data-Driven Testing** (for executing test scenarios with multiple data sets)

## 🚀 Project Setup

### 🔹 1. Prerequisites
Ensure you have the following installed:
- **Node.js** (version 16 or later)
- **Java JDK** (version 11 or later)
- **Appium**
- **Android SDK** (for running tests on Android)
- **Xcode & Carthage** (for running tests on iOS)

### 🔹 2. Install Dependencies
Clone the repository and run:

```sh
npm install

🔹 3. Appium Configuration
Start Appium on your machine:

sh
Copy
appium
If using a remote Appium server, configure the host, port, and path in the wdio.conf.ts file accordingly.

📱 Platform Configuration
🔹 Android Setup
Enable USB debugging on the device or use an emulator.

Ensure the Android SDK is installed.

Add the environment variables:

sh
Copy
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$PATH
Verify that the device/emulator is running:

sh
Copy
adb devices
🔹 iOS Setup
Install Xcode and accept the license agreement.

Install Appium dependencies:

sh
Copy
npm install -g appium-doctor
appium-doctor
Ensure WebDriverAgent is set up in Xcode.

🏃‍♂️ Running Tests
🔹 Run All Tests
Run tests for Android or iOS:

sh
Copy
npm run test:android
npm run test:ios
🔹 Run a Single Test
To execute one specific test at a time, use the following commands:

✅ iOS
sh
Copy
PLATFORM=ios npx wdio wdio.conf.ts --spec ./test/ios/specs/xxxtest.ts
Replace xxxtest.ts with the actual test file name.

✅ Android
sh
Copy
PLATFORM=android npx wdio wdio.conf.ts --spec ./test/android/specs/xxxtest.ts
This setup is necessary due to capabilities configuration, ensuring the test runs on the correct device.

📊 Generating Test Reports
To generate reports using Allure, run:

sh
Copy
npm run allure-report
This will create a visual report with test execution details.

📂 Project Structure
bash
Copy
📦 test
 ┣ 📂 android
 ┣ 📂 ios
 ┣ 📂 specs
 ┣ 📂 pageobjects
 ┣ 📜 wdio.conf.ts
 ┣ 📜 README.md
specs/ → Contains test cases.

pageobjects/ → Implements the Page Object Model (POM).

wdio.conf.ts → Configuration for WebdriverIO & Appium.

🛠️ Troubleshooting
❌ Error: "No device found"
Run:

sh
Copy
adb devices
If the device is not listed, restart ADB:

sh
Copy
adb kill-server && adb start-server
❌ Error: "Element not found"
Make sure the XPath selector is correct or use driver.waitForExist() to ensure the element is present before interacting with it.

📌 Notes
This project is designed to be modular, scalable, and easy to maintain.

Contributions and improvements are always welcome! 🚀
