import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "../utils/expenses";

const ExpenseBarChart = ({ data }) => {
  const chartData = Object.entries(data)
    .map(([name, value]) => ({
      name,
      amount: value,
    }))
    .reverse();

  if (chartData.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No Expenses Data To Display
      </div>
    );
  }
  const CustomToolTip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-md shadow-md border border-gray-100">
          <p className="font-medium">{label}</p>
          <p className="text-lg">
            RS{formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          angle={-45}
          textAnchor="end"
          height={60}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          tickFormatter={(value) => `RS${value}`}
          tick={{ fontSize: 12 }}
        />
        <Tooltip content={CustomToolTip} />
        <Bar
          dataKey="amount"
          fill="#9b87f5"
          radius={[4, 4, 0, 0]}
          animationDuration={750}
          animationBegin={0}
          animationEasing="ease-out"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExpenseBarChart;
