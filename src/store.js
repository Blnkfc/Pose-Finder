import {create} from "zustand"


export const useStore = create((set) => ({
    photoList:[],
    searchList:[],
    addPictureState:{}
}))