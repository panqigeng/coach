# AI Life Coach 项目 (v0.1)

## 安装和运行

### 本地开发
1. 克隆项目并安装依赖：
```bash
npm install
cd server
npm install
```

2. 配置环境变量：
在server目录下创建.env文件，添加以下配置：
```
API_KEY=your_deepseek_api_key
API_URL=your_deepseek_api_url
```

3. 启动服务器：
```bash
cd server
node server.js
```

4. 在浏览器中访问：
```
http://localhost:3000
```

### Vercel部署
1. Fork本项目到你的GitHub账号

2. 在Vercel中导入该项目

3. 配置环境变量：
   - 在Vercel项目设置中添加以下环境变量：
     - `API_KEY`: DeepSeek API密钥
     - `API_URL`: DeepSeek API地址

4. 部署完成后，即可通过Vercel提供的域名访问应用

## 当前版本功能 (v0.1)

### 核心功能
1. AI智能对话
   - 基于DeepSeek R1 API的智能对话系统
   - 专业的生活教练角色定位
   - 个性化建议和指导
   - 支持上下文理解和连续对话

2. 实时对话界面
   - 流式响应输出，提供即时反馈
   - 优雅的加载动画
   - 自动滚动和消息对齐
   - 支持Enter快捷发送

3. 用户体验优化
   - 响应式设计，适配各种设备
   - 现代化UI界面
   - 清晰的对话气泡区分
   - 输入区域状态反馈

### 技术特性
1. 前端实现
   - 原生JavaScript实现
   - 流畅的动画效果
   - 错误处理和状态管理
   - 优化的滚动体验

2. 后端架构
   - Node.js + Express服务器
   - 流式响应处理
   - CORS跨域支持
   - 安全的API密钥管理

3. 系统稳定性
   - 完善的错误处理机制
   - 用户输入验证
   - 服务器异常处理
   - 优化的网络请求管理

## 安装和运行

1. 克隆项目并安装依赖：
```bash
npm install
cd server
npm install
```

2. 启动服务器：
```bash
cd server
node server.js
```

3. 在浏览器中访问：
```
http://localhost:3000
```

## 后续规划
- 支持更多对话场景
- 添加用户认证系统
- 对话历史保存功能
- 更多个性化设置选项
- 多语言支持

## 技术栈
- 前端：HTML5, CSS3, JavaScript
- 后端：Node.js, Express
- API：DeepSeek R1
- 开发工具：VS Code

## 许可证
MIT License