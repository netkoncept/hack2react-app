export interface MenuModel {
    "id": number,
    "name": string,
    "icon": string,
    "link": string,
}

export interface MenuListModel {
    "data": MenuModel[];
}
