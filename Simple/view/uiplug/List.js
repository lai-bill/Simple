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
		var items = [];
		this.props.data.forEach(function(item) {
			items.push((
				<View style={styles.listItem}>
					{item}
				</View>
			))
		});

		if (items.length === 0) {
			items.push((
				<TouchableOpacity style={styles.listItem} onPress={this._onRefresh}>
					<Text style={{textAlign: 'center'}}>暂无更多数据</Text>
				</TouchableOpacity>
			))
		} else {
			if (this.state.success) {
				items.push((
				<TouchableOpacity style={styles.listItem}>
					<Text style={{textAlign: 'center'}}>所有数据已加载完成！</Text>
				</TouchableOpacity>
				))
			} else if (!this.state.loadding) {
				items.push((
					<TouchableOpacity style={styles.listItem} onPress={this._loadding}>
						<Text style={{textAlign: 'center'}}>加载更多数据</Text>
					</TouchableOpacity>
				))
			} else {
				items.push((
					<TouchableOpacity style={styles.listItem}>
						<Text style={{textAlign: 'center'}}>加载中……</Text>
					</TouchableOpacity>
				))
			}
		}

		return (
			<ScrollView
				style={{height: this.props.height}}
				refreshControl={
					<RefreshControl
						onRefresh={this._onRefresh}
			            refreshing={this.state.refreshing}
			            tintColor="#ff0000"
			            title="Loading..."
			            colors={['#ff0000', '#00ff00', '#0000ff']}
			            progressBackgroundColor="#ffff00" />
				}>
				 {items}
			</ScrollView>
		);
	},
	_onRefresh: function() {
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