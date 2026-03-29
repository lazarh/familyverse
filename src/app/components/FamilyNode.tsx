import React from 'react';
import Image from 'next/image';
import defaultAvatar from '@/../public/default-avatar.jpg'; // Ensure correct path
import { NodeProps, Handle, Position } from 'reactflow'; // Import NodeProps, Handle, and Position
import type { FamilyMember } from '@/db/schema';

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
  let pictureSrc = defaultAvatar.src; // Use .src for Next.js Image component with static import

  // Use 'unknown' to handle various shapes of member.picture after JSON serialization
  const picToProcess: unknown = member.picture;

  if (picToProcess) { // Check if not null/undefined
    if (picToProcess instanceof Uint8Array) {
      // Handles true Uint8Array instances (includes Buffer instances if they are passed directly)
      const buffer = Buffer.from(picToProcess); // picToProcess is narrowed to Uint8Array
      pictureSrc = `data:image/jpeg;base64,${buffer.toString('base64')}`;
    } else if (
      typeof picToProcess === 'object' &&
      picToProcess !== null &&
      'type' in picToProcess && (picToProcess as any).type === 'Buffer' && // type guard for {type: 'Buffer', data: [...]}
      'data' in picToProcess && Array.isArray((picToProcess as any).data)
    ) {
      // Handles objects like { type: 'Buffer', data: [0, 1, 2,...] }
      const buffer = Buffer.from((picToProcess as any).data); // picToProcess is object here
      pictureSrc = `data:image/jpeg;base64,${buffer.toString('base64')}`;
    } else if (
      typeof picToProcess === 'object' &&
      picToProcess !== null &&
      !Array.isArray(picToProcess) && // Not a plain array
      Object.prototype.hasOwnProperty.call(picToProcess, '0') && // Has numeric-like string keys e.g. '0'
      typeof (picToProcess as Record<string, any>)['0'] === 'number' // Values are numbers
    ) {
      // Handles objects like { '0': 82, '1': 73, ... } which was causing the error
      try {
        const byteObject = picToProcess as Record<string, any>;
        const byteValues = Object.values(byteObject)
          .filter(value => typeof value === 'number' && value >= 0 && value <= 255) as number[];

        // Ensure that we actually got byte values and that they plausibly represent the whole object
        if (byteValues.length > 0 && byteValues.length === Object.keys(byteObject).length) {
          const uint8Array = new Uint8Array(byteValues);
          const buffer = Buffer.from(uint8Array);
          pictureSrc = `data:image/jpeg;base64,${buffer.toString('base64')}`;
        } else {
          console.warn("FamilyNode: Object looked like byte data, but contained invalid, non-numeric, or insufficient byte values.", picToProcess);
        }
      } catch (e) {
        console.warn("FamilyNode: Error processing object-as-byte-data.", e, picToProcess);
      }
    } else if (typeof picToProcess === 'string') {
      // Handles base64 strings or data URLs
      if (picToProcess.startsWith('data:image')) { // picToProcess is narrowed to string
        pictureSrc = picToProcess;
      } else {
        // Assuming it's a raw base64 string without the prefix
        pictureSrc = `data:image/jpeg;base64,${picToProcess}`;
      }
    } else {
      // Fallback for any other unexpected format
      console.warn("Unsupported or unexpected picture format in FamilyNode after all checks:", picToProcess);
    }
  }

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
