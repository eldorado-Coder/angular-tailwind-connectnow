import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/video-games/video-games.module').then((m) => m.VideoGamesModule),
    // change to before if session resume is not supported in your app
  },
  {
    path: 'video-games',
    loadChildren: () => import('./features/video-games/video-games.module').then((m) => m.VideoGamesModule),
  },
  {
    path: 'contact',
    loadChildren: () => import('./features/contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: '**',
    redirectTo: 'video-games', // or 404 module
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
