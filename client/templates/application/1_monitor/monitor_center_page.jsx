  MonitorCenterPage = React.createClass({


 	// This mixin makes the getMeteorData method work
	mixins: [ReactMeteorData],

	// Loads items from the Devices collection and puts them on this.data.devices
	getMeteorData() {
		let query = {};
		return {
			orders: Orders.find(query).fetch()
		};
	},

  getInitialState() {
    return {
      pay_id: 1,
      shipment_id: 1,
      best_time: 1
    }
  },

  _mqttSend(msg) {

    var host = "api.easylink.io";
    var port = 1983;
    var clientID = "v1-app-" + parseInt(Math.random() * (1000000000000), 12);
    var client = new Paho.MQTT.Client(host, Number(port), clientID);

	var cartBuff =[
	  	"c28a7d8b/d0bae4064b24",
	  	"c28a7d8b/abcdwxyz0123",
	  	"c28a7d8b/abcdwxyz0124",
	  	"c28a7d8b/abcdwxyz0125"
		];

    var device_id = cartBuff[this.state.shipment_id-1];
    var message = new Paho.MQTT.Message(msg);
    message.destinationName = device_id + "/in";
    

    client.connect({onSuccess:onConnect});
    function onConnect() {
        console.log("connected");
        client.send(message);
    };

  },

  _ChangeTime(e){
  	var now = this.state.best_time;
  	document.getElementById("time"+now).style['border-color']='#fff';
  	document.getElementById("time"+e.target.value).style['border-color']='#ff4646';
  	this.setState({
      best_time: e.target.value
    });
  },

  _ChangeShip(e){
  	var now = this.state.shipment_id;
  	document.getElementById("ship"+now).style['border-color']='#fff';
  	document.getElementById("ship"+e.target.value).style['border-color']='#ff4646';
  	this.setState({
      shipment_id: e.target.value
    });
  },

  _ChangePay(e){
  	var now = this.state.pay_id;
  	document.getElementById("pay"+now).style['border-color']='#fff';
  	document.getElementById("pay"+e.target.value).style['border-color']='#ff4646';
  	this.setState({
      pay_id: e.target.value
    });
  },

  _InitialData() {
  	var checkoutConfig={
        addressMatch:'common',
        addressMatchVarName:'data',
        hasPresales:false,
        hasBigTv:false,
        hasAir:false,
        hasScales:false,
        hasGiftcard:false,
        totalPrice:244.00,
        postage:10,//运费
        postFree:true,
        bcPrice:150,
        activityDiscountMoney:0.00,
        showCouponBox:0,
        invoice:{
            NA:"0",
            personal:"1",
            company:"2",
            electronic:"4"
        }
    };
    var miniCartDisable=true;
  },

  _toOrder(){
  	var cartBuff =[
		  	"c28a7d8b/d0bae4064b24",
		  	"c28a7d8b/abcdwxyz0123",
		  	"c28a7d8b/abcdwxyz0124",
		  	"c28a7d8b/abcdwxyz0125"
  		];
  	var lng = document.getElementById("mapJD").innerText.split(':');
  	var lat = document.getElementById("mapWD").innerText.split(':');
  	if(lng.length==2 && lat.length==2){
  		var testOrder = {"cart":"","lng":0,"lat":0};
  		testOrder.cart = cartBuff[this.state.shipment_id-1];
	  	testOrder.lng = parseFloat(lng[1]);
	  	testOrder.lat = parseFloat(lat[1]);
	  	testOrder._id = "xxx4321_"+this.state.shipment_id;
		var db_data = Orders.find(testOrder._id).fetch();
		if (db_data.length) {
			Orders.update(testOrder._id, testOrder);
		} else {
			Orders.insert(testOrder);
		}
		this._mqttSend("GO");
  	}
  	else{
  		alert("请选择地址");
  	}
  	
  },

  componentDidMount() {
    this._InitialData();

    var map = new BMap.Map("selectContainer");
	var point = new BMap.Point(121.222, 31.058);
	map.centerAndZoom(point, 16); 
	map.enableScrollWheelZoom();   
	map.setCurrentCity("上海"); 
	function chengeInfo(e){
		document.getElementById("mapJD").innerHTML="经度:"+e.point.lng;
		document.getElementById("mapWD").innerHTML="维度:"+e.point.lat;
	}
	map.addEventListener("click", chengeInfo);
  },

  render() {
    return (
      <div >
      	<div className="shortcut_v2013 alink_v2013">
        	<div className="w">
	            <ul className="fl 1h">
	                <li className="fl"><div className="menu_hd">您好，欢迎来购物！</div></li>
	                <li className="fl"><i className="shortcut_s"></i></li>
	                <li className="fl"><div className="menu_hd"><a href="#">请登录</a></div></li>
	                <li className="fl"><div className="menu_hd"><a href="#">免费注册</a></div></li>
	            </ul>
	            <ul className="fr 1h">
	                <li className="fl"><div className="menu_hd"><a href="#">我的订单</a></div></li>
	                <li className="fl"><i className="shortcut_s"></i></li>
	                <li className="fl"><div className="menu_hd"><a href="#">我的信息</a></div></li>
	                <li className="fl"><i className="shortcut_s"></i></li>
	                <li className="fl"><div className="menu_hd"><a href="#">服务中心</a></div></li>
	                <li className="fl"><i className="shortcut_s"></i></li>
	            </ul>
            	<span className="clr"></span>
        	</div>
    	</div>

	    <div className="header_2013">
	        <div className="w">
	            <div className="header_searchbox">
	                <form action="#">
	                    <input name="search" type="text" className="header_search_input" default_val="" x-webkit-speech="" x-webkit-grammar="builtin:search" lang="zh" />
	                    <button type="submit" className="header_search_btn">搜索</button>
	                </form>
	                <ul className="hot_word">
	                    <li><a className="red" href="#" target="_blank">xxx</a></li>
	                    <li><a target="_blank" href="#">yyy</a></li>
	                    <li><a target="_blank" href="#">zzz</a></li>
	                    <li><a target="_blank" href="#">aaa</a></li>
	                    <li><a target="_blank" href="#">bbb</a></li>
	                </ul>
	            </div>

	            <span className="clr"></span>
	        </div>
	    </div>




	    <div className="yHeader">
			<div className="shop_Nav">
				<div className="pullDown">
					<h2 className="pullDownTitle"><i></i>全部商品分类</h2>
				</div>

				<ul className="Menu_box">
					<li><a href="" target="_blank" className="yMenua">首页</a></li>
					<li><a href="" target="_blank">大划算</a></li>
					<li><a href="" target="_blank">抢拍</a></li>
					<li><a href="" target="_blank">专场</a></li>
					<li><a href="" target="_blank">超市</a></li>
				</ul>
	            <div className="fr r_icon"><i className="i01"></i><span>30天退货</span><i className="i02"></i><span>满59包邮</span></div>
			</div>
 		</div>


		<div className="banner_red_top"> 
		</div>  
    

		<div className="border_top_cart">
		<div className="container">
		<div className="checkout-box">
		        <form  id="checkoutForm" action="#" method="post">
		            <div className="checkout-box-bd">
		                <input type="hidden" name="Checkout[addressState]" id="addrState"   value="0" />
		                <div className="xm-box">
		                    <div className="box-hd ">
		                        <h2 className="title">收货地址</h2>
		                    </div>
		                    <div className="box-bd">
		                        <div className="clearfix xm-address-list" id="checkoutAddrList">
		                            <dl className="item" >
		                                <dt>
		                                    <h1 className="itemConsignee">沈中皓</h1>
		                                    <span className="itemTag tag">家</span>
		                                </dt>
		                                <dd>
		                                    <p className="tel itemTel">15961726437</p>
		                                    <p className="itemRegion">上海市 松江区</p>
		                                    <p className="itemStreet">文汇路300弄17号楼7005室(214045)</p>
		                                    <span className="edit-btn J_editAddr">编辑</span>
		                                </dd>
		                                <dd className="ddstyle">
		                                    <input type="radio" name="Checkout[address]" className="addressId"  value="10140916720030323" />
		                                </dd>
		                            </dl>
		                            <div className="item use-new-addr"  id="J_useNewAddr" data-state="off">
		                                 <span className="iconfont icon-add"><img src="images/add_cart.png" /></span> 
		                                使用新地址
		                            </div>
		                        </div>
		                        <input type="hidden" name="newAddress[type]" id="newType" value="common" />
		                        <input type="hidden" name="newAddress[consignee]" id="newConsignee" />
		                        <input type="hidden" name="newAddress[province]" id="newProvince" />
		                        <input type="hidden" name="newAddress[city]" id="newCity" />
		                        <input type="hidden" name="newAddress[district]" id="newCounty" />
		                        <input type="hidden" name="newAddress[address]" id="newStreet" />
		                        <input type="hidden" name="newAddress[zipcode]" id="newZipcode" />
		                        <input type="hidden" name="newAddress[tel]" id="newTel" />
		                        <input type="hidden" name="newAddress[tag_name]" id="newTag" />
		                        <div className="xm-edit-addr-box" id="J_editAddrBox">
		                            <div className="bd">
		                                <div className="item">

		                                    <label>收货人姓名<span>*</span></label> 
		                                    <input type="text" name="userAddress[consignee]" id="Consignee" className="input" placeholder="收货人姓名"  />
		                                    <p className="tip-msg tipMsg"></p>

		                                </div>
		                                <div className="item">

		                                    <label>联系电话<span>*</span></label> 
		                                    <input type="text" name="userAddress[tel]" className="input" id="Telephone" placeholder="11位手机号" />
		                                    <p className="tel-modify-tip" id="telModifyTip"></p>
		                                    <p className="tip-msg tipMsg"></p>

		                                </div>
		                                <div className="item">

		                                    <label>地址<span>*</span></label>

		                                    <select name="userAddress[province]" id="Provinces" className="select-1">
		                                        <option>省份/自治区</option>
		                                    </select>

		                                    <select name="userAddress[city]"  id="Citys" className="select-2" disabled>
		                                        <option>城市/地区/自治州</option>
		                                    </select>

		                                    <select name="userAddress[county]"  id="Countys" className="select-3" disabled>
		                                        <option>区/县</option>
		                                    </select>

		                                    <textarea   name="userAddress[street]" className="input-area" id="Street" placeholder="路名或街道地址，门牌号">

		                                    </textarea>

		                                    <p className="tip-msg tipMsg"></p>

		                                </div>
		                                <div className="item">
		                                    <label>邮政编码<span>*</span></label> 
		                                    <input type="text" name="userAddress[zipcode]" id="Zipcode" className="input" placeholder="邮政编码" />
		                                    <p className="zipcode-tip" id="zipcodeTip"></p>
		                                    <p className="tip-msg tipMsg"></p>
		                                </div>
		                                <div className="item">
		                                    <label>地址标签<span>*</span></label> 
		                                    <input type="text" name="userAddress[tag]" id="Tag" className="input" placeholder='地址标签：如"家"、"公司"。限5个字内'  />
		                                    <p className="tip-msg tipMsg"></p>
		                                </div>
		                            </div>
		                            <div className="ft clearfix">
		                                <button  type="button"  className="btn btn-lineDake btn-small " id="J_editAddrCancel">
		                                    取消
		                                </button>

		                                 <button type="button" className="btn btn-primary  btn-small " id="J_editAddrOk">
		                                    保存
		                                 </button>
		                            </div>
		                        </div>
		                        <div className="xm-edit-addr-backdrop" id="J_editAddrBackdrop">
		                        </div>
		                    </div>   
		                    <div id="selectContainer" className="selectContainer"></div>      
		                    <div><h3 id="mapJD">经度</h3><h3 id="mapWD">维度</h3></div>    
		                </div>

		                <div id="checkoutPayment">
		                    <div className="xm-box">
		                        <div className="box-hd ">
		                            <h2 className="title">支付方式</h2>
		                        </div>
		                        <div className="box-bd">
		                            <ul className="checkout-option-list clearfix J_optionList">
		                                <li id="pay1" className="item selected" onClick={this._ChangePay} value="1">
		                                    在线支付
		                                </li>

		                                <li id="pay2" className="item " onClick={this._ChangePay} value="2">
		                                    现金支付
		                                </li> 
		                            </ul>
		                        </div>
		                    </div>
		                    <div className="xm-box">
		                        <div className="box-hd ">
		                            <h2 className="title">配送选择</h2>
		                        </div>
		                        <div className="box-bd">
		                            <ul className="checkout-option-list clearfix J_optionList">
		                                <li id="ship1" className="item selected" onClick={this._ChangeShip} value="1">
		                                    myCart1
		                                </li>

		                                <li id="ship2" className="item " onClick={this._ChangeShip} value="2">
		                                     myCart2
		                                </li> 

		                                <li id="ship3" className="item " onClick={this._ChangeShip} value="3">
		                                     myCart3
		                                </li> 

		                                <li id="ship4" className="item " onClick={this._ChangeShip} value="4">
		                                     myCart4
		                                </li> 
		                            </ul>
		                        </div>
		                    </div>
		                </div>

		                <div className="xm-box">
		                    <div className="box-hd">
		                        <h2 className="title">送货时间</h2>
		                    </div>
		                    <div className="box-bd">
		                        <ul className="checkout-option-list clearfix J_optionList">
		                            <li id="time1" className="item selected" onClick={this._ChangeTime} value="1" >
		                                    不限送货时间
		                            </li>

		                            <li id="time2" className="item " onClick={this._ChangeTime} value="2">
		                                    工作日送货
		                            </li>

		                            <li id="time3" className="item " onClick={this._ChangeTime} value="3">
		                                    双休日、假日
		                            </li> 

		                        </ul>
		                    </div>
		                </div>

		            </div>

		            <div className="checkout-box-ft">
		                <div id="checkoutGoodsList" className="checkout-goods-box">
		                    <div className="xm-box">
		                        <div className="box-hd">
		                            <h2 className="title">确认订单信息</h2>
		                        </div>

		                        <div className="box-bd">
		                            <dl className="checkout-goods-list">
		                                <dt className="clearfix">
		                                    <span className="col col-1">商品名称</span>
		                                    <span className="col col-2">购买价格</span>
		                                    <span className="col col-3">购买数量</span>
		                                    <span className="col col-4">小计（元）</span>
		                                </dt>

		                                <dd className="item clearfix">
		                                    <div className="item-row">
		                                        <div className="col col-1">
		                                            <div className="g-pic">
		                                                <img src="http://i1.mifile.cn/a1/T14BLvBKJT1RXrhCrK!40x40.jpg" width="40" height="40" />
		                                            </div>
		                                            <div className="g-info">
		                                                <a href="http://item.mi.com/1151500061.html" target="_blank">
		                                                    招财猫米兔 白色
		                                                </a>
		                                            </div>
		                                        </div>
		                    
		                                        <div className="col col-2">49元</div>
		                                        <div className="col col-3">1</div>
		                                        <div className="col col-4">49元</div>
		                                    </div>
		                                </dd>

		                                <dd className="item clearfix">
		                                    <div className="item-row">
		                                        <div className="col col-1">
		                                            <div className="g-pic">
		                                                <img src="http://i1.mifile.cn/a1/T1rrDgB4DT1RXrhCrK!40x40.jpg" width="40" height="40" />
		                                            </div>
		                                            <div className="g-info">
		                                                <a href="http://item.mi.com/1151400031.html" target="_blank">
		                                                小米圆领纯色T恤 男款 红色 XXL</a>
		                                            </div>
		                                        </div>
		                                        <div className="col col-2">39元</div>
		                                        <div className="col col-3">4</div>
		                                        <div className="col col-4">156元</div>
		                                    </div>
		                                </dd>
		                            </dl>
		                            <div className="checkout-count clearfix">
		                                <div className="checkout-count-extend xm-add-buy">
		                                    <h2 className="title">会员留言</h2>
		                                    <input type="text" />

		                                </div>
		                                <div className="checkout-price">
		                                    <ul>
		                                        <li>
		                                           订单总额：<span>244元</span>
		                                        </li>
		                                        <li>
		                                            活动优惠：<span>-0元</span>
		                                            <script type="text/javascript">
		                                                checkoutConfig.activityDiscountMoney=0;
		                                                checkoutConfig.totalPrice=244.00;
		                                            </script>
		                                        </li>
		                                        <li>
		                                            优惠券抵扣：<span id="couponDesc">-0元</span>
		                                        </li>
		                                        <li>
		                                            运费：<span id="postageDesc">0元</span>
		                                        </li>
		                                    </ul>
		                                    <p className="checkout-total">
		                                        应付总额：
		                                        <span>
		                                            <strong id="totalPrice">244</strong>
		                                            元
		                                        </span>
		                                    </p>
		                                </div>
		                            </div>
		                        </div>
		                    </div>
		                </div>
		                <input type="hidden"  id="couponType" name="Checkout[couponsType]" />
		                <input type="hidden" id="couponValue" name="Checkout[couponsValue]" />
		                <div className="checkout-confirm">

		                     <a href="#" className="btn btn-lineDakeLight btn-back-cart">返回购物车</a>

		                     <input type="" className="btn btn-primary" value="立即下单" id="checkoutToPay" onClick={this._toOrder}/>
		                </div>
		            </div>
		        </form>
		</div>
		</div>
		</div>

      </div>
    );
  }
});