import { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import type { User } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const user = await authService.login(email, password);
      if (user) {
        setUser(user);
        return { success: true };
      } else {
        return { success: false, error: 'Credenciales incorrectas' };
      }
    } catch {
      return { success: false, error: 'Error al iniciar sesión' };
    }
  };

  const register = async (userData: Omit<User, 'id'>): Promise<{ success: boolean; error?: string }> => {
    try {
      await authService.register(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Error al registrar' };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };
}; 