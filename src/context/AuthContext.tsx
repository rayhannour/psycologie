"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  role: 'agent' | 'doctor';
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: 'agent',
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'agent' | 'doctor'>('agent');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      // Logic: if email contains 'doctor', set role to 'doctor'
      // This is a simple way for the user to test roles
      if (user?.email?.toLowerCase().includes('doctor')) {
        setRole('doctor');
      } else {
        setRole('agent');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
