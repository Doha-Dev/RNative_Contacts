/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, PermissionsAndroid, StyleSheet, View, Text, Image, Button } from 'react-native';
import Contacts from 'react-native-contacts';
 
class App extends Component {
  state = {
    myContacts: []
  }

  async requestContactPermission() {
    if (Platform.OS === 'ios') {
      console.warn('ios')
      return true
    } else {
      console.warn('Android')

      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      ])

      if (
        granted['android.permission.READ_CONTACTS'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.WRITE_CONTACTS'] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        return true
      } else {
        return false
      }
    }
  }

  getContacts = () => {
    this.requestContactPermission()
    .then((didGetPermission)=>{
      if (didGetPermission) {
        Contacts.getAll((err, contacts) => {
          if (err) {
            throw err;
          }
          this.setState({
            myContacts: contacts
          })
        })
      } else {
        alert('No Permission')
      }
    })
  }

  addContacts = () => {
    this.requestContactPermission()
    .then((didGetPermission)=>{
      if (didGetPermission) {

        const newContact = {
          emailAddress: [{
            label: "work",
            email: "aaa@example.com",
          }],
          familyName: "Mid",
          givenName: "teemo",
          phoneNumbers: [{
            label: "mobile",
            number: "(010) 1234-5678",
          }]
        }

        Contacts.addContact(newContact, (err) => {
          if(err) {
            throw err;
          }
          this.getContacts();
        })
      } else {
        alert('No Permission')
      }
    })
  }

  openForm = () => {
    const newContact = {
      emailAddress: [{
        label: "work",
        email: "aaa@example.com",
      }],
      familyName: "Top",
      givenName: "teemo",
      phoneNumbers: [{
        label: "mobile",
        number: "(010) 1234-5678",
      }]
    }

    Contacts.openContactForm(newContact, (err) => {
      if (err) console.warn(err)
    })
  }

  render () {
    return (
      <View style={styles.container}>
        {
          this.state.myContacts.map((item, idx) => (
            <Text key={idx}>
              {item.givenName} {item.familyName}
            </Text>
          ))
        }

        <Button
          title="Load Contacts"
          onPress={ () => this.getContacts()}
        />

        <Button
          title="Add Contacts"
          onPress={ () => this.addContacts()}
        />

        <Button
          title="Open Form"
          onPress={ () => this.openForm()}
        />
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4ab26',
  },
});
 
export default App;
 