import { PRODUCTS } from '../product_data';

export const getCategoryCount = (categoryName) => {
    return PRODUCTS.filter(p => p.category === categoryName).length;
};

export const CATEGORY_METADATA = [
  {
    name: 'All',
    count: PRODUCTS.length,
    children: []
  },
  {
    name: 'Artificial Grass',
    count: getCategoryCount('Artificial Grass'),
    children: ['25mm Grass', '35mm Grass', '45mm Grass']
  },
  {
    name: 'Artificial Plants',
    count: getCategoryCount('Artificial Plants'),
    children: []
  },
  {
    name: 'Buddha',
    count: getCategoryCount('Buddha'),
    children: []
  },
  {
    name: 'Clocks',
    count: getCategoryCount('Clocks'),
    children: []
  },
  {
    name: 'Curios',
    count: getCategoryCount('Curios'),
    children: []
  },
  {
    name: 'Vases',
    count: getCategoryCount('Vases'),
    children: []
  }
];
