export interface AlertModel {
    "id": number,
    "title": string,
    "description": string,
    "category_id": number,
    "valid_from": string,
    "valid_to": string,
    "created_at": string,
    "updatet_at": string,
    "category": {
        "id": number,
        "name": string,
        "icon": string,
        "force_notification": number;
    },
    "area": {
        "id": number,
        "alert_id": number,
        "type": number
        "created_at": string,
        "updatet_at": string,
    },
    "coords": CoordModel[];
}

export interface CoordModel {
    "id": number,
    "alert_area_id": number,
    "lat": number,
    "lng": number,
    "teryt_district"?: string,
    "teryt_commune"?: string,
    "teryt_city"?: string,
    "teryt_street"?: string,
    "created_at": string,
    "updated_at": string

}

export interface AlertResponseModel {
    alerts: AlertModel[];
}