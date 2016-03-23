var React = require('react-native');
var Dimensions = require('Dimensions');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  TouchableOpacity
} = React;
var CameraDom = require("../uiplug/CameraDom");
var List = require("../uiplug/List")

var About = React.createClass({
   getInitialState: function() {
    return {
      data: [
        null, {
          id: "clickCamera",
          text: "拍照片",
          click: this.jumpPage
        }, {
          id: "checkMap",
          text: "查看地图",
          click: this.jumpPage
        }
      ],
      views: [],
      info: ""
    }
  },
  render: function() {
    return (
      <View>
        <View style={{backgroundColor: '#F5F5F5'}}>
          <List 
            data={this.state.views} 
            height={Dimensions.get('window').height - 66 - 64} />
        </View>
      </View>
    );
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
      <TouchableOpacity onPress={() => item.click(item.id)} key={item.id} style={{flexDirection: 'row'}}>
        <Text style={{color: '#191919'}}>{item.text}</Text>
      </TouchableOpacity>
    ), css: [{backgroundColor: '#ffffff'}]};

  },
  jumpPage: function(id) {
    var componentDOM = null;
    var title = "";
    if (id === "clickCamera") {
      componentDOM = CameraDom;
      title = "修改密码";
    } else {
      alert({info: '暂未开放'});
    }

    this.props.navigator.push({
      title: title,
      component: componentDOM,
      name: id,
      params: {
        navigator: this.props.navigator
      }
    });
  }
});



module.exports = About;