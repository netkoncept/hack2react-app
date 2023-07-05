import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./modules/notifications/notifications.module').then(m => m.NotificationsModule)
  },
  {
    path: 'alerts',
    loadChildren: () => import('./modules/alerts/alerts.module').then(m => m.AlertsModule)
  },
  {
    path: 'localisations',
    loadChildren: () => import('./modules/localisations/localisations.module').then(m => m.LocalisationsModule)
  },
  {
    path: 'configuration',
    loadChildren: () => import('./modules/configuration/configuration.module').then(m => m.ConfigurationModule)
  },
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes,{enableTracing: false})],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
