export type UserRole = 'resident' | 'staff';

export type RequestStatus = 'Submitted' | 'Assigned' | 'In Progress' | 'Resolved';
export type RequestPriority = 'Low' | 'Medium' | 'High';

export type RequestUpdate = {
  id: string;
  visibility: 'Public' | 'Internal';
  author: string;
  message: string;
  createdAt: string;
};

export type CampusRequest = {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  status: RequestStatus;
  priority: RequestPriority;
  reportedBy: string;
  createdAt: string;
  followers: number;
  assignee: string;
  targetResolution: string;
  updates: RequestUpdate[];
};
