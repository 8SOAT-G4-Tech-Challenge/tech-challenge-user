export const OrderStatusEnum = {
	created: 'created',
	received: 'received',
	preparation: 'preparation',
	ready: 'ready',
	finished: 'finished',
	canceled: "canceled'",
} as const;

export type OrderStatusType = keyof typeof OrderStatusEnum;
