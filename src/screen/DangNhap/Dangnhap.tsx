import { Alert, Image, Modal, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import COLOR, { BG_COLOR, BUTTON_COLOR, HEIGHT, WIDTH } from '../../utilities';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Realm from 'realm';
import axios from 'axios';
import { UserContext } from '../../provider/Provider';

interface Item {
    id: number;
    name: string;
}
const DangNhap = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [focus, setFocus] = useState<number>(0);
    const [choseSchool, setChoseSchool] = useState<string>('Lựa chọn cơ sở');
    const { login, setUserGoogle } = useContext(UserContext);

    const Item = ({ item }: { item: Item }) => {
        return (
            <Pressable onPress={() => { setFocus(item.id), setChoseSchool(item.name) }} style={{ maxWidth: '100%', borderBottomWidth: 1, alignItems: 'center' }}>
                <Text style={[{ fontSize: 17, fontWeight: '500', color: focus === item.id ? '#ff8800' : '#626262' },]}>{item.name}</Text>
            </Pressable>
        )
    }
    const app = new Realm.App({
        id: "application-0-hzgnr",
    });
    GoogleSignin.configure({
        webClientId: '866351015855-c5ndv8jah0pbh3btmt4rj8dvkdr2jtjs.apps.googleusercontent.com',
    });
    // Handle user state changes
    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        try {
            // Sign into Google
            await GoogleSignin.hasPlayServices();
            const { idToken }: any = await GoogleSignin.signIn();
            const userGoogle = await GoogleSignin.signIn();
            console.log(userGoogle);
            setUserGoogle(userGoogle);
            if (userGoogle.user.email.includes('fpt.edu.vn')) {
                
                // use Google ID token to sign into Realm
                const credential = Realm.Credentials.google({ idToken });
                const user = await app.logIn(credential);
                if (user) {
                    login(userGoogle.user.name, userGoogle.user.email,userGoogle.user.photo);
                }
            } else {
            await GoogleSignin.revokeAccess();
                console.error("Please, use email FPT");
            }

        } catch (error: any) {
            // some other error happened
            await GoogleSignin.revokeAccess();
            console.error("Please, use email FPT", error);
        }
    }
    return (
        <View style={{ backgroundColor: COLOR.white, width: WIDTH, height: HEIGHT, justifyContent: 'center' }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                hardwareAccelerated
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ rowGap: 10 }}>
                            {data.map((item: any) => {
                                return <Item item={item} key={item.id} />
                            }
                            )}
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Xác nhận</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View style={{ position: 'absolute', top: 0, height: HEIGHT / 3, width: WIDTH, backgroundColor: BG_COLOR, borderBottomLeftRadius: 35, borderBottomRightRadius: 35 }}>
            </View>
            <View style={{ alignItems: 'center', backgroundColor: COLOR.white, borderRadius: 20, borderWidth: 0.5, borderColor: '#d7d7d7', width: WIDTH / 1.3, height: HEIGHT / 2, alignSelf: 'center' }}>
                <Image style={{ width: 180, height: 90, marginTop: 30 }} source={require('../../assets/logo.png')} />
                <View style={{ width: '100%', alignItems: 'center', paddingTop: 60, rowGap: 40 }}>
                    <TouchableOpacity style={[{ width: '80%', height: 'auto', paddingVertical: 5, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#d6d6d6', backgroundColor: '#ececec' }, styles.elevation]}
                        onPress={() => setModalVisible(true)}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLOR.gray }}>{choseSchool}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onGoogleButtonPress} style={[{ width: '80%', height: 45, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#d6d6d6', backgroundColor: BUTTON_COLOR }, styles.elevation]}>

                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLOR.white }}>Google</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default DangNhap

const styles = StyleSheet.create({
    elevation: {
        elevation: 5,
        shadowColor: '#202020',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: 250,
        height: 350,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        width: '50%',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        position: 'absolute',
        bottom: 20,

    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#ff8800',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})
const data = [
    {
        id: 1,
        name: 'FPT Polytechnic HO',
    },
    {
        id: 2,
        name: 'FPT Polytechnic Hà Nội',
    },
    {
        id: 3,
        name: 'FPT Polytechnic Hồ Chí Minh',
    },
    {
        id: 4,
        name: 'FPT Polytechnic Đà nẵng',
    },
    {
        id: 5,
        name: 'FPT Polytechnic Cần thơ',
    },
    {
        id: 6,
        name: 'FPT Polytechnic Tây Nguyên',
    },
    {
        id: 7,
        name: 'FPT Polytechnic Hải Phòng',
    }
]