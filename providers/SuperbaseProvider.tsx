import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Session } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextProps {
    session: Session | null;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);

    // Helper function to save tokens to AsyncStorage
    const saveTokensToStorage = async (accessToken: string, refreshToken: string) => {
        try {
            await AsyncStorage.setItem('access_token', accessToken);
            await AsyncStorage.setItem('refresh_token', refreshToken);
        } catch (error) {
            console.error('Error saving tokens to storage:', error);
        }
    };

    // Helper function to retrieve tokens from AsyncStorage
    const getTokensFromStorage = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('access_token');
            const refreshToken = await AsyncStorage.getItem('refresh_token');
            return { accessToken, refreshToken };
        } catch (error) {
            console.error('Error getting tokens from storage:', error);
            return { accessToken: null, refreshToken: null };
        }
    };

    async function getSession() {
        // Attempt to retrieve session from AsyncStorage
        const { accessToken, refreshToken } = await getTokensFromStorage();
        
        if (accessToken && refreshToken) {
            // If tokens exist, you can use them to create a session
            const { data, error } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
            });
            
            if (error) {
                console.error('Error retrieving session from tokens:', error);
            } else {
                setSession(data.session);
            }
        } else {
            console.log('No session available in AsyncStorage');
        }
    }

    useEffect(() => {
        getSession();

        // Optionally, listen for auth state changes
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setSession(session);
                // Save tokens to AsyncStorage whenever there's a new session
                saveTokensToStorage(session.access_token, session.refresh_token);
            } else {
                setSession(null);
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const signIn = async (email: string, password: string) => {
        const { error, data } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            console.error('Error logging in:', error.message);
        } else {
            const session = data.session;
            if (session) {
                // Save tokens to AsyncStorage after login
                saveTokensToStorage(session.access_token, session.refresh_token);
                setSession(session);
            }
        }
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error.message);
        } else {
            // Clear AsyncStorage when signing out
            await AsyncStorage.removeItem('access_token');
            await AsyncStorage.removeItem('refresh_token');
            setSession(null);
        }
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
