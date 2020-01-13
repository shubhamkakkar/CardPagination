import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {ScrollView} from "react-native-gesture-handler";

export default function Card({containerCustomStyle,children}) {
    return (
        <ScrollView
            style={[{flex: 1, zIndex: 100}]} contentContainerStyle={{flexGrow: 1}}>
            <View style={[{...style.defaultStylingChildContainer, ...containerCustomStyle}]}>
                {children}
            </View>
        </ScrollView>
    );
}


const style = StyleSheet.create({
    defaultStylingChildContainer: {
        flex: 1,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingHorizontal: 20,
        paddingTop: 20,
        zIndex: 2,
        ...StyleSheet.absoluteFill,
        backgroundColor: '#eee'
    },
});
