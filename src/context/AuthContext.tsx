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

  // Initial load of role from localStorage to prevent flicker
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = auth.currentUser;
      if (storedUser) {
        const cached = localStorage.getItem(`cgpr_role_${storedUser.uid}`);
        if (cached === 'doctor' || cached === 'agent') {
          setRole(cached as 'agent' | 'doctor');
        }
      }
    }
  }, []);

  const applyEmailFallback = (user: User | null) => {
    // 1. Check LocalStorage first (persistent choice)
    const cachedRole = user ? localStorage.getItem(`cgpr_role_${user.uid}`) : null;
    if (cachedRole === 'doctor' || cachedRole === 'agent') {
      setRole(cachedRole);
      return;
    }

    // 2. Fallback to email detection
    if (user?.email?.toLowerCase().includes('doctor')) {
      setRole('doctor');
    } else {
      setRole('agent');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // Immediate fallback to localStorage while waiting for Firestore
        const cached = localStorage.getItem(`cgpr_role_${firebaseUser.uid}`);
        if (cached === 'doctor' || cached === 'agent') {
          console.log("AuthContext: Loaded cached role:", cached);
          setRole(cached as 'agent' | 'doctor');
        }

        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            const fetchedRole = userDoc.data().role as 'agent' | 'doctor';
            console.log("AuthContext: Fetched role from Firestore:", fetchedRole);
            setRole(fetchedRole);
            localStorage.setItem(`cgpr_role_${firebaseUser.uid}`, fetchedRole);
          } else {
            console.log("AuthContext: No Firestore doc, applying fallback");
            applyEmailFallback(firebaseUser);
          }
        } catch (error) {
          console.error("AuthContext: Firestore error, applying fallback:", error);
          applyEmailFallback(firebaseUser);
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
