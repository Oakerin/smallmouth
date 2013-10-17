///<reference path="../d.ts/DefinitelyTyped/socket.io/socket.io.d.ts"/>

module SmallMouth.largeMouthAdapter {

	var connections = {};	

	function connect(host) {
		var socket;
		if(!host) return;

		if(connections[host]) {
			socket = connections[host];
		} else {
			socket = connections[host] = io.connect(host);
		}

		socket.on('data', (resp) => {
			SmallMouth._dataRegistry.serverSetData(resp.path, resp.value);

			var registryData = SmallMouth._dataRegistry.getData(resp.path);	

			SmallMouth._eventRegistry.triggerEvent(resp.path, 'value', host, new SmallMouth.Snapshot(
				resp.path,
				registryData,
				host
			), {remote: true});
		});

		socket.on('set', (resp) => {
			SmallMouth._dataRegistry.serverSetData(resp.path, resp.value);

			var registryData = SmallMouth._dataRegistry.getData(resp.path);	

			SmallMouth._eventRegistry.triggerEvent(resp.path, 'value', host, new SmallMouth.Snapshot(
				resp.path,
				registryData,
				host
			), {remote: true});
		});

		socket.on('update', (resp) => {
			SmallMouth._dataRegistry.serverUpdateData(resp.path, resp.value);

			var registryData = SmallMouth._dataRegistry.getData(resp.path);	

			SmallMouth._eventRegistry.triggerEvent(resp.path, 'value', host, new SmallMouth.Snapshot(
				resp.path,
				registryData,
				host
			), {remote: true});
		});

		socket.on('ready', (resp) => {
			connections[host].id = resp.id;
		});

		return socket;
	}


	function subscribe(host, url) {
		var socket = connections[host];
		if(!socket) return;

		socket.emit('subscribe', {
			url: url,
			value: SmallMouth._dataRegistry.getData(url)
		});
	}

	function syncRemote(host, data, url) {
		var socket = connections[host];
		if(!socket) return;

		socket.emit('set', {
			url: url,
			value: data	
		});
	}

	function generateId(host?: string) {
		var id = (new Date()).getTime() + "";
		if(host) id = connections[host].id + '-' + id;
		return id;
	}

	export var connect = connect;
	export var subscribe = subscribe;
	export var syncRemote = syncRemote;
	export var generateId = generateId;
}