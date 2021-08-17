import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitCardComponent } from './components/unit-card/unit-card.component';

const routes: Routes = [
  { path: '', redirectTo: 'create', pathMatch: 'full' },
  { path: 'create', component: UnitCardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
