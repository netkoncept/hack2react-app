export interface ActionBarModel {
    "btnMenu": boolean,
    "btnBack": boolean,
}

export class ActionBarModelCreate {
    static create(event: any) {
        return {
            btnMenu: typeof event.btnMenu !== 'undefined' ? event.btnMenu : false,
            btnBack: typeof event.btnBack !== 'undefined' ? event.btnBack : false,
        };
    }
}

export interface ActionBarParams {
    id: number;
    link: string;
    url?: string;
}
