'use client';

import React from 'react';
import { toPng } from 'html-to-image';
import { Button } from '@/app/components/ui';

/**
 * PNG export of the tree viewport (the selector targets TreeCanvas's
 * `react-flow-image-download` class). Renders as the same primary Button as
 * "Add member" (matched background + text colour, same 36px height, one
 * baseline in the page head — review feedback on #16). The proper export
 * rework (warm paper background, PDF, filename) remains ticket #9.
 */
const DownloadButton: React.FC = () => {
  const onClick = () => {
    // The React Flow viewport TreeCanvas renders for image export.
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
      .then((dataUrl) => {
        const a = document.createElement('a');
        a.setAttribute('download', 'family-tree.png');
        a.setAttribute('href', dataUrl);
        a.click();
      })
      .catch((error) => {
        console.error('Error generating image:', error);
      });
  };

  return (
    <Button variant="primary" type="button" onClick={onClick}>
      Download image
    </Button>
  );
};

export default DownloadButton;
