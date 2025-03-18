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

## Video evidence
https://drive.google.com/drive/folders/1NZBSJAJ_ifKz6Anjg1wLGPs7hb5Qk-Fe?usp=sharing

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

**```sh

npm install

### 🔹 3. Appium Configuration
Start Appium on your machine:

sh
Copy
appium
If using a remote Appium server, configure the host, port, and path in the wdio.conf.ts file accordingly.

### 🔹 4. Application Path Configuration
The path to the mobile application (e.g., .apk for Android or .ipa for iOS) is specified in the wdio.conf.ts file. By default, it points to a local path on your machine.

Each user must update the app capability in the wdio.conf.ts file to point to the correct path of the application on their system. For example:

ts
Copy
capabilities: [{
    platformName: 'Android',
    'appium:app': '/path/to/your/app.apk', // Update this path
    // Other capabilities...
}]
Note: If the application is hosted remotely (e.g., on a cloud storage service), you can provide a direct URL to the file instead of a local path.

### 📱 Platform Configuration
### 🔹 Android Setup
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

### 🔹 iOS Setup
Install Xcode and accept the license agreement.

Install Appium dependencies:

sh
Copy
npm install -g appium-doctor
appium-doctor
Ensure WebDriverAgent is set up in Xcode.

🏃‍♂️ Running Tests
### 🔹 Run All Tests
Run tests for Android or iOS:

sh
Copy
npm run test:android
npm run test:ios
### 🔹 Run a Single Test
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

### 📊 Generating Test Reports
To generate reports using Allure, run:

sh
Copy
npm run allure-report
This will create a visual report with test execution details.

### 📂 Project Structure
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

### 🛠️ Troubleshooting
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


## 🎨 Design Decisions

### 🔹 1. Page Object Model (POM)
We implemented the **Page Object Model (POM)** design pattern to improve code maintainability and reusability. This pattern separates the test logic from the page-specific logic, making it easier to update selectors or actions if the UI changes. Each page has its own class, encapsulating all elements and actions related to that page.

**Why?**
- **Maintainability**: Changes to the UI only require updates in one place (the page object).
- **Reusability**: Common actions (e.g., login, navigation) can be reused across multiple tests.
- **Readability**: Tests are more readable and focused on the test logic rather than the implementation details.

---

### 🔹 2. TypeScript for Type Safety
We chose **TypeScript** over JavaScript to add type safety and improve the development experience. TypeScript helps catch errors at compile time, provides better IDE support, and makes the codebase more predictable.

**Why?**
- **Type Safety**: Reduces runtime errors by catching issues during development.
- **Better Tooling**: Enhances autocompletion, refactoring, and documentation.
- **Scalability**: Makes the codebase easier to maintain as it grows.

---

### 🔹 3. Data-Driven Testing
We implemented **data-driven testing** to validate multiple scenarios using different data sets. This approach allows us to run the same test with various inputs, ensuring the application behaves as expected under different conditions.

**Why?**
- **Efficiency**: Reduces the need to write repetitive test cases.
- **Coverage**: Increases test coverage by validating multiple scenarios.
- **Flexibility**: Easily add new test cases by updating the data set.

---

### 🔹 4. Allure Reporter
We integrated **Allure Reporter** to generate detailed and visually appealing test execution reports. Allure provides insights into test results, including steps, screenshots, and error details, making it easier to debug and analyze failures.

**Why?**
- **Readability**: Clear and interactive reports for better analysis.
- **Debugging**: Includes screenshots and error logs for failed tests.
- **Integration**: Works seamlessly with WebdriverIO.

---

### 🔹 5. Modular Project Structure
The project is organized into modular directories (`specs`, `pageobjects`, `config`) to keep the codebase clean and scalable. This structure makes it easy to locate files and add new features or tests.

**Why?**
- **Organization**: Clear separation of concerns (tests, page objects, configuration).
- **Scalability**: Easy to add new tests or pages without disrupting existing code.
- **Collaboration**: Simplifies onboarding for new team members.

---

### 🔹 6. Environment-Specific Configuration
We used environment-specific configuration files to manage different settings for local, staging, and production environments. This ensures that tests can be run in different environments without hardcoding values.

**Why?**
- **Flexibility**: Easily switch between environments.
- **Security**: Sensitive data (e.g., credentials) can be stored securely.
- **Consistency**: Ensures consistent behavior across environments.

---

### 🔹 7. Platform-Specific Tests
We separated tests for **Android** and **iOS** into different directories (`test/android`, `test/ios`) to handle platform-specific logic and selectors. This approach ensures that tests are tailored to each platform's unique behavior.

**Why?**
- **Platform Differences**: Accounts for differences in UI and functionality between Android and iOS.
- **Maintainability**: Makes it easier to update platform-specific tests.
- **Clarity**: Clearly separates concerns for each platform.

---

### 🔹 8. Use of Appium
We chose **Appium** as the automation tool because it supports both Android and iOS platforms and allows us to write tests using a single codebase. Appium's cross-platform capabilities make it ideal for mobile automation.

**Why?**
- **Cross-Platform**: Write once, run on both Android and iOS.
- **Community Support**: Large community and extensive documentation.
- **Flexibility**: Supports multiple programming languages (JavaScript, TypeScript, Python, etc.).

---

### 🔹 9. Future Improvements
- **Parallel Execution**: Implement parallel test execution to reduce execution time.
- **Cloud Device Farms**: Integrate with cloud services like BrowserStack or Sauce Labs for testing on real devices.
- **API Testing**: Combine API and UI testing for end-to-end validation.
