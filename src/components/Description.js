import React, { useState } from 'react';
import DOMPurify from 'dompurify';

const stripHtmlTags = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

const Description = ({ description, showMore, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Sanitize the description
  const sanitizedDescription = DOMPurify.sanitize(description);

  // Strip HTML tags for the preview text
  const strippedDescription = stripHtmlTags(sanitizedDescription);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  // Conditionally set the content to be displayed
  const contentToShow = isExpanded
    ? sanitizedDescription
    : strippedDescription.length > maxLength
      ? strippedDescription.substring(0, maxLength) + '...'
      : strippedDescription;

  return (
    <div>
      <p className="text-[15px]" dangerouslySetInnerHTML={{ __html: isExpanded ? sanitizedDescription : contentToShow }} />
      
      {strippedDescription.length > maxLength && showMore && (
        <button onClick={toggleExpansion} className='font-medium text-gray-500'>
          {isExpanded ? 'See less' : 'See more'}
        </button>
      )}
    </div>
  );
};

export default Description;
