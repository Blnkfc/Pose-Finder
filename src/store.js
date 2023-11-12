import {create} from "zustand"


export const useStore = create((set) => ({
    photoList:[],
    feedLayout:{},
    setPhotoList: (newList) => set({ photoList: newList }),
    searchList:[],
    addPictureState:{},
    authorisation:{},
    fruitMenu:{}
}))