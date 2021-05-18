import React from 'react';
import { StyleSheet, View, Text } from 'react-native'

const EditProductScreen = () => {
    return (
        <View><Text>the edit products screen</Text></View>
    );
}

const styles = StyleSheet.create({

});

EditProductScreen.navigationOptions = navigationData => {
    return {
        headerTitle: 'Edit Product'
    }
}

export default EditProductScreen;
