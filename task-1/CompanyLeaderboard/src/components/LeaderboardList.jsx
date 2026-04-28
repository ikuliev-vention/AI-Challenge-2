import LeaderRow from './LeaderRow';

export default function LeaderboardList({ employees, expandedId, onToggle }) {
  return (
    <div className="mt-4 space-y-2">
      {employees.map((emp) => (
        <LeaderRow
          key={emp.id}
          rank={emp.rank}
          employee={emp}
          isExpanded={expandedId === emp.id}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
