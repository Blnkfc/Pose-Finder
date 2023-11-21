/*  INTERFACE FOR ITEM IN state photoList  */
export interface IPhotoUnit{
    id: string;
    url: string;
    name: string;
    selectors: ISearchListUnit[]
}
/*  INTERFACE FOR ITEM IN state searchList  */
export interface ISearchListUnit {
    name: string;
    isActive: boolean;
}