import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

/**
 * Переиспользуемый компонент пагинации
 * 
 * @param {number} totalItems - Общее количество элементов (обязательно)
 * @param {number} itemsPerPage - Количество элементов на странице (по умолчанию: 10)
 * @param {number} currentPage - Текущая страница (по умолчанию: 1)
 * @param {function} onPageChange - Callback функция, вызываемая при изменении страницы. Получает номер страницы (начиная с 1)
 * @param {string} color - Цвет пагинации: "primary", "secondary", "standard" (по умолчанию: "primary")
 * @param {string} size - Размер: "small", "medium", "large" (по умолчанию: "medium")
 * @param {string} variant - Вариант: "text", "outlined" (по умолчанию: "text")
 * @param {boolean} showFirstLastButton - Показывать ли кнопки первой/последней страницы (по умолчанию: false)
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
  // Валидация входных данных
  if (!totalItems || totalItems <= 0) {
    return null;
  }

  if (!itemsPerPage || itemsPerPage <= 0) {
    return null;
  }

  // Вычисляем количество страниц
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Не показываем пагинацию, если страниц меньше или равно 1
  if (totalPages <= 1) {
    return null;
  }

  // Ограничиваем currentPage допустимыми значениями
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
