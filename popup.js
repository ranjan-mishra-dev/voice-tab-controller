document.addEventListener("DOMContentLoaded", function () {
    let recognition;
    const startButton = document.getElementById("start");
    const stopButton = document.getElementById("stop");
    const micStatus = document.getElementById("microphone-status");
    const micIcon = document.getElementById("mic-icon");
    const statusText = document.getElementById("status-text");
    const resultDiv = document.getElementById("result");

    if ("webkitSpeechRecognition" in window) {
        recognition = new webkitSpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            console.log("Voice recognition started");
            micStatus.classList.remove("mic-off");
            micStatus.classList.add("mic-on");
            micIcon.classList.replace("fa-microphone-slash", "fa-microphone");
            statusText.textContent = "Listening...";
            resultDiv.textContent = "Listening... Speak now!";
        };

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
            console.log("User said:", transcript);
            resultDiv.textContent = `You said: "${transcript}"`;

            // Send the voice command to background.js
            chrome.runtime.sendMessage({ action: "executeCommand", transcript: transcript });
        };

        recognition.onspeechend = () => {
            console.log("Speech has ended");
            resultDiv.textContent = "Waiting for input...";
        };

        recognition.onerror = (event) => {
            console.error("Recognition error:", event.error);
            resultDiv.textContent = `Error: ${event.error}`;
        };

        startButton.addEventListener("click", () => {
            console.log("Start button clicked");
            recognition.start();
            startButton.disabled = true;
            stopButton.disabled = false;
        });

        stopButton.addEventListener("click", () => {
            console.log("Stop button clicked");
            recognition.stop();
            startButton.disabled = false;
            stopButton.disabled = true;

            micStatus.classList.remove("mic-on");
            micStatus.classList.add("mic-off");
            micIcon.classList.replace("fa-microphone", "fa-microphone-slash");
            statusText.textContent = "Microphone is OFF";
        });
    } else {
        alert("Sorry, your browser does not support Speech Recognition.");
    }
});
