"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

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

  const applyEmailFallback = (user: User | null) => {
    if (user?.email?.toLowerCase().includes('doctor')) {
      setRole('doctor');
    } else {
      setRole('agent');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setRole(userDoc.data().role as 'agent' | 'doctor');
          } else {
            // Fallback for existing users or those without a firestore doc
            applyEmailFallback(user);
          }
        } catch (error) {
          console.error("Error fetching user role, applying fallback:", error);
          applyEmailFallback(user);
        }
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
