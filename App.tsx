/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { BottomTab } from './src/Tab/TabNavigation';
import { DefaultTheme, Provider } from 'react-native-paper';
import DangNhap from './src/screen/DangNhap/Dangnhap';
import { BG_COLOR } from './src/utilities';
import CTYeuCau from './src/screen/TrangChu/CTYeuCau';
function App(): JSX.Element {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [role, setRole] = useState<string>('')
  return (
    <Provider theme={{ version: 2 }}>
      <StatusBar barStyle="light-content" backgroundColor={BG_COLOR} />
      {!isLogin ? <DangNhap /> : isLogin && role == 'ntn' ? <>{(console.log('Dang nhap ntn'))}</> :
        <BottomTab />
      }
    </Provider>
  );
}

const styles = StyleSheet.create({
});

export default App;
