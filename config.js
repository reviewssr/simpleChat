// 粘贴你的谷歌genimi appid
const APPID = "";

//端口号
const PORT = 9002;

const generationConfig = {
  // 输出限制
  maxOutputTokens: 4096,
  stopSequences: ["review"],
  //0-1 值越大，越发散，值越小，越精确
  temperature: 1,
  //0-1 值越大，越发散，值越小，越精确
  topP: 1,
  //0-100 值越大，越发散，值越小，越精确
  topK: 100,
};

const safeSettings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_NONE",
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_NONE",
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_NONE",
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_NONE",
  },
// {
//   "category": "HARM_CATEGORY_DEROGATORY",
//   "threshold": "BLOCK_NONE",
// },
// {
//   "category": "HARM_CATEGORY_TOXICITY",
//   "threshold": "BLOCK_NONE",
// },
// {
//   "category": "HARM_CATEGORY_MEDICAL",
//   "threshold": "BLOCK_NONE",
// },
// {
//   "category": "HARM_CATEGORY_SEXUAL",
//   "threshold": "BLOCK_NONE",
// },
// {
//   "category": "HARM_CATEGORY_VIOLENCE",
//   "threshold": "BLOCK_NONE",
// },
// {
//   "category": "HARM_CATEGORY_DANGEROUS",
//   "threshold": "BLOCK_NONE",
// },
// {
//   "category": "HARM_CATEGORY_UNSPECIFIED",
//   "threshold": "BLOCK_NONE",
// },
];

export {
  safeSettings,
  generationConfig,
  PORT,
  APPID,
}
