'use strict'
var React = require("react-native");
var Dimensions = require("Dimensions");
var {
	Navigator,
	Component,
	View,
	Text,
} = React;
var TabBar = require("./uiplug/TabBar");
var FootNav = require("./uiplug/FootNav");
var Home = require("./page/Home");
var Notice = require("./page/Notice");

function getFootVal() {
	return [{
				imgSrc: require('../public/img/phone.png'),
				imgSrcHover: require('../public/img/phoneActive.png'),
				content: '首页',
				routeName: "home",
				curColor: "#3394FA",
				route: {
					title: '首页',
					name: 'home',
					component: Nav1
				}
			}, {
				imgSrc: require('../public/img/log.png'),
				imgSrcHover: require('../public/img/logActive.png'),
				content: '公告',
				routeName: "main1",
				curColor: "#3394FA",
				route: {
					title: '公告',
					name: 'main1',
					component: React.createClass({
									render: function() {
										return <NavItem componentNav={<Notice navigator={this.props.navigator} />}  
														navigator={this.props.navigator}/>
									}
								})
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

var NavItem = React.createClass({
	render: function() {
		return (
			<View>
				<TabBar title={this.props.title} bgColor="#3394FA" navigator={this.props.navigator} />
				<View style={{height: Dimensions.get('window').height - 66 - 60,}}>
					{this.props.componentNav}
				</View>
				<FootNav 
					navigator={this.props.navigator}
					navs={getFootVal()} />
			</View>
		);
	}
});


var Nav1 = React.createClass({
	render: function() {
		return <NavItem title='首页' 
						componentNav={<Home navigator={this.props.navigator} />}  
						navigator={this.props.navigator}/>
	}
})


var Router = React.createClass({
	render: function() {
		return(
			<Navigator
				style={{flex: 1}}
				initialRoute={{
					title: '首页',
					name: 'home',
					component: Nav1
				}}
				renderScene={ (route, navigator) => {
					let Component = route.component;
					return <Component {...route.params} navigator={navigator} />
				}} /> 
		);
	}
});

module.exports = Router;