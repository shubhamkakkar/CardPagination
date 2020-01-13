import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {
    PanGestureHandler,
    State,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {Card, Header} from "./src"

const {height, width} = Dimensions.get('screen');


const {
    event,
    cond,
    eq,
    greaterOrEq,
    defined,
    set,
    interpolate,
    Extrapolate
} = Animated;

const MINHEIGHTFROMTOP = height / 3;
const MAXHEIGHTFROMTOP = 2 * height / 3;


export default class CardDrag extends React.PureComponent {
    constructor() {
        super();
        const maxCardHeight = new Animated.Value(MAXHEIGHTFROMTOP);
        const minCardHeight = new Animated.Value(MINHEIGHTFROMTOP);
        this.translateY = new Animated.Value(MINHEIGHTFROMTOP);
        const dragY = new Animated.Value(0);
        const state = new Animated.Value(-1);
        this.onGestureEvent = event([
            {
                nativeEvent: {
                    absoluteY: dragY,
                    state,
                },
            },
        ]);
        const tempAnimatedValue = new Animated.Value();
        this.translateY = cond(
            eq(state, State.ACTIVE),
            [
                // active
                set(tempAnimatedValue, dragY),
                tempAnimatedValue,
            ],
            [
                //inactive
                set(
                    tempAnimatedValue,
                    cond(
                        defined(tempAnimatedValue),
                        [
                            // defined
                            cond(
                                eq(dragY, new Animated.Value(0)),
                                [maxCardHeight],
                                [
                                    cond(
                                        greaterOrEq(dragY, maxCardHeight),
                                        [
                                            maxCardHeight
                                        ],
                                        [minCardHeight]
                                    ),
                                ]
                            )
                        ],
                        [
                            // not defined
                            minCardHeight,
                        ]
                    )
                ),
                tempAnimatedValue,
            ]
        );
        this.headerInterpolation = interpolate(this.translateY, {
            inputRange: [MINHEIGHTFROMTOP, MAXHEIGHTFROMTOP],
            outputRange: [100, 250],
            extrapolate : Extrapolate.CLAMP
        })

    }

    render() {

        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, alignItems: 'center',}}>
                    <Header customStyle={{transform: [{translateY: this.headerInterpolation}]}}/>
                </View>
                <Animated.View style={{
                    flex: 1,
                    ...StyleSheet.absoluteFill,
                    transform: [{translateY: this.translateY}],
                }}>
                    <Card title={'random text'}/>
                </Animated.View>
                <PanGestureHandler
                    onGestureEvent={this.onGestureEvent}
                    onHandlerStateChange={this.onGestureEvent}>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            right: 25,
                            top: 25,
                            transform: [{translateY: this.translateY}]
                        }}>
                        <View style={{width: 10, height: 50, backgroundColor: 'red'}}/>
                    </Animated.View>
                </PanGestureHandler>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
    },
    pan: {
        width: 50,
        height: 50,
        backgroundColor: 'orange',
        flex: 1
    }
});
