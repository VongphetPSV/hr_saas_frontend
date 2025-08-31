import React from "react";
import { MetricCard as MetricCardType } from "../types/dashboard";

type MetricCardProps = Omit<MetricCardType, "color">;

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  trend,
  bgColor,
  iconColor,
}) => {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs text-gray-500 mb-1">{title}</p>
          <p className="text-[17.5px] font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-2.5 rounded-xl ${bgColor}`}>
          <span className={iconColor}>{icon}</span>
        </div>
      </div>
      {trend && <p className="text-[10.5px] text-gray-500 mt-4">{trend}</p>}
    </div>
  );
};

export default MetricCard;
