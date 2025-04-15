 
import { Component } from '@angular/core';
import { PsService } from '../../services/ps-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule, NgFor } from '@angular/common';
 
@Component({
  selector: 'app-ps-form',
  imports: [MatSelectModule,MatSelectModule, MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,FormsModule,NgFor,CommonModule
  ],
  templateUrl: './ps-form.component.html',
  styleUrl: './ps-form.component.css',
  providers : [PsService,provideNativeDateAdapter()]
})
export class PsFormComponent {
 
  loading = false;
  dropownForm! : FormGroup;
  states : any[] = [];
  districts : any[] = [];
  places : any[] = [];
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
 
  parsedInteger : number =0;
  isEditMode : Boolean = false;
 
  constructor(private psService : PsService,
    private route : ActivatedRoute,
    private router : Router,
    private formBuilder : FormBuilder,
  ){}
 
  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
 
      if (id) {
        this.isEditMode = true;
        this.disableI=true;
        console.log(id);
        this.parsedInteger=parseInt(id);
        console.log("After parsing="+this.parsedInteger);
        this.psService.getPSbyId(parseInt(id)).subscribe(
          (res)=>{
            this.ps=res;
            console.log(id);
          }
        )
      }
      else{
        this.disableM=true;
      }
      console.log(this.ps);

 
      this.dropownForm = this.formBuilder.group(
        {
          state : [null],
          district : [null],
          place : [null]
        }
      );
      this.getAllStates();
  }
  private getAllStates(){
    this.loading = true;
    this.psService.getAllStates().subscribe(
      (res : any)=>{this.states=res;
        this.loading=false;
      }
    )
  }
  selectState(state : any){
    if (!state){
      this.dropownForm.controls['district'].setValue('');
      this.dropownForm.controls['place'].setValue('');
      this.districts = [];
      this.places = [];
      return;
    }
 
    this.loading = true;
    const state_cd = parseInt(state);
    this.psService.getDistrictsByStates(state_cd).subscribe(
      (res : any)=>{
        this.districts = res;
        this.loading=false;
        console.log(this.districts);
        }
    )
  }
 
  selectDistrict(district : any){
    if (!district){
      this.dropownForm.controls['place'].setValue('');
      this.districts = [];
      return;
    }
 
    this.loading = true;
    const district_cd = parseInt(district);
    this.psService.getPlacesByDistricts(district_cd).subscribe(
      (res : any)=>{
        this.places = res;
        this.loading=false;
      }
    )
  }
  disableM:boolean=false;
  disableI:boolean=false;
  savePS(){
    if (this.isEditMode) {
      this.ps.modified_dttm = new Date();
      this.disableI=true;
      this.psService.updatePS(this.ps.ps_cd,this.ps).subscribe(
        ()=>this.router.navigate(['/ps-list'])
      );
    } else {
      this.ps.modified_dttm = null;
      this.ps.modified_by = null;
      this.disableM=true;
      this.ps.instantiated_dttm = new Date();
      this.ps.validity_dttm = null;
      this.psService.createPS(this.ps).subscribe(
        ()=>this.router.navigate(['/ps-list'])
      );
    }
  }
 
}