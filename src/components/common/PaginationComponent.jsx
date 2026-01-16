import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

/**
 * Reusable pagination component
 * 
 * @param {number} totalItems - Total number of items (required)
 * @param {number} itemsPerPage - Number of items per page (default: 10)
 * @param {number} currentPage - Current page (default: 1)
 * @param {function} onPageChange - Callback function called when page changes. Receives page number (starting from 1)
 * @param {string} color - Pagination color: "primary", "secondary", "standard" (default: "primary")
 * @param {string} size - Size: "small", "medium", "large" (default: "medium")
 * @param {string} variant - Variant: "text", "outlined" (default: "text")
 * @param {boolean} showFirstLastButton - Whether to show first/last page buttons (default: false)
 */
export default function PaginationComponent({ 
  totalItems, 
  itemsPerPage = 10, 
  currentPage = 1, 
  onPageChange,
  color = "primary",
  size = "medium",
  variant = "text",
  showFirstLastButton = false
}) {
  // Validate input data
  if (!totalItems || totalItems <= 0) {
    return null;
  }

  if (!itemsPerPage || itemsPerPage <= 0) {
    return null;
  }

  // Calculate number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Don't show pagination if pages count is less than or equal to 1
  if (totalPages <= 1) {
    return null;
  }

  // Limit currentPage to valid values
  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

  const handleChange = (event, value) => {
    if (onPageChange && typeof onPageChange === 'function') {
      onPageChange(value);
    }
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Pagination 
        count={totalPages} 
        page={safeCurrentPage}
        onChange={handleChange}
        color={color}
        size={size}
        variant={variant}
        showFirstButton={showFirstLastButton}
        showLastButton={showFirstLastButton}
      />
    </Stack>
  );
}
