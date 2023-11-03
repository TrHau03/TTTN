import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import { createContext, useState } from "react";

export const UserContext = createContext<any>({});
export const UserProvider = (props: any) => {
    const { children } = props;
    console.log(props);

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [role, setRole] = useState<number>();
    const [idReportRecipient, setIdReportRecipient] = useState<string>('');
    const [userGoogle, setUserGoogle] = useState<Object>();
    const login = (userName: any, email: any, avatar: any) => {
        console.log(avatar);
        axios({
            method: 'post',
            url: 'https://tttn-api-86140b31a001.herokuapp.com/users/login',
            data: {
                userName: userName,
                email: email,
                avatar: avatar,
            },
            responseType: 'json'
        })
            .then(function (response) {
                console.log(response.data);
                setIsLoggedIn(true);
                setRole(response.data.role);
                setIdReportRecipient(response.data.idUser);
                console.log(response.data);

                return response.data;
            });
    }
    const logout = async () => {
        setIsLoggedIn(false);
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();

    }
    const getAllReport = () => axios({
        method: 'get',
        url: `https://tttn-api-86140b31a001.herokuapp.com/users/getAllReport`,
        responseType: 'json'
    })
        .then(function (response) {

            return response.data;
        });
    const getReportByID = () => axios({
        method: 'get',
        url: `https://tttn-api-86140b31a001.herokuapp.com/users/getReportByUser/${idReportRecipient}`,
        responseType: 'json'
    })
        .then(function (response) {

            return response.data;
        });
    const updateStatusReport = (idReport: any) => axios({
        method: 'post',
        url: `https://tttn-api-86140b31a001.herokuapp.com/users/receiveIncidents/${idReportRecipient}/${idReport}`,
        responseType: 'json'
    })
        .then(function (response) {
            return response.data;
        });
    const doneStatusReport = (idReport: any) => axios({
        method: 'post',
        url: `https://tttn-api-86140b31a001.herokuapp.com/users/completionReport/${idReport}`,
        responseType: 'json'
    })
        .then(function (response) {
            return response.data;
        });
    const addReport = ({ inputText, selected, imageURL, description }: any) => {
        console.log("Array URL", imageURL);

        axios({
            method: 'post',
            url: `https://tttn-api-86140b31a001.herokuapp.com/users/addReport`,
            responseType: 'json',
            data: {
                room: inputText,
                reportType: selected,
                image: imageURL,
                description: description,
                annunciator: idReportRecipient,
            },
        })
            .then(function (response) {
                return response;
            });
    }
    const evaluateReport = ({ rating, evaluate, idReport }: any) => {
        console.log(rating, evaluate, idReport);
        
        axios({
            method: 'post',
            url: `https://tttn-api-86140b31a001.herokuapp.com/users/evaluate/${idReport}`,
            responseType: 'json',
            data: {
                start: rating,
                evaluate: evaluate,
            },
        })
            .then(function (response) {
                console.log(response.data);
                
                return response.data;
            });
    }
    return (
        <UserContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, login, logout, userGoogle, setUserGoogle, role, getAllReport,getReportByID, updateStatusReport, doneStatusReport, addReport, evaluateReport }}>
            {children}
        </UserContext.Provider>
    )
}