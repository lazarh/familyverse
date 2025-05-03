import React from 'react';
// Import the type definition
import { FamilyMember } from '../types/familyMember'; 

export default function Home() {
  // Placeholder state for authentication status
  const isLoggedIn = false; 

  // === Updated Sample Family Data with Multiple Branches ===
  const familyData: FamilyMember[] = [
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

  // Prepare data for dropdowns (just id and name)
  const existingMembersForDropdown: Pick<FamilyMember, 'id' | 'fullName'>[] = familyData.map(m => ({ id: m.id, fullName: m.fullName }));

  // --- Updated Basic Hierarchy Generation ---
  const generateHierarchy = (members: FamilyMember[]) => {
    // Still simplified, manually representing the branches
    return `
George Smith (GGP) + Mary Johnson (GGM)
 |--------------------------------|
 |                                |
 +-- John Smith (GP) + Sarah Davis (GM)     +-- Anna Smith (GA) + Robert Brown (GU)
      |                                          |
      +-- David Smith (Father) + Emily White (Mother)  +-- Charles Brown (Cousin) + Laura Green (Cousin's Spouse)
           |                                                |
           +-- Michael Smith (Son)                          +-- Peter Brown (Second Cousin)
           +-- Olivia Smith (Daughter)
    `;
  };
  
  const familyHierarchyText = generateHierarchy(familyData);
  // --- End Hierarchy Generation ---


  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Header Section */}
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

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* === Family Tree Visualization Section (uses updated familyHierarchyText) === */}
        <section className="md:col-span-2 border rounded-lg p-4 shadow relative overflow-hidden">
          <h2 className="text-lg font-semibold mb-4">Family Tree Visualization</h2>
          <div className="bg-gray-50 h-96 rounded overflow-auto p-4"> 
             <pre className="text-sm font-mono whitespace-pre-wrap">
                {familyHierarchyText}
             </pre>
          </div>
          {/* Export buttons */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded text-sm">Export as Image</button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded text-sm">Export as PDF</button>
          </div>
        </section>
        
        {/* Family Member Management Section */}
        <aside className="md:col-span-1 border rounded-lg p-4 shadow flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Manage Family Members</h2>
          
          {/* Add New Member Form */}
          <form className="mb-4 space-y-3"> 
             <h3 className="text-md font-medium mb-2">Add New Member</h3>
             
             <div>
                 <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                 <input type="text" id="fullName" name="fullName" required className="border p-2 rounded w-full text-sm" placeholder="John Doe"/>
             </div>

             <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                <select id="gender" name="gender" required className="border p-2 rounded w-full text-sm bg-white" defaultValue="">
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
                    <input type="date" id="birthDate" name="birthDate" required className="border p-2 rounded w-full text-sm"/>
                </div>
                 <div>
                    <label htmlFor="deathDate" className="block text-sm font-medium text-gray-700 mb-1">Death Date</label>
                    <input type="date" id="deathDate" name="deathDate" className="border p-2 rounded w-full text-sm"/>
                 </div>
             </div>

             <div>
                <label htmlFor="birthPlace" className="block text-sm font-medium text-gray-700 mb-1">Birth Place</label>
                <input type="text" id="birthPlace" name="birthPlace" className="border p-2 rounded w-full text-sm" placeholder="City, Country"/>
            </div>

             <div>
                <label htmlFor="pictureUrl" className="block text-sm font-medium text-gray-700 mb-1">Picture URL</label>
                <input type="url" id="pictureUrl" name="pictureUrl" className="border p-2 rounded w-full text-sm" placeholder="https://example.com/image.jpg"/>
            </div>

            {/* Parent Selection Dropdowns (uses derived list) */}
             <div>
                <label htmlFor="parentId1" className="block text-sm font-medium text-gray-700 mb-1">Parent 1</label>
                <select id="parentId1" name="parentId1" className="border p-2 rounded w-full text-sm bg-white" defaultValue="">
                    <option value="">Select Parent 1</option>
                    {existingMembersForDropdown.map(member => (
                        <option key={member.id} value={member.id}>{member.fullName}</option>
                    ))}
                </select>
             </div>
              <div>
                <label htmlFor="parentId2" className="block text-sm font-medium text-gray-700 mb-1">Parent 2</label>
                <select id="parentId2" name="parentId2" className="border p-2 rounded w-full text-sm bg-white" defaultValue="">
                    <option value="">Select Parent 2</option>
                     {existingMembersForDropdown.map(member => (
                        <option key={member.id} value={member.id}>{member.fullName}</option>
                    ))}
                </select>
             </div>
             
             <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full mt-4">
               Add Member
             </button>
          </form>

           {/* Existing Members List (uses derived list) */}
           <div className="mt-4 flex-grow"> 
                <h3 className="text-md font-medium mb-2">Existing Members</h3>
                <ul className="text-sm text-gray-600 list-disc list-inside max-h-48 overflow-y-auto border rounded p-2 bg-gray-50"> 
                   {existingMembersForDropdown.length > 0 ? (
                        existingMembersForDropdown.map(member => (
                            <li key={member.id}>{member.fullName}</li>
                        ))
                    ) : (
                        <li className="list-none text-gray-500">No members yet.</li>
                    )}
                </ul>
           </div>

           {/* Account Status Section */}
           <div className="mt-auto pt-4 border-t"> 
                <h3 class="text-md font-medium mb-2">Account Status</h3>
                <p class="text-sm text-gray-600 mb-2">Current Mode: <span class="font-semibold">Trial</span></p>
                <button class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded w-full text-sm">
                    Upgrade to Paid
                </button>
                <p class="text-xs text-gray-500 mt-1 text-center">Trial allows up to great-grandparents.</p>
           </div>
        </aside>
      </main>

      {/* Footer Section */}
      <footer class="bg-gray-200 text-center p-4 text-sm text-gray-600">
        © {new Date().getFullYear()} Family Tree App. Licensed under MIT.
      </footer>
    </div>
  );
}
