import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../utils/SupaClient";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error);
    return { error };
  }

  return { data };
};

const logout = () => {
  supabase.auth.signOut();
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;

      setUser(currentUser ?? null);
      setAuth(currentUser ? true : false);

      if (currentUser) {
        getDataUser(currentUser.id);
      } else {
        console.log("User not found");
        setLoading(false);
      }
    };

    const getDataUser = async (userId) => {
      try {
        const { data: userData, error } = await supabase
          .from("profiles")
          .select("username, role, avatar_url, phone_number")
          .eq("id", userId)
          .single();

        if (error) {
          throw error;
        }

        setUsername(userData?.username || "");
        setRole(userData?.role || "");
        setAvatar(userData?.avatar_url || "");
        setPhoneNumber(userData?.phone_number || "");
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }

      setLoading(false);
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          setUser(session.user);
          setAuth(true);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setAuth(false);
          setUsername("");
          setRole("");
        }
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        auth,
        role,
        username,
        avatar,
        phoneNumber,
        login,
        logout,
        loading,
      }}
    >
      {loading ? <h2>Loading...</h2> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
