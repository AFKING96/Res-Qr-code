"use client";

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const revenueData = [
    { time: '10:00', revenue: 400 },
    { time: '11:00', revenue: 800 },
    { time: '12:00', revenue: 1600 },
    { time: '13:00', revenue: 2100 },
    { time: '14:00', revenue: 1500 },
    { time: '15:00', revenue: 900 },
    { time: '16:00', revenue: 1200 },
];

const topItemsData = [
    { name: 'Wagyu Ribeye', sales: 48 },
    { name: 'Truffle Pasta', sales: 36 },
    { name: 'Oysters', sales: 29 },
    { name: 'Cabernet', sales: 22 },
    { name: 'Cold Brew', sales: 55 }
];

const transactionsData = [
    { day: 'Mon', count: 120 },
    { day: 'Tue', count: 150 },
    { day: 'Wed', count: 180 },
    { day: 'Thu', count: 160 },
    { day: 'Fri', count: 250 },
    { day: 'Sat', count: 324 },
    { day: 'Sun', count: 280 },
];

export default function AnalyticsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex justify-between items-end mb-12 border-b-2 border-primary pb-4">
                <h2 className="text-3xl font-bold uppercase tracking-tight font-display">Full Menu Analytics</h2>
                <span className="text-sm italic font-sans text-primary/60">Real-time data synchronization</span>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                {/* Revenue Timeline */}
                <div className="border-2 border-primary p-6 bg-white">
                    <div className="flex items-center justify-between mb-8 border-b-2 border-primary pb-4">
                        <h3 className="text-xl font-bold uppercase tracking-tight font-display">Revenue Timeline (Today)</h3>
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="time" stroke="#000" tick={{ fontFamily: 'sans-serif', fontSize: 12, fontWeight: 'bold' }} />
                                <YAxis stroke="#000" tick={{ fontFamily: 'sans-serif', fontSize: 12, fontWeight: 'bold' }} />
                                <Tooltip contentStyle={{ borderRadius: 0, border: '2px solid black', fontWeight: 'bold' }} />
                                <Legend wrapperStyle={{ fontFamily: 'sans-serif', fontSize: 12, fontWeight: 'bold' }} />
                                <Line type="monotone" dataKey="revenue" stroke="#000" strokeWidth={3} dot={{ stroke: '#000', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Selling Chart */}
                <div className="border-2 border-primary p-6 bg-white">
                    <div className="flex items-center justify-between mb-8 border-b-2 border-primary pb-4">
                        <h3 className="text-xl font-bold uppercase tracking-tight font-display">Top Selling Volume</h3>
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={topItemsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                <XAxis dataKey="name" stroke="#000" tick={{ fontFamily: 'sans-serif', fontSize: 12, fontWeight: 'bold' }} />
                                <YAxis stroke="#000" tick={{ fontFamily: 'sans-serif', fontSize: 12, fontWeight: 'bold' }} />
                                <Tooltip contentStyle={{ borderRadius: 0, border: '2px solid black', fontWeight: 'bold' }} cursor={{ fill: '#f1f5f9' }} />
                                <Legend wrapperStyle={{ fontFamily: 'sans-serif', fontSize: 12, fontWeight: 'bold' }} />
                                <Bar dataKey="sales" fill="#000" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Transactions per Day */}
            <div className="border-2 border-primary p-6 bg-white mb-16">
                <div className="flex items-center justify-between mb-8 border-b-2 border-primary pb-4">
                    <h3 className="text-xl font-bold uppercase tracking-tight font-display">Weekly Transactions</h3>
                </div>
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={transactionsData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="day" stroke="#000" tick={{ fontFamily: 'sans-serif', fontSize: 12, fontWeight: 'bold' }} />
                            <YAxis stroke="#000" tick={{ fontFamily: 'sans-serif', fontSize: 12, fontWeight: 'bold' }} />
                            <Tooltip contentStyle={{ borderRadius: 0, border: '2px solid black', fontWeight: 'bold' }} cursor={{ fill: '#f1f5f9' }} />
                            <Legend wrapperStyle={{ fontFamily: 'sans-serif', fontSize: 12, fontWeight: 'bold' }} />
                            <Bar dataKey="count" fill="#475569" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
