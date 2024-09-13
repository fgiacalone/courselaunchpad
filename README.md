# Course LaunchPad

**Course LaunchPad** is a web application designed to facilitate seamless integration and secure launch of online course content using SCORM Cloud Dispatch or LTI-compliant systems. This app allows users to launch content directly into an iframe from external sources like SCORM Cloud.

## Features

- **LTI Integration**: Secure LTI (Learning Tools Interoperability) launch requests for accessing course content.
- **SCORM Cloud Dispatch Support**: Simplifies launching SCORM courses from SCORM Cloud via an intuitive interface.
- **Automatic Content Launch**: Automatically retrieves necessary parameters (key, secret, user ID) from the URL to launch the course content.
- **Responsive Design**: The interface is designed to fill the entire browser window, ensuring a clean and distraction-free user experience.

## How It Works

The application retrieves key parameters from the URL (like SCORM Dispatch Key, Secret, and User ID) and makes an LTI launch request to securely display the content in an embedded iframe.

### Key Files

1. **index.html**  
   This file defines the basic structure of the web page, including an iframe where SCORM or LTI content is loaded. It links external libraries like Bootstrap for styling and includes the necessary scripts.

2. **style.css**  
   Custom styles for the application, ensuring the iframe occupies the full screen for a seamless experience. The CSS file defines a flexible layout with no borders for the iframe.

3. **script.js**  
   Contains JavaScript to handle the LTI launch request. It dynamically constructs the OAuth signature for secure communication, retrieves parameters from the URL, and submits a form to launch the content in an iframe.

## Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/course-launchpad.git
    ```
2. Open `index.html` in a web browser or deploy the project to a server.

3. Ensure the URL includes the necessary parameters for launching content:
   - `key`: The SCORM Dispatch Key.
   - `secret`: The SCORM Dispatch Secret.
   - `user_id`: The User ID.

   Example URL:
   ```plaintext
   https://yourwebsite.com/launch.html?key=your_scorm_dispatch_key&secret=your_scorm_dispatch_secret&user_id=user123
