module SmallMouth {
	export interface ServerAdapter {
		id: string;
		connect(host): ServerAdapter;
		onMessage(type: string, callback ?: (error) => any): ServerAdapter;
		send(type: string, data: any, onComplete ?: (error) => any): ServerAdapter;
	}
}