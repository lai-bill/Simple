'use strict'
var React = require("react-native");
var {
	View,
	Text,
	TouchableOpacity
} = React;
var BtnGroup = require("../uiplug/BtnGroup");
var HomeInfo = require("./HomeInfo");

var Home = React.createClass({
	render: function() {
		var group1 = [{
						id: 'yanfa',
						title: '研发',
						color: '#0379FB',
						desc: '框架研发',
						callback: this.clickTab
					}, {
						id: 'BUyanfa',
						title: '研发',
						color: '#FCD333',
						desc: 'BU研发',
						callback: this.clickTab
					}, {
						id: 'cangp',
						title: '产品',
						color: '#E7463E',
						desc: '公告产品',
						callback: this.clickTab
					}, {
						id: 'BUcanp',
						title: '产品',
						color: '#57B648',
						desc: 'BU产品',
						callback: this.clickTab
					}];
		var group2 = [{
						id: 'qimingx',
						title: '产品',
						color: '#ED6FBB',
						desc: '启明星',
						callback: this.clickTab
					}, {
						id: 'qimingx',
						title: '项目',
						color: '#E38830',
						desc: '项目管理',
						callback: this.clickTab
					}];
		return (
			<View>
				<BtnGroup btns={group1} />
				<BtnGroup btns={group2} colum={group1.length} />
			</View>
		);
	},
	clickTab: function(id) {
		 this.props.navigator.push({
			title: '首页'+id,
			name: 'info',
			component: HomeInfo,
			params: {
				id: id
			}
		});
	}
});

module.exports = Home;