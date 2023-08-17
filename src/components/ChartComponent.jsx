import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartComponent = ({ chartData }) => {
    return (
        <div>
            <h2 className='text-center my-2'>Chart</h2>


            <LineChart width={400} height={300} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="KP" />
                <YAxis />
                <Tooltip />

                <Line type="monotone" dataKey="X" stroke="blue" />
            </LineChart>

        </div>
    );
};

export default ChartComponent;