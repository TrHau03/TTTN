import TrangChuNVHC from "../screen/TrangChuNVHC/TrangChuNVHC";


export enum RootStackLichSuNVHCEnum {
    TrangChuNVHC = 'TrangChuNVHC',
}

export type RootStackParamListLichSuNVHC = {
    LiTrangChuNVHCenHe: undefined,
}


export const RootStackLichSuNVHC = () => {
    const Screen: any = [
        { id: 1, name: RootStackLichSuNVHCEnum.TrangChuNVHC, component: TrangChuNVHC, options: {} },
    ]
    return Screen;
}

export const configStack = ({ props }: any) => {
    return {
        headerShown: false,
    }
}