'use strict'

var React = require('react-native');
var TabBar = require("../uiplug/TabBar");
var Dimensions = require("Dimensions");
var {
	View,
	Text,
	TouchableOpacity
} = React;


var List = require("../uiplug/List");

var HomeInfo = React.createClass({
	getInitialState: function() {
		return {
			data: []
		}
	},
	render: function() {
		return (
			<View>
				<TabBar title='内容详情' bgColor="#3394FA" navigator={this.props.navigator} />
				<List 
					data={this.state.data} 
					height={Dimensions.get('window').height - 66} 
					refresh={this.refresh} 
					loadding={this.loadding}/>
			</View>
		);
	},
	refresh: function(callback) {
		this.setState({
			data: [(<View><Text>asd</Text></View>)]
		});

		callback();
	},
	loadding: function(callback) {
		var that = this;
		setTimeout(function(){
			that.setState({
				data: that.state.data.concat([(<View><Text>asd1</Text></View>)])
			});
			callback();
		}, 3000)
	}
})

module.exports = HomeInfo;