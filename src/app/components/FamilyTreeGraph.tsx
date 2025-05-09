'use client';

import React, { useMemo, useCallback, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  MarkerType,
  Position, // Import Position
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css'; // Base styles for React Flow
import { FamilyMember } from '@/generated/prisma';
import FamilyNode from './FamilyNode'; // Your custom node
import dagre from 'dagre';

interface FamilyTreeGraphProps {
  familyMembers: FamilyMember[];
  onNodeClick: (member: FamilyMember) => void;
  selectedMemberId?: string | null;
}

const nodeWidth = 170; // Approximate width of FamilyNode + padding
const nodeHeight = 200; // Approximate height of FamilyNode + padding

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction });
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = Position.Top; // Use Position enum
    node.sourcePosition = Position.Bottom; // Use Position enum
    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

// Ensure `nodeTypes` is defined outside the component to avoid re-creation
const nodeTypes = { familyNode: FamilyNode };

const FamilyTreeGraph: React.FC<FamilyTreeGraphProps> = ({ familyMembers, onNodeClick, selectedMemberId }) => {
  
  // Ensure all IDs are strings to match the new FamilyMember ID format
  const initialNodes: Node[] = useMemo(() => {
    return familyMembers.map((member) => ({
      id: member.id.toString(), // Convert ID to string
      type: 'familyNode', // Custom node type
      data: {
        member,
        onClick: onNodeClick,
        isSelected: selectedMemberId === member.id.toString(), // Compare as strings
      },
      position: { x: 0, y: 0 }, // Initial position, Dagre will override this
    }));
  }, [familyMembers, onNodeClick, selectedMemberId]);

  // Remove `sourceHandle` from edges to avoid referencing non-existent handles
  const initialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = [];
    familyMembers.forEach(member => {
      if (member.parentId1 !== null && member.id !== null) {
        edges.push({
          id: `e${member.parentId1.toString()}-${member.id.toString()}`,
          source: member.id.toString(),
          target: member.parentId1.toString(),
          type: 'smoothstep',
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#000000',
          },
          style: { strokeWidth: 1.5, stroke: '#000000' },
        });
      }

      if (member.parentId2 !== null && member.id !== null) {
        edges.push({
          id: `e${member.parentId2.toString()}-${member.id.toString()}`,
          source: member.id.toString(),
          target: member.parentId2.toString(),
          type: 'smoothstep',
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#000000',
          },
          style: { strokeWidth: 1.5, stroke: '#000000' },
        });
      }
    });
    return edges;
  }, [familyMembers]);

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  useEffect(() => {
    // Update nodes when familyMembers or selectedMemberId changes
    const newNodes = familyMembers.map((member) => ({
      id: member.id.toString(),
      type: 'familyNode',
      data: {
        member,
        onClick: onNodeClick,
        isSelected: selectedMemberId === member.id.toString(),
      },
      position: { x: 0, y: 0 }, // Will be updated by layout
    }));

    const newEdges: Edge[] = [];
    familyMembers.forEach(member => {
      if (member.parentId1) {
        console.log('ParentId1:', member.parentId1);
        newEdges.push({
          id: `e${member.parentId1.toString()}-${member.id.toString()}`,
          source: member.parentId1.toString(),
          target: member.id.toString(),
          type: 'smoothstep',
          markerEnd: { type: MarkerType.ArrowClosed, color: '#000000' }, // Make arrow black
          style: { strokeWidth: 1.5, stroke: '#000000' }, // Changed stroke to black
        });
      }
      if (member.parentId2) {
        newEdges.push({
          id: `e${member.parentId2.toString()}-${member.id.toString()}`,
          source: member.parentId2.toString(),
          target: member.id.toString(),
          type: 'smoothstep',
          markerEnd: { type: MarkerType.ArrowClosed, color: '#000000' }, // Make arrow black
          style: { strokeWidth: 1.5, stroke: '#000000' }, // Changed stroke to black
        });
      }
    });
    
    const { nodes: reLayoutedNodes, edges: reLayoutedEdges } = getLayoutedElements(newNodes, newEdges);
    setNodes(reLayoutedNodes);
    setEdges(reLayoutedEdges);

  }, [familyMembers, onNodeClick, selectedMemberId, setNodes, setEdges]);


  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Add detailed logging for edge creation and React Flow configuration
  useEffect(() => {
    console.log('Nodes:', nodes.map(node => node.id));
    console.log('Edges:', edges.map(edge => ({ id: edge.id, source: edge.source, target: edge.target })));

    edges.forEach(edge => {
      if (!nodes.some(node => node.id === edge.source)) {
        console.error(`Edge source ID ${edge.source} does not match any node ID.`);
      }
      if (!nodes.some(node => node.id === edge.target)) {
        console.error(`Edge target ID ${edge.target} does not match any node ID.`);
      }
    });
  }, [nodes, edges]);

  if (!familyMembers || familyMembers.length === 0) {
    return <p className="text-center text-gray-500">Add family members to see the tree.</p>;
  }

  return (
    <div style={{ height: '70vh', width: '100%', border: '1px solid #cbd5e1', borderRadius: '0.5rem' }} className="bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        nodesDraggable={true} // Allow dragging for manual adjustments
        nodesConnectable={false} // Disable creating new connections via UI
      >
        <Controls />
        <Background gap={16} color="#e5e7eb" />
      </ReactFlow>
    </div>
  );
};

// Wrap the FamilyTreeGraph component with ReactFlowProvider
const FamilyTreeGraphWrapper: React.FC<FamilyTreeGraphProps> = (props) => {
  return (
    <ReactFlowProvider>
      <FamilyTreeGraph {...props} />
    </ReactFlowProvider>
  );
};

export default FamilyTreeGraphWrapper;
