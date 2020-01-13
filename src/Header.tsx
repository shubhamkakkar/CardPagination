import React from 'react'
import {View, Text, StyleSheet} from "react-native"
import Animated from "react-native-reanimated";

export default function Header({customStyle}: {customStyle: any }) {
return(
    <Animated.View style={{ ...customStyle}}>
        <Text>Header</Text>
    </Animated.View>
)
}
