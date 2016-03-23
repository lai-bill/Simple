'use strict'

var React = require("react-native");
var {
	ScrollView,
	View,
	RefreshControl,
	TouchableOpacity,
	StyleSheet,
	Text
} = React;

var List = React.createClass({
	getInitialState: function() {
		return {
			refreshing: false,
			loadding: false,
			success: false
		}
	},
	render: function() {
		var items = [], info = "", onPress;
		this.props.data.forEach(function(item, index) {
			var css = null;
			if (item.css) {
				css = item.css;
				item = item.view
			}
			items.push((
				<View style={[styles.listItem, css]} key={'listItem' + index}>
					{item}
				</View>
			))
		});

		if (this.props.refresh) {
			var refreshControl = <RefreshControl
						onRefresh={this._onRefresh}
			            refreshing={this.state.refreshing}
			            tintColor="#ff0000"
			            title="Loading..."
			            colors={['#ff0000', '#00ff00', '#0000ff']}
			            progressBackgroundColor="#ffff00" />
		}

		if (this.props.loadding){
			if (items.length === 0 && this.state.success) {
				info = "暂无更多数据";
				onPress = this._onRefresh;
			} else if (items.length === 0 && !this.state.success) {
				info = "加载中……";
			} else if (this.state.success) {
				info = "所有数据已加载完成！";
			} else if (!this.state.loadding) {
				info = "加载更多数据";
				onPress = this._loadding;
			} else {
				info = "加载中……";
			}
			items.push((
				<TouchableOpacity style={styles.listItem} onPress={onPress} key={'listItemOper'}>
					<Text style={{textAlign: 'center'}}>{info}</Text>
				</TouchableOpacity>
			))
			
		}


		return (
			<ScrollView
				style={{height: this.props.height}}
				refreshControl={refreshControl}>
				 {items}
			</ScrollView>
		);
	},
	_onRefresh: function() {
		if (!this.props.refresh) return;
		var that = this;
		that.setState({
			refreshing: true
		});
		that.props.refresh(function(code) {
			that.setState({
				refreshing: false,
				success: false
			})
		});
	},
	_loadding: function() {
		if (!this.props.loadding) return;
		var that = this;

		that.setState({
			loadding: true
		});
		that.props.loadding(function(code) {
			var state = {loadding: false};
			if (code === 500) state.success = true; 
			that.setState(state);
		});
	}
});

var styles = StyleSheet.create({
	listItem: {
		padding: 16,
		borderBottomWidth: 1,
		borderColor: '#DDDDDD'
	}
});

module.exports = List;