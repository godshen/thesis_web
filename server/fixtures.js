if (Meteor.isServer) {
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
	function saveWeathers (data) {
		var db_data = Weathers.find(data._id).fetch();
		//console.log(db_data);
		if (db_data.length) {
			Weathers.update(data._id, data);
			console.log('device updated');
		} else {
			Weathers.insert(data);
			console.log('device inserted');
		}
	};
	function fetchLocation (device_item) {
	    var UTFTranslate = {
	      Change:function(pValue){
	        return pValue.replace(/[^\u0000-\u00FF]/g,function($0){return escape($0).replace(/(%u)(\w{4})/gi,"&#x$2;")});
	      },
	      ReChange:function(pValue){
	        return unescape(pValue.replace(/&#x/g,'%u').replace(/\\u/g,'%u').replace(/;/g,''));
	      }
	    };
	    var device = device_item;
	    var ip;
	    if(device.ip != null) ip = device.ip.split(':')[0];
	    else ip = '180.160.232.49';
		var url = 'http://api.map.baidu.com/location/ip?ak=g5QqWxi1rE04XFsvc288DF1P&ip='+ip+'&coor=bd09ll';
		HTTP.get(url, function (error, result) {
			if (!error) {
              var data = result.data.content.address;
              var city_name = UTFTranslate.ReChange(data);
              if (city_name.match('省')) {
              	city_name = city_name.split('省')[1];
              } else if (city_name.match('自治区')) {
              	city_name = city_name.split('自治区')[1];
              }
              device.location = city_name;
              saveDevices(device);
            }
		});
	};
	function fetchWeather (city) {
		var url = 'http://api.map.baidu.com/telematics/v3/weather?location='+city+'&output=json&ak=g5QqWxi1rE04XFsvc288DF1P';
		HTTP.get(url, function (error, result) {
			if (!error) {
              var data = result.data.results[0];
              data._id = city;
              saveWeathers(data);
            }
		});
	};
	function getCities () {
		var devices = Devices.find().fetch();
		var cities = [];
    	for (var i = 0; i < devices.length; i++) {
    		var location = devices[i].location;
    		var if_match = false;
    		for (var j = 0; j < cities.length; j++) {
    			if (cities[j] == location) {
    				if_match = true;
    			};
    		};
    		if (!if_match) {
    			cities.push(location);
    		}
    	};
    	for (var i = 0; i < cities.length; i++) {
    		var city = cities[i];
    		fetchWeather(city);
    	};
    	//console.log(cities);
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
			    		//console.log(device_item);
			    		fetchLocation(device_item);
			    	};
					/*
			    	setTimeout(Meteor.bindEnvironment(function() {
			    		getCities();
			    	}), 3000);
					*/
				}
			}
		);
	};

	fetchDevices();
}
