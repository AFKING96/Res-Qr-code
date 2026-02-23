export type OrderStatus = "preparing" | "cooking" | "ready" | "served";

export interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    createdAt: string;
}
