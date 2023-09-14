import {create} from "zustand"


export const useStore = create((set) => ({
    photoList:[],
    setPhotoList: (newList) => set({ photoList: newList }),
    searchList:[],
    addPictureState:{}
}))