import type { UserRole } from '../context/AppContext';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface StoredUser extends AuthUser {
  passwordHash: string; // Plaintext or hashed for client-side demo
}

// Built-in Verified Enterprise Credentials
export const DEFAULT_ADMIN: StoredUser = {
  id: 'usr-admin-001',
  name: 'Mohammad Hasan (Operations Director)',
  email: 'admin@triagesphere.com',
  passwordHash: 'TriageSphere2026!Admin',
  role: 'manager',
};

export const DEFAULT_EMPLOYEE: StoredUser = {
  id: 'usr-agent-001',
  name: 'Priya Nair (Support Engineer)',
  email: 'priya@triagesphere.com',
  passwordHash: 'employee123',
  role: 'agent',
};

const STORAGE_KEY = 'triagesphere_registered_employees';

export function getRegisteredEmployees(): StoredUser[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function registerEmployee(name: string, email: string, password: string): { success: boolean; error?: string } {
  const cleanEmail = email.trim().toLowerCase();
  if (!name.trim()) return { success: false, error: 'Full name is required.' };
  if (!cleanEmail || !cleanEmail.includes('@')) return { success: false, error: 'A valid email address is required.' };
  if (password.length < 6) return { success: false, error: 'Password must be at least 6 characters.' };

  if (cleanEmail === DEFAULT_ADMIN.email.toLowerCase()) {
    return { success: false, error: 'This email is reserved for Admin authority.' };
  }
  if (cleanEmail === DEFAULT_EMPLOYEE.email.toLowerCase()) {
    return { success: false, error: 'This employee account already exists. Please sign in.' };
  }

  const existing = getRegisteredEmployees();
  if (existing.some((u) => u.email.toLowerCase() === cleanEmail)) {
    return { success: false, error: 'An employee account with this email already exists.' };
  }

  const newUser: StoredUser = {
    id: `usr-emp-${Date.now()}`,
    name: name.trim(),
    email: cleanEmail,
    passwordHash: password,
    role: 'agent',
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, newUser]));
    return { success: true };
  } catch {
    return { success: false, error: 'Failed to persist employee record in storage.' };
  }
}

export function authenticateUser(email: string, password: string): { success: boolean; user?: AuthUser; error?: string } {
  const cleanEmail = email.trim().toLowerCase();

  // 1. Check Admin
  if (cleanEmail === DEFAULT_ADMIN.email.toLowerCase()) {
    if (password === DEFAULT_ADMIN.passwordHash) {
      const { passwordHash: _, ...safeUser } = DEFAULT_ADMIN;
      return { success: true, user: safeUser };
    }
    return { success: false, error: 'Incorrect Admin password. Access denied.' };
  }

  // 2. Check Default Sample Employee
  if (cleanEmail === DEFAULT_EMPLOYEE.email.toLowerCase()) {
    if (password === DEFAULT_EMPLOYEE.passwordHash) {
      const { passwordHash: _, ...safeUser } = DEFAULT_EMPLOYEE;
      return { success: true, user: safeUser };
    }
    return { success: false, error: 'Incorrect Employee password. Access denied.' };
  }

  // 3. Check Self-Registered Employees
  const employees = getRegisteredEmployees();
  const matched = employees.find((u) => u.email.toLowerCase() === cleanEmail);
  if (matched) {
    if (matched.passwordHash === password) {
      const { passwordHash: _, ...safeUser } = matched;
      return { success: true, user: safeUser };
    }
    return { success: false, error: 'Incorrect password for this employee account.' };
  }

  return {
    success: false,
    error: 'Account not found. Only authorized Admin and registered employees may access TriageSphere. Please register an employee account.',
  };
}
