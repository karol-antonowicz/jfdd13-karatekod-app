import React from 'react';
import styles from "../styles/AddBooks.module.css"; // imports css styles
import uuid from "uuid";
import {booksList} from '../pages/BooksListPage' // imports booksList from the bookListPage.js
import Popup from '../components/AddPopup'

const initialState = {
    newTitle: "",
    newAutor: "",
    newType: "",
    newImageUrl: "",
    newCondition: "",
}


class AddBooks extends React.Component{ // AddBooks component
    constructor(props){
        super(props)
        this.state = {
            booksList:booksList,
            ...initialState,
            error:{
                newTitle:false,
                newAutor:false,
            }
        }
    }

    addBook = (e) => {   
        e.preventDefault()
        const newBook = {
          id: uuid.v4(),
          title: this.state.newTitle,
          autor: this.state.newAutor,
          type: this.state.newType,
          imageUrl: "http://placekitten.com/140/190",
          condition: this.state.newCondition
    
        }
        if (this.state.newTitle===""){
            this.setState({
                error: {
                    newTitle: this.state.newTitle===""
                }
            })

            console.log(this.state)

            return 
        } else if (this.state.newAutor===""){
            this.setState({
                error:{
                    newAutor:this.state.newAutor===""
                }
            }) 
            return
        } else {
        alert(`You added "${this.state.newTitle}`)
        this.setState({
            booksList:[...this.state.booksList, newBook],
            ...initialState
        })
    }
     };

     handleTitle = newValue =>{
         if (newValue.length>40){
             return
         }
         this.setState({
             newTitle:newValue
         })
     }
     handleAutor = newValue =>{
        if (newValue.length>40){
            return
        }
        this.setState({
            newAutor:newValue
        })
    }
    handleType= newValue =>{
        if (newValue.length>40){
            return
        }
        this.setState({
            newType:newValue
        })
    }
    handleImageUrl = newValue =>{
        
        this.setState({
            newImageUrl:newValue
        })
    }
    handleCondition = newValue =>{
        
        this.setState({
            newCondition:newValue
        })
    }


     componentDidUpdate() {
        localStorage.setItem("bookslist", JSON.stringify(this.state.booksList));    // local storage updates whenever something changes in this component
      }

     render() {
        const { newTitle, newAutor, newType, newImageUrl, newCondition, error} = this.state;

        return (
            <div className={styles.wrap}>
                 <form className={styles.form}>
      <label className={styles.label} >Title:</label>
      <input required className={styles.input} type="text" name="title" placeholder="Insert title name here" value={newTitle} onChange={event => {
        this.handleTitle(event.target.value);
      }} className={error.newTitle ? styles.inputError : styles.input}/>

      <label className={styles.label} >Author:</label>
      <input required className={styles.input} type="text" name="autor" placeholder="Insert author name here" value={newAutor} onChange={event => {
        this.handleAutor(event.target.value);}} className={error.newAutor ? styles.inputError : styles.input}/>

      <label className={styles.label} >Genre:</label>
      <select className={styles.dropdown} type="text" name="type" value={newType} onChange={event => {
        this.handleType(event.target.value);}}  name="genre">
          <option value="fantasy">fantasy</option>
          <option value="drama">drama</option>
          <option value="romance">romance</option>
          <option value="thriller">thriller</option>
          <option value="guide">guide</option>
          <option value="crime">crime</option>
          <option value="biography">biography</option>
          <option value="other">other</option>
          </select>

      <label className={styles.label}>Cover photo:</label>
      <input className={styles.input} type="text" name="imageUrl" placeholder="URL, ex. http://placekitten.com/140/190 " value={newImageUrl} onChange={event => {
        this.handleImageUrl(event.target.value);}} />

      <label className={styles.label}>Condition:</label>
      <select className={styles.dropdown} type="text" name="type" value={newCondition} onChange={event => {
        this.handleType(event.target.value);}}  name="genre">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          </select>
    
    <button className={styles.button} onClick={(e)=>{
                this.addBook(e);
                
                
            }}>
                ADD TO BOOKSWAPP
            </button>   

      </form>
        
            </div>
        )
     }
}





export default AddBooks