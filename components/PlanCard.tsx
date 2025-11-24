import React from 'react';
import { PlanOption } from '../types';
import { CheckCircle2, Circle } from 'lucide-react';

interface PlanCardProps {
  plan: PlanOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(plan.id)}
      className={`relative rounded-xl border-2 p-6 cursor-pointer transition-all duration-200 flex flex-col h-full
        ${
          isSelected
            ? 'border-indigo-600 bg-indigo-50/30 shadow-md ring-1 ring-indigo-600'
            : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
        }`}
    >
      {/* Selection Indicator */}
      <div className="absolute top-5 right-5">
        {isSelected ? (
          <CheckCircle2 className="w-6 h-6 text-indigo-600" />
        ) : (
          <Circle className="w-6 h-6 text-slate-300" />
        )}
      </div>

      {/* Badge for Early Bird */}
      {plan.badge && (
        <span className="absolute -top-3 left-6 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          {plan.badge}
        </span>
      )}

      {/* Header */}
      <div className="mb-4 pr-8">
        <h3 className={`text-lg font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>
          {plan.name}
        </h3>
        <p className="text-sm font-medium text-slate-500 mt-1">{plan.priceDisplay}</p>
      </div>

      {/* Divider */}
      <div className={`h-px w-full my-3 ${isSelected ? 'bg-indigo-200' : 'bg-slate-100'}`}></div>

      {/* Content */}
      <div className="space-y-4 flex-grow text-sm text-slate-600">
        {plan.details.map((detail, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            <span className="font-semibold text-slate-700">{detail.title}</span>
            <span className="text-slate-500 leading-relaxed">{detail.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanCard;