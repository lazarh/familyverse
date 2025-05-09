'use client';

import React, { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import FamilyTreeGraph from './components/FamilyTreeGraph'; // Import the new graph component
import { FamilyMember } from '@/generated/prisma'; // Corrected import path
import Image from 'next/image'; // Import next/image

// Define a type for the API error response
interface ApiError {
  message: string;
}

// Define a type for the form data state
interface PageFormData {
  id?: string;
  fullName?: string;
  gender?: string;
  birthDate?: string; // Dates are strings for form inputs
  deathDate?: string; // Dates are strings for form inputs
  birthPlace?: string | null;
  pictureUrl?: string | null; // Used for initial state or if backend sends it
  parentId1?: string | null;
  parentId2?: string | null;
  removePicture?: boolean; // Custom flag for form logic
}

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [formData, setFormData] = useState<PageFormData>({}); // Use PageFormData type
  const [picturePreview, setPicturePreview] = useState<string | null>(null);
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFamilyMembers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/family-members');
      if (!response.ok) {
        throw new Error('Failed to fetch family members');
      }
      const data: FamilyMember[] = await response.json();
      setFamilyMembers(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === 'loading') return; // Don't do anything while loading
    if (!session) {
      router.push('/login');
    } else {
      fetchFamilyMembers();
    }
  }, [session, status, router, fetchFamilyMembers]);

  // Fix type mismatches by converting numbers to strings where necessary
  const handleNodeClick = (member: FamilyMember) => {
    setSelectedMember(member);
    const memberDataForForm: PageFormData = {
      id: member.id.toString(), // Convert number to string
      fullName: member.fullName,
      gender: member.gender,
      birthDate: member.birthDate ? new Date(member.birthDate).toISOString().split('T')[0] : '',
      deathDate: member.deathDate ? new Date(member.deathDate).toISOString().split('T')[0] : '',
      birthPlace: member.birthPlace,
      pictureUrl: member.pictureUrl, // Keep this for consistency if needed by other logic
      parentId1: member.parentId1?.toString() || null, // Convert number to string or null
      parentId2: member.parentId2?.toString() || null, // Convert number to string or null
    };
    setFormData(memberDataForForm);
    setPicturePreview(member.pictureUrl || null);
    setPictureFile(null); // Reset file input when selecting a member
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleAddMemberClick = () => {
    setSelectedMember(null);
    setFormData({ // This now correctly matches PageFormData
      fullName: '',
      gender: 'Male', // Default gender
      birthDate: '',
      deathDate: '',
      birthPlace: '',
      parentId1: '',
      parentId2: '',
      pictureUrl: null, // Explicitly set
      removePicture: false, // Explicitly set
    });
    setPicturePreview(null);
    setPictureFile(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
    setFormData({});
    setPicturePreview(null);
    setPictureFile(null);
    setError(null); // Clear error on modal close
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPictureFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      if (modalMode === 'edit' && selectedMember) {
        setPicturePreview(selectedMember.pictureUrl || '/default-avatar.jpg');
      } else {
        setPicturePreview('/default-avatar.jpg');
      }
      setPictureFile(null);
    }
  };

  const handleRemovePicture = () => {
    setPicturePreview('/default-avatar.jpg'); // Show default avatar
    setPictureFile(null); // Clear the file input state
    if (modalMode === 'edit') {
      setFormData(prev => ({ ...prev, pictureUrl: null, removePicture: true }));
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const memberFormData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      // Skip internal state flags like removePicture
      if (key === 'removePicture') return;

      // Handle potential null/undefined values before appending
      if (value !== null && value !== undefined) {
        if (typeof value === 'string') {
          memberFormData.append(key, value);
        }
      }
    });

    if (pictureFile) {
      memberFormData.append('picture', pictureFile);
    } else if (formData.removePicture && modalMode === 'edit') {
      memberFormData.append('removePicture', 'true');
    }

    const url = modalMode === 'edit' && selectedMember ? `/api/family-members/${selectedMember.id}` : '/api/family-members';
    const method = modalMode === 'edit' ? 'PATCH' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        body: memberFormData,
      });

      if (!response.ok) {
        let errorData: ApiError | null = null;
        try {
          errorData = await response.json() as ApiError;
        } catch (jsonParseError) {
          console.error("Failed to parse error response:", jsonParseError);
        }
        const errorMessage = errorData?.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      handleCloseModal();
      fetchFamilyMembers();
    } catch (err: unknown) {
      console.error(`Failed to ${modalMode === 'edit' ? 'update' : 'add'} member:`, err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMember = async (memberId: string | undefined) => {
    if (!memberId || !window.confirm('Are you sure you want to delete this family member?')) {
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`/api/family-members/${memberId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        let errorData: ApiError | null = null;
        try {
          errorData = await response.json() as ApiError;
        } catch (jsonParseError) {
          console.error("Failed to parse error response:", jsonParseError);
        }
        const errorMessage = errorData?.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      handleCloseModal();
      fetchFamilyMembers();
    } catch (err: unknown) {
      console.error(`Failed to delete member ${memberId}:`, err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  const renderFamilyTree = () => {
    if (familyMembers.length === 0 && !isLoading) {
      return <p className="text-center text-gray-500">No family members yet. Add one to get started!</p>;
    }
    if (isLoading) {
      return <p className="text-center text-gray-500">Loading family tree...</p>;
    }
    return (
      <FamilyTreeGraph
        familyMembers={familyMembers}
        onNodeClick={handleNodeClick}
        selectedMemberId={selectedMember?.id?.toString() || null} // Convert number to string or null
      />
    );
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Family Tree</h1>
        <div>
          <span className="mr-4">Welcome, {session.user?.email}</span>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
        </div>
      </header>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

      <div className="mb-6">
        <button
          onClick={handleAddMemberClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Family Member
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow">
        {renderFamilyTree()}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
          <div className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-lg mx-4">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-6">{modalMode === 'edit' ? 'Edit' : 'Add'} Family Member</h2>
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="flex flex-col items-center mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 relative mb-2">
                  <Image
                    src={picturePreview || '/default-avatar.jpg'}
                    alt="Profile picture preview"
                    fill
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/default-avatar.jpg';
                      (e.target as HTMLImageElement).srcset = '';
                    }}
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePictureChange}
                  className="text-sm text-grey-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                {picturePreview && picturePreview !== '/default-avatar.jpg' && (
                  <button
                    type="button"
                    onClick={handleRemovePicture}
                    className="mt-2 text-xs text-red-600 hover:text-red-800"
                  >
                    Remove Picture
                  </button>
                )}
              </div>

              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName || ''}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender *</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender || ''}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>

              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Birth Date</label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="deathDate" className="block text-sm font-medium text-gray-700">Death Date</label>
                <input
                  type="date"
                  id="deathDate"
                  name="deathDate"
                  value={formData.deathDate || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="birthPlace" className="block text-sm font-medium text-gray-700">Birth Place</label>
                <input
                  type="text"
                  id="birthPlace"
                  name="birthPlace"
                  value={formData.birthPlace || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="parentId1" className="block text-sm font-medium text-gray-700">Parent 1</label>
                <select
                  id="parentId1"
                  name="parentId1"
                  value={formData.parentId1 || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Parent 1</option>
                  {familyMembers
                    .filter(member => member.id !== selectedMember?.id)
                    .map(member => (
                      <option key={member.id} value={member.id}>{member.fullName}</option>
                    ))}
                </select>
              </div>

              <div>
                <label htmlFor="parentId2" className="block text-sm font-medium text-gray-700">Parent 2</label>
                <select
                  id="parentId2"
                  name="parentId2"
                  value={formData.parentId2 || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Parent 2</option>
                  {familyMembers
                    .filter(member => member.id !== selectedMember?.id && member.id !== formData.parentId1)
                    .map(member => (
                      <option key={member.id} value={member.id}>{member.fullName}</option>
                    ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                {modalMode === 'edit' && (
                  <button
                    type="button"
                    onClick={() => handleDeleteMember(selectedMember?.id)}
                    disabled={isLoading}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                  >
                    {isLoading ? 'Deleting...' : 'Delete'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : (modalMode === 'edit' ? 'Save Changes' : 'Add Member')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
