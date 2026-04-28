import ActivityTable from './ActivityTable';

const SpeechBubbleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3v-3z" />
  </svg>
);

const GraduationCapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
  </svg>
);

export default function LeaderRow({ rank, employee, isExpanded, onToggle }) {
  const { filteredActivities } = employee;

  const publicSpeakingCount = filteredActivities.filter(
    (a) => a.category === 'Public Speaking'
  ).length;
  const educationCount = filteredActivities.filter(
    (a) => a.category === 'Education'
  ).length;

  return (
    <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
      {/* Row header — clickable */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none hover:bg-gray-50 transition-colors"
        onClick={() => onToggle(employee.id)}
      >
        {/* Rank */}
        <span className="text-gray-500 font-bold w-8 text-center shrink-0">{rank}</span>

        {/* Avatar */}
        <img
          src={`https://api.dicebear.com/7.x/personas/svg?seed=${employee.avatarSeed}`}
          className="w-10 h-10 rounded-full shrink-0"
          alt={employee.name}
        />

        {/* Name + title + org */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 truncate">{employee.name}</p>
          <p className="text-xs text-gray-500 truncate">{employee.title} &middot; {employee.orgCode}</p>
        </div>

        {/* Category icon counts */}
        <div className="flex items-center gap-3 shrink-0">
          {publicSpeakingCount > 0 && (
            <span className="flex items-center gap-1 text-teal-600 text-xs">
              <SpeechBubbleIcon />
              {publicSpeakingCount}
            </span>
          )}
          {educationCount > 0 && (
            <span className="flex items-center gap-1 text-amber-600 text-xs">
              <GraduationCapIcon />
              {educationCount}
            </span>
          )}
        </div>

        {/* Total score */}
        <div className="flex flex-col items-end shrink-0 ml-2">
          <span className="text-xs text-gray-400 uppercase leading-none mb-0.5">Total</span>
          <span className="text-blue-600 font-bold text-lg leading-none">
            &#9733; {employee.filteredTotal}
          </span>
        </div>

        {/* Chevron */}
        <span
          className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
        >
          ▼
        </span>
      </div>

      {/* Expanded activity table */}
      {isExpanded && (
        <ActivityTable activities={filteredActivities} />
      )}
    </div>
  );
}
