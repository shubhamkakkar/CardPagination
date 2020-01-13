import React from 'react'
import { View,Text } from 'react-native'
import {ScrollView} from "react-native-gesture-handler";

export default function Card({title}) {
    return (
        <ScrollView
            style={[{ flex: 1 ,zIndex: 100}]} contentContainerStyle={{flexGrow: 1}}>
            <View  style={[{ flex: 1, borderTopLeftRadius: 50,borderTopRightRadius: 50, backgroundColor: 'yellow'}]}>
               <View style={{flex: 1, marginTop: 20, marginHorizontal: 20}}>
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
               </View>
            </View>
        </ScrollView>
    );
}
