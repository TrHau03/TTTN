import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import HienCo from './HienCo';
import DangTiepNhan from './DangTiepNhan';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { WIDTH } from '../../utilities';

const renderScene = SceneMap({
    HienCo: HienCo,
    DangTiepNhan: DangTiepNhan,
});



const DSSuCo = ({ navigation }: NativeStackHeaderProps) => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'HienCo', title: 'Hien Co', navigation: navigation },
        { key: 'DangTiepNhan', title: 'Đang tiếp nhận', navigation: navigation },
    ]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: WIDTH }}
            renderTabBar={(props) => (
                <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: 'white' }}
                    style={{ backgroundColor: '#FFA500', margin: 10, borderRadius: 10 }}
                />
            )}
        />
    )
}

export default DSSuCo

const styles = StyleSheet.create({
    container: {
        color: 'orange',
    }
})