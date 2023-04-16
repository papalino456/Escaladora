import React from 'react';
import { AreaChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';

const Graph = ({ data, dataKey, stroke, stroke2, areaColor }) => {
    return (
        <ResponsiveContainer width="100%" height="100%" margin="10">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={areaColor} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={stroke} stopOpacity={0.7} />
                <stop offset="80%" stopColor={stroke2} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={stroke}
              strokeWidth={100}
              dot={false}
              activeDot={{ r: 5 }}
              fill={`url(#${areaColor})`}
              fillOpacity={1}
              areaColor={areaColor}
            />
            <Area type="" dataKey={dataKey} dot={true} stroke={stroke} fillOpacity={1} fill={`url(#${areaColor})`} />
          </AreaChart>
        </ResponsiveContainer>
      );
    };

export default Graph;