'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ProjectContextType {
    activeProjectId: string | null;
    setActiveProjectId: (id: string | null) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
    const [activeProjectId, setActiveProjectIdState] = useState<string | null>(null);

    // Initialize from sessionStorage to survive page refreshes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = sessionStorage.getItem('activeProjectId');
            if (stored) {
                setActiveProjectIdState(stored);
            }
        }
    }, []);

    const setActiveProjectId = (id: string | null) => {
        setActiveProjectIdState(id);
        if (typeof window !== 'undefined') {
            if (id) {
                sessionStorage.setItem('activeProjectId', id);
            } else {
                sessionStorage.removeItem('activeProjectId');
            }
        }
    };

    return (
        <ProjectContext.Provider value={{ activeProjectId, setActiveProjectId }}>
            {children}
        </ProjectContext.Provider>
    );
}

export function useProjectContext() {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error('useProjectContext must be used within a ProjectProvider');
    }
    return context;
}
