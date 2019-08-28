import React from 'react';
import { StyleSheet, Text, View, AsyncStorage, Button } from 'react-native';

export default class  App extends React.Component {

  state ={

    item: 'loading'
  }

  async componentDidMount(){

    this.setState({

      item: await AsyncStorage.getItem('mykey')
    })
  }

  // if we are performing any async task, need to use async ketword before method.
  storeData = async () => {
    try {

      // await keyword is used for each and every backgraund task.
      await AsyncStorage.setItem('mykey', 'I like to save it.');

      this.setState({

        item: await AsyncStorage.getItem('mykey')
      })
    } catch (error) {
      console.log(error)
    }

    console.log(this.state)
  }

  deleteData = async () => {
    try {
      AsyncStorage.removeItem('mykey',async () =>{
        console.log('deleted')
        this.setState({
          item: await AsyncStorage.getItem('mykey')
        })

      });
     
    } catch (error) {
      console.log(error)
    }
    
    console.log(this.state)

  }

  render(){

    return (
      <View style={styles.container}>
        <Text style = {{fontSize: 20}}>Hi Asnyc Storage!</Text>
        <Button
        title = 'Add Item'
        onPress = {this.storeData} // not pass {} otherwise it will invoke imidiatly.
        />
        <Button
        title = 'Delete Item'
        onPress = {this.deleteData} // not pass {} otherwise it will invoke imidiatly.
        />
        <Text style = {{fontSize: 20}}>{this.state.item}</Text>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
