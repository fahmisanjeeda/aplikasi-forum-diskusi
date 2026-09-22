import CategoryFilter from '../components/CategoryFilter';

export default {
  title: 'Components/CategoryFilter',
  component: CategoryFilter,
  parameters: {
    layout: 'padded',
  },
};

export const Default = {
  args: {
    categories: ['react', 'redux', 'vitest', 'cypress', 'javascript'],
    selectedCategory: '',
    onSelectCategory: (cat) => console.log('Selected category:', cat),
  },
};

export const WithSelected = {
  args: {
    categories: ['react', 'redux', 'vitest', 'cypress', 'javascript'],
    selectedCategory: 'react',
    onSelectCategory: (cat) => console.log('Selected category:', cat),
  },
};

