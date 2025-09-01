import React from "react";

const RiwayahFilters = ({ activeRiwayah, onRiwayahChange }) => {
  const riwayahMethods = [
    {
      id: 1,
      name: "Hafs",
      arabicName: "حفص",
      description: "Most common recitation method",
    },
    {
      id: 2,
      name: "Warsh",
      arabicName: "ورش",
      description: "Popular in North Africa",
    },
    {
      id: 5,
      name: "Qalun",
      arabicName: "قالون",
      description: "Traditional Madinan method",
    },
  ];

  return (
    <div className="px-4 py-6 bg-surface rounded-lg border border-border">
      <div className="text-center mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
          Recitation Method
        </h3>
        <p className="text-sm text-text-secondary">
          Choose your preferred Riwayah for authentic recitation
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {riwayahMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => onRiwayahChange(method.id)}
            className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 min-w-[100px] ${
              activeRiwayah === method.id
                ? "border-primary bg-primary-50 text-primary"
                : "border-border bg-background text-text-secondary hover:border-primary-200 hover:bg-primary-50 hover:text-primary"
            }`}
          >
            <span className="text-lg font-heading mb-1" dir="rtl">
              {method.arabicName}
            </span>
            <span className="text-sm font-medium mb-1">{method.name}</span>
            <span className="text-xs text-center opacity-80">
              {method.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RiwayahFilters;
