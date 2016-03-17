'use strict'
var React = require("react-native");
var TabBar = require("./uiplug/TabBar");


var Index = React.createClass({
	render: function() {
		return (<TabBar title="首页" bgColor="#3394FA" rightText="地图" />);
	}
});

module.exports = Index;