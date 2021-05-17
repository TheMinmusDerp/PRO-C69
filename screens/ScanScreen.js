import * as React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'

export default class ScanScreen extends React.Component {
  constructor(){
    super()
    this.state={
      hasCameraPermissions:null,
      scanned:false,
      scannedData:'',
      buttonState:"normal"
    }
  }
  getCameraPermissions = async (id) =>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    
    this.setState({
      /*status === "granted" is true when user has granted permission
        status === "granted" is false when user has not granted the permission
      */
      hasCameraPermissions: status === "granted",
      buttonState: id,
      scanned: false
    });
  }
  handleBarCodeScanned = async({type, data})=>{
    const {buttonState} = this.state.buttonState

    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal'
    });
  }
  render(){
    return (
      <View style={styles.container}>
        <Image source={require("../assets/BarcodeScanner.jpg")} style={{width:200,height:200}}/>
        <Text style={{textAlign: 'center', fontSize: 30}}>Barcode Scanner</Text>
        <TouchableOpacity onPress={this.getCameraPermissions} style={styles.scanButton} title="Barcode Scanner">
          <Text style={styles.buttonText}>Scan QR Code</Text>
        </TouchableOpacity>
      </View>
    )
  }
}