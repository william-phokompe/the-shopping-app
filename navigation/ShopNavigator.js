import { createAppContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import { Platform } from 'react-native'

import ProductsOverviewScreen from '../components/screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../components/screens/shop/ProductDetailScreen'
import Colors from '../constants/Colors'

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
            
        },
        headerTitleStyle: {
            fontFamily: 'nanum-myeongjo-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'nanum-myeongjo-bold'
        },
        headerTint: Platform.OS === 'android' ? 'white' : Colors.primary
    }
});



export default createAppContainer(ProductsNavigator)