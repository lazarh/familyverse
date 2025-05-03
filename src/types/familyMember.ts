export interface FamilyMember {
  id: string; // Unique identifier for the member
  fullName: string; // Full name of the member
  birthDate: string; // Date of birth (e.g., 'YYYY-MM-DD'), could be approximate
  gender: 'Male' | 'Female' | 'Other' | 'Unknown'; // Gender of the member
  
  // Links to parents - crucial for building the tree structure
  // Using string | null to represent the ID of the parent or null if unknown/not applicable
  parentId1: string | null; 
  parentId2: string | null; 

  // Optional but common attributes
  deathDate?: string | null; // Date of death (e.g., 'YYYY-MM-DD'), optional and nullable
  birthPlace?: string; // City or location of birth, optional
  pictureUrl?: string; // URL or path to a picture, optional
}
