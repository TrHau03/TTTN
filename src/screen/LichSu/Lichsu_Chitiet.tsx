import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import COLOR, { HEIGHT, PADDING_HORIZONTAL, PADDING_TOP, WIDTH } from '../../utilities'
import Icon from 'react-native-vector-icons/Ionicons'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamListLichSu } from '../../Stack/RootStackLichSu';
import StepIndicator from 'react-native-step-indicator';

type Props = NativeStackScreenProps<RootStackParamListLichSu>;
interface LichSu {
    item: {
        id: number,
        avatar: any,
        suco: string,
        ten: string,
        thoigian: string,
        sdt: string
    }
}

const renderLabel = (e: any) => {
    console.log(e);
    const time = null;
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, columnGap: 10 }}>
            {e.position == 0 ?
                <Image style={{ width: 50, height: 50 }} source={require('../../assets/Step1.png')} /> :
                e.position == 1 ?
                    <Image style={{ width: 50, height: 50 }} source={require('../../assets/Step2.png')} /> :
                    <Image style={{ width: 50, height: 50 }} source={require('../../assets/Step3.png')} />
            }
            <View style={{ flexDirection: 'column' }}>
                <Text style={{
                    color: '#593E67',
                    fontSize: 18,
                    fontFamily: 'Helvetica Neue',
                    fontWeight: '700',
                }}>{e.label}</Text>
                <Text style={{
                    color: '#DE741C',
                    fontSize: 16,
                    fontFamily: 'Poppins',
                    fontWeight: '400',
                }}>{time ? '10h30' : '--:--'}</Text>
            </View>
        </View>
    )
}
const Lichsu_Chitiet = ({ route, navigation }: Props) => {
    const { item } = route?.params as LichSu;

    const [currentPosition, setcurrentPosition] = useState<number>(3);

    return (
        <View style={{ width: WIDTH, height: HEIGHT, paddingHorizontal: PADDING_HORIZONTAL, paddingTop: PADDING_TOP }}>
            <View style={{ width: '100%', height: 'auto', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <Pressable onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 0 }}>
                    <Icon name='chevron-back' size={26} />
                </Pressable>
                <Text style={{ color: '#593E67', fontSize: 24, fontFamily: 'Helvetica Neue', fontWeight: '700', }}>YÊU CẦU</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', height: HEIGHT / 9, marginTop: 20, columnGap: 15 }}>
                <Image source={item.avatar} style={{ width: 60, height: 60, borderRadius: 50, borderWidth: 0.5, borderColor: COLOR.gray }} />
                <View style={{ flexDirection: 'column', justifyContent: 'center', rowGap: 5 }}>
                    <Text style={{ color: '#804F1E', fontSize: 19, fontFamily: 'Helvetica Neue', fontWeight: '700', letterSpacing: 0.60, }}>{item.suco}</Text>
                    <Text style={{ color: '#5EC401', fontSize: 14, fontFamily: 'Helvetica Neue', fontWeight: '400', textTransform: 'capitalize' }}>{item.ten}</Text>
                    <View style={{ flexDirection: 'row', columnGap: 10 }}>
                        <Text style={styles.textBottom}>{item.thoigian}</Text>
                        <Text style={styles.textBottom}> SĐT: {item.sdt}</Text>
                    </View>
                </View>
            </View>

            <View style={{ width: '100%', height: 300, marginTop: HEIGHT / 15 }}>
                <Text style={{
                    color: '#593E67',
                    fontSize: 18,
                    fontFamily: 'Poppins',
                    fontWeight: '700',
                }}>
                    Trạng thái yêu cầu
                </Text>
                <StepIndicator
                    direction={'vertical'}
                    stepCount={3}
                    customStyles={{ labelAlign: 'flex-start', separatorStrokeWidth: 1, stepIndicatorSize: 20, currentStepIndicatorSize: 20, currentStepStrokeWidth: 0, stepIndicatorCurrentColor: COLOR.orange, stepIndicatorFinishedColor: COLOR.orange, stepIndicatorUnFinishedColor: '#ffcd71', separatorUnFinishedColor: '#ffcd71', separatorFinishedColor: COLOR.orange }}
                    labels={['Yêu cầu', 'Yêu cầu đã được tiếp nhận', 'Yêu cầu đã được hoàn thành']}
                    currentPosition={currentPosition - 1}
                    renderLabel={renderLabel}
                    renderStepIndicator={(e) => e.stepStatus === 'finished' || e.stepStatus === 'current' ? <Icon name='checkmark-sharp' size={16} /> : <></>}
                />
            </View>
            <TouchableOpacity style={{ width: '100%', backgroundColor: currentPosition >= 3 ? COLOR.orange : COLOR.white, position: 'absolute', bottom: HEIGHT * 0.15, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, borderWidth: 1, borderColor: COLOR.orange, borderRadius: 10 }}>
                <Text style={{
                    color: currentPosition >= 3 ? COLOR.white : COLOR.orange,
                    fontSize: 16,
                    fontFamily: 'Poppins',
                    fontWeight: '700',
                }}>{currentPosition >= 3 ? 'Nhận xét' : 'Phản hồi'}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Lichsu_Chitiet

const styles = StyleSheet.create({
    textBottom: {
        color: '#804F1E',
        fontSize: 14,
        fontFamily: 'Helvetica Neue',
        fontWeight: '400',
        textTransform: 'capitalize',
    }
})