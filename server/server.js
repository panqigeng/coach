import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

// 启用CORS和JSON解析中间件
app.use(cors());
app.use(express.json());
app.use(express.static('../'));

// DeepSeek R1 API配置
const API_KEY = '0a7484c1-104a-4009-a1ed-459ed368b856';
const API_URL = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';

// 处理聊天请求
app.post('/chat', async (req, res) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'deepseek-r1-250120',
                messages: [
                    {
                        role: 'system',
                        content: '你是一位专业的生活教练，擅长倾听、分析和给出建设性的建议。你的目标是通过对话帮助用户进行自我反思和成长。'
                    },
                    ...req.body.messages
                ],
                stream: true,
                temperature: 0.6
            })
        });

        // 设置SSE响应头
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        // 处理流式响应
        // 处理流式响应
        response.body.on('data', chunk => {
            const text = chunk.toString();
            try {
                const lines = text.split('\n');
                for (const line of lines) {
                    if (line.trim().startsWith('data:')) {
                        const data = line.slice(5).trim();
                        if (data === '[DONE]') continue;
                        try {
                            const json = JSON.parse(data);
                            if (json.choices && json.choices[0].delta.content) {
                                res.write(`data: ${json.choices[0].delta.content}\n\n`);
                            }
                        } catch (e) {
                            console.error('解析JSON失败:', e);
                        }
                    }
                }
            } catch (e) {
                console.error('处理数据块失败:', e);
            }
        });

        response.body.on('end', () => {
            res.end();
        });

        response.body.on('error', (err) => {
            console.error('流处理错误:', err);
            res.end();
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: '服务器内部错误' });
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});