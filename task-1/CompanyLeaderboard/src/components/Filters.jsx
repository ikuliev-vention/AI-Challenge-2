const SELECT_CLASS =
  'border border-gray-300 rounded px-2 py-1 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-400';

export default function Filters({ year, quarter, category, search, years, categories, onYearChange, onQuarterChange, onCategoryChange, onSearchChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <select
        className={SELECT_CLASS}
        value={year}
        onChange={(e) => onYearChange(e.target.value)}
      >
        <option value="">All Years</option>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

      <select
        className={SELECT_CLASS}
        value={quarter}
        onChange={(e) => onQuarterChange(e.target.value)}
      >
        <option value="">All Quarters</option>
        {['Q1', 'Q2', 'Q3', 'Q4'].map((q) => (
          <option key={q} value={q}>{q}</option>
        ))}
      </select>

      <select
        className={SELECT_CLASS}
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <input
        type="text"
        className={SELECT_CLASS}
        placeholder="Search employee..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
