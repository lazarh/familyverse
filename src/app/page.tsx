'use client';

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Position,
  MarkerType,
  BackgroundVariant,
  NodeMouseHandler
} from 'reactflow';
import 'reactflow/dist/style.css'; // Import reactflow styles
import { FamilyMember } from '@/types/familyMember'; // Assuming type path
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique IDs
import dagre from 'dagre'; // Import dagre
import FamilyNode from './components/FamilyNode'; // Import the custom node
import { useSession, signIn, signOut } from 'next-auth/react'; // Import next-auth hooks
import Link from 'next/link'; // Import Link

// === Dagre Layout Function ===
const getLayoutedElements = (familyMembers: FamilyMember[], direction = 'TB') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction, nodesep: 50, ranksep: 100 }); // TB = Top to Bottom, add spacing

  const nodeWidth = 170; // Match node style width + padding
  const nodeHeight = 60; // Approximate height based on content

  familyMembers.forEach((member) => {
    dagreGraph.setNode(member.id, { label: member.fullName, width: nodeWidth, height: nodeHeight });
  });

  familyMembers.forEach((member) => {
    // Add edges from parent to child for layout calculation
    if (member.parentId1 && familyMembers.some(p => p.id === member.parentId1)) {
      dagreGraph.setEdge(member.parentId1, member.id);
    }
    if (member.parentId2 && familyMembers.some(p => p.id === member.parentId2)) {
      dagreGraph.setEdge(member.parentId2, member.id);
    }
  });

  dagre.layout(dagreGraph);

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  familyMembers.forEach((member) => {
    const node = dagreGraph.node(member.id);
    if (node) {
        nodes.push({
          id: member.id,
          type: 'familyNode', // Specify custom node type
          data: {
            label: `${member.fullName}\n(${member.birthDate?.substring(0, 4) || 'N/A'})`,
            pictureUrl: member.pictureUrl // Pass picture URL
          },
          position: {
            x: node.x - nodeWidth / 2,
            y: node.y - nodeHeight / 2,
          },
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top,
          style: {
            // Keep base styles, custom component will handle internal layout
            border: '1px solid var(--node-border)',
            padding: 10,
            background: 'var(--node-bg)',
            width: nodeWidth,
            // height will be determined by content or custom component style
          },
        });
    } else {
        console.warn(`Node data for ${member.fullName} (ID: ${member.id}) not found in Dagre layout.`);
    }

    const commonEdgeStyle = {
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
        style: { strokeWidth: 1.5, stroke: 'var(--edge-stroke)' },
    };
    if (member.parentId1 && familyMembers.some(p => p.id === member.parentId1)) {
      edges.push({ id: `e-${member.parentId1}-${member.id}`, source: member.parentId1, target: member.id, ...commonEdgeStyle });
    }
    if (member.parentId2 && familyMembers.some(p => p.id === member.parentId2)) {
      edges.push({ id: `e-${member.parentId2}-${member.id}`, source: member.parentId2, target: member.id, ...commonEdgeStyle });
    }
  });

  return { layoutedNodes: nodes, layoutedEdges: edges };
};
// === End Dagre Layout Function ===

// === Node Types for React Flow ===
const nodeTypes = {
  familyNode: FamilyNode, // Register the custom node component
};

// === Advertisement Component for Unauthenticated Users ===
const AdvertisementSection = () => (
  <div className="text-center p-10 border rounded-lg shadow-lg bg-gradient-to-br from-indigo-50 via-white to-purple-50">
    <h2 className="text-3xl font-bold mb-4 text-indigo-800">Welcome to FamilyVerse!</h2>
    <p className="text-lg mb-6 text-gray-700">
      Visually build, explore, and share your family history like never before.
      Create beautiful family trees, add photos and details, and connect with your roots.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
       <div className="bg-gray-200 h-48 rounded flex items-center justify-center text-gray-500">Screenshot 1: Family Tree View</div>
       <div className="bg-gray-200 h-48 rounded flex items-center justify-center text-gray-500">Screenshot 2: Member Form</div>
    </div>
    <div className="space-x-4">
      <button
        onClick={() => signIn()}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded transition duration-300"
      >
        Login
      </button>
      <Link href="/register">
        <span className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded transition duration-300 cursor-pointer">
          Register
        </span>
      </Link>
    </div>
  </div>
);
// === End Advertisement Component ===

export default function Home() {
  const { data: session, status } = useSession(); // Get session status
  const [accountStatus, setAccountStatus] = useState<'trial' | 'paid' | 'unknown'>('trial'); // Keep account status logic if needed

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<FamilyMember>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [removePicture, setRemovePicture] = useState<boolean>(false);
  const [currentPictureUrl, setCurrentPictureUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const existingMembersForDropdown: Pick<FamilyMember, 'id' | 'fullName'>[] = useMemo(() =>
    familyMembers.map(m => ({ id: m.id, fullName: m.fullName })).sort((a, b) => a.fullName.localeCompare(b.fullName)),
    [familyMembers]
  );

  const fetchData = useCallback(async () => {
    if (status !== 'authenticated') {
        setIsLoading(false);
        setFamilyMembers([]);
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/family-members');
      if (!response.ok) {
        let errorMsg = `HTTP error! status: ${response.status}`;
         if (response.status === 401) {
             errorMsg = "Unauthorized. Please log in.";
         } else {
            try {
              const errorData = await response.json();
              errorMsg = errorData.message || errorMsg;
            } catch (jsonError) {}
         }
        throw new Error(errorMsg);
      }
      const data: FamilyMember[] = await response.json();
      const formattedData = data.map(member => ({
        ...member,
        birthDate: member.birthDate ? member.birthDate.substring(0, 10) : '',
        deathDate: member.deathDate ? member.deathDate.substring(0, 10) : null,
      }));
      setFamilyMembers(formattedData);
    } catch (e: any) {
      console.error("Failed to fetch family members:", e);
      setError(`Failed to load family tree: ${e.message}`);
      setFamilyMembers([]);
    } finally {
      setIsLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (status === 'authenticated') {
        fetchData();
    } else if (status === 'unauthenticated') {
        setFamilyMembers([]);
        setIsLoading(false);
        setError(null);
        cancelEdit();
    }
  }, [status, fetchData]);

  const { layoutedNodes, layoutedEdges } = useMemo(() => {
    if (isLoading || error || status !== 'authenticated') return { layoutedNodes: [], layoutedEdges: [] };
    return getLayoutedElements(familyMembers, 'TB');
  }, [familyMembers, isLoading, error, status]);

  const [nodes, setNodes] = useState<Node[]>(layoutedNodes);
  const [edges, setEdges] = useState<Edge[]>(layoutedEdges);

  useEffect(() => {
    setNodes(layoutedNodes);
  }, [layoutedNodes]);

  useEffect(() => {
    setEdges(layoutedEdges);
  }, [layoutedEdges]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        if (name === 'removePicture') {
            setRemovePicture(checked);
            if (checked) {
                setSelectedFile(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
        }
    } else if (type === 'file') {
        const file = (e.target as HTMLInputElement).files?.[0];
        setSelectedFile(file || null);
        if (file) {
            setRemovePicture(false);
        }
    } else {
        setFormData(prev => ({
            ...prev,
            [name]: value === "" ? null : value
        }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     if (status !== 'authenticated') {
         alert("Please log in to manage family members.");
         return;
     }
     if (!formData.fullName || !formData.gender || !formData.birthDate) {
        alert("Full Name, Gender, and Birth Date are required.");
        return;
    }

    const submissionData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
        if (key === 'pictureUrl') return;
        submissionData.append(key, value === null ? '' : String(value));
    });

    if (selectedFile) {
        submissionData.append('picture', selectedFile);
    }

    if (removePicture) {
        submissionData.append('removePicture', 'true');
    }

    const apiUrl = editingMemberId ? `/api/family-members/${editingMemberId}` : '/api/family-members';
    const apiMethod = editingMemberId ? 'PATCH' : 'POST';

     try {
        const response = await fetch(apiUrl, {
            method: apiMethod,
            body: submissionData,
        });

        if (!response.ok) {
            let errorMsg = `API error! status: ${response.status}`;
            try {
                const errorData = await response.json();
                errorMsg = errorData.message || errorMsg;
            } catch (jsonError) {}
            throw new Error(errorMsg);
        }

        cancelEdit();
        await fetchData();

     } catch (error: any) {
        console.error(`Failed to ${editingMemberId ? 'update' : 'add'} member:`, error);
        alert(`Error: ${error.message}`);
     }
  };

  const handleEditMember = useCallback((memberId: string) => {
    const memberToEdit = familyMembers.find(m => m.id === memberId);
    if (memberToEdit) {
      setEditingMemberId(memberId);
      const { pictureUrl, ...restOfData } = memberToEdit;
      setFormData({
          ...restOfData,
          parentId1: memberToEdit.parentId1 ?? "",
          parentId2: memberToEdit.parentId2 ?? "",
          birthDate: memberToEdit.birthDate ? memberToEdit.birthDate.substring(0, 10) : '',
          deathDate: memberToEdit.deathDate ? memberToEdit.deathDate.substring(0, 10) : '',
      });
      setCurrentPictureUrl(pictureUrl ?? null);
      setSelectedFile(null);
      setRemovePicture(false);
      if (fileInputRef.current) {
          fileInputRef.current.value = '';
      }

      const formElement = document.getElementById('member-form');
      formElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [familyMembers]);

  const handleNodeClick: NodeMouseHandler = useCallback((event, node) => {
    handleEditMember(node.id);
  }, [handleEditMember]);

  const handleRemoveMember = async (memberId: string) => {
     if (status !== 'authenticated') {
         alert("Please log in to manage family members.");
         return;
     }
     if (formData.parentId1 === memberId || formData.parentId2 === memberId) {
        alert("Cannot remove a member currently selected as a parent in the form. Please change the parent selection first.");
        return;
    }

    if (window.confirm("Are you sure you want to remove this family member? This may affect child relationships and cannot be undone.")) {
         try {
            const response = await fetch(`/api/family-members/${memberId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                let errorMsg = `API error! status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.message || errorMsg;
                } catch (jsonError) {}
                if (response.status === 409 || response.status === 400) {
                     errorMsg = (await response.json()).message || "Cannot remove member. They might be set as a parent for another member, or another issue occurred.";
                }
                throw new Error(errorMsg);
            }

            if (editingMemberId === memberId) {
                cancelEdit();
            }

            await fetchData();

         } catch (error: any) {
            console.error("Failed to remove member:", error);
            alert(`Error removing member: ${error.message}`);
         }
     }
  };

  const cancelEdit = () => {
      setEditingMemberId(null);
      setFormData({});
      setSelectedFile(null);
      setRemovePicture(false);
      setCurrentPictureUrl(null);
      const form = document.getElementById('member-form') as HTMLFormElement | null;
      form?.reset();
      if (fileInputRef.current) {
          fileInputRef.current.value = '';
      }
      const genderSelect = form?.elements.namedItem('gender') as HTMLSelectElement | null;
      if (genderSelect) genderSelect.value = "";
      const parent1Select = form?.elements.namedItem('parentId1') as HTMLSelectElement | null;
      if (parent1Select) parent1Select.value = "";
      const parent2Select = form?.elements.namedItem('parentId2') as HTMLSelectElement | null;
      if (parent2Select) parent2Select.value = "";
  };

  if (status === 'loading') {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <p className="text-xl font-semibold">Loading session...</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[var(--app-bg)]">
      <header className="bg-[var(--header-bg)] text-[var(--header-text)] p-4 shadow-md">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">FamilyVerse</h1>
          <div>
            {status === 'authenticated' ? (
              <div className="flex items-center gap-4">
                 <span className="text-sm">Welcome, {session.user?.email}!</span>
                 <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="bg-[var(--btn-danger-bg)] hover:bg-[var(--btn-danger-bg-hover)] text-[var(--btn-danger-text)] font-bold py-2 px-4 rounded"
                 >
                    Logout
                 </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => signIn()}
                  className="bg-[var(--btn-secondary-bg)] hover:bg-[var(--btn-secondary-bg-hover)] text-[var(--btn-secondary-text)] font-bold py-2 px-4 rounded mr-2"
                >
                  Login
                </button>
                <Link href="/register">
                   <span className="bg-[var(--btn-success-bg)] hover:bg-[var(--btn-success-bg-hover)] text-[var(--btn-success-text)] font-bold py-2 px-4 rounded cursor-pointer">
                     Register
                   </span>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto p-8">

        {status === 'authenticated' ? (
          <>
            {accountStatus === 'trial' && (
              <section className="mb-8 p-4 border rounded-lg shadow bg-[var(--alert-warning-bg)] border-[var(--alert-warning-border)] text-center md:text-left">
                 <div className="md:flex md:items-center md:justify-between">
                     <div>
                        <h3 className="text-md font-medium mb-1 text-[var(--alert-warning-text)]">Account Status: Trial Mode</h3>
                        <p className="text-sm text-[var(--text-secondary)] mb-2 md:mb-0">Trial allows visualization up to great-grandparents.</p>
                     </div>
                     <button className="bg-[var(--btn-warning-bg)] hover:bg-[var(--btn-warning-bg-hover)] text-[var(--btn-warning-text)] font-bold py-2 px-4 rounded w-full sm:w-auto text-sm mt-2 md:mt-0">
                         Upgrade to Paid
                     </button>
                 </div>
              </section>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <section className="md:col-span-2 border rounded-lg p-4 shadow relative overflow-hidden bg-[var(--section-bg-alt)]" style={{ height: '70vh' }}>
                <h2 className="text-lg font-semibold mb-4 absolute top-4 left-4 z-10 bg-[var(--section-bg)] p-1 rounded shadow-sm">Family Tree Visualization</h2>
                 {isLoading && <div className="absolute inset-0 flex items-center justify-center bg-[var(--section-bg)] bg-opacity-75 z-20"><p className="text-lg font-medium text-[var(--text-secondary)]">Loading family tree...</p></div>}
                 {error && <div className="absolute inset-0 flex items-center justify-center bg-[var(--alert-error-bg)] z-20"><p className="text-lg font-medium text-[var(--alert-error-text)] p-4">{error}</p></div>}
                 {!isLoading && !error && nodes.length === 0 && (
                   <div className="absolute inset-0 flex items-center justify-center bg-[var(--section-bg-alt)] z-20"><p className="text-lg font-medium text-[var(--text-subtle)]">No family members found. Add one to start!</p></div>
                 )}
                 {!isLoading && !error && nodes.length > 0 && (
                   <ReactFlow
                      nodes={nodes}
                      edges={edges}
                      onNodesChange={onNodesChange}
                      onEdgesChange={onEdgesChange}
                      onNodeClick={handleNodeClick}
                      nodeTypes={nodeTypes}
                      fitView
                      fitViewOptions={{ padding: 0.2 }}
                      nodesDraggable={false}
                      className="bg-gradient-to-br from-[var(--section-bg-alt)] to-[var(--section-bg-subtle)]"
                    >
                      <Controls />
                      <Background variant={BackgroundVariant.Dots} gap={15} size={1} />
                    </ReactFlow>
                 )}
                <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                  <button className="bg-[var(--btn-neutral-bg)] hover:bg-[var(--btn-neutral-bg-hover)] text-[var(--btn-neutral-text)] font-bold py-1 px-3 rounded text-sm">Export as Image</button>
                  <button className="bg-[var(--btn-neutral-bg)] hover:bg-[var(--btn-neutral-bg-hover)] text-[var(--btn-neutral-text)] font-bold py-1 px-3 rounded text-sm">Export as PDF</button>
                </div>
              </section>

              <aside className="md:col-span-1 border rounded-lg p-4 shadow flex flex-col bg-[var(--section-bg)]">
                <h2 className="text-lg font-semibold mb-4">Manage Family Members</h2>
                <form id="member-form" onSubmit={handleFormSubmit} className="mb-4 space-y-3">
                   <h3 className="text-md font-medium mb-2">{editingMemberId ? 'Edit Member' : 'Add New Member'}</h3>

                   <div>
                       <label htmlFor="fullName" className="block text-sm font-medium text-[var(--form-label-text)] mb-1">Full Name *</label>
                       <input
                          type="text" id="fullName" name="fullName" required
                          className="border border-[var(--form-input-border)] p-2 rounded w-full text-sm bg-[var(--form-input-bg)] text-black" placeholder="John Doe"
                          value={formData.fullName || ''} onChange={handleInputChange}
                       />
                   </div>

                   <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-[var(--form-label-text)] mb-1">Gender *</label>
                      <select
                          id="gender" name="gender" required
                          className="border border-[var(--form-input-border)] p-2 rounded w-full text-sm bg-[var(--form-input-bg)] text-black"
                          value={formData.gender || ''} onChange={handleInputChange}
                      >
                          <option value="" disabled >Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Unknown">Unknown</option>
                      </select>
                   </div>

                   <div className="grid grid-cols-2 gap-2">
                      <div>
                          <label htmlFor="birthDate" className="block text-sm font-medium text-[var(--form-label-text)] mb-1">Birth Date *</label>
                          <input
                              type="date" id="birthDate" name="birthDate" required
                              className="border border-[var(--form-input-border)] p-2 rounded w-full text-sm bg-[var(--form-input-bg)] text-black"
                              value={formData.birthDate || ''} onChange={handleInputChange}
                          />
                      </div>
                       <div>
                          <label htmlFor="deathDate" className="block text-sm font-medium text-[var(--form-label-text)] mb-1">Death Date</label>
                          <input
                              type="date" id="deathDate" name="deathDate"
                              className="border border-[var(--form-input-border)] p-2 rounded w-full text-sm bg-[var(--form-input-bg)] text-black"
                              value={formData.deathDate || ''} onChange={handleInputChange}
                          />
                       </div>
                   </div>

                   <div>
                      <label htmlFor="birthPlace" className="block text-sm font-medium text-[var(--form-label-text)] mb-1">Birth Place</label>
                      <input
                          type="text" id="birthPlace" name="birthPlace"
                          className="border border-[var(--form-input-border)] p-2 rounded w-full text-sm bg-[var(--form-input-bg)] text-black" placeholder="City, Country"
                          value={formData.birthPlace || ''} onChange={handleInputChange}
                      />
                  </div>

                   <div>
                      <label htmlFor="picture" className="block text-sm font-medium text-[var(--form-label-text)] mb-1">
                          {editingMemberId ? 'Change Picture' : 'Picture'}
                      </label>
                      {editingMemberId && currentPictureUrl && !removePicture && (
                          <div className="mb-2">
                              <img src={currentPictureUrl} alt="Current picture" className="h-20 w-20 object-cover rounded border-[var(--border-color)]" />
                          </div>
                      )}
                      <input
                          type="file" id="picture" name="picture"
                          ref={fileInputRef}
                          className="border border-[var(--form-input-border)] p-2 rounded w-full text-sm file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[var(--form-file-btn-bg)] file:text-[var(--form-file-btn-text)] hover:file:bg-[var(--form-file-btn-bg-hover)] text-black"
                          accept="image/png, image/jpeg, image/gif, image/webp"
                          onChange={handleInputChange}
                          disabled={removePicture}
                      />
                      {editingMemberId && currentPictureUrl && (
                          <div className="mt-1 flex items-center">
                              <input
                                  type="checkbox"
                                  id="removePicture"
                                  name="removePicture"
                                  checked={removePicture}
                                  onChange={handleInputChange}
                                  className="h-4 w-4 text-[var(--btn-danger-ring)] border-[var(--border-color)] rounded focus:ring-[var(--btn-danger-bg)]"
                              />
                              <label htmlFor="removePicture" className="ml-2 block text-sm text-[var(--text-primary)]">
                                  Remove current picture
                              </label>
                          </div>
                      )}
                   </div>

                   <div>
                      <label htmlFor="parentId1" className="block text-sm font-medium text-[var(--form-label-text)] mb-1">Parent 1</label>
                      <select
                          id="parentId1" name="parentId1"
                          className="border border-[var(--form-input-border)] p-2 rounded w-full text-sm bg-[var(--form-input-bg)] text-black"
                          value={formData.parentId1 || ''} onChange={handleInputChange}
                          disabled={!existingMembersForDropdown.length}
                      >
                          <option value="">Select Parent 1</option>
                          {existingMembersForDropdown
                              .filter(member => member.id !== editingMemberId && member.id !== formData.parentId2)
                              .map(member => (
                                  <option key={member.id} value={member.id}>{member.fullName}</option>
                          ))}
                      </select>
                   </div>
                    <div>
                      <label htmlFor="parentId2" className="block text-sm font-medium text-[var(--form-label-text)] mb-1">Parent 2</label>
                      <select
                          id="parentId2" name="parentId2"
                          className="border border-[var(--form-input-border)] p-2 rounded w-full text-sm bg-[var(--form-input-bg)] text-black"
                          value={formData.parentId2 || ''} onChange={handleInputChange}
                          disabled={!existingMembersForDropdown.length}
                      >
                          <option value="">Select Parent 2</option>
                           {existingMembersForDropdown
                              .filter(member => member.id !== editingMemberId && member.id !== formData.parentId1)
                              .map(member => (
                                  <option key={member.id} value={member.id}>{member.fullName}</option>
                          ))}
                      </select>
                   </div>

                   <div className="flex gap-2 mt-4">
                       <button type="submit" className={`font-bold py-2 px-4 rounded w-full ${editingMemberId ? 'bg-[var(--btn-success-bg)] hover:bg-[var(--btn-success-bg-hover)]' : 'bg-[var(--btn-primary-bg)] hover:bg-[var(--btn-primary-bg-hover)]'} text-[var(--btn-primary-text)]`}>
                         {editingMemberId ? 'Update Member' : 'Add Member'}
                       </button>
                       {editingMemberId && (
                          <button type="button" onClick={cancelEdit} className="bg-[var(--btn-cancel-bg)] hover:bg-[var(--btn-cancel-bg-hover)] text-[var(--btn-cancel-text)] font-bold py-2 px-4 rounded w-auto">
                              Cancel
                          </button>
                       )}
                   </div>
                </form>
              </aside>
            </div>
          </>
        ) : (
          <AdvertisementSection />
        )}

      </main>

      <footer className="bg-[var(--footer-bg)] text-center p-4 text-sm text-[var(--footer-text)]">
        © {new Date().getFullYear()} FamilyVerse. Licensed under MIT.
      </footer>
    </div>
  );
}
