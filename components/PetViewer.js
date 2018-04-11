import React, { Component } from 'react';

    ActivityIndicator
import { Platform, StyleSheet, View, Text, Dimensions, Animated, PanResponder,ActivityIndicator } from 'react-native';

import PetView from './PetView'
import petService from '../services/petfind'
 
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height; 

 
export default class MyApp extends Component
{
  constructor()
  {
    super();

 
 
    this.state = {
       petsArray:[

       ], 
       no_pets: false ,
       loading: true,
     
  
  };
  }
 
  componentDidMount()
  {  //why reverse here?
    // this.setState({ petsArray: this.state.petsArray.reverse() });
    
    if( this.state.petsArray.length == 0 )
    {
      this.setState({ loading: true });
    }
   petService.findMany('90230')
        .then((i)=> { 
        this.setState({
          petsArray:i.petfinder.pets.pet.filter(pet=>pet.media.photos).map(pet=>{
              return  {
                id: pet.id,
                name: pet.name.$t,
                age: pet.age.$t,
                sex: pet.sex.$t,
                city: pet.contact.city.$t,               
                img:pet.media.photos.photo[2]
              }}),
          loading: false
            })})
       
          
  
        .catch(response=>console.log(response))
  
  }
  componentDidUpdate(){
   
  }
 
  removeCardView =(id)=>{
     console.log(this.state.pets)
    this.state.petsArray.splice( this.state.petsArray.findIndex( x => x.id == id ), 1 );
 
    this.setState({ petsArray: this.state.petsArray }, () =>
    {
      if( this.state.petsArray.length == 0 )
      {
        this.setState({ no_pets: true, loading:false});
      }
    });
  }
 
  render()
  {
    return(
      <View style = { styles.MainContainer }>
      {
        this.state.petsArray.map(( item, key ) =>
        (
          <PetView key = { key } item = { item } removeCardView = { this.removeCardView.bind( this, item.id ) }
          screenWidth={SCREEN_WIDTH} screenHeight={SCREEN_HEIGHT}/>
        ))
      }
      {
        ( this.state.no_pets )
        ?
           (

            <Text style = {{ fontSize: 22, color: '#000' }}>No more pets in this area.</Text>

           )
        :
          null
      }
        {
        ( this.state.loading )
        ?
           (

            <ActivityIndicator size="large" color="white"/>

           )
        :
          null
      }
      </View>
    );
  }
}
 
const styles = StyleSheet.create(
{
  MainContainer:
  {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0,
    backgroundColor:'#FCE94F'
  },
 
  
});
