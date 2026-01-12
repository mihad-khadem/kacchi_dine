//  user type definition

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "customer" | "admin";
  createdAt: Date;
  updatedAt: Date;
}
