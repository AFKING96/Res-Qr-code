export type TableStatus = "Ordered" | "Empty" | "Paid";
export type OrderStatus = "New" | "Preparing" | "Ready" | "Served";

export const mockTables = [
    { id: "1", number: 1, capacity: 4, status: "Ordered" as TableStatus, timer: "12m", items: 4, total: 210.00 },
    { id: "2", number: 2, capacity: 2, status: "Empty" as TableStatus },
    { id: "3", number: 3, capacity: 6, status: "Ordered" as TableStatus, timer: "5m", items: 2, total: 140.00 },
    { id: "4", number: 4, capacity: 4, status: "Ordered" as TableStatus, timer: "22m", items: 6, total: 345.00 },
    { id: "5", number: 5, capacity: 2, status: "Paid" as TableStatus, total: 180.00 },
    { id: "6", number: 6, capacity: 2, status: "Empty" as TableStatus },
    { id: "7", number: 7, capacity: 4, status: "Empty" as TableStatus },
    { id: "8", number: 8, capacity: 8, status: "Paid" as TableStatus, total: 95.00 },
    { id: "9", number: 9, capacity: 2, status: "Paid" as TableStatus, total: 110.00 },
    { id: "10", number: 10, capacity: 6, status: "Empty" as TableStatus },
];

export const mockOrders = [
    { id: "ORD-001", tableId: "4", items: ["1x V60", "2x Brownies", "1x Classic Mojito"], status: "Preparing" as OrderStatus, time: "22m", total: 345.00 },
    { id: "ORD-002", tableId: "1", items: ["2x Espresso", "1x Carrot Cake", "1x Cortado"], status: "Ready" as OrderStatus, time: "12m", total: 210.00 },
    { id: "ORD-003", tableId: "3", items: ["1x Tropical Hibiscus", "1x Cheese Cake"], status: "New" as OrderStatus, time: "5m", total: 140.00 },
];

export const mockHistory = [
    { id: "ORD-099", tableId: "5", items: ["2x Spanish Latte", "1x Red Velvet"], status: "Served" as OrderStatus, time: "45m ago", total: 180.00 },
    { id: "ORD-098", tableId: "8", items: ["1x Drip Coffee"], status: "Served" as OrderStatus, time: "1h ago", total: 95.00 },
    { id: "ORD-097", tableId: "9", items: ["2x Americano"], status: "Served" as OrderStatus, time: "1h 15m ago", total: 110.00 },
];

export const mockStaff = [
    { id: "S1", name: "Ahmed Y.", role: "Cashier", status: "Clocked In" },
    { id: "S2", name: "Sarah M.", role: "Barista", status: "Clocked In" },
    { id: "S3", name: "Omar K.", role: "Kitchen", status: "Off Duty" },
    { id: "S4", name: "Leila F.", role: "Manager", status: "Clocked In" },
];

export const mockRevenue = {
    daily: 4250.00,
    weekly: 28400.00,
    monthly: 115000.00,
    topItem: "Spanish Latte",
    topItemSales: 142
};
