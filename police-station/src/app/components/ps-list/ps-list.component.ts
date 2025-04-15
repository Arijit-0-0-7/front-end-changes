import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { PsService } from '../../services/ps-service.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-ps-list',
  imports: [RouterLink, MatIconModule, MatButtonModule, MatDividerModule,MatTableModule],
  templateUrl: './ps-list.component.html',
  styleUrl: './ps-list.component.css',
  providers: [PsService]
})
export class PsListComponent {

  psItems : any[] = [];

  constructor(private productService: PsService) { }

  ngOnInit(): void {
    this.productService.getAllPS().subscribe(data => {
      this.psItems = data;
    });
  }
  deleteProduct(id: ) {
    this.productService.deletePS(id).subscribe(() => {
      this.psItems = this.psItems.filter(
        product => product.id !== id);
    });
  }

  displayedColumns: string[] = ['ps_cd', 'ps_name',
     'statecd', 'district cd', 'place_of_ps', 'modified_by','modified_dttm',
    'instantiated_by', 'instantiated_dttm', 'validity_dttm'];
  dataSource = new MatTableDataSource(this.psItems);
  

}
