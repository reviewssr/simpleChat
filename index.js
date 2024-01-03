import { getGenerativeModel, scrollToDocumentBottom, updateUI } from "./utils/shared.js";
import * as Config from './config.js'

const promptInput = document.querySelector("#prompt");
const historyElement = document.querySelector("#chat-history");
let chat;
let resultEls;

document.querySelector("#form").addEventListener("submit", async (event) => {
  event.preventDefault();

  // Display loading indicator
  const loadingIndicator = document.createElement('div');
  loadingIndicator.classList.add('loading-indicator');
  historyElement.appendChild(loadingIndicator);
  if (!chat) {
    const model = await getGenerativeModel({ 
      model: "gemini-pro",
      safetySettings: Config.safeSettings,
      generationConfig: Config.generationConfig, 
    });
    chat = model.startChat({
      safetySettings: Config.safeSettings,
      generationConfig: Config.generationConfig,  
    });
  }

  const userMessage = promptInput.value;
  promptInput.value = "";

  // Create UI for the new user message
  historyElement.innerHTML += `
    <div class="history-item user-role">
      <div class="name">User</div>
      <blockquote>${userMessage}</blockquote>
      <button class="delete-button">删除</button>
      <button class="copy-button">复制</button>
    </div>
    <div class="history-item model-role">
      <div class="name">Model</div>
      <blockquote></blockquote>
      <button class="delete-button">删除</button>
      <button class="copy-button">复制</button>
    </div>`;

    // 获取所有的 history-item 元素
const historyItems = document.querySelectorAll('.history-item');

// 遍历每个 history-item 元素
historyItems.forEach((item) => {
  // 获取当前元素下的 blockquote 元素
  const blockquote = item.querySelector('blockquote');
  const copyButton = item.querySelector('.copy-button');
  
  // 复制按钮点击事件处理程序
  copyButton.addEventListener('click', () => {
    // 创建 textarea 元素，并设置其值为 blockquote 中的文本内容
    const textarea = document.createElement('textarea');
    textarea.value = blockquote.innerText;
  
    // 将 textarea 元素添加到文档中，以便可以执行复制操作
    document.body.appendChild(textarea);
  
    // 选中 textarea 中的文本内容
    textarea.select();
  
    // 执行复制操作
    document.execCommand('copy');
  
    // 移除 textarea 元素
    document.body.removeChild(textarea);
  
    // 提示复制成功
    alert('已复制到剪贴板！');
  });
});


  // Highlight code blocks
  Prism.highlightAll();

  scrollToDocumentBottom();

  resultEls = document.querySelectorAll(".model-role > blockquote");

  // Show loading indicator before sending message to the chat
  loadingIndicator.style.display = 'block';

  await updateUI(
    resultEls[resultEls.length - 1],
    () => chat.sendMessageStream(userMessage),
    false,
  );

  // Hide loading indicator after receiving the reply
  loadingIndicator.style.display = 'none';
});
