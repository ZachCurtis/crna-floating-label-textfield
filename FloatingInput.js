import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Dimensions } from 'react-native';
import Underline from './underline'
import AnimatedLabel from './animatedLabel'


export default class FloatingInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
            height: props.height,
            text: props.value,
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log(this.state.text.length);
        console.log(nextProps.value);
        if(this.props.text !== nextProps.value){
            nextProps.value.length !== 0 ?
            this.refs.animatedLabel.float()
            : this.refs.animatedLabel.fall();
            this.setState({text: nextProps.value});
        }
    }
    static defaultProps = {
        ...Component.defaultProps,
        value: '',
    }
    focus() {
        this.refs.textInput.focus();
    }

    render(){
        let {
            label,
            labelColor,
            duration,
            underlineColor,
            activeLineColor,
            errorLineColor,
            textColor,
            onFocus,
            onBlur,
            onChangeText,
            height,
            multiline,
            value,
            secureTextEntry,
            returnKeyType,
            ...props
        } = this.props;

        return (
            <View style={styles.container}>
                <TextInput
                    style={[styles.input, {color: textColor}]}
                    retunKeyType={returnKeyType}
                    secureTextEntry={secureTextEntry}
                    onFocus={() => {
                        this.setState({isFocused: true})
                        this.refs.animatedLabel.rise();
                        this.refs.underline.expand();
                        onFocus && onFocus();
                    }}
                    onBlur={() => {
                        this.setState({isFocused: false})
                        !this.state.text.length && this.refs.animatedLabel.fall();
                        this.refs.underline.shrink();
                        onBlur && onBlur();
                    }}
                    onChangeText={(text) => {
                        this.setState({text});
                        onChangeText && onChangeText(text);
                    }}
                    ref="textInput"
                    value={this.state.text}
                    underlineColorAndroid={'transparent'}
                    {...props}
                />
                <Underline 
                    ref="underline"
                    lineColor={underlineColor}
                    duration={duration}
                    activeColor={activeLineColor}
                    errorColor={errorLineColor}
                />
                <AnimatedLabel
                    isFocused={this.state.isFocused}
                    ref="animatedLabel"
                    forceFocus={this.focus.bind(this)}
                    label={label}
                    labelColor={labelColor}
                    activeColor={activeLineColor}
                    duration={duration}
                    hasValue={(this.state.text.length) ? true : false}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        paddingTop: 18,
        backgroundColor: 'transparent',
        alignSelf: 'stretch',

    },
    input: {
        fontSize: 16,
        height: 34,
        lineHeight: 34,
        textAlign: 'left',
        
    }
})
