function PodiumSlot({ employee, medal, platformClass, medalColorClass }) {
  return (
    <div className="flex flex-col items-center">
      <img
        src={`https://api.dicebear.com/7.x/personas/svg?seed=${employee.avatarSeed}`}
        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow mb-1"
        alt={employee.name}
      />
      <p className="font-bold text-sm text-center leading-tight">{employee.name}</p>
      <p className="text-xs text-gray-400 text-center leading-tight">{employee.title}</p>
      <p className="text-xs text-gray-400 text-center leading-tight mb-1">{employee.orgCode}</p>
      <p className={`text-2xl font-bold ${medalColorClass}`}>{medal}</p>
      <p className="text-blue-500 font-bold text-sm">&#9733; {employee.filteredTotal}</p>
      <div className={`w-28 mt-2 ${platformClass}`} />
    </div>
  );
}

export default function Podium({ top3 }) {
  if (top3.length < 3) return null;

  const [first, second, third] = top3;

  return (
    <div className="flex justify-center items-end gap-4 mb-8 mt-4">
      <PodiumSlot
        employee={second}
        medal="2"
        platformClass="h-14 bg-gray-100 border-t-4 border-gray-400 rounded-sm"
        medalColorClass="text-gray-400"
      />
      <PodiumSlot
        employee={first}
        medal="1"
        platformClass="h-20 bg-yellow-100 border-t-4 border-yellow-400 rounded-sm"
        medalColorClass="text-yellow-500"
      />
      <PodiumSlot
        employee={third}
        medal="3"
        platformClass="h-10 bg-orange-50 border-t-4 border-orange-300 rounded-sm"
        medalColorClass="text-orange-400"
      />
    </div>
  );
}
