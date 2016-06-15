if (Meteor.isServer) {
	console.log('begin this project');
	var coordinates = {0:[121.228,31.063],1:[121.221,31.056],2:[121.221,31.060],3:[121.218,31.066]};
	var myCart = 0;

	function saveDevices (data) {
		var db_data = Devices.find(data._id).fetch();
		if (db_data.length) {
			Devices.update(data._id, data);
			console.log('device updated');
		} else {
			Devices.insert(data);
			console.log('device inserted');
		}
	};

	function fetchLocation (device_item) {
		var device = device_item;
		if(device.ip == null) device.ip = '180.160.232.49';

		device.coordinates0 = coordinates[myCart][0];
		device.coordinates1 = coordinates[myCart][1];
		device.alias = "myCart" + myCart;
		device.location = "东华大学配送点" + myCart;

		myCart = myCart + 1;

		saveDevices(device);
	};


	function fetchDevices () {

		HTTP.call(
			"POST", 
			"http://api.easylink.io/v1/device/fetchByPage",
			{
				headers: {
		            "Authorization" : "token b69e09a6-2326-4967-8a4f-ded3c72c7a64",
		            "X-Application-Id" : 'cc855e1a-f0f6-43c8-aeda-914b1f054e92'
				}, 
				data: {
					limit: 10
				}
			},
			function (error, result) {
				if (error) {
			        console.log("失败了" + error);
				} else {;
			    	var data = result.data.data;
			    	for (var i = 0; i < data.length; i++) {
			    		var device_item = data[i];
			    		device_item._id = device_item.id;
			    		fetchLocation(device_item);
			    	};
				}
			}
		);
		Orders.remove("xxx4321_1");
		Orders.remove("xxx4321_2");
		Orders.remove("xxx4321_3");
		Orders.remove("xxx4321_4");
	};

	fetchDevices();
}
