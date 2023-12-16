import { atom } from 'recoil';

export const optionsAtom = atom<CtxOptions>({
    key: 'options',
    default: {
        lineColor: '#000',
        lineWidth: 5,
    }
})