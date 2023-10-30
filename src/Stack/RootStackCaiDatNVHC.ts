import CaiDatNVHC from "../screen/CaiDatNVHC/CaiDatNVHC";


export enum RootStackCaiDatNVHCEnum {
    CaiDatNVHC = 'CaiDatNVHC'
}

export type RootStackParamListCaiDatNVHC = {
    CaiDatNVHC: undefined,
}


export const RootStackCaiDatNVHC = () => {
    const Screen: any = [
        { id: 1, name: RootStackCaiDatNVHCEnum.CaiDatNVHC, component: CaiDatNVHC, options: {} },
    ]
    return Screen;
}

export const configStack = ({ props }: any) => {
    return {
        headerShown: false,
    }
}