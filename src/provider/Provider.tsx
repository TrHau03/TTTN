import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import { createContext, useState } from "react";

export const UserContext = createContext<any>({});
export const UserProvider = (props: any) => {
    const { children } = props;
    console.log(props);

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [role, setRole] = useState<number>();
    const login = (userName: any, email: any) => axios({
        method: 'post',
        url: 'https://tttn-api-86140b31a001.herokuapp.com/users/login',
        data: {
            userName: userName,
            email: email
        },
        responseType: 'json'
    })
        .then(function (response) {
            console.log(response.data);
            setIsLoggedIn(true);
            setRole(response.data.role);
            response.data;
        });
    const logout = async () => {
        setIsLoggedIn(false);
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();

    }
    return (
        <UserContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, login, logout, role }}>
            {children}
        </UserContext.Provider>
    )
}