import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal} from 'react-bootstrap';
import {Todo} from '../Models/Todo'

type TodoResponse = 
{
    data: Todo[];
};

export const TodoItem = () => 
{
    const [show, setShow] = useState(false);

    const [id, setId] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemStatus, setItemStatus] = useState('');
    const [editItem, setEditItem] = useState(false);
     
    const [items, setItems] = useState<Todo[]>([]);
    const apiEndPoint = 'http://localhost:8080/api/todos';
    
    useEffect(() => 
    {
        getItems();
    }, []);
    
    const getItems = async () => 
    {
        try
        {
            const todoResult:any = await axios.get<TodoResponse>(apiEndPoint,
                                        {
                                            headers: {
                                                Accept: 'application/json',
                                            },
                                        });
            setItems(todoResult.data);
        }  
        catch(err)
        {
            console.log("Err: ", err);
        }        
    };
     
    
      const addOrUpdateItems = async (e: { preventDefault: () => void; }) => 
      {
        // eslint-disable-next-line no-debugger
        debugger;
        e.preventDefault();
    
        if(editItem === true)
        {
          const post = { 
            id : id,
            TaskName: itemName,
            TaskDescription: itemDescription,
            TaskStatus: itemStatus
          };
          
          try
          {
            await axios.put(apiEndPoint, post);       
          }
          catch(err)
          {        
            console.log("Err: ", err);
          }
    
        }
        else
        {
          const post = { 
            TaskName: itemName,
            TaskDescription: itemDescription,
            TaskStatus: itemStatus
          };
          
          try
          {
            await axios.post(apiEndPoint, post);
          }
          catch(err)
          {       
            console.log("Err: ", err);
          }
        }
    
        handleClose();
        getItems();          
      };
        
      const handleDelete = async (items:Todo) => 
      {
        // eslint-disable-next-line no-debugger
        debugger;
        try
        {
            // const itemDelete = { 
            //     id : items.id
            //   };

            await axios.delete(apiEndPoint,{headers: {}, data: {id : items.id}});
        }
        catch(err)
        {
            console.log("Err: ", err);
        }
        getItems();     
      };
    
      const showModal = async () => 
      {
        setShow(true);
      };
    
      const showEditModal = async (item: Todo) => 
      {    
        // eslint-disable-next-line no-debugger
        debugger;
        setShow(true);
        setEditItem(true);
    
        setId(item.id);
        setItemName(item.TaskName);
        setItemDescription(item.TaskDescription);    
        setItemStatus(item.TaskStatus);
      }
    
      const itemNameOnChange = (event: { target: { value: React.SetStateAction<string>; }; }) => 
      {   
        setItemName(event.target.value);
      };
    
      const itemDescriptionOnChange = (event: { target: { value: React.SetStateAction<string>; }; }) => 
      {
        setItemDescription(event.target.value);
      }; 
    
      const itemStatusOnChange = (event: any) => 
      {
        setItemStatus(event.target.value);
      };
    
    
      const handleClose = () => setShow(false);
    
        return (
            <div className="container">
                <h3> My Todo Items </h3>
    
                <div className="container">
              <div className="row">
                  <div className="col-md-12 bg-light text-left">
                  <button onClick={() => showModal()}  className="btn btn-primary">Add New Item</button>
                  </div>
              </div>
          </div>
    
                <Modal show={show} onHide={() => handleClose()}>
    
                <Modal.Header closeButton>
                    <Modal.Title>Add Todo Items</Modal.Title>
                </Modal.Header>
    
                <Modal.Body>
                  <div className="form-group">
                    <label>Task Name</label>
                    <input value={itemName} onChange={itemNameOnChange} type="text" className="form-control" id="inputItemName" placeholder="Enter Name"/>
                     </div>
                  <div className="form-group">
                    <label>Task Description</label>
                    <input value={itemDescription} onChange={ itemDescriptionOnChange}  type="text" className="form-control" id="inputItemDescription" placeholder="Enter Description"/>
                  </div>
    
                  <div className="form-group">
                <label>Task Status</label>
                <select value={itemStatus} onChange = {itemStatusOnChange}>
                    <option value="">Select Status</option>
                    <option value="Incomplete">Incomplete</option>
                    <option value="Complete">Complete</option>       
                </select>
    
              </div>
                   
                </Modal.Body>
    
                <Modal.Footer>
                    <button onClick={() => handleClose()}>
                        Close
                    </button>
                    <button onClick={addOrUpdateItems}>
                        Submit
                    </button>
                </Modal.Footer>
    
              </Modal>
    
                <Table striped bordered hover>
                  <thead>
                     <th>Task Id</th>
                      <th>Task Name</th>
                      <th>Task Description</th>
                      <th>Task Status</th>        
                      <th>Actions</th>          
                  </thead>
                  <tbody>
                {
                items.map((items,index) => 
                (
                    
                  <tr key={index}>
                    <td> {items.id} </td>
                    <td> {items.TaskName} </td> 
                    <td> {items.TaskDescription} </td>
                    <td> {items.TaskStatus} </td>                    
                    <td>
                      <button
                        onClick={() => showEditModal(items)}
                        className="btn btn-primary" 
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(items)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>               
                  </tr>
                ))}
              </tbody>
              </Table>
          </div>
        );
}