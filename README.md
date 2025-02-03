# 🎤 Speech-Controlled Chrome Extension [TabPilot]
🚀 A **Chrome Extension** that enables users to **control browser actions using voice commands**.  
With this, you can **open new tabs, navigate pages, scroll, bookmark sites, and more—hands-free!** 🎤  

![image](https://github.com/user-attachments/assets/2a3b7000-82dc-4738-9202-20d154d7db75)


---

## 📜 Table of Contents  
- [✨ Features](#-features)  
- [🛠 Installation](#-installation)  
- [📌 How to Use](#-how-to-use)  
- [🎤 Available Voice Commands](#-available-voice-commands)  
- [⚙️ Project Structure](#-project-structure)  
- [💡 How It Works](#-how-it-works)  
- [🚀 Hosting on GitHub](#-hosting-on-github)  
- [🤝 Contribution](#-contribution)  
- [📜 License](#-license)  

---

## ✨ Features  
✅ **Voice Recognition**: Use voice commands to control Chrome actions.  
✅ **Open Websites**: Say `"open google"` to launch Google in a new tab.  
✅ **Navigate**: Go **back/forward** using voice.  
✅ **Scroll**: `"scroll up"` or `"scroll down"` to navigate pages.  
✅ **Bookmark Pages**: Save your favorite pages hands-free.  
✅ **Real-Time Status**: UI updates to show microphone status.  
✅ **Works Continuously**: Keeps listening until you


---

## 📌 How to Use
- 1️⃣ Click the **Extension Icon** to open the popup.
- 2️⃣ Click **"Start Listening"** – The microphone activates.
- 3️⃣ Say a **command** (e.g., "open google").
- 4️⃣ Watch it **execute actions automatically!** 🎉
- 5️⃣ Click **"Stop Listening"** to disable voice recognition.

[]image

---

## 🎤 Available Voice Commands
🎙 ***Command***	🖥️ Action.
- **"new tab"**	Opens a new tab.
- **"open/search/website any website name"**	e.g. Open Google or search google.
- **"go back"**	Navigates to the previous page
- **"go forward"**	Navigates to the next page
- **"scroll up"**	Scrolls up
- **"scroll down"**	Scrolls down
- **"close tab"**	Closes the current tab
- **"next tab"**	Next tab after current tab
- **"previous tab"**	Previous tab of the current tab
- **"bookmark"**	Bookmark the current tab
- **"refresh"**	Refreshes the current page

---

## ⚙️ Project Structure  
```bash
📂 voice-tab-controller
├── 📄 manifest.json     # Chrome extension config
├── 📄 background.js     # Listens for messages & executes commands
├── 📄 popup.html        # UI for start/stop buttons
├── 📄 popup.js          # Handles voice recognition & UI updates
├── 📄 popup.css         # Styles the popup UI
└── 📄 learning.txt      # To document my learning during this project
```

---

## 💡 How It Works
🎤 **Speech Recognition ```(popup.js)```**
* Uses ```webkitSpeechRecognition``` to continuously listen.
* Sends the recognized command to ```background.js```.

⚙️ **Command Execution** ```(background.js)```
* Processes the command (e.g., open tabs, scroll, navigate).
* Uses Chrome API (```chrome.tabs.create(), chrome.scripting.executeScript()```) to perform actions.

🖥️ **User Interface** (```popup.html & popup.css```)
* Displays real-time microphone status.
* Provides buttons to start/stop listening.

---

