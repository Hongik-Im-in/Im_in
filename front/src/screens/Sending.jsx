import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import {Text,TouchableOpacity,View,StyleSheet} from 'react-native';
import {TextFormBottom,TextFormTop, TextFormMiddle} from '../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native';
import { login } from '../utils/firebase';
import {ProgressContext,UserContext} from '../contexts';
import {createprof,createstdn,Checkattd} from '../utils/firebase';

const Btn = styled.TouchableOpacity`
    width: 300px;
    height: 65px;
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    background-color: #000000;
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.background};
`;

// 리스트 생성 화면

const Sending = ({navigation}) => {
  const { spinner } = useContext(ProgressContext);
  const [title, setTitle] = useState('선형대수학');
  const snumRef = useRef();
  const gradeRef = useRef();
  const [disabled, setDisabled] = useState(true);
  const {user} = useContext(UserContext);
  const [snum,setSnum] = useState(user.email.substring(0,7));
  const [week,setWeek] = useState('3');
  const [period,setPeriod] = useState('1');

  useEffect(() => { // 타이틀과 총원수가 없으면 creation버튼 비활성화
    setDisabled(!(title && snum && week && period));
}, [title, snum,week,period]);

const _handleCreateButtonPress = async () => {//파이어베이스에 class 생성
  try {
      spinner.start();
      const id = await Checkattd({ title, snum, week,period});
  } catch (e) {
      Alert.alert('Creation Error', e.message);
  } finally {
      spinner.stop();
  }
};
    return (
      <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            extraScrollHeight={20}
        >
        <Container>
            <View style={{flex:0.5}}>
            
            </View>
            <View style={{flex:2.5}}>
            <TextFormMiddle 
              label="subject"
              value={title}
              onChangeText={text => setTitle(text)}
              onSubmitEditing={() => snumRef.current.focus()}
              placeholder="Enter subject"
              returnKeyType="next"
            />
            <TextFormMiddle 
              ref={snumRef}
              label="week"
              value={week}
              onChangeText={text => setWeek(text)}
              onSubmitEditing={() => gradeRef.current.focus()}
              placeholder="Enter subject"
              returnKeyType="next"
            />
            <TextFormMiddle 
              ref={gradeRef}
              label="period"
              value={period}
              onChangeText={text => setPeriod(text)}
              placeholder="Enter subject"
              returnKeyType="done"
            />
            <Text>  </Text>
            <Btn 
              disabled={disabled}
              onPress={_handleCreateButtonPress}
            >
                <Text style={(styles.Text, {color: 'white'})} >creation</Text>
            </Btn>
            </View>
        </Container>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
    },
  
    textFormTop: {
      borderWidth: 2,
      borderBottomWidth: 1,
      borderColor: 'black',
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
      width: 300,
      height: 65,
      paddingLeft: 10,
      paddingRight: 10,
      alignItems: 'center'
    },
    textFormBottom: {
      borderWidth: 2,
      borderTopWidth: 1,
      borderColor: 'black',
      borderBottomRightRadius: 7,
      borderBottomLeftRadius: 7,
      width: 300,
      height: 65,
      paddingLeft: 10,
      paddingRight: 10,
    },
    sign_up: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sign_up_Area: {
        paddingTop:30,
        justifyContent: 'center',
        alignItems: 'center',
    }
  });

export default Sending;