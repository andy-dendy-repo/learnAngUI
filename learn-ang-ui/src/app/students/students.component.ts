import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../models/ui-models/student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[] = []

  displayedColumns: string[] = ['name', 'email', 'dateOfBirth']

  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>()

  @ViewChild(MatPaginator) matPaginator!: MatPaginator

  constructor(private studentService: StudentService) {

  }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(
      {
        error: console.error,
        complete: ()=> console.log('complete'),
        next: (value) => {
          this.students = value;
          this.dataSource = new MatTableDataSource<Student>(this.students);

          if(this.matPaginator) {
            this.dataSource.paginator = this.matPaginator;
          }
        },
      }
    )
  }

}
