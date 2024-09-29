import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Session } from '@supabase/supabase-js';

interface AuthContextProps {
    session: Session | null;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        // Check if a session exists on component mount
        async function getSession() {
            const { data, error } = await supabase.auth.getSession();
            console.log(data, error);
        }

        // setSession(data.session);

        // Listen for auth changes
        // const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        //     setSession(session);
        // });

        // return () => {
        //     // @ts-ignore
        //     authListener?.unsubscribe();
        // };

        getSession();
    }, []);

    const signIn = async (email: string, password: string) => {
        // @ts-ignore
        const { error } = await supabase.auth.signIn({ email, password });
        if (error) console.error('Error logging in:', error.message);
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error('Error signing out:', error.message);
    };

    return (
        <AuthContext.Provider value={{ session, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
