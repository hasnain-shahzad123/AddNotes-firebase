import React, { useEffect, useRef, useState } from 'react'
import Search from './images/search.svg';
import trash from './images/trash3.svg'
import pen from './images/pen.svg'
import { useContext } from 'react';
import firebaseApp, { db } from './firebaseConfig';
import { collection, addDoc, query, where, getDocs,updateDoc,doc,getDoc,deleteDoc } from 'firebase/firestore';
import 'firebase/auth';
import { UserContext } from './context/UserContext';

const AddNotes = () => {

  const {uid} = useContext(UserContext);
  const [todoItem, setToDoItem] = useState([]);
  const [inProgress,setInProgress] = useState([]);
  const [doneList,setDoneList] =  useState([]);
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [loading,setLoading]= useState(true);
  const collectionRef = collection(db, `users/${uid}/notes`)
  const InprogressCollRef = collection(db,`users/${uid}/inprogress`);
  const doneCollection =  collection(db,`users/${uid}/DoneList`)
  useEffect(()=>{
     function fetchNotes(){
      getDocs(collectionRef).then((data)=>{
        setToDoItem(data.docs.map((item)=>{
            return {...item.data(),field_id:item.id,editable:true}
          }))
        
        })
        .catch((err)=>{
          console.log(err);
        })
        console.log("Again reading data from firebase")
        getDocs(InprogressCollRef).then(data=>{
          setInProgress(
            data.docs.map((item)=>{
              return {...item.data(),field_id:item.id,editable:true}
            })
          )
        })
        getDocs(doneCollection).then(data=>{
          setDoneList(
          data.docs.map(item=>{
            return {...item.data(),field_id:item.id,editable:true};
          })
          )
        })
        setLoading(false)
      }


      if(uid){
          fetchNotes();
      }
  },[uid])

  useEffect(()=>{
    
  },[todoItem])
  if(loading){
    return <div>Loading</div>
  }


  function handleOnChange(index, e) {
    const newtodoItem = [...todoItem];
    newtodoItem[index].text = e.target.value;
    setToDoItem(newtodoItem);

  }
  const  newNote= async ()=> {
   
    const docRef =await addDoc(collectionRef,{
          text:"",
      })
      
      setToDoItem([...todoItem, { text: "",editable: true,field_id:docRef.id}]);
  }

  const deleteNote = async (index) => {
    const newArray = [...todoItem];
    const f_id = todoItem[index].field_id;
    newArray.splice(index, 1);
    setToDoItem(newArray);
     // Delete the data in Firebase
    await deleteDoc(doc(db, `users/${uid}/notes`,f_id))
    .then(result=>{
      console.log("Deleted Successfully ");
    }).catch(error=>{
      console.log("Error occured ");
    })
    
}

const DeleteInprogressNote =async (index) =>{
      const newArray = [...inProgress];
      newArray.splice(index,1);
      setInProgress(newArray);
      await deleteDoc(doc(db,`users/${uid}/inprogress`,inProgress[index].field_id));
}



  const EditNote = (index) => {
    const newArray = [...todoItem];
    newArray[index].editable = false;
    setToDoItem(newArray);
  }


  const handleBlur = async (index) => {
    const newArray = [...todoItem];
    newArray[index].editable = true;
    setToDoItem(newArray);
    const newValue = newArray[index].text;
    const noteRef = doc(db, `users/${uid}/notes`,newArray[index].field_id);
    
    async function updateField(docRef, updateData) {
      await updateDoc(docRef, updateData);
    }
    updateField(noteRef, { text: newValue });
  }

  
  function dragStarted(e,position){
    dragItem.current=position;
    console.log(e.target.innerHTML);
  }

  function dragEnter(e,position){
      dragOverItem.current=position;
      console.log(dragOverItem.current);
  }
  
  async function drop(){
    const newArray = [...todoItem];
    const dragItemContent =  newArray[dragItem.current].text;
    newArray.splice(dragItem.current,1);
    setToDoItem(newArray);
    await deleteDoc(doc(db, `users/${uid}/notes`,todoItem[dragItem.current].field_id))
    .then(result=>{
      console.log("Deleted Successfully ");
    }).catch(error=>{
      console.log("Error occured ");
    })
    const docref =await addDoc(InprogressCollRef,{
      text: dragItemContent,
    })
    setInProgress([...inProgress, {text: dragItemContent, field_id: docref.id, editable: true}]);
    // progressArray.splice(dragOverItem.current,0,dragItemContent);
    dragItem.current = null;
    dragItemContent.current=null;
    //handling firebase also for inProgress
  }


    function inProgressdragStarted(e,index){
      //inprogress drag started code 
      dragItem.current = index;
    }

    function inProgressdragEnter(e,index){
      //inprogress drag enter code 
      dragOverItem.current = index;
    }

  async  function inProgressDragdrop(e){
        const newArray = [...inProgress];
        const content  = newArray[dragItem.current].text;
        const delete_id  = newArray[dragItem.current].field_id;
        newArray.splice(dragItem.current,1);
        setInProgress(newArray);
        
        const docref =await  addDoc(doneCollection,{
          text: content,
        })
        setDoneList([...doneList,{text:content,editable:true,field_id:docref.id}]);

        await deleteDoc(doc(db,`users/${uid}/inprogress`,delete_id));
    }

    async function DeleteDoneNotes(index){
      
      const delete_id = doneList[index].field_id;
      const doneArr = [...doneList];
      doneArr.splice(index,1);
      setDoneList(doneArr);
      await deleteDoc(doc(db,`users/${uid}/DoneList`,delete_id));
    }



  return (
    <div className='Functionalities'>
      <div className="LayoutOfNotes">
        <p>Board View</p>
        <div><input type="text" name="" id="" placeholder='Type to search' /></div>
        <button className='searchBtn'><img src={Search} alt="" /></button>
      </div>
      <div className='WriteNotes'>
        <div className="todo">
          <li>to do</li>
          {todoItem.map((item, index) => {
            return <div className='rtText' key={index}>
              <textarea name="" id="" cols="30" rows="10"  onBlur={() => { handleBlur(index) }} disabled={item.editable} placeholder='type your work' draggable={true} value={item.text} onChange={(e) => { handleOnChange(index, e) } } onDragStart={(e)=>{dragStarted(e,index)}} onDragEnter={(e)=>{dragEnter(e,index)} } onDragEnd={drop}></textarea>
              <div className="toolTip">
                <button><img src={trash} alt="" onClick={() => { deleteNote(index) }} /></button>
                <button><img src={pen} alt="" onClick={() => { EditNote(index) }} /></button>
              </div>
            </div>

          })}
          <button className='newNoteBtn' onClick={newNote}>+ New</button>
        </div>
        <div className="progress">
          <li>in progress</li>
          {inProgress.map((item, index) => {
            return <div className='rtText' key={index}>
              <textarea name="" id="" cols="30" rows="10"  onBlur={() => { handleBlur(index) }} disabled={true} placeholder='type your work' draggable={true} value={item.text} onChange={(e) => { handleOnChange(index, e) } } 
              onDragStart={(e)=>{inProgressdragStarted(e,index)}} onDragEnter={(e)=>{inProgressdragEnter(e,index)} } onDragEnd={inProgressDragdrop}></textarea>
              <div className="toolTip">
                <button><img src={trash} alt="" onClick={() => { DeleteInprogressNote(index) }} /></button>
                <button><img src={pen} alt="" onClick={() => { EditNote(index) }} /></button>
              </div>
            </div>
          })}
        </div>
        <div className="done">
          <li>Done</li>
          {doneList.map((item, index) => {
            return <div className='rtText' key={index}>
              <textarea name="" id="" cols="30" rows="10"  onBlur={() => { handleBlur(index) }} disabled={true} placeholder='type your work' draggable={true} value={item.text} onChange={(e) => { handleOnChange(index, e) } }></textarea>
              <div className="toolTip">
                <button><img src={trash} alt="" onClick={() => { DeleteDoneNotes(index) }} /></button>
                <button><img src={pen} alt="" onClick={() => { EditNote(index) }} /></button>
              </div>
            </div>
          })}
        </div>
      </div>
      <h1>yeah</h1>
    </div>
  )
}
export default AddNotes;
