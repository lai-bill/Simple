var React = require('react-native');
var Dimensions = require('Dimensions');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} = React;
import Camera from 'react-native-camera';
 
var Test_corm = React.createClass({
  getInitialState: function() {
    return {
      imgUrl: null
    }
  },
  render: function() {
    var imgDOM = null;
    var footDOM = null;
    if (this.state.imgUrl) {
      imgDOM = <Image source={{uri: this.state.imgUrl}} style={styles.imgCameraWidHei} resizeMode='contain' />

      footDOM = <View style={styles.cameraFoot}>
                  <View style={[styles.cancel, {flex: 4}]}>
                    <TouchableOpacity style={{flex: 0}} onPress={() => {this.setState({imgUrl: null});}}>
                      <Text style={styles.cancelTxt}>重拍</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.cancel, {flex: 1}]}>
                    <TouchableOpacity style={{flex: 0}} onPress={this.debugImage}>
                      <Text style={styles.cancelTxt}>使用照片</Text>
                    </TouchableOpacity>
                  </View>
                </View>
    } else {
      imgDOM = <Camera
                ref={(cam) => {
                  this.camera = cam;
                }}
                style={[styles.preview, styles.imgCameraWidHei]}
                captureTarget={Camera.constants.CaptureTarget.cameraRoll}
                orientation={Camera.constants.Orientation.portrait}
                aspect={Camera.constants.Aspect.fill}>
              </Camera>
      footDOM = <View style={styles.cameraFoot}>
                  <View style={styles.mar}>
                    <View style={[styles.cancel, {flexDirection: 'row'}]}>
                      <TouchableOpacity style={{flex: 0}} onPress={() => {this.props.navigator.pop();}}>
                        <Text style={styles.cancelTxt}>取消</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.captureLayout}>
                    <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                      <View></View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.mar}></View>
                </View>
    }
    return (
      <View style={styles.container}>
        {imgDOM}
        {footDOM}
      </View>
    );
  },
  takePicture: function() {
  	 this.camera.capture()
      .then((data) => {
        this.setState({
          imgUrl: data
        })
       })
      .catch(err => alert(err));
  },
  debugImage: function() {
    this.props.success(this.state.imgUrl);
    this.propr.navigator.pop();
  },
});


const styles = StyleSheet.create({
  imgCameraWidHei: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  preview: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff'
  },
  cameraFoot: {
    height: 80, 
    backgroundColor: 'rgba(0,0,0,0.3)',
    flexDirection: 'row',
    paddingTop: 15,   
    paddingBottom: 15,
    position:'absolute',
    left: 0,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    bottom: 0
  },
  capture: {
    backgroundColor: '#fff',
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  captureLayout: {
    backgroundColor: '#000',
    borderWidth:4,
    borderColor: '#fff',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mar: {
    flex: 4,
  },
  cancel: {
    flex: 0,
    marginLeft: 20,
    marginTop: 10,
    flexDirection: 'row'
  },
  cancelTxt: {
    color: '#fff',
    fontSize: 16
  }
});

module.exports = Test_corm;