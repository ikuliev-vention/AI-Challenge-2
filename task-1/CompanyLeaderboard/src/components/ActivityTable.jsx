const CATEGORY_BADGE = {
  'Public Speaking': 'inline-block px-2 py-0.5 rounded text-xs bg-teal-100 text-teal-700',
  'Education': 'inline-block px-2 py-0.5 rounded text-xs bg-amber-100 text-amber-700',
};

const DEFAULT_BADGE = 'inline-block px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600';

export default function ActivityTable({ activities }) {
  return (
    <div className="bg-gray-50 px-4 py-3 border-t">
      <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Recent Activity</p>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-xs text-gray-400 uppercase pb-1 text-left font-medium">Activity</th>
            <th className="text-xs text-gray-400 uppercase pb-1 text-left font-medium">Category</th>
            <th className="text-xs text-gray-400 uppercase pb-1 text-left font-medium">Date</th>
            <th className="text-xs text-gray-400 uppercase pb-1 text-right font-medium">Points</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={`${activity.date}-${activity.name}`} className="border-t border-gray-100">
              <td className="py-1 pr-4 text-gray-600 text-left">{activity.name}</td>
              <td className="py-1 pr-4">
                <span className={CATEGORY_BADGE[activity.category] || DEFAULT_BADGE}>
                  {activity.category}
                </span>
              </td>
              <td className="py-1 pr-4 text-gray-500 text-xs">{activity.date}</td>
              <td className="py-1 text-right text-green-600 font-semibold">+{activity.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
