import React, { Component } from 'react';
import { StyleSheet,View, Animated } from 'react-native';


export default class Underline extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lineLength: new Animated.Value(0),
        }
        this.wrapperWidth = 0;
    }

    componentDidMount() {
        requestAnimationFrame(() => {
            const container = this.refs.wrapper;
            container.measure((left, top, width, height) => {
                this.wrapperWidth = width;
            })
        })
    }

    expand() {
        Animated.timing(this.state.lineLength, {
            toValue: this.wrapperWidth,
            duration: this.props.duration
        }).start();
    }
    shrink () {
        Animated.timing(this.state.lineLength, {
            toValue: 0,
            duration: this.props.duration
        }).start();
    }

    render() {
        let{
            lineColor,
            activeColor,
            errorColor,
            error,
        } = this.props;
        return (
            <View ref="wrapper" style={[styles.underlineWrapper,{backgroundColor: lineColor}]}>
                <Animated.View style={[{
                    width: this.state.lineLength,
                    height: 1,
                    backgroundColor: error ? errorColor : activeColor,
                }]}
                >
                </Animated.View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
   underlineWrapper: {
        height: 1,
        alignItems: 'center',
    }
})
