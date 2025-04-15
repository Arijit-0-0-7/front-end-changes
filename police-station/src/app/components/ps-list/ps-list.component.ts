import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { PsService } from '../../services/ps-service.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { E } from '@angular/cdk/keycodes';
 
 
@Component({
  selector: 'app-ps-list',
  imports: [RouterLink, MatIconModule, MatButtonModule, MatDividerModule, MatTableModule
    , FormsModule, MatFormFieldModule, MatInputModule,
  ],
  templateUrl: './ps-list.component.html',
  styleUrl: './ps-list.component.css',
  providers: [PsService]
})
export class PsListComponent {
 
  ps: any = {
    ps_cd: 0,
    ps_name: '',
    state_cd: 0,
    district_cd: 0,
    modified_by: '',
    modified_dttm: null,
    instantiated_by: '',
    instantiated_dttm: null,
    validity_dttm: null
  }
  ps1: any;
  isDeleted: Boolean = false;
  psItems: any[] = [];
 
  constructor(private psService: PsService) { }
 
  newDate: Number = new Date().setFullYear(2098, 11, 30);
 
  deletedIds: any[] = [];
  ngOnInit(): void {
    this.psService.getAllPS().subscribe(data => {
      //this.psItems = data;
      this.deletedIds=data;
      for (let index = 0; index < this.deletedIds.length; index++) {
        const element = this.deletedIds[index];
        console.log("fdf");
        if (element.validity_dttm != null) {
          element.disableButton = true;
          element.isDeleted = true;
          console.log("found");
        }
      }
      this.psItems=this.deletedIds;
    });
 
 
  }
  disableButton: boolean = false;
  disablea: boolean = false;
 
  deletedRowRef: any[] = [];
  deletePS(row: any, id: number) {
    row.disableButton = true;
    row.isDeleted = true;
    row.validity_dttm = new Date();
    //this.ps1.push(row);
    /*
    this.psService.getPSbyId(id).subscribe(
      (res)=>{
        this.ps1=res;
      }
    );
    console.log(this.ps1);*/
    let index = 0;
    for (index = 0; index < this.psItems.length; index++) {
      const element = this.psItems[index];
      if (element.ps_cd==id) {
        //element.validity_dttm=new Date();
        //this.disableButton=true;
        //this.deletedIds.push(id);
        //this.deletedRowRef.push(row);
        this.psService.updatePS(id, this.psItems[index]).subscribe(
          () => {
            console.log(this.psItems);
          }
        )
        break;
 
      }
      //console.log(element);
 
    }

 
 
    //this.disablea=true;
    //this.isDeleted = true;
    //this.ps=this.productService.getPSbyId(id);
 
    //console.log(this.psItems);
    //this.ps.validity_dttm=new Date();
    //console.log(this.ps);
 
    //this.psItems.push(this.ps);*/
  }
 
  displayedColumns: string[] = ['ps_cd', 'ps_name',
    'state_cd', 'district_cd', 'place_of_ps', 'modified_by', 'modified_dttm',
    'instantiated_by', 'instantiated_dttm', 'validity_dttm', 'Action'];
  dataSource = new MatTableDataSource(this.psItems);
 
 
}