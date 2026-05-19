import {
  CampusRequest,
  PendingRequest,
  RequestStatus,
} from '../types';

function nowLabel() {
  return new Date().toLocaleString();
}

export function makeId(prefix: string) {
  return `${prefix}-${Date.now().toString().slice(-6)}`;
}

export function buildNewRequest(
  source: PendingRequest | null | undefined,
  reportedBy: string
): CampusRequest {
  return {
    id: makeId('CF'),
    title: source?.title || 'New campus facility request',
    category: source?.category || 'General',
    location: source?.location || 'Unknown location',
    description: source?.description || 'No description provided.',
    status: 'Submitted',
    priority: source?.priority || 'Medium',
    reportedBy,
    createdAt: 'Just now',
    followers: 1,
    assignee: 'Unassigned',
    targetResolution: 'Needs review',
    photoLabel: source?.photoLabel,
    geoLabel: source?.geoLabel,
    updates: [
      {
        id: makeId('U'),
        visibility: 'Public',
        author: 'CampusFix',
        message: 'Request received and awaiting staff review.',
        createdAt: nowLabel(),
      },
    ],
  };
}

export function followExistingRequest(
  requests: CampusRequest[],
  id: string
): CampusRequest[] {
  return requests.map((request) =>
    request.id === id
      ? { ...request, followers: request.followers + 1 }
      : request
  );
}

export function assignRequestToStaff(
  requests: CampusRequest[],
  id: string,
  staffName: string
): CampusRequest[] {
  return requests.map((request) =>
    request.id === id
      ? {
          ...request,
          status: request.status === 'Submitted' ? 'Assigned' : request.status,
          assignee: staffName,
          updates: [
            ...request.updates,
            {
              id: makeId('U'),
              visibility: 'Internal',
              author: staffName,
              message: 'Assigned this request for follow-up.',
              createdAt: nowLabel(),
            },
          ],
        }
      : request
  );
}

export function updateRequestStatus(
  requests: CampusRequest[],
  id: string,
  status: RequestStatus,
  authorName: string
): CampusRequest[] {
  return requests.map((request) =>
    request.id === id
      ? {
          ...request,
          status,
          targetResolution: status === 'Resolved' ? 'Completed' : request.targetResolution,
          updates: [
            ...request.updates,
            {
              id: makeId('U'),
              visibility: 'Public',
              author: authorName,
              message: `Status updated to ${status}.`,
              createdAt: nowLabel(),
            },
          ],
        }
      : request
  );
}

export function addRequestUpdate(
  requests: CampusRequest[],
  id: string,
  message: string,
  authorName: string,
  visibility: 'Public' | 'Internal'
): CampusRequest[] {
  return requests.map((request) =>
    request.id === id
      ? {
          ...request,
          updates: [
            ...request.updates,
            {
              id: makeId('U'),
              visibility,
              author: authorName,
              message,
              createdAt: nowLabel(),
            },
          ],
        }
      : request
  );
}

export function getRequestMetrics(requests: CampusRequest[]) {
  return {
    total: requests.length,
    open: requests.filter((request) => request.status !== 'Resolved').length,
    resolved: requests.filter((request) => request.status === 'Resolved').length,
    highPriority: requests.filter((request) => request.priority === 'High').length,
    followers: requests.reduce((sum, request) => sum + request.followers, 0),
  };
}
