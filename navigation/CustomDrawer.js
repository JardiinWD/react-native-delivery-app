import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { MainLayout } from '../screens'
import { COLORS, FONTS, SIZES, constants, icons, dummyData } from '../constants'
import Animated from "react-native-reanimated";

// Istanza del Drawer
const Drawer = createDrawerNavigator()

const CustomDrawerItem = ({ label, icon }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                height: 40,
                marginBottom: SIZES.base,
                alignItems: 'center',
                paddingLeft: SIZES.radius,
                borderRadius: SIZES.base
                // Background Color
            }}
        >
            <Image
                source={icon}
                style={{
                    width: 20,
                    height: 20,
                    tintColor: COLORS.white
                }}
            />
            <Text
                style={{
                    marginLeft: 15,
                    color: COLORS.white,
                    ...FONTS.h3
                }}
            >
                {label}
            </Text>

        </TouchableOpacity>
    )
}


const CustomDrawerContent = ({ navigation }) => {
    return (
        <DrawerContentScrollView
            scrollEnabled={true}
            contentContainerStyle={{ flex: 1 }}
        >
            <View style={{
                flex: 1,
                paddingHorizontal: SIZES.radius
            }}>
                {/* Close */}
                <View style={{
                    alignItems: 'flex-start',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={() => navigation.closeDrawer()}
                    >
                        <Image
                            source={icons.cross}
                            style={{
                                height: 35,
                                width: 35,
                                tintColor: COLORS.white
                            }}
                        />

                    </TouchableOpacity>
                </View>
                {/* Profile */}
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius,
                        alignItems: 'center'
                    }}
                    onPress={() => console.log("Profile")}
                >
                    {/* Pro Pic */}
                    <Image
                        source={dummyData.myProfile?.profile_image}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: SIZES.radius
                        }}
                    />
                    <View style={{ marginLeft: SIZES.radius }}>
                        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{dummyData.myProfile?.name}</Text>
                        <Text style={{ color: COLORS.white, ...FONTS.body4 }}>View your profile</Text>
                    </View>
                </TouchableOpacity>
                {/* Drawer Items */}
                <View
                    style={{
                        flex: 1,
                        marginTop: SIZES.padding
                    }}
                >
                    {/* TODO: Refactoring con FlatList */}
                    <CustomDrawerItem
                        label={constants.screens.home}
                        icon={icons.home}
                    />
                    <CustomDrawerItem
                        label={constants.screens.my_wallet}
                        icon={icons.wallet}
                    />
                    <CustomDrawerItem
                        label={constants.screens.notification}
                        icon={icons.notification}
                    />
                    <CustomDrawerItem
                        label={constants.screens.favourite}
                        icon={icons.favourite}
                    />
                    {/* Line Divider */}
                    <View
                        style={{
                            height: 1,
                            marginVertical: SIZES.radius,
                            marginLeft: SIZES.radius,
                            backgroundColor: COLORS.lightGray1
                        }}
                    />
                    {/* TODO: Refactoring con FlatList */}
                    <CustomDrawerItem
                        label="Track Your order"
                        icon={icons.location}
                    />
                    <CustomDrawerItem
                        label="Coupons"
                        icon={icons.coupon}
                    />
                    <CustomDrawerItem
                        label="Settings"
                        icon={icons.setting}
                    />
                    <CustomDrawerItem
                        label="Invite a Friend"
                        icon={icons.profile}
                    />
                    <CustomDrawerItem
                        label="Help Center"
                        icon={icons.help}
                    />

                </View>
                {/* Drawer Items */}
                <View
                    style={{
                        marginBottom: SIZES.padding
                    }}
                >
                    <CustomDrawerItem
                        label="Logout"
                        icon={icons.logout}
                    />
                </View>
            </View>
        </DrawerContentScrollView>
    )
}


const CustomDrawer = () => {
    // useState Variables
    const [progress, setProgress] = useState(new Animated.Value(0))

    // serve per scalare lo screen successivo, ovvero MainLayout
    const scale = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [1, 0.8]
    })

    // serve per scalare lo screen successivo, ovvero MainLayout
    const borderRadius = Animated.interpolateNode(progress, {
        inputRange: [0, 1],
        outputRange: [0, 25]
    })

    // style da applicare a MainLayout tramite props
    const animatedStyle = {
        borderRadius,
        transform: [{ scale }]
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.primary
            }}
        >
            {/* Wrappo il Navigator dentro View */}
            <Drawer.Navigator
                drawerType="slide"
                overlayColor="transparent"
                drawerStyle={{
                    flex: 1,
                    width: '70%',
                    paddingRight: 20,
                    backgroundColor: 'transparent'
                }}
                sceneContainerStyle={{
                    backgroundColor: 'transparent'
                }}
                initialRouteName="MainLayout"
                drawerContent={props => {
                    setTimeout(() => {
                        setProgress(props.progress)
                    }, 0)

                    return (
                        <CustomDrawerContent navigation={props.navigation} />
                    )
                }}
            >
                <Drawer.Screen name="MainLayout">
                    {props => <MainLayout {...props} drawerAnimationStyle={animatedStyle} />}
                </Drawer.Screen>
            </Drawer.Navigator>
        </View>
    )
}

export default CustomDrawer
