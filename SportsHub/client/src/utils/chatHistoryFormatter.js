export const formatChatHistoryForPrompt = (history) => {
  if (history.length <= 1) return "No previous conversation."; 
  let formatted = "";
  for (let i = 1; i < history.length; i++) {
    const msg = history[i];
    const role = msg.role === "user" ? "User" : "AI Guru";
    formatted += `${role}: ${msg.text}\n`;
  }
  return formatted.trim();
};