import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputScriptComponent } from './component/input-script/input-script.component';

const routes: Routes = [
  { path: '', component: InputScriptComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
