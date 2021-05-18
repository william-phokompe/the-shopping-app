import { createAppContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import { Platform } from 'react-native'

import ProductsOverviewScreen from '../components/screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../components/screens/shop/ProductDetailScreen'
import Colors from '../constants/Colors'
import CartScreen from '../components/screens/shop/CartScreen'

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
            
        },
        headerTitleStyle: {
            fontFamily: 'nanum-myeongjo-extrabold'
        },
        headerBackTitleStyle: {
            fontFamily: 'nanum-myeongjo-bold'
        },
        headerTint: Platform.OS === 'android' ? 'white' : Colors.primary
    }
});



export default createAppContainer(ProductsNavigator)