import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  createProfile: (username: string, bio?: string) => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          // Only try Supabase operations if we have valid env vars
          if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
            // Check if profile exists in Supabase
            const { data: existingProfile } = await supabase
              .from('profiles')
              .select('*')
              .eq('user_id', firebaseUser.uid)
              .single();

            if (existingProfile) {
              setProfile(existingProfile);
            } else {
              // Auto-create profile if it doesn't exist
              const username = firebaseUser.displayName?.toLowerCase().replace(/\s+/g, '') || 
                              firebaseUser.email?.split('@')[0] || 
                              `user${Date.now()}`;
              
              const { data: newProfile } = await supabase
                .from('profiles')
                .insert({
                  user_id: firebaseUser.uid,
                  username,
                  email: firebaseUser.email || '',
                  avatar_url: firebaseUser.photoURL,
                  bio: null,
                  links: {}
                })
                .select()
                .single();

              if (newProfile) {
                setProfile(newProfile);
              }
            }
          } else {
            // Create a mock profile for development
            setProfile({
              id: firebaseUser.uid,
              user_id: firebaseUser.uid,
              username: firebaseUser.displayName?.toLowerCase().replace(/\s+/g, '') || 
                       firebaseUser.email?.split('@')[0] || 
                       'user',
              email: firebaseUser.email || '',
              avatar_url: firebaseUser.photoURL,
              bio: null,
              links: {},
              created_at: new Date().toISOString()
            });
          }
        } catch (error) {
          console.warn('Supabase not configured, using mock profile:', error);
          // Fallback to mock profile
          setProfile({
            id: firebaseUser.uid,
            user_id: firebaseUser.uid,
            username: firebaseUser.displayName?.toLowerCase().replace(/\s+/g, '') || 
                     firebaseUser.email?.split('@')[0] || 
                     'user',
            email: firebaseUser.email || '',
            avatar_url: firebaseUser.photoURL,
            bio: null,
            links: {},
            created_at: new Date().toISOString()
          });
        }
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const createProfile = async (username: string, bio?: string) => {
    if (!user) throw new Error('No authenticated user');

    const { data, error } = await supabase
      .from('profiles')
      .insert({
        user_id: user.uid,
        username,
        email: user.email || '',
        avatar_url: user.photoURL,
        bio: bio || null,
        links: {}
      })
      .select()
      .single();

    if (error) throw error;
    if (data) setProfile(data);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!profile) throw new Error('No profile to update');

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', profile.id)
      .select()
      .single();

    if (error) throw error;
    if (data) setProfile(data);
  };

  const value = {
    user,
    profile,
    loading,
    createProfile,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};