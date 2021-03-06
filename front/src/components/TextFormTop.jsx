import React, { useState, forwardRef,useContext } from 'react';
import styled ,{ ThemeContext }from 'styled-components/native';
import PropTypes from 'prop-types';
import {StyleSheet,TextInput} from 'react-native';

//아래쪽이 뭉뚝한 TextInput
const Container = styled.View`
`;
// 각 요소들을 받아 그에 맞는 입력창 렌더링
const TextFormTop = (
    ({
        value,
        onChangeText,
        onSubmitEditing,
        onBlur,
        placeholder,
        isPassword,
        returnKeyType,
        maxLength,
    }) => {
        
    const [isFocused, setIsFocused] = useState(false);
    const theme = useContext(ThemeContext);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
          },
          textFormTop: {
            color:theme.text,
            borderWidth: 2,
            borderBottomWidth: 1,
            borderColor: theme.text,
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
            width: 300,
            height: 65,
            paddingLeft: 10,
            paddingRight: 10,
            alignItems: 'center'
          },
          /*added*/
    
    })
    return (
        <Container>
            <TextInput style={styles.textFormTop}
                isFocused={isFocused}
                value={value}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmitEditing}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                    setIsFocused(false);
                    onBlur();
                }}
                placeholder={placeholder}
                secureTextEntry={isPassword}
                returnKeyType={returnKeyType}
                maxLength={maxLength}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="none" // IOS only
                underlineColorAndroid="transparent" // Android only
            />
        </Container>
    );
});

TextFormTop.defaultProps = {
    onBlur: () => {},
    onChangeText: () => {},
    onSubmitEditing: () => {},
};

TextFormTop.propTypes = {
};



export default TextFormTop;