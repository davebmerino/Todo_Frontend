import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "@/features/auth/api/authService";
import { setAccessToken, clearAccessToken } from "@/lib/tokenStore";
import { setSessionExpiredHandler } from "@/lib/apiClient";
// import { useToast } from "@/app/providers/ToastProvider";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const { showToast } = useToast();

  // The access token only lives in memory, so a hard refresh wipes it out.
  // Try to silently exchange the HttpOnly refresh cookie for a new access
  // token before deciding the visitor is logged out.
  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const data = await authService.refresh();
        if (!isMounted) return;
        setAccessToken(data.accessToken);
        setUser(data.user);
      } catch {
        // No valid session — that's fine, stay logged out.
      } finally {
        if (isMounted) setIsInitializing(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setSessionExpiredHandler(() => {
      setUser(null);
      showToast({
        type: "warning",
        message: "Your session expired. Please log in again.",
      });
    });
  }, [showToast]);

  const login = async ({ email, password }) => {
    const data = await authService.login({ email, password });
    setAccessToken(data.accessToken);
    setUser(data.user);
  };

  const register = async ({ firstName, lastName, email, password }) => {
    const data = await authService.register({
      firstName,
      lastName,
      email,
      password,
    });
    setAccessToken(data.accessToken);
    setUser(data.user);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // Clear the local session even if the network call itself fails.
    } finally {
      clearAccessToken();
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isInitializing,
      login,
      register,
      logout,
    }),
    [user, isInitializing],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
