import { Routes, RouterModule} from '@angular/router';
import { PsListComponent } from './components/ps-list/ps-list.component';
import { PsFormComponent } from './components/ps-form/ps-form.component';
 
export const routes: Routes = [
    {path : '', component : PsListComponent},
    {path : 'ps-list', component : PsListComponent},
    {path : 'ps-form', component : PsFormComponent},
    {path : 'edit-ps-form/:id', component : PsFormComponent},
];