import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ResponsiveLineChart = ({ data }) => {
    return (
        <ResponsiveContainer width='100%' height={400}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='KP' />
                <YAxis />
                <Tooltip />
                <Line type='monotone' dataKey='X' stroke='#8884d8' />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default ResponsiveLineChart;