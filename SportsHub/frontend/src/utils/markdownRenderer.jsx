import React from 'react';

// Simple markdown renderer for AI Guru responses
export const renderMarkdown = (text, isDarkMode = true) => {
  if (!text) return null;

  // Split text into lines for processing
  const lines = text.split('\n');
  const elements = [];
  let currentList = [];
  let listType = null;

  const processLine = (line, index) => {
    // Handle bold text **text**
    const boldRegex = /\*\*(.*?)\*\*/g;
    const processedLine = line.replace(boldRegex, '<strong class="font-bold text-orange-400">$1</strong>');

    // Handle emojis and special formatting
    const emojiRegex = /(🎯|💪|🏃‍♂️|⚽|🏀|🎾|🚀|✨|🔥|💯|🎪|🌟)/g;
    const finalLine = processedLine.replace(emojiRegex, '<span class="text-xl">$1</span>');

    return finalLine;
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    // Handle headers (lines starting with **)
    if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**') && trimmedLine.length > 4) {
      // Finish any current list
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className={`list-disc list-inside space-y-1 mb-4 ml-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {currentList}
          </ul>
        );
        currentList = [];
        listType = null;
      }

      const headerText = trimmedLine.slice(2, -2);
      elements.push(
        <h4 key={index} className={`text-lg font-bold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
          <span dangerouslySetInnerHTML={{ __html: processLine(headerText) }} />
        </h4>
      );
    }
    // Handle numbered lists
    else if (/^\d+\./.test(trimmedLine)) {
      // Finish any bullet list
      if (listType === 'bullet' && currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className={`list-disc list-inside space-y-1 mb-4 ml-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {currentList}
          </ul>
        );
        currentList = [];
      }
      
      listType = 'numbered';
      const listText = trimmedLine.replace(/^\d+\.\s*/, '');
      currentList.push(
        <li key={`${index}-${currentList.length}`} className="mb-1">
          <span dangerouslySetInnerHTML={{ __html: processLine(listText) }} />
        </li>
      );
    }
    // Handle bullet points
    else if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
      // Finish any numbered list
      if (listType === 'numbered' && currentList.length > 0) {
        elements.push(
          <ol key={`list-${elements.length}`} className={`list-decimal list-inside space-y-1 mb-4 ml-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {currentList}
          </ol>
        );
        currentList = [];
      }
      
      listType = 'bullet';
      const listText = trimmedLine.replace(/^[•-]\s*/, '');
      currentList.push(
        <li key={`${index}-${currentList.length}`} className="mb-1">
          <span dangerouslySetInnerHTML={{ __html: processLine(listText) }} />
        </li>
      );
    }
    // Handle blockquotes
    else if (trimmedLine.startsWith('>')) {
      // Finish any current list
      if (currentList.length > 0) {
        const ListComponent = listType === 'numbered' ? 'ol' : 'ul';
        const listClass = listType === 'numbered' ? 'list-decimal' : 'list-disc';
        elements.push(
          React.createElement(ListComponent, {
            key: `list-${elements.length}`,
            className: `${listClass} list-inside space-y-1 mb-4 ml-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`
          }, currentList)
        );
        currentList = [];
        listType = null;
      }

      const quoteText = trimmedLine.replace(/^>\s*/, '');
      elements.push(
        <blockquote key={index} className={`border-l-4 border-orange-500 pl-4 py-2 mb-4 italic ${isDarkMode ? 'bg-orange-500/10 text-orange-300' : 'bg-orange-500/10 text-orange-700'}`}>
          <span dangerouslySetInnerHTML={{ __html: processLine(quoteText) }} />
        </blockquote>
      );
    }
    // Handle empty lines
    else if (trimmedLine === '') {
      // Finish any current list
      if (currentList.length > 0) {
        const ListComponent = listType === 'numbered' ? 'ol' : 'ul';
        const listClass = listType === 'numbered' ? 'list-decimal' : 'list-disc';
        elements.push(
          React.createElement(ListComponent, {
            key: `list-${elements.length}`,
            className: `${listClass} list-inside space-y-1 mb-4 ml-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`
          }, currentList)
        );
        currentList = [];
        listType = null;
      }
      // Add spacing
      elements.push(<div key={index} className="mb-2" />);
    }
    // Handle regular paragraphs
    else {
      // Finish any current list
      if (currentList.length > 0) {
        const ListComponent = listType === 'numbered' ? 'ol' : 'ul';
        const listClass = listType === 'numbered' ? 'list-decimal' : 'list-disc';
        elements.push(
          React.createElement(ListComponent, {
            key: `list-${elements.length}`,
            className: `${listClass} list-inside space-y-1 mb-4 ml-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`
          }, currentList)
        );
        currentList = [];
        listType = null;
      }

      elements.push(
        <p key={index} className={`mb-3 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <span dangerouslySetInnerHTML={{ __html: processLine(trimmedLine) }} />
        </p>
      );
    }
  });

  // Finish any remaining list
  if (currentList.length > 0) {
    const ListComponent = listType === 'numbered' ? 'ol' : 'ul';
    const listClass = listType === 'numbered' ? 'list-decimal' : 'list-disc';
    elements.push(
      React.createElement(ListComponent, {
        key: `list-${elements.length}`,
        className: `${listClass} list-inside space-y-1 mb-4 ml-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`
      }, currentList)
    );
  }

  return <div className="space-y-2">{elements}</div>;
};

export default renderMarkdown;