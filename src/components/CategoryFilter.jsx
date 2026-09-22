import PropTypes from 'prop-types';
import { FiHash } from 'react-icons/fi';

function CategoryFilter({
  categories = [],
  selectedCategory = '',
  onSelectCategory,
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Kategori Populer
        </h3>
        {selectedCategory && (
          <button
            type="button"
            onClick={() => onSelectCategory('')}
            className="text-xs text-blue-600 hover:underline"
          >
            Hapus Filter
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onSelectCategory('')}
          className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
            selectedCategory === ''
              ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
              : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <span>Semua</span>
        </button>

        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(isSelected ? '' : category)}
              className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <FiHash className="w-3 h-3 opacity-70" />
              <span>{category}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  selectedCategory: PropTypes.string,
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategoryFilter;
