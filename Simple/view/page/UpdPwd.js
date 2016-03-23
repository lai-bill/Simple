'use strict'
var React = require("react-native");
var {
	View,
	Text,
	TextInput,
	Image
} = React;
var TabBar = require("../uiplug/TabBar");
var Dimensions = require("Dimensions");
var List = require("../uiplug/List");
var Module_Alert = require("../uiplug/Module_Alert");


var UpdPwd = React.createClass({
	getInitialState: function() {
		return {
			data: [null, 
					{
						label: '原密码',
						name: 'used_pwd',
						icon: require("../../public/img/user_used_pwd.png")
					}, {
						label: '新密码',
						name: 'new_pwd',
						icon: require("../../public/img/user_new_pwd.png")
					}, {
						label: '确认密码',
						name: 'quest_new_pwd',
						icon: require("../../public/img/user_new_pwd.png")
					}
				  ],
			views: [],
			vals: {},
			info: "",
			callfn: null
		}
	},
	render: function() {
		return (
			<View>
				<View style={{backgroundColor: '#F5F5F5'}}>
					<TabBar bgColor="#3394FA" 
						navigator={this.props.navigator} 
						rightText={'提交'} 
						rightClick={this.submitUpd} />
					<List 
						data={this.state.views} 
						height={Dimensions.get('window').height - 66}  />
				</View>
				<Module_Alert code={1} textColor={'#3394FA'} info={this.state.info} quitCall={this.state.callfn} />
			</View>
		)
	},
	componentWillMount: function() {
		var views = [];
		var that = this;
		this.state.data.forEach(function(item) {
			views.push(that.packageView(item));
		});

		this.setState({
			views: views
		});
	},
	packageView: function(item) {

		if (!item) 
			return <View style={{height: 5}} />
		
		return {view: (
			<View key={item.id} style={{flexDirection: 'row'}}>
				<View style={{flex: 1, flexDirection: 'row', paddingTop: 6}}>
					<Image source={item.icon} style={{height: 18, width: 18, marginRight: 15}} />
					<Text style={{color: '#191919'}}>{item.label}</Text>
				</View>
				<TextInput 
					style={{flex: 3, borderWidth: 1, borderColor: 'red', height: 40}}
					secureTextEntry={true} 
					selectionColor='#3394FA'
					autoCapitalize={'none'}
					onChangeText={(text) => this.state.vals[item.name] = text}/>
			</View>
		), css: [{backgroundColor: '#ffffff'}]};

	},
	submitUpd: function() {
		var that = this;
		var quest = false;
		if (that.state.vals.new_pwd !== that.state.vals.quest_new_pwd) {
			return that.setState({
				info: "两次密码输入不一致!"
			});
		}

		fetch("https://raw.githubusercontent.com/lai-bill/Simple/master/Simple/data/UserInfo")
			.then((response) => response.text())
			.then((responseText) => {
				var datas = JSON.parse(responseText).content;
				var info = "原密码输入不正确！";
				var callfn = null;
				datas.forEach(function(user) {
					if (user.id == 1 && user.pwd === that.state.vals.used_pwd) 
						quest = true;
				})

				if (quest) {
					info = "密码修改成功";
					callfn = that.backfn
				}

				that.setState({
					info: info,
					callfn: callfn
				});
			});

		this.state.vals.used_pwd
	},
	backfn: function(bool) {
		if (!bool) return;
		this.props.navigator.pop();
	}
})

module.exports = UpdPwd;