import React from 'react'
import { Text } from 'react-native'
import {ScrollView} from "react-native-gesture-handler";

export default function Card({title}) {
    return (
        <ScrollView
            style={[{ flex: 1 ,zIndex: 100}]} contentContainerStyle={{flexGrow: 1, zIndex: 100}}>
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
