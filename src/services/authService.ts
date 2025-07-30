export interface User {
  email: string;
  password: string;
  name: string;
}

export interface AuthService {
  login(email: string, password: string): Promise<User | null>;
  register(user: Omit<User, 'id'>): Promise<void>;
  logout(): void;
  getCurrentUser(): User | null;
}

class LocalAuthService implements AuthService {
  private users: User[] = [
    { email: "admin@example.com", password: "123456Aa", name: "Admin User" },
    { email: "admin2@example.com", password: "123456Aa", name: "Admin User2" },
  ];

  async login(email: string, password: string): Promise<User | null> {
    const user = this.users.find(
      (user) => user.email === email && user.password === password
    );
    
    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userName", user.name);
      return user;
    }
    
    return null;
  }

  async register(userData: Omit<User, 'id'>): Promise<void> {
    const existingUser = this.users.find(user => user.email === userData.email);
    
    if (existingUser) {
      throw new Error('Este email ya está registrado');
    }

    this.users.push(userData);
  }

  logout(): void {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
  }

  getCurrentUser(): User | null {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");
    
    if (isLoggedIn && userEmail && userName) {
      return { email: userEmail, name: userName, password: '' };
    }
    
    return null;
  }
}

export const authService = new LocalAuthService(); 