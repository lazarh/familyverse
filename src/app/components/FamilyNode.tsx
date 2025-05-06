import React from 'react';
import Image from 'next/image'; // Import next/image
import { FamilyMember } from '@/generated/prisma'; // Corrected import path

interface FamilyNodeProps {
  member: FamilyMember;
  onClick: (member: FamilyMember) => void;
  isSelected: boolean;
}

const FamilyNode: React.FC<FamilyNodeProps> = ({ member, onClick, isSelected }) => {
  const defaultAvatar = '/default-avatar.jpg';
  const pictureUrl = member.pictureUrl || defaultAvatar;

  return (
    <div
      className={`family-node p-2 border rounded-lg shadow-md cursor-pointer flex flex-col items-center text-center ${isSelected ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-300'}`}
      onClick={() => onClick(member)}
      style={{ width: '120px' }}
    >
      <div className="w-16 h-16 rounded-full overflow-hidden mb-2 relative">
        <Image
          src={pictureUrl}
          alt={`${member.fullName}'s picture`}
          layout="fill" // Use layout="fill" for responsive images within a sized container
          objectFit="cover" // Ensure the image covers the area
          onError={(e) => {
            // Type assertion for the event target
            (e.target as HTMLImageElement).src = defaultAvatar;
            (e.target as HTMLImageElement).srcset = ''; // Clear srcset as well if using responsive images
          }}
        />
      </div>
      <span className="text-sm font-medium truncate w-full">{member.fullName}</span>
      <span className="text-xs text-gray-500">{member.gender}</span>
    </div>
  );
};

export default FamilyNode;
