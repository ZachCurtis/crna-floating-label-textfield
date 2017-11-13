import React, { Component } from 'react';
import { StyleSheet, Animated } from 'react-native';

export default class AnimatedLabel extends Component {
    constructor(props) {
        super(props);
        this.posTop = 7;
        this.posBottom = 30;
        this.fontLarge = 18;
        this.fontSmall = 12;
        let posTop = (props.hasValue) ? this.PosTop : this.posBottom;
        let fontSize = (props.hasValue) ? this.fontSmall : this.fontLarge;
        this.state = {
            top: new Animated.Value(posTop),
            fontSize: new Animated.Value(fontSize)
        };
    }
    static defaultProps = {
        ...Component.defaultProps,
        hasValue: false,
    }

    rise() {
        Animated.parallel([
            Animated.timing(this.state.top, {
                toValue: this.posTop,
                duration: this.props.duration
            }),
            Animated.timing(this.state.fontSize, {
                toValue: this.fontSmall,
                duration: this.props.duration
            })
        ]).start();
    }
    fall() {
        Animated.parallel([
            Animated.timing(this.state.top, {
                toValue: this.posBottom,
                duration: this.props.duration
            }),
            Animated.timing(this.state.fontSize, {
                toValue: this.fontLarge,
                duration: this.props.duration
            })
        ]).start();
    }

    render (){
        let{
            label,
            labelColor,
            activeColor,
        } = this.props;
        return(      
        <Animated.Text style={[{fontSize: this.state.fontSize,
        top: this.state.top,
        color: labelColor},
        styles.text,
        this.props.isFocused && {
            color: activeColor
        }]}
        onPress={()=>{
            this.props.forceFocus();
        }}>
            {label}
        </Animated.Text>
        
        )
    }
}

const styles = StyleSheet.create({
    text: {
        position: 'absolute',
        left: 0,
    }
})


