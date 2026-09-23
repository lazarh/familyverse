'use client';

import React from 'react';
import { toPng } from 'html-to-image';

function downloadImage(dataUrl: string) {
  const a = document.createElement('a');
  a.setAttribute('download', 'family-tree.png');
  a.setAttribute('href', dataUrl);
  a.click();
}

const DownloadButton: React.FC = () => {
  const onClick = () => {
    // The selector for the React Flow viewport.
    // Ensure your ReactFlow component has a className that matches.
    // For example, you can add className="react-flow-image-download" to your ReactFlow component.
    const flowViewport = document.querySelector('.react-flow-image-download .react-flow__viewport');

    if (!flowViewport) {
      console.error('React Flow viewport not found. Make sure your ReactFlow component has the correct className.');
      return;
    }

    toPng(flowViewport as HTMLElement, {
      backgroundColor: 'white', // Or any color you prefer
      width: flowViewport.clientWidth,
      height: flowViewport.clientHeight,
      style: {
        width: flowViewport.clientWidth.toString(),
        height: flowViewport.clientHeight.toString(),
      }
    })
      .then(downloadImage)
      .catch((error) => {
        console.error('Error generating image:', error);
      });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Download tree as image"
      className="absolute right-2.5 top-2.5 z-[4] cursor-pointer border border-[var(--line-strong)] bg-[var(--card)] px-3 py-2 text-[13.5px] font-semibold text-[var(--ink-soft)] shadow-[var(--shadow)] transition-colors hover:border-[var(--clay)] hover:text-[var(--clay)]"
    >
      Download Image
    </button>
  );
};

export default DownloadButton;
