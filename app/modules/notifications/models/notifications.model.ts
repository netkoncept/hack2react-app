import {AlertModel} from "../../alerts/models/alert.model";


export interface NotificationModel {
    "id": number,
    "alert_id": number,
    "device_id": number,
    "created_at": string,
    "updated_at": string

}

export interface NotificationsDataModel {
    notifications: NotificationModel[],
    alerts: AlertModel[]
}
