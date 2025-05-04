'use client'; // Required for reactflow hooks and state

import React, { useState, useMemo, useCallback, useEffect } from 'react'; // Added useEffect
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
  BackgroundVariant, // Import BackgroundVariant
  NodeMouseHandler // <<< ADD THIS IMPORT
} from 'reactflow';
import 'reactflow/dist/style.css'; // Import reactflow styles
import { FamilyMember } from '@/types/familyMember'; // Assuming type path
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique IDs
import dagre from 'dagre'; // Import dagre

// === Initial Sample Family Data ===
const initialFamilyData: FamilyMember[] = [
  // === Generation 1: Great-Grandparents ===
  { id: 'ggp1', fullName: 'George Smith (GGP)', gender: 'Male', birthDate: '1900-01-01', parentId1: null, parentId2: null },
  { id: 'ggm1', fullName: 'Mary Johnson (GGM)', gender: 'Female', birthDate: '1905-05-05', parentId1: null, parentId2: null },

  // === Generation 2: Grandparents / Great-Aunts/Uncles ===
  // Branch 1: John's side
  { id: 'gp1', fullName: 'John Smith (GP)', gender: 'Male', birthDate: '1930-02-10', parentId1: 'ggm1', parentId2: 'ggp1' }, // Son of George & Mary
  { id: 'gm1', fullName: 'Sarah Davis (GM)', gender: 'Female', birthDate: '1935-03-15', parentId1: null, parentId2: null }, // John's wife

  // Branch 2: Anna's side
  { id: 'ga1', fullName: 'Anna Smith (GA)', gender: 'Female', birthDate: '1932-04-20', parentId1: 'ggm1', parentId2: 'ggp1' }, // Daughter of George & Mary
  { id: 'gu1', fullName: 'Robert Brown (GU)', gender: 'Male', birthDate: '1930-08-15', parentId1: null, parentId2: null }, // Anna's husband

  // === Generation 3: Parents / Cousins ===
  // Branch 1: John's children
  { id: 'p1', fullName: 'David Smith (Father)', gender: 'Male', birthDate: '1960-06-20', parentId1: 'gm1', parentId2: 'gp1' }, // Son of John & Sarah
  { id: 'm1', fullName: 'Emily White (Mother)', gender: 'Female', birthDate: '1962-07-25', parentId1: null, parentId2: null }, // David's wife

  // Branch 2: Anna's children
  { id: 'cousin1', fullName: 'Charles Brown (Cousin)', gender: 'Male', birthDate: '1961-01-10', parentId1: 'ga1', parentId2: 'gu1'}, // Son of Anna & Robert
  { id: 'cousin1_spouse', fullName: 'Laura Green (Cousins Spouse)', gender: 'Female', birthDate: '1963-05-12', parentId1: null, parentId2: null }, // Charles' wife

  // === Generation 4: Children / Second Cousins ===
  // Branch 1: David's children
  { id: 'c1', fullName: 'Michael Smith (Son)', gender: 'Male', birthDate: '1990-09-30', parentId1: 'm1', parentId2: 'p1' }, // Son of David & Emily
  { id: 'c2', fullName: 'Olivia Smith (Daughter)', gender: 'Female', birthDate: '1993-11-05', parentId1: 'm1', parentId2: 'p1' }, // Daughter of David & Emily

  // Branch 2: Charles' children
  { id: 'second_cousin1', fullName: 'Peter Brown (Second Cousin)', gender: 'Male', birthDate: '1992-03-25', parentId1: 'cousin1_spouse', parentId2: 'cousin1'}, // Son of Charles & Laura
];
// === End Sample Family Data ===

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
    // Potential: Add spouse edges here if needed for layout influence (might need different edge type/style)
  });

  dagre.layout(dagreGraph);

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  familyMembers.forEach((member) => {
    const node = dagreGraph.node(member.id);
    if (node) { // Check if node exists in the layout graph
        nodes.push({
          id: member.id,
          // Display name and birth year (if available)
          data: { label: `${member.fullName}\n(${member.birthDate?.substring(0, 4) || 'N/A'})` },
          position: {
            x: node.x - nodeWidth / 2, // Center node horizontally
            y: node.y - nodeHeight / 2, // Center node vertically
          },
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top,
          style: {
            border: '1px solid #777',
            padding: 10,
            background: '#fff',
            textAlign: 'center',
            width: nodeWidth, // Use full node width for style
            fontSize: '12px',
          },
        });
    } else {
        console.warn(`Node data for ${member.fullName} (ID: ${member.id}) not found in Dagre layout.`);
    }


    // Add React Flow edges (parent -> child)
    const commonEdgeStyle = {
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
        style: { strokeWidth: 1.5, stroke: '#555' }, // Style edges
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

export default function Home() {
  // Placeholder state for authentication status
  const isLoggedIn = false;

  // === State for Family Data ===
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(initialFamilyData);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null); // Track member being edited
  const [formData, setFormData] = useState<Partial<FamilyMember>>({}); // Form state

  // Prepare data for dropdowns (just id and name) - derived from state
  const existingMembersForDropdown: Pick<FamilyMember, 'id' | 'fullName'>[] = useMemo(() =>
    familyMembers.map(m => ({ id: m.id, fullName: m.fullName })).sort((a, b) => a.fullName.localeCompare(b.fullName)), // Sort dropdown
    [familyMembers]
  );

  // --- Calculate layout using Dagre ---
  const { layoutedNodes, layoutedEdges } = useMemo(() => {
    return getLayoutedElements(familyMembers, 'TB'); // Use the layout function
  }, [familyMembers]); // Recalculate when familyMembers changes

  // --- State for React Flow nodes and edges ---
  const [nodes, setNodes] = useState<Node[]>(layoutedNodes);
  const [edges, setEdges] = useState<Edge[]>(layoutedEdges);

  // Update nodes and edges state when the layout changes
  useEffect(() => {
    setNodes(layoutedNodes);
  }, [layoutedNodes]);

  useEffect(() => {
    setEdges(layoutedEdges);
  }, [layoutedEdges]);

  // --- React Flow Handlers ---
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes] // Dependency on setNodes is correct
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges] // Dependency on setEdges is correct
  );

  // --- Form Handling ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        // Handle null/empty string for optional fields like parents
        [name]: value === "" ? null : value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const memberData = { ...formData } as Omit<FamilyMember, 'id'> & { id?: string }; // Type assertion

    if (!memberData.fullName || !memberData.gender || !memberData.birthDate) {
        alert("Full Name, Gender, and Birth Date are required.");
        return;
    }

    if (editingMemberId) {
      // --- Update Existing Member ---
      setFamilyMembers(prevMembers =>
        prevMembers.map(member =>
          member.id === editingMemberId
            ? { ...member, ...memberData, id: editingMemberId } // Ensure ID remains the same
            : member
        )
      );
      setEditingMemberId(null); // Exit edit mode
    } else {
      // --- Add New Member ---
      const newMember: FamilyMember = {
        ...memberData,
        id: uuidv4(), // Generate a unique ID
        // Ensure required fields are present (already checked, but good practice)
        fullName: memberData.fullName!,
        gender: memberData.gender!,
        birthDate: memberData.birthDate!,
        // Ensure optional fields are null or undefined as expected by the type
        parentId1: memberData.parentId1 || null, // Assuming null is acceptable here based on type
        parentId2: memberData.parentId2 || null, // Assuming null is acceptable here based on type
        deathDate: memberData.deathDate || null, // Assuming null is acceptable here based on type
        birthPlace: memberData.birthPlace || undefined, // Use undefined if type expects string | undefined
        pictureUrl: memberData.pictureUrl || undefined, // Use undefined if type expects string | undefined
      };
      setFamilyMembers(prevMembers => [...prevMembers, newMember]);
    }

    setFormData({}); // Reset form fields
    // Clear the actual form inputs (optional, but good UX)
    const form = e.target as HTMLFormElement;
    form.reset();
    // Reset select defaults specifically if needed
    (form.elements.namedItem('gender') as HTMLSelectElement).value = "";
    (form.elements.namedItem('parentId1') as HTMLSelectElement).value = "";
    (form.elements.namedItem('parentId2') as HTMLSelectElement).value = "";
  };

  // --- Edit Member ---
  const handleEditMember = useCallback((memberId: string) => {
    const memberToEdit = familyMembers.find(m => m.id === memberId);
    if (memberToEdit) {
      setEditingMemberId(memberId);
      // Pre-fill form data, ensuring nulls are handled correctly for selects
      setFormData({
          ...memberToEdit,
          parentId1: memberToEdit.parentId1 ?? "", // Use empty string for select default
          parentId2: memberToEdit.parentId2 ?? "", // Use empty string for select default
      });
      // Scroll the form into view (optional, good UX)
      const formElement = document.getElementById('member-form');
      formElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [familyMembers, setEditingMemberId, setFormData]); // Add dependencies

  // --- React Flow Node Click Handler ---
  const handleNodeClick: NodeMouseHandler = useCallback((event, node) => {
    handleEditMember(node.id); // Call the existing edit handler with the node's ID
  }, [handleEditMember]); // Dependency on handleEditMember

  // --- Remove Member ---
  const handleRemoveMember = (memberId: string) => {
    if (window.confirm("Are you sure you want to remove this family member? This cannot be undone.")) {
      setFamilyMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));
      // Also consider removing this member as a parent from any children (optional cleanup)
      setFamilyMembers(prevMembers => prevMembers.map(child => {
          let updatedChild = { ...child };
          if (child.parentId1 === memberId) updatedChild.parentId1 = null;
          if (child.parentId2 === memberId) updatedChild.parentId2 = null;
          return updatedChild;
      }));

      // If the removed member was being edited, cancel edit mode
      if (editingMemberId === memberId) {
          setEditingMemberId(null);
          setFormData({});
      }
    }
  };

  // --- Cancel Edit ---
  const cancelEdit = () => {
      setEditingMemberId(null);
      setFormData({});
      // Consider resetting the actual form inputs as well if needed
      const form = document.getElementById('member-form') as HTMLFormElement | null;
      form?.reset();
      // Reset select defaults specifically if needed
      const genderSelect = form?.elements.namedItem('gender') as HTMLSelectElement | null;
      if (genderSelect) genderSelect.value = "";
      const parent1Select = form?.elements.namedItem('parentId1') as HTMLSelectElement | null;
      if (parent1Select) parent1Select.value = "";
      const parent2Select = form?.elements.namedItem('parentId2') as HTMLSelectElement | null;
      if (parent2Select) parent2Select.value = "";
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* ... Header Section (no changes needed) ... */}
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Family Tree App</h1>
          <div>
            {isLoggedIn ? (
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            ) : (
              <>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Login</button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Register</button>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* === Family Tree Visualization Section (uses React Flow) === */}
        <section className="md:col-span-2 border rounded-lg p-4 shadow relative overflow-hidden bg-gray-50" style={{ height: '70vh' }}> {/* Increased height */}
          <h2 className="text-lg font-semibold mb-4 absolute top-4 left-4 z-10 bg-white p-1 rounded shadow-sm">Family Tree Visualization</h2>
           <ReactFlow
              nodes={nodes} // Use state variable
              edges={edges} // Use state variable
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onNodeClick={handleNodeClick} // <<< Ensure this prop is present
              fitView // Zooms/pans to fit nodes initially and on layout changes
              fitViewOptions={{ padding: 0.2 }} // Add some padding on fitView
              nodesDraggable={false} // Optionally disable manual dragging if layout is fully automatic
              className="bg-gradient-to-br from-gray-50 to-gray-100" // Example background
            >
              <Controls /> {/* Adds zoom/pan controls */}
              <Background variant={BackgroundVariant.Dots} gap={15} size={1} /> {/* Adjusted background */}
            </ReactFlow>
          {/* Export buttons (functionality not implemented here) */}
          <div className="absolute bottom-4 right-4 flex gap-2 z-10">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded text-sm">Export as Image</button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded text-sm">Export as PDF</button>
          </div>
        </section>

        {/* Family Member Management Section */}
        <aside className="md:col-span-1 border rounded-lg p-4 shadow flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Manage Family Members</h2>

          {/* Add/Edit Member Form */}
          <form id="member-form" onSubmit={handleFormSubmit} className="mb-4 space-y-3">
             <h3 className="text-md font-medium mb-2">{editingMemberId ? 'Edit Member' : 'Add New Member'}</h3>

             {/* Form fields now use controlled components bound to formData state */}
             <div>
                 <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                 <input
                    type="text" id="fullName" name="fullName" required
                    className="border p-2 rounded w-full text-sm" placeholder="John Doe"
                    value={formData.fullName || ''} onChange={handleInputChange}
                 />
             </div>

             <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                <select
                    id="gender" name="gender" required
                    className="border p-2 rounded w-full text-sm bg-white"
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
                    <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">Birth Date *</label>
                    <input
                        type="date" id="birthDate" name="birthDate" required
                        className="border p-2 rounded w-full text-sm"
                        value={formData.birthDate || ''} onChange={handleInputChange}
                    />
                </div>
                 <div>
                    <label htmlFor="deathDate" className="block text-sm font-medium text-gray-700 mb-1">Death Date</label>
                    <input
                        type="date" id="deathDate" name="deathDate"
                        className="border p-2 rounded w-full text-sm"
                        value={formData.deathDate || ''} onChange={handleInputChange}
                    />
                 </div>
             </div>

             <div>
                <label htmlFor="birthPlace" className="block text-sm font-medium text-gray-700 mb-1">Birth Place</label>
                <input
                    type="text" id="birthPlace" name="birthPlace"
                    className="border p-2 rounded w-full text-sm" placeholder="City, Country"
                    value={formData.birthPlace || ''} onChange={handleInputChange}
                />
            </div>

             <div>
                <label htmlFor="pictureUrl" className="block text-sm font-medium text-gray-700 mb-1">Picture URL</label>
                <input
                    type="url" id="pictureUrl" name="pictureUrl"
                    className="border p-2 rounded w-full text-sm" placeholder="https://example.com/image.jpg"
                    value={formData.pictureUrl || ''} onChange={handleInputChange}
                />
            </div>

            {/* Parent Selection Dropdowns */}
             <div>
                <label htmlFor="parentId1" className="block text-sm font-medium text-gray-700 mb-1">Parent 1</label>
                <select
                    id="parentId1" name="parentId1"
                    className="border p-2 rounded w-full text-sm bg-white"
                    value={formData.parentId1 || ''} onChange={handleInputChange}
                    // Disable selecting self or the other selected parent
                    disabled={!existingMembersForDropdown.length}
                >
                    <option value="">Select Parent 1</option>
                    {existingMembersForDropdown
                        .filter(member => member.id !== editingMemberId && member.id !== formData.parentId2) // Prevent selecting self or other parent
                        .map(member => (
                            <option key={member.id} value={member.id}>{member.fullName}</option>
                    ))}
                </select>
             </div>
              <div>
                <label htmlFor="parentId2" className="block text-sm font-medium text-gray-700 mb-1">Parent 2</label>
                <select
                    id="parentId2" name="parentId2"
                    className="border p-2 rounded w-full text-sm bg-white"
                    value={formData.parentId2 || ''} onChange={handleInputChange}
                    disabled={!existingMembersForDropdown.length}
                >
                    <option value="">Select Parent 2</option>
                     {existingMembersForDropdown
                        .filter(member => member.id !== editingMemberId && member.id !== formData.parentId1) // Prevent selecting self or other parent
                        .map(member => (
                            <option key={member.id} value={member.id}>{member.fullName}</option>
                    ))}
                </select>
             </div>

             <div className="flex gap-2 mt-4">
                 <button type="submit" className={`font-bold py-2 px-4 rounded w-full ${editingMemberId ? 'bg-green-500 hover:bg-green-700' : 'bg-indigo-500 hover:bg-indigo-700'} text-white`}>
                   {editingMemberId ? 'Update Member' : 'Add Member'}
                 </button>
                 {editingMemberId && (
                    <button type="button" onClick={cancelEdit} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded w-auto">
                        Cancel
                    </button>
                 )}
             </div>
          </form>

           {/* Existing Members List with Edit/Remove Buttons */}
           <div className="mt-4 flex-grow overflow-hidden flex flex-col"> {/* Allow list to take remaining space */}
                <h3 className="text-md font-medium mb-2 flex-shrink-0">Existing Members ({familyMembers.length})</h3>
                <div className="flex-grow overflow-y-auto border rounded p-2 bg-gray-50"> {/* Make list scrollable */}
                    <ul className="text-sm text-gray-600 space-y-1">
                       {familyMembers.length > 0 ? (
                            // Sort members alphabetically for the list view
                            [...familyMembers].sort((a, b) => a.fullName.localeCompare(b.fullName)).map(member => (
                                <li key={member.id} className="flex justify-between items-center group p-1 hover:bg-gray-100 rounded">
                                    <span>{member.fullName}</span>
                                    <span className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleEditMember(member.id)}
                                            className="text-blue-500 hover:text-blue-700 text-xs font-semibold"
                                            title="Edit"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleRemoveMember(member.id)}
                                            className="text-red-500 hover:text-red-700 text-xs font-semibold"
                                            title="Remove"
                                        >
                                            Remove
                                        </button>
                                    </span>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-500 italic">No members yet.</li>
                        )}
                    </ul>
                </div>
           </div>

           {/* ... Account Status Section (no changes needed) ... */}
           <div className="mt-auto pt-4 border-t">
                <h3 className="text-md font-medium mb-2">Account Status</h3>
                <p className="text-sm text-gray-600 mb-2">Current Mode: <span className="font-semibold">Trial</span></p>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded w-full text-sm">
                    Upgrade to Paid
                </button>
                <p className="text-xs text-gray-500 mt-1 text-center">Trial allows up to great-grandparents.</p>
           </div>
        </aside>
      </main>

      {/* ... Footer Section (no changes needed) ... */}
      <footer className="bg-gray-200 text-center p-4 text-sm text-gray-600">
        © {new Date().getFullYear()} Family Tree App. Licensed under MIT.
      </footer>
    </div>
  );
}
