// 存储对话历史
let chatHistory = [];

// 获取DOM元素
const chatHistoryDiv = document.getElementById('chatHistory');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

// 添加消息到对话历史
function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    messageDiv.textContent = content;
    chatHistoryDiv.appendChild(messageDiv);
    chatHistoryDiv.scrollTop = chatHistoryDiv.scrollHeight;
}

// 发送消息到服务器
async function sendMessage(message) {
    try {
        // 清空输入框
        userInput.value = '';
        
        // 添加用户消息到对话历史
        addMessage(message, true);
        chatHistory.push({ role: 'user', content: message });

        // 禁用输入和发送按钮
        userInput.disabled = true;
        sendButton.disabled = true;

        // 添加loading消息
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message ai-message loading';
        loadingDiv.innerHTML = '<div class="loading-dots"><div></div><div></div><div></div></div>';
        chatHistoryDiv.appendChild(loadingDiv);

        // 创建EventSource连接
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: chatHistory
            })
        });

        // 移除loading消息
        chatHistoryDiv.removeChild(loadingDiv);

        // 创建新的消息div用于流式输出
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai-message';
        chatHistoryDiv.appendChild(messageDiv);

        // 处理流式响应
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let aiResponse = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');
            
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const content = line.slice(6);
                    aiResponse += content;
                    messageDiv.textContent = aiResponse;
                    chatHistoryDiv.scrollTop = chatHistoryDiv.scrollHeight;
                }
            }
        }

        // 将AI回复添加到对话历史
        chatHistory.push({ role: 'assistant', content: aiResponse });

    } catch (error) {
        console.error('Error:', error);
        addMessage('抱歉，发生了错误，请稍后重试。');
    } finally {
        // 重新启用输入和发送按钮
        userInput.disabled = false;
        sendButton.disabled = false;
        userInput.focus();
    }
}

// 发送按钮点击事件
sendButton.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
        sendMessage(message);
    }
});

// 输入框回车事件
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const message = userInput.value.trim();
        if (message) {
            sendMessage(message);
        }
    }
});

// 初始欢迎消息
addMessage('你好！我是你的AI生活教练。让我们开始对话吧，分享你的想法或困扰，我会尽力帮助你。');