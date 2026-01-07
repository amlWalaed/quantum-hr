/**
 * Generic pagination utility functions
 * Can be used with any array type
 */

export const DEFAULT_PAGE_SIZE = 10;

/**
 * Get paginated items from an array
 * @param items - Array of items to paginate
 * @param currentPage - Current page number (1-indexed)
 * @param pageSize - Number of items per page
 * @returns Array of items for the current page
 */
export const getPaginatedItems = <T>(
  items: T[],
  currentPage: number,
  pageSize: number = DEFAULT_PAGE_SIZE
): T[] => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return items.slice(startIndex, endIndex);
};

/**
 * Calculate total number of pages
 * @param totalItems - Total number of items
 * @param pageSize - Number of items per page
 * @returns Total number of pages
 */
export const getTotalPages = (
  totalItems: number,
  pageSize: number = DEFAULT_PAGE_SIZE
): number => {
  return Math.ceil(totalItems / pageSize);
};

/**
 * Get pagination metadata
 * @param items - Array of items
 * @param currentPage - Current page number (1-indexed)
 * @param pageSize - Number of items per page
 * @returns Pagination metadata object
 */
export const getPaginationMeta = <T>(
  items: T[],
  currentPage: number,
  pageSize: number = DEFAULT_PAGE_SIZE
) => {
  const totalItems = items.length;
  const totalPages = getTotalPages(totalItems, pageSize);
  const paginatedItems = getPaginatedItems(items, currentPage, pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  return {
    items: paginatedItems,
    totalItems,
    totalPages,
    currentPage,
    pageSize,
    startIndex: startIndex + 1,
    endIndex,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
};
