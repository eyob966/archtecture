
import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { cn } from '@/lib/utils';

interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

interface StatsChartProps {
  type: 'area' | 'bar' | 'pie';
  data: ChartDataPoint[];
  keys: string[];
  colors: string[];
  title: string;
  className?: string;
}

const StatsChart: React.FC<StatsChartProps> = ({ 
  type, 
  data, 
  keys, 
  colors, 
  title,
  className 
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-2 border border-solo-gray/30 text-xs">
          <p className="font-medium mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                {keys.map((key, index) => (
                  <linearGradient key={index} id={`color-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors[index]} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={colors[index]} stopOpacity={0.1} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2E3A" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#8E9196' }} 
                axisLine={{ stroke: '#2A2E3A' }}
              />
              <YAxis tick={{ fill: '#8E9196' }} axisLine={{ stroke: '#2A2E3A' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '10px' }} 
                formatter={(value) => <span className="text-sm">{value}</span>}
              />
              {keys.map((key, index) => (
                <Area
                  key={index}
                  type="monotone"
                  dataKey={key}
                  stroke={colors[index]}
                  fillOpacity={1}
                  fill={`url(#color-${key})`}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );
        
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A2E3A" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#8E9196' }} 
                axisLine={{ stroke: '#2A2E3A' }}
              />
              <YAxis tick={{ fill: '#8E9196' }} axisLine={{ stroke: '#2A2E3A' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '10px' }} 
                formatter={(value) => <span className="text-sm">{value}</span>}
              />
              {keys.map((key, index) => (
                <Bar
                  key={index}
                  dataKey={key}
                  fill={colors[index]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colors[index % colors.length]} 
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                formatter={(value) => <span className="text-sm">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className={cn("glass-panel p-4", className)}>
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      {renderChart()}
    </div>
  );
};

export default StatsChart;
