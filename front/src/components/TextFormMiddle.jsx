import React, { useState, forwardRef,useContext } from 'react';
import styled,{ ThemeContext } from 'styled-components/native';
import PropTypes from 'prop-types';
import {StyleSheet,TextInput} from 'react-native';

// border처리를 하지 않은 기본 TextInput

const Label = styled.Text`
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 6px;
    color: ${({ theme, isFocused }) => (isFocused ? theme.text : theme.label)};
`;

const Container = styled.View`
    flex-direction: column;
    width: 100%;
    margin: 10px 0;
`;
// 각 요소들을 받아 그에 맞는 입력창 렌더링
const TextFormMiddle = forwardRef(
    ({
        label,
        value,
        onChangeText,
        onSubmitEditing,
        onBlur,
        placeholder,
        isPassword,
        returnKeyType,
        maxLength,
        disabled,
    },
    ref
    ) => {
    const [isFocused, setIsFocused] = useState(false);
    const theme = useContext(ThemeContext);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
          },
          textFormMiddle: {
            color:theme.text,
            borderWidth: 2,
            borderTopWidth: 2,
            borderColor: theme.text,
            width: 300,
            height: 65,
            borderBottomRightRadius: 7,
            borderBottomLeftRadius: 7,
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
            paddingLeft: 10,
            paddingRight: 10,
          },
          /*added*/
    
    })
    return (
        <Container>
            
            <Label isFocused={isFocused}>{label}</Label>
            <TextInput style={styles.textFormMiddle}
                ref={ref}
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
                editable={!disabled}
            />
        </Container>
    );
});

TextFormMiddle.defaultProps = {
    onBlur: () => {},
    onChangeText: () => {},
    onSubmitEditing: () => {},
};

TextFormMiddle.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    isPassword: PropTypes.bool,
    returnKeyType: PropTypes.oneOf(['done', 'next']),
    maxLength: PropTypes.number,
    disabled: PropTypes.bool,
};



export default TextFormMiddle;