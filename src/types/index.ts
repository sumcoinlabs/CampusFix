export type RequestStatus = 'Submitted' | 'Assigned' | 'In Progress' | 'Resolved';
export type RequestPriority = 'Low' | 'Medium' | 'High';

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
};
