import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { RootBottomTabGiangVien, RootBottomTabNVHC, configTab } from './RootTab';
import COLOR, { BG_COLOR } from '../utilities';
import { useState } from 'react';
const Tab = createMaterialBottomTabNavigator();

export function BottomTab() {
    const [role, setRole] = useState<string>('ntn');

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={"TrangChu"}
                activeColor={COLOR.orange}
                shifting
                barStyle={{ maxHeight: 70, backgroundColor: COLOR.white, borderTopWidth: 0.2 }}
                screenOptions={(route: any) => configTab(route)}
            >
                {role != 'ntn' ? RootBottomTabGiangVien().map((item: any) => {
                    return <Tab.Screen key={item.id} name={item.name} component={item.component} options={item.options} />
                }) :
                    RootBottomTabNVHC().map((item: any) => {
                        return <Tab.Screen key={item.id} name={item.name} component={item.component} options={item.options} />
                    })
                }
            </Tab.Navigator>
        </NavigationContainer>
    );
}