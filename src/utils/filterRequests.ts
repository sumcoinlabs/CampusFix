import { CampusRequest } from '../types';
import { PriorityFilter, StatusFilter } from '../components/RequestFilters';

export function filterRequests(
  requests: CampusRequest[],
  searchText: string,
  statusFilter: StatusFilter,
  priorityFilter: PriorityFilter
) {
  const cleanSearch = searchText.trim().toLowerCase();

  return requests.filter((request) => {
    const matchesSearch =
      !cleanSearch ||
      request.id.toLowerCase().includes(cleanSearch) ||
      request.title.toLowerCase().includes(cleanSearch) ||
      request.category.toLowerCase().includes(cleanSearch) ||
      request.location.toLowerCase().includes(cleanSearch) ||
      request.description.toLowerCase().includes(cleanSearch) ||
      request.assignee.toLowerCase().includes(cleanSearch);

    const matchesStatus = statusFilter === 'All' || request.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || request.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });
}
