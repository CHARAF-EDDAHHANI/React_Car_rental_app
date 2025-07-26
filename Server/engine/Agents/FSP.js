// FSP.js : filter & sorting & pagination for cars
import { readJSON } from './RWJ.js'; // Adjust the path to your JSON reader

/**
 * Filter cars by multiple optional criteria.
 * Supported filters: seats, transmission_type, category, minPrice, maxPrice,
 * model, year, location, availability, etc.
 * String filters are case-insensitive partial matches.
 * Numeric filters support exact match and ranges (for price).
 * 
 * @param {Object} filters - Filters object with car properties as keys.
 * @returns {Promise<Array>} Filtered cars.
 */
export const filterCars = async (filters = {}) => {
  const cars = await readJSON('cars');

  return cars.filter(car => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === undefined || value === null || value === '') return true; //skip empty filters

      const carValue = car[key];
      if (carValue === undefined) return false;

      // Numeric range filter for price
      if (key === 'minPrice') return car.daily_price >= Number(value);
      if (key === 'maxPrice') return car.daily_price <= Number(value);

      // Numeric exact match
      if (typeof carValue === 'number' && !isNaN(Number(value))) {
        return carValue === Number(value);
      }

      // Case-insensitive partial string match
      if (typeof carValue === 'string' && typeof value === 'string') {
        return carValue.toLowerCase().includes(value.toLowerCase());
      }

      // Fallback exact match
      return carValue === value;
    });
  });
};

/**
 * Sort cars by given key and order.
 * Supports sorting by 'price', 'year', 'rating', or defaults to no sorting.
 * 
 * @param {Array} cars - Array of cars to sort.
 * @param {string} sortBy - Property to sort by ('price', 'year', 'rating').
 * @param {string} order - 'asc' for ascending (default), 'desc' for descending.
 * @returns {Array} Sorted cars.
 */
export const sortCars = (cars, sortBy, order = 'asc') => {
  if (!sortBy) return cars;

  const sortFactor = order.toLowerCase() === 'desc' ? -1 : 1;

  return cars.slice().sort((a, b) => {
    let valA, valB;

    switch (sortBy) {
      case 'price':
        valA = a.daily_price;
        valB = b.daily_price;
        break;
      case 'year':
        valA = a.year;
        valB = b.year;
        break;
      case 'rating':
        valA = a.rating;
        valB = b.rating;
        break;
      default:
        return 0;
    }

    if (valA < valB) return -1 * sortFactor;
    if (valA > valB) return 1 * sortFactor;
    return 0;
  });
};

/**
 * Paginate an array of items.
 * 
 * @param {Array} items - Array of items to paginate.
 * @param {number} page - Current page number (1-based).
 * @param {number} limit - Number of items per page.
 * @returns {Array} Paginated slice.
 */
export const paginate = (items, page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit;
  return items.slice(startIndex, startIndex + limit);
};

/**
 * Combined helper to filter, sort and paginate cars.
 * 
 * @param {Object} options
 * @param {Object} options.filters - Filter criteria.
 * @param {string} options.sortBy - Sort property.
 * @param {string} options.order - Sort order ('asc' or 'desc').
 * @param {number} options.page - Page number.
 * @param {number} options.limit - Items per page.
 * @returns {Promise<Array>} Final cars list.
 */
export const getCars = async ({
  filters = {},
  sortBy = null,
  order = 'asc',
  page = 1,
  limit = 10,
} = {}) => {
  const filtered = await filterCars(filters);
  const sorted = sortCars(filtered, sortBy, order);
  const paginated = paginate(sorted, page, limit);
  return paginated;
};
