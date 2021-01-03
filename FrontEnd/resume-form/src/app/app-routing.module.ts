import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindThePersonComponent } from './component/find-the-person/find-the-person.component';
import { FormComponent } from './component/form/form.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { PeopleComponent } from './component/people/people.component';
import { UpdateProfileComponent } from './component/update-profile/update-profile.component';


const routes: Routes = [
  {
    path: "contactus", component: FormComponent
  },
  {
    path: "people", component: PeopleComponent,
  },
  {
    path: "update", component: UpdateProfileComponent,
  },
  {
    path: "find", component: FindThePersonComponent,
  },
  {
    path: "", redirectTo: "contact us", pathMatch: "full"
  },
  {
    path: "**", component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
