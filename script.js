let prompt = document.querySelector("#prompt")
let container = document.querySelector(".container")
let btn = document.querySelector("#btn")
let chatContainer = document.querySelector(".chat-container")
let userMessage = null;
let Api_Url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=AIzaSyAQ16PCNbpiiVLUdgyGpDddbQWVb5Wug0c'

function createChatBox(html, className, userName) {
    let div = document.createElement("div")
    div.classList.add("chat-wrapper")

    let nameLabel = document.createElement("p")

    if(className === "user-chat-box"){
        nameLabel.classList.add("userName")
    } else {
        nameLabel.classList.add("bot-name")
    }
    nameLabel.innerText = userName
    div.appendChild(nameLabel)

    let chatBox = document.createElement("div")
    chatBox.classList.add(className)
    chatBox.innerHTML = html
    div.appendChild(chatBox)
    return div
}

async function getApiResponse(aiChatbox) {
    let textElement = aiChatbox.querySelector(".text")

    try {
        let response = await fetch(Api_Url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "contents": [
                    {
                        "role": "user",
                        "parts": [
                            {
                                text: userMessage
                            }]
                    }]
            })
        })
        let data = await response.json();
        let apiResponse = data?.candidates[0].content.parts[0].text;
        textElement.innerText = apiResponse
        console.log(apiResponse);
    } catch (error) {
        console.log(error)
    }
    finally {
        aiChatbox.querySelector(".loading").style.display = "none";
    }
}

function showLoading() {
    let html = ` <div class="img">
                <img src="/Images/robot.svg" alt=""></div>
            <p class="text"></p>
            <img class="loading" src="Images/load.gif" alt="loading" height="50">`
    let aiChatBox = createChatBox(html, "ai-chat-box", "Assistant");
    chatContainer.appendChild(aiChatBox)
    getApiResponse(aiChatBox)
}

btn.addEventListener("click", () => {
    userMessage = prompt.value
    if (!userMessage == "") {
        container.style.display = "flex"
    } {
        container.style.display = "none"
    }
    if (!userMessage) return;
    let html = `<div class="img">
    <img src="/Images/user.svg" alt=""></div>
            <p class="text"></p>`;
    let userChatBox = createChatBox(html, "user-chat-box", "You");
    userChatBox.querySelector(".text").innerText = userMessage
    chatContainer.appendChild(userChatBox)
    prompt.value = "";
    setTimeout(showLoading, 5000);
})