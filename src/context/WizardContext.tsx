"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserConstraints } from '@/types';

interface WizardContextType {
    selections: Partial<UserConstraints>;
    setSelections: (selections: Partial<UserConstraints>) => void;
    isCompleted: boolean;
    setCompleted: (completed: boolean) => void;
    resetWizard: () => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
    const [selections, setSelectionsState] = useState<Partial<UserConstraints>>({});
    const [isCompleted, setIsCompleted] = useState(false);

    const setSelections = (newSelections: Partial<UserConstraints>) => {
        setSelectionsState(newSelections);
    };

    const setCompleted = (completed: boolean) => {
        setIsCompleted(completed);
    };

    const resetWizard = () => {
        setSelectionsState({});
        setIsCompleted(false);
    };

    return (
        <WizardContext.Provider value={{ selections, setSelections, isCompleted, setCompleted, resetWizard }}>
            {children}
        </WizardContext.Provider>
    );
}

export function useWizard() {
    const context = useContext(WizardContext);
    if (context === undefined) {
        throw new Error('useWizard must be used within a WizardProvider');
    }
    return context;
}
