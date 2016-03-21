'use strict'
var React = require("react-native");
var Dimensions = require("Dimensions");
var {
	Navigator,
	Component,
	View,
	Text,
	D
} = React;
var TabBar = require("./uiplug/TabBar");
var FootNav = require("./uiplug/FootNav");

function getFootVal() {
	return [{
				imgSrc: require('../public/img/phone.png'),
				imgSrcHover: require('../public/img/phoneActive.png'),
				content: '首页',
				routeName: "main",
				curColor: "#3394FA",
				route: {
					title: '首页',
					name: 'main',
					component: Main
				}
			}, {
				imgSrc: require('../public/img/log.png'),
				content: '公告',
				route: {

				}
			}, {
				imgSrc: require('../public/img/settin.png'),
				content: '管理',
				route: {

				}
			}, {
				imgSrc: require('../public/img/info.png'),
				content: '管理',
				route: {

				}
			}];
}




var Main = React.createClass({
	render: function() {

		return (
			<View>
				<TabBar title="首页" bgColor="#3394FA" rightText="地图" />
				<View style={{height: Dimensions.get('window').height - 66 - 64,}}><Text>123</Text></View>
				<FootNav 
					navigator={this.props.navigator}
					navs={getFootVal()} />
			</View>
		);
	}
})

var Router = React.createClass({
	render: function() {
		return(
			<Navigator
				style={{flex: 1}}
				initialRoute={{
					title: '首页',
					name: 'main',
					component: Main
				}}
				renderScene={ (route, navigator) => {
					let Component = route.component;
					return <Component {...route.params} navigator={navigator} />
				}} /> 
		);
	}
});

module.exports = Router;