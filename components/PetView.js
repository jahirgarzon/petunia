import React,{Component} from 'react';
import {
    PanResponder,
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    ImageBackground,
    View,
    TouchableOpacity,
}
from 'react-native'
const styles = StyleSheet.create(
    {
 
     
      cardView:
      {
        width: '90%',
        height: '80%',
        position: 'absolute',
        borderRadius:20
        
      },
     
      title:
      {
      
        fontSize:25,
        fontWeight:'bold',
        color:'#FDFFD4',
        fontStyle:'normal',
        paddingBottom:1,
        textShadowColor:'black',
        textShadowOffset:{ width:2,height:2},
        textShadowRadius: 10
      
      },
      subTitle: 
      {
        fontSize:18,
        fontWeight:'bold',
        color:'#FDFFD4',
        fontStyle:'normal',
        paddingBottom:4,
        textShadowColor:'black',
        textShadowOffset:{ width:2,height:2},
        textShadowRadius: 10

      },
     
      Left_Text_Style:
      {
        top: 22,
        right: 32,
        position: 'absolute',
        color: '#FF0001',
        fontSize: 25,
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        borderRadius: 1,
        borderWidth: 2,
        borderColor: '#FF0001',
      },
     
      Right_Text_Style:
      {
        top: 22,
        left: 32,
        position: 'absolute',
        color: '#71FF00',
        fontSize: 25,
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        borderRadius: 1,
        borderWidth: 2,
        borderColor: '#71FF00',
      },
   
 
    img:{
        
        flex:1,
        justifyContent:'flex-end',
   
      
        
    },
   
    });
 
export default class PetView extends Component {
  constructor()
  {
    super();
 
    this.panResponder;
 
    this.state = { 
      
      Xposition: new Animated.Value(0), 

      Yposition: new Animated.Value(0), 
      

      RightText: false,

      LeftText: false, 
    
  }
 
    this.CardView_Opacity = new Animated.Value(1);
  }
 
  componentWillMount()
  {
    this.panResponder = PanResponder.create(
    {
      onStartShouldSetPanResponder: (evt, gestureState) => false,

      onMoveShouldSetPanResponder: (evt, gestureState) => true,
 
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
 
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
 
      onPanResponderMove: (evt, gestureState) =>
      {
        this.state.Xposition.setValue(gestureState.dx);
        this.state.Yposition.setValue(gestureState.dy);
        
 
        if( gestureState.dx > this.props.screenWidth/5 )
        {

          this.setState({ 
            
            RightText: true, 

            LeftText: false 
          });

        }
        else if( gestureState.dx < -this.props.screenWidth/5 )
        {

          this.setState({ 

            LeftText: true, 

            RightText: false 

          });

        }
      },
 
      onPanResponderRelease: (evt, gestureState) =>
      {
        
        if( gestureState.dx < (this.props.screenWidth/3) && gestureState.dx > (-this.props.screenWidth/3) )
        {
          
          this.setState({ 

            LeftText: false,

            RightText: false 
            
          });
          if( gestureState.dy < (this.props.screenHeight/6)|| gestureState.dy > (-this.props.screenHeight/6) )
          {
            
            Animated.parallel(
              [
              Animated.spring( this.state.Yposition,
                {
                  toValue: 0,
                  speed: 5,
                  bounciness: 10,
                }, { useNativeDriver: true }).start(),
                Animated.spring( this.state.Xposition,
                  {
                    toValue: 0,
                    speed: 5,
                    bounciness: 10,
                  }, { useNativeDriver: true }).start()

              
            ])}
            else{
              Animated.spring( this.state.Xposition,
                {
                  toValue: 0,
                  speed: 5,
                  bounciness: 10,
                }, { useNativeDriver: true }).start();
            }
           
 
     
        
        }
     

        else if( gestureState.dx > this.props.screenWidth /4 )
        {

          Animated.parallel(
          [          
            Animated.timing( this.state.Xposition,
            {
              toValue: this.props.screenWidth,
              duration: 200
            }),
 
            Animated.timing( this.CardView_Opacity,
            {
              toValue: 0,
              duration: 200
            })
          ], { useNativeDriver: true }).start(() =>
          {
            this.setState({ LeftText: false, RightText: false }, () =>
            {
              this.props.removeCardView();
            });
          }); 

        }
        else if( gestureState.dx < -(this.props.screenWidth/7)  )
        {
          Animated.parallel(
          [          
            Animated.timing( this.state.Xposition,
            {
              toValue: -this.props.screenWidth,
              duration: 200
            }),
 
            Animated.timing( this.CardView_Opacity,
            {
              toValue: 0,
              duration: 200
            })
          ], { useNativeDriver: true }).start(() =>
          {
            this.setState({ LeftText: false, RightText: false }, () =>
            {
              this.props.removeCardView();
            });
          });          
        }
      }
    });
  }
 
  render()
  {
      
    const rotateCard = this.state.Xposition.interpolate(
    {
       inputRange: [-200, 0, 200],
       outputRange: ['10deg', '0deg', '-10deg'],
    });
    const {name,img,age,sex,city} = this.props.item;
    
    return(

      <Animated.View {...this.panResponder.panHandlers} 
      style = {[ 
        styles.cardView, {  
        opacity: this.CardView_Opacity, 
        transform: [{ translateX: this.state.Xposition }, 
          {translateY:this.state.Yposition},
        { rotate: rotateCard }]}
        ]}>   
     
        <ImageBackground style={styles.img} source={{ uri: img?img.$t:null }} >
        <Text style = { styles.title }> {`${name}  `}<Text style = {styles.subTitle}>{age} {sex==='M'?'male.':'female.'}</Text> </Text>
        <Text style = { styles.subTitle }> { `${city}` } </Text> 
        

        </ImageBackground>
        
        {
          ( this.state.LeftText ) ? (<Text style = { styles.Left_Text_Style }> nope </Text>) : null
        }
        
        {
          ( this.state.RightText ) ? (<Text style = { styles.Right_Text_Style }> yeah!</Text>) : null 
        }
      
      </Animated.View>
    );
  }
}