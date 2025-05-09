import React from 'react';
import Image from 'next/image';
import { FamilyMember } from '@/generated/prisma'; // Corrected import path
import { NodeProps, Handle, Position } from 'reactflow'; // Import NodeProps, Handle, and Position

// Props for the custom node, extending React Flow's NodeProps
interface CustomFamilyNodeProps extends NodeProps {
  data: {
    member: FamilyMember;
    onClick: (member: FamilyMember) => void;
    isSelected: boolean;
  };
}

const FamilyNode: React.FC<CustomFamilyNodeProps> = ({ data }) => {
  const { member, onClick, isSelected } = data;
  const defaultAvatar = '/default-avatar.jpg';
  const pictureUrl = member.pictureUrl || defaultAvatar;

  // It's good practice to define a fixed size for nodes in React Flow
  // or ensure the content dictates a consistent size.
  // The width is set via style, height will be auto based on content.
  return (
    <div
      className={`family-node p-3 border rounded-lg shadow-lg bg-white flex flex-col items-center text-center ${isSelected ? 'border-blue-600 ring-2 ring-blue-400' : 'border-gray-400'}`}
      onClick={() => onClick(member)}
      style={{ width: '150px' }} // Increased width slightly for better presentation
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
      <div className="w-20 h-20 rounded-full overflow-hidden mb-2 relative border-2 border-gray-200">
        {/* Replace legacy 'layout' and 'objectFit' props with 'fill' for Next.js 13 compatibility */}
        <Image
          src={pictureUrl}
          alt={`${member.fullName}'s picture`}
          fill
          onError={(e) => {
            (e.target as HTMLImageElement).src = defaultAvatar;
            (e.target as HTMLImageElement).srcset = '';
          }}
        />
      </div>
      <span className="text-base font-semibold truncate w-full px-1">{member.fullName}</span>
      {/* Optional: Add more details like birth/death dates if desired */}
      {/* <span className="text-xs text-gray-500">{member.gender}</span> */}
      {/* <span className="text-xs text-gray-500">{member.birthDate ? new Date(member.birthDate).toLocaleDateString() : ''}</span> */}
    </div>
  );
};

export default FamilyNode;
