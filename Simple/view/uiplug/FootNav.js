/*
 * FootNav: 底部选项卡
 *	@height: 84
 */
'use strict'
var React = require("react-native");
var {
	View,
	Image,
	Text,
	TouchableOpacity,
	StyleSheet
} = React;


var Item = React.createClass({
	getInitialState: function() {
		return {
			update: 0
		}
	},
	render: function() {
		var imgSrc = this.props.imgSrc;
		var txtStyle = [styles.footItemTxt];
		var currRoute = this.props.navigator.getCurrentRoutes();
		currRoute = currRoute[currRoute.length - 1];

		if (currRoute.name === this.props.name) {
			imgSrc = this.props.imgSrcHover;
			txtStyle.push({color: this.props.curColor});
		}

		return (
			<TouchableOpacity onPress={this.itemClick} style={styles.footItem} clickCount={this.state.update}>
				<Image style={styles.footItemImg} source={imgSrc}/>
				<Text style={txtStyle}>{this.props.content}</Text>
			</TouchableOpacity>
		);
	},
	itemClick: function() {
		this.props.navigator.replace(this.props.route);
		this.setState({
			update: ++this.state.update
		});
	}
})

var FootNav = React.createClass({
	render: function() {
		var items = [];
		var navigator = this.props.navigator;

		this.props.navs.forEach(function(nav) {
			items.push(<Item 
							name={nav.routeName}
							imgSrcHover={nav.imgSrcHover}
							imgSrc={nav.imgSrc} 
							content={nav.content}
							curColor={nav.curColor} 
							route={nav.route} 
							navigator={navigator} />);
		});
		return (
			<View style={styles.footLayout}>{items}</View>
		);
	}
});

var styles = StyleSheet.create({
	footLayout: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		borderTopWidth: 1,
		borderTopColor: '#D8D8D8',
		paddingTop: 5,
		paddingBottom: 5
	},
	footItem: {
		flex: 1,
		alignItems: 'center'
	},
	footItemImg: {
		height: 32,
		width: 32
	},
	footItemTxt: {
		color: '#929292',
		textAlign: 'center',
		fontSize:12
	}
});


module.exports = FootNav;