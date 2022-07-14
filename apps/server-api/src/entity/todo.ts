import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm"; 

@Entity() 
export class Todo {  

   @ObjectIdColumn() 
   id: ObjectID; 
   
   @Column() 
   TaskName: string; 
   
   @Column() 
   TaskDescription: string; 

   @Column() 
   TaskStatus: string; 
}