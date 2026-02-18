document.addEventListener('DOMContentLoaded', () => {
    const profileScreen = document.querySelector('.profile-screen');
    const chatScreen = document.querySelector('.chat-screen');
    const chatButton = document.querySelector('.chat-button');
    const backArrow = document.querySelector('.back-arrow');
    const chatMessagesContainer = document.getElementById('chatMessages');
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.chat-input button');

    const chatMessages = [
        { sender: 'user', text: 'Hi!' },
        { sender: 'ai', text: 'Hey there, how are you?' },
        { sender: 'user', text: 'Good! Mind if I ask what you\'re looking for on here?' },
        { sender: 'ai', text: 'Not at all. I’m open to dating seriously, but also happy to see where things go.' },
        { sender: 'user', text: 'Nice, that sounds chill. What’s your day-to-day like?' },
        { sender: 'ai', text: 'I’m a sophomore marketing major, so a lot of classes and group projects. Outside of that, I’m big into hiking, soccer, and late-night ramen.' },
        { sender: 'user', text: 'That’s a great combo haha. Do you work out too?' },
        { sender: 'ai', text: 'Yeah, I’m usually at the campus gym or just walking around listening to a podcast.' },
        { sender: 'user', text: 'Love that. Are you into music?' },
        { sender: 'ai', text: 'Huge part of my day—I\'m always making playlists.' },
        { sender: 'user', text: 'What kind of person are you hoping to meet?' },
        { sender: 'ai', text: 'Someone fun and kind, who’s down for spontaneous adventures or chill movie nights.' },
        { sender: 'user', text: 'Aww that sounds sweet. Any pets?' },
        { sender: 'ai', text: 'Not here, but bonus if you like dogs—I miss mine back home.' }
    ];

    let messageIndex = 0;

    function addMessageToChat(message, isUser) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', isUser ? 'sent' : 'received');
        messageElement.textContent = message.text;
        chatMessagesContainer.appendChild(messageElement);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing-indicator');
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        chatMessagesContainer.appendChild(typingIndicator);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        return typingIndicator;
    }

    function removeTypingIndicator(indicator) {
        if (indicator) {
            chatMessagesContainer.removeChild(indicator);
        }
    }

    function simulateUserTyping(message, callback) {
        let i = 0;
        chatInput.value = '';
        const typingInterval = setInterval(() => {
            chatInput.value += message.text[i];
            i++;
            if (i >= message.text.length) {
                clearInterval(typingInterval);
                setTimeout(callback, 500); // Pause before sending
            }
        }, 100); // Typing speed
    }

    function processNextMessage() {
        if (messageIndex >= chatMessages.length) {
            return;
        }

        const message = chatMessages[messageIndex];
        const isUser = message.sender === 'user';

        if (isUser) {
            simulateUserTyping(message, () => {
                sendButton.classList.add('clicked');
                setTimeout(() => {
                    sendButton.classList.remove('clicked');
                }, 200);
                addMessageToChat(message, true);
                chatInput.value = '';
                messageIndex++;
                setTimeout(processNextMessage, 1000);
            });
        } else {
            const typingIndicator = showTypingIndicator();
            const typingDuration = message.text.length * 50; // 50ms per character
            setTimeout(() => {
                removeTypingIndicator(typingIndicator);
                addMessageToChat(message, false);
                messageIndex++;
                setTimeout(processNextMessage, 2000);
            }, typingDuration);
        }
    }

    chatButton.addEventListener('click', () => {
        profileScreen.classList.add('hidden');
        chatScreen.classList.remove('hidden');
        messageIndex = 0;
        chatMessagesContainer.innerHTML = '';
        processNextMessage();
    });

    backArrow.addEventListener('click', () => {
        chatScreen.classList.add('hidden');
        profileScreen.classList.remove('hidden');
    });
});
