import TrangChuNVHC from "../screen/TrangChuNVHC/TrangChuNVHC";


export enum RootStackCaiDatNVHCEnum {
    TrangChuNVHC = 'TrangChuNVHC',
}

export type RootStackParamListCaiDatNVHC = {
    LiTrangChuNVHCenHe: undefined,
}


export const RootStackCaiDatNVHC = () => {
    const Screen: any = [
        { id: 1, name: RootStackCaiDatNVHCEnum.TrangChuNVHC, component: TrangChuNVHC, options: {} },
    ]
    return Screen;
}

export const configStack = ({ props }: any) => {
    return {
        headerShown: false,
    }
}