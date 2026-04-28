import { useState, useMemo } from 'react';
import employees from '../data/employees.json';
import Header from './Header';
import Filters from './Filters';
import Podium from './Podium';
import LeaderboardList from './LeaderboardList';

const QUARTER_MONTHS = {
  Q1: ['Jan', 'Feb', 'Mar'],
  Q2: ['Apr', 'May', 'Jun'],
  Q3: ['Jul', 'Aug', 'Sep'],
  Q4: ['Oct', 'Nov', 'Dec'],
};

// Extract "Dec" from "18-Dec-2025"
function getMonth(dateStr) {
  const parts = dateStr.split('-');
  return parts[1] || '';
}

// Extract "2025" from "18-Dec-2025"
function getYear(dateStr) {
  const parts = dateStr.split('-');
  return parts[2] || '';
}

export default function Leaderboard() {
  const [year, setYear] = useState('');
  const [quarter, setQuarter] = useState('');
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  // Derive dynamic dropdown options from all activities
  const years = useMemo(() => {
    const set = new Set();
    employees.forEach((emp) => emp.activities.forEach((a) => set.add(getYear(a.date))));
    return Array.from(set).filter(Boolean).sort();
  }, []);

  const categories = useMemo(() => {
    const set = new Set();
    employees.forEach((emp) => emp.activities.forEach((a) => set.add(a.category)));
    return Array.from(set).filter(Boolean).sort();
  }, []);

  // Filtering pipeline
  const filteredRanked = useMemo(() => {
    const quarterMonths = quarter ? QUARTER_MONTHS[quarter] : null;

    const mapped = employees.map((emp) => {
      const filteredActivities = emp.activities.filter((a) => {
        if (year && getYear(a.date) !== year) return false;
        if (quarterMonths && !quarterMonths.includes(getMonth(a.date))) return false;
        if (category && a.category !== category) return false;
        return true;
      });

      const filteredTotal = filteredActivities.reduce((sum, a) => sum + a.points, 0);
      return { ...emp, filteredActivities, filteredTotal };
    });

    // Remove employees with 0 total
    const nonZero = mapped.filter((emp) => emp.filteredTotal > 0);

    // Sort descending by filteredTotal, with name as tiebreaker
    nonZero.sort((a, b) => b.filteredTotal - a.filteredTotal || a.name.localeCompare(b.name));

    // Add rank (1-indexed, based on sorted order before name search)
    const ranked = nonZero.map((emp, idx) => ({ ...emp, rank: idx + 1 }));

    // Apply search filter as the final step
    const searchTerm = search.trim().toLowerCase();
    return searchTerm
      ? ranked.filter((emp) => emp.name.toLowerCase().includes(searchTerm))
      : ranked;
  }, [year, quarter, category, search]);

  const handleToggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <h2 className="text-xl font-semibold mb-1">Leaderboard</h2>
        <p className="text-sm text-gray-500 mb-4">
          Top performers based on contributions and activity
        </p>
        <Filters
          year={year}
          quarter={quarter}
          category={category}
          search={search}
          years={years}
          categories={categories}
          onYearChange={setYear}
          onQuarterChange={setQuarter}
          onCategoryChange={setCategory}
          onSearchChange={setSearch}
        />
        <Podium top3={filteredRanked.slice(0, 3)} />
        <LeaderboardList
          employees={filteredRanked}
          expandedId={expandedId}
          onToggle={handleToggle}
        />
        {filteredRanked.length === 0 && (
          <p className="text-center text-gray-400 py-12">No employees match the current filters.</p>
        )}
      </main>
    </div>
  );
}
