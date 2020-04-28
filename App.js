import React, { Component } from 'react';

import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
// import Splash from './Src/components/Splash';
// import Root from "./Src/Root/RootScreen";



export default class Appmain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idValue: '',
      name: '',
      nasa_jpl_url: '',
      is_potentially_hazardous_asteroid: '',
      disabledButton: true,
      afterSuccesLogin: false
    }
  }


  select(value) {
    this.setState({
      idValue: value
    })
    if (value) {
      this.setState({
        disabledButton: false
      })
    } else {
      this.setState({
        disabledButton: true
      })
    }

  }
  login() {
    let that = this
    let url = 'https://api.nasa.gov/neo/rest/v1/neo/' + this.state.idValue + '?api_key=DcLz3Uela0qhvmE6Z2RM9nTs7UTWA8GtFKrcAzY2'

    axios.get(url)
      .then(function (response) {
        console.log(response);

        if (response.data.is_potentially_hazardous_asteroid) {

          that.setState({
            is_potentially_hazardous_asteroid: 'true'
          })
        } else {
          that.setState({
            is_potentially_hazardous_asteroid: 'false'
          })
        }
        that.setState({
          name: response.data.name,
          nasa_jpl_url: response.data.nasa_jpl_url,
          afterSuccesLogin: true
        })
      })
      .catch(function (error) {
        alert("Please Enter correct Asteroid ID ")
        that.setState({
          idValue: '',
          disabledButton: true
        })
        console.log(error);
      });

  }

  random() {
    // HOJvGXEfD2vhNIqclIP2YCpQdZKvUQrkoBLf8N2U

    let that = this
    let url = 'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DcLz3Uela0qhvmE6Z2RM9nTs7UTWA8GtFKrcAzY2'
    axios.get(url)
      .then(function (response) {
        let data = response.data.near_earth_objects;
        let randomId = data[Math.floor(Math.random() * data.length)];
        that.setState({
          idValue: randomId.id
        })
        that.login()

      })
      .catch(function (error) {
        alert()
        console.log(error);
      });
  }


  render() {

    return (
      <View style={{ padding: 30, marginTop: 40 }}>
        {!this.state.afterSuccesLogin ? <View>
          <TextInput
            style={styles.inputTypeCss}
            onChangeText={(idValue) => this.select(idValue)}
            placeholder='Enter Asteroid ID'
            value={this.state.idValue}
          />
          <View style={styles.marg10}>
            <Button onPress={() => this.login()} title='Submit' disabled={this.state.disabledButton}>

            </Button>
          </View>
          <View style={styles.marg10}>
            <Button onPress={() => this.random()} title='Random Asteroid' ></Button>
          </View>
        </View> :
          <View style={{ padding: 10 }}>
            <View style={styles.marg10}>
              <Text>Name :</Text>
              <Text style={styles.mainLabel}>{this.state.name}</Text>
            </View>
            <View style={styles.marg10}>
              <Text>nasa_jpl_url :</Text>
              <Text style={styles.mainLabel}>{this.state.nasa_jpl_url}</Text>
            </View>
            <View style={styles.marg10}>
              <Text>is_potentially_hazardous_asteroid :</Text>
              <Text style={styles.mainLabel}>{this.state.is_potentially_hazardous_asteroid}</Text>
            </View>

            <Button onPress={() => this.setState({
              idValue: '',
              name: '',
              nasa_jpl_url: '',
              is_potentially_hazardous_asteroid: '',
              disabledButton: true,
              afterSuccesLogin: false
            })} title='Back'>

            </Button>
          </View>}
        {/* </View>} */}
      </View>

    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 10
  },
  inputTypeCss: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5
  },
  marg10: {
    margin: 10
  },
  mainLabel: {
    fontSize: 18,
    fontWeight: 'bold'
  }

});