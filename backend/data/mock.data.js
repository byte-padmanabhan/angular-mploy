const users = [
  { 
    id: 1, 
    userId: 'john', 
    password: '123', 
    name: 'John Doe', 
    role: 'General User',
    email: 'john@example.com',
    joinDate: '2024-01-15'
  },
  { 
    id: 2, 
    userId: 'jane', 
    password: '123', 
    name: 'Jane Smith', 
    role: 'General User',
    email: 'jane@example.com',
    joinDate: '2024-02-20'
  },
  { 
    id: 3, 
    userId: 'admin', 
    password: '123', 
    name: 'Admin User', 
    role: 'Admin',
    email: 'admin@example.com',
    joinDate: '2024-01-01'
  }
];

// Records data
const records = [
  {
    id: 1,
    title: "Q1 Sales Report",
    description: "Quarterly sales performance and analysis",
    createdBy: "john",
    status: "Active",
    createdAt: "2024-03-15",
  },
  {
    id: 2,
    title: "Budget Planning 2024",
    description: "Annual budget allocation and forecasts",
    createdBy: "john",
    status: "Pending",
    createdAt: "2024-03-20",
  },
  {
    id: 3,
    title: "Marketing Campaign",
    description: "Q2 digital marketing strategy",
    createdBy: "jane",
    status: "Active",
    createdAt: "2024-03-10",
  },
  {
    id: 4,
    title: "System Architecture Review",
    description: "Technical design document for new features",
    createdBy: "admin",
    status: "Approved",
    createdAt: "2024-03-05",
  },
  {
    id: 5,
    title: "Security Audit Q1",
    description: "Compliance and vulnerability assessment",
    createdBy: "admin",
    status: "Active",
    createdAt: "2024-03-18",
  },
];

module.exports = {users, records };
