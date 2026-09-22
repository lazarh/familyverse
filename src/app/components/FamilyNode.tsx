import React from 'react';
import Image from 'next/image';
import defaultAvatar from '@/../public/default-avatar.jpg'; // Ensure correct path
import { NodeProps, Handle, Position } from 'reactflow'; // Import NodeProps, Handle, and Position
import { FamilyMember } from '@/generated/prisma'; // Added import
import { pictureToDataUrl } from '@/lib/picture';

// Props for the custom node, extending React Flow's NodeProps
interface CustomFamilyNodeProps extends NodeProps {
  data: {
    member: FamilyMember; // Use FamilyMember type from Prisma
    onClick: (member: FamilyMember) => void; // onClick expects the full member object
    isSelected: boolean;
  };
}

const FamilyNode: React.FC<CustomFamilyNodeProps> = ({ data }) => {
  const { member, onClick, isSelected } = data;
  // Map member.picture (various serialised shapes) to a data URL; falls back to
  // the default avatar when the picture is missing or unrecognised.
  const pictureSrc = pictureToDataUrl(member.picture) ?? defaultAvatar.src; // Use .src for Next.js Image component with static import

  let birthYear: number | null = null;
  let deathYear: number | null = null;
  let age: number | null = null;

  if (member.birthDate) {
    const birthDateObj = new Date(member.birthDate);
    birthYear = birthDateObj.getFullYear();

    if (member.deathDate) {
      const deathDateObj = new Date(member.deathDate);
      age = deathDateObj.getFullYear() - birthYear;
      deathYear = deathDateObj.getFullYear();
    } else {
      const currentYear = new Date().getFullYear(); // Use current year
      age = currentYear - birthYear;
    }
  }

  return (
    <div
      className={`family-node p-3 border rounded-lg shadow-lg bg-white flex flex-col items-center text-center ${isSelected ? 'border-blue-600 ring-2 ring-blue-400' : 'border-gray-400'}`}
      onClick={() => onClick(member)} // Pass the full member object
      style={{ width: '150px' }}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
      <div className="w-20 h-20 rounded-full overflow-hidden mb-2 relative border-2 border-gray-200">
        <Image
          src={pictureSrc}
          alt={`${member.fullName}'s picture`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          onError={(e) => {
            console.error('Error loading image in FamilyNode.tsx. Attempted source:', pictureSrc, 'Original member.picture type:', typeof member.picture, 'Value:', member.picture);
            const target = e.target as HTMLImageElement;
            if (target.src !== defaultAvatar.src) {
                target.src = defaultAvatar.src;
                target.srcset = '';
            }
          }}
        />
      </div>
      <span className="text-base font-semibold truncate w-full px-1">{member.fullName}</span>
      {birthYear && (
        <span className="text-xs text-gray-600">
          {birthYear} - {deathYear ? deathYear : 'Present'}
        </span>
      )}
      {age !== null && (
        <span className="text-xs text-gray-600">
          Age: {age}
        </span>
      )}
    </div>
  );
};

export default FamilyNode;
