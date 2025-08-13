const availableColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-lime-500",
  "bg-emerald-500",
] as const;

export const EventBar = () => {
  const randomColor =
    availableColors[Math.floor(Math.random() * availableColors.length)];

  return (
    <div className={`${randomColor} h-10 flex items-center p-2 text-sm`}>
      EventBar
    </div>
  );
};
