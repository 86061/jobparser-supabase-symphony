export const cleanMetaDescription = (text: string): string => {
  // Remove symbols and non-ASCII characters
  let cleaned = text.replace(/[^\x00-\x7F]/g, '');
  
  // Remove unimportant words
  const unimportantWords = ['a', 'an', 'the', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
  cleaned = cleaned.split(' ')
    .filter(word => !unimportantWords.includes(word.toLowerCase()))
    .join(' ');
    
  // Limit to 20 words
  return cleaned.split(' ').slice(0, 20).join(' ').trim();
};

export const cleanUrl = (url: string): string => {
  // Remove GTM query parameters
  const urlObj = new URL(url);
  urlObj.searchParams.delete('utm_campaign');
  urlObj.searchParams.delete('utm_source');
  urlObj.searchParams.delete('utm_medium');
  return urlObj.toString();
};

export const formatListContent = (content: string): string => {
  // Replace "<br>•" with "<li>" and wrap in "<ul>"
  if (!content) return '';
  
  const items = content.split('<br>•').filter(Boolean);
  if (items.length <= 1) return content;
  
  const listItems = items.map(item => `<li>${item.trim()}</li>`).join('');
  return `<ul>${listItems}</ul>`;
};