import { Component } from '@angular/core';
import { PsService } from '../../services/ps-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-ps-form',
  imports: [MatSelectModule,MatSelectModule, MatInputModule,
    MatFormFieldModule,RouterLink,
    MatDatepickerModule
  ],
  templateUrl: './ps-form.component.html',
  styleUrl: './ps-form.component.sass',
  providers : [PsService]
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

  isEditMode : Boolean = false;

  constructor(private psService : PsService,
    private route : ActivatedRoute,
    private router : Router,
    private formBuilder : FormBuilder
  ){}

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('ps_cd');

      if (id) {
        this.isEditMode = true;
        this.psService.getPSbyId(parseInt(id)).subscribe(
          (res)=>{
            this.ps=res;
          }
        )
      }

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
      (res)=>{
        console.log(res);
        this.states = res;
        this.loading = false;
      },
      (Error)=>{
        console.log('Something fishy',Error);
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
      (res)=>{
        this.districts = res;
        this.loading=false;
      },
      (Error)=>{
        console.log('Something wrong',Error);
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
      (res)=>{
        this.districts = res;
        this.loading=false;
      },
      (Error)=>{
        console.log('Something wrong',Error);
      }
    )
  }
  savePS(){
    if (this.isEditMode) {
      this.ps.instantiated_dttm = null;
      this.ps.instantiated_by = null;
      this.ps.modified_dttm = new Date();
      this.psService.updatePS(this.ps.ps_cd,this.ps).subscribe(
        ()=>this.router.navigate(['/ps-list'])
      );
      
    } else {
      this.ps.modified_dttm = null;
      this.ps.modified_by = null;
      this.ps.instantiated_dttm = new Date();
      this.psService.createPS(this.ps).subscribe(
        ()=>this.router.navigate(['/ps-list'])
      );
    }
  }

}
