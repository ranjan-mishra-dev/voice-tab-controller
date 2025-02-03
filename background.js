chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received in background.js:", message);

    if (message.action === "executeCommand") {
        const command = message.transcript;
        console.log("Executing command:", command);
        performAction(command);
    }
});


function performAction(command) {
    console.log("Performing action for:", command); 

    if (command.includes("new tab")) {
        chrome.tabs.create({});
    } 
    else if (command.includes("bookmark")) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0];
            chrome.bookmarks.create({ title: currentTab.title, url: currentTab.url }, () => {
                alert("Bookmark added!");
            });
        });
    } 
    else if (command.includes("go back")) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: () => window.history.back(),
            });
        });
    } 
    else if (
        command.includes("open") || 
        command.includes("site") || 
        command.includes("search") || 
        command.includes("website")
    ) {
        
        const words = command.split(" ");
        const keywordIndex = words.findIndex(word => 
            word === "open" || word === "search" || word === "site" || word === "website"
        );

        if (keywordIndex !== -1 && words.length > keywordIndex + 1) {
            let websiteName = words.slice(keywordIndex + 1).join("").toLowerCase(); // Preserve spaces
            console.log("Detected website name:", websiteName);

            let website = websiteName.replace(/\s/g, ''); // Remove spaces        
            chrome.tabs.create({ url: `https://${website}.com` });

        }
    }
    else if (command.includes("go forward")) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: () => window.history.forward(),
            });
        });
    } 
    else if (command.includes("scroll down")) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: () => window.scrollBy(0, 400),
            });
        });
    } 
    else if (command.includes("scroll up")) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: () => window.scrollBy(0, -400),
            });
        });
    } 
    else if (command.includes("close tab")) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.remove(tabs[0].id);
        });
    } 
    else if (command.includes("refresh")) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: () => location.reload(),
            });
        });
    } 
    else if (command.includes("next tab")) {
        switchTab("next");
    } 
    else if (command.includes("previous tab")) {
        switchTab("previous");
    } 
}

function switchTab(direction) {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (currentTab) => {
            let currentIndex = currentTab[0].index;
            let newIndex = direction === "next" ? 
                (currentIndex + 1) % tabs.length : 
                (currentIndex - 1 + tabs.length) % tabs.length;
            
            chrome.tabs.update(tabs[newIndex].id, { active: true });
        });
    });
}
