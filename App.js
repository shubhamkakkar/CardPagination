import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {
    PanGestureHandler,
    State,
    ScrollView,
} from 'react-native-gesture-handler';
import Animated, {min} from 'react-native-reanimated';

const {height, width} = Dimensions.get('screen');

function Card({title}) {
    return (
        <ScrollView
            style={[styles.flex, {zIndex: 100}]} contentContainerStyle={{flexGrow: 1, zIndex: 100}}>
            <Text>{title}</Text>
            <Text>{title}</Text>
            <Text>{title}</Text>
            <Text>{title}</Text>
            <Text>{title}</Text>
            <Text>{title}</Text>
            <Text>{title}</Text>
            <Text>{title}</Text>
            <Text>{title}</Text>
            <Text>{title}</Text>
            <Text>{title}</Text>
        </ScrollView>
    );
}

const {
    event,
    cond,
    eq,
    greaterOrEq,
    defined,
    set,
    lessOrEq,
    lessThan,
    debug,
    divide,
    sub
} = Animated;

const MINHEIGHTFROMTOP = height / 3;
const MAXHEIGHTFROMTOP = 2 * height / 3;

console.log({MAXHEIGHTFROMTOP, MINHEIGHTFROMTOP})

export default class CardDrag extends React.PureComponent {
    constructor() {
        super();
        const animatedHeight = new Animated.Value(height)
        const maxCardHeight = new Animated.Value(MAXHEIGHTFROMTOP);
        const minCardHeight = new Animated.Value(MINHEIGHTFROMTOP);
        this.translateY = new Animated.Value(MINHEIGHTFROMTOP);
        const dragY = new Animated.Value(0);
        const state = new Animated.Value(-1);
        const wrong = new Animated.Value(0);
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
    }

    state = {
        enable: true
    };

    render() {
        return (
            <View style={{
                flex: 1,
                ...StyleSheet.absoluteFill,
            }}>
                <Animated.View style={{
                    flex: 1, backgroundColor: 'orange',
                    ...StyleSheet.absoluteFill,
                    transform: [{translateY: this.translateY}]
                }}>
                    <Card title={'random text'}/>
                </Animated.View>
                <PanGestureHandler
                    onGestureEvent={this.onGestureEvent}
                    onHandlerStateChange={this.onGestureEvent}>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            transform: [{translateY: this.translateY}]
                        }}>
                        <View style={{width: 50, height: 50, backgroundColor: 'red'}}/>
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
