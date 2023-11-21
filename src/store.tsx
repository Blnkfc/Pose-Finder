import {create} from "zustand"
import {IPhotoUnit, ISearchListUnit} from "../app/interfaceList";

interface Store {
    photoList: IPhotoUnit[];
    setPhotoList: (newList: IPhotoUnit[]) => void;
    searchList: ISearchListUnit[];
    addPictureState: IPhotoUnit;
}

export const useStore = create((set) => ({
    photoList:[],
    setPhotoList: (newList) => set({ photoList: newList }),
    searchList:[],
    addPictureState:{}
}))