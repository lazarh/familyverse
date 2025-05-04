import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

// Define the expected data structure for the custom node
interface FamilyNodeData {
  label: string;
  pictureUrl?: string | null;
}

// Define the props for the FamilyNode component, extending NodeProps
interface FamilyNodeProps extends NodeProps<FamilyNodeData> {}

const FamilyNode: React.FC<FamilyNodeProps> = ({ data }) => {
  const defaultPicture = '/default-avatar.jpg'; // Path to a default avatar image (updated extension)

  return (
    <>
      {/* Handles for incoming/outgoing connections */}
      <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
      <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
        <img
          src={data.pictureUrl || defaultPicture}
          alt={data.label}
          style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '8px', objectFit: 'cover' }}
          onError={(e) => { (e.target as HTMLImageElement).src = defaultPicture; }} // Fallback to default avatar on error
        />
        <div style={{ fontSize: '11px', lineHeight: '1.2', whiteSpace: 'pre-wrap', textAlign: 'left' }}>
          {data.label}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} />
    </>
  );
};

export default memo(FamilyNode);
