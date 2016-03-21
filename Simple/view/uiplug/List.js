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
			loadding: false
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
			if (!this.state.loadding) {
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
		that.props.refresh(function() {
			that.setState({
				refreshing: false
			})
		});
	},
	_loadding: function() {
		var that = this;

		that.setState({
			loadding: true
		});
		that.props.loadding(function() {
			that.setState({
				loadding: false
			})
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