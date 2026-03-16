import { SpaceIcon } from "lucide-react";
import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const CATEGORY_COLORS = {
  Food: "#991B1B",          
  Transport: "#3B82F6",     
  Entertainment: "#ed64a6", 
  Utilities: "#14B8A6",     
  Health: "#06B6D4",        
  Shopping: "#F97316",      
  Other: "#6b7280 ",         
};

const ExpensePieChart = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No Expense Data To Display
      </div>
    );
  }

  const getColor = (name) => {
    return CATEGORY_COLORS[name] || "#8E9196";
  };

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      const total = data.reduce((sum, item) => sum + item.value, 0);
      const percentage = ((value / total) * 100).toFixed(0);
      return (
        <div className="bg-white p-4 rounded-md shadow-md border border-gray-100">
          <p className="font-medium">{name}</p>
          <p className="text-lg">
            RS{value.toFixed(2)}
            <span className="text-sm text-gray-500 ml-1">({percentage}%)</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          animationDuration={750}
          animationBegin={0}
          animationEasing="ease-out"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.name)} />
          ))}
        </Pie>
        <Tooltip content={<CustomToolTip />} />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          formatter={(value) => (
            <span className="text-sm font-medium">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpensePieChart;
