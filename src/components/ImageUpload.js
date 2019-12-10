import React, { Component } from 'react';
import firebase, { storage } from '../firebase';
import {watchBooks} from '../services/BookService'
import styles from '../styles/ImageUpload.module.css'

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            url: '',
            progress: 0,
            buttons: true,
            booksList: [],
            favsNumber: "",
        }
        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleUpload = this
            .handleUpload
            .bind(this);
    }

    

    componentDidMount() {
        this.checkIfUserHasProfilePicture()
        const currentUser = firebase.auth().currentUser
        const id = currentUser.uid

        
        const watchUsersFavs = (id) => {        // added for favs number
            return firebase
            .database()
            .ref(`favorites/${id}`)
            .on('value', dataSnapshot => {
              const users = dataSnapshot.val()
              const favs = Object.keys(users).length
              this.setState({favsNumber:favs})
            })
          }
          watchUsersFavs(id)


        watchBooks(booksList => {
            let booksList1 = Object.values(booksList)
            let booksListId = booksList1.map(book=>book.id) // id wszystkich książek
        });


    }

    componentWillUnmount(){
        const stopFavs = () => {
            firebase
              .database()
              .ref("/favorites")
              .off();
          };
          stopFavs();
    }

    handleChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState({ image },
                () => {
                    this.handleUpload()
                    this.setState({ image: null })
                });
        }
    }
    handleUpload = () => {
        const { image } = this.state;
        if (image) {
            const uploadTask = storage.ref(`images/${image.name}`).put(image);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    this.setState({ progress })
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    storage.ref('images').child(image.name).getDownloadURL().then(url => {
                        console.log(url);
                        this.setState({ url })
                        this.updateProfilePicture(url)
                        this.setState({ buttons: false })
                    })
                });
        }
    }
    updateProfilePicture = (url) => {
        const currentUser = firebase.auth().currentUser
        const id = currentUser.uid
        firebase.database().ref(`/users/${id}/profilePicture`).set(url)
    }
    checkIfUserHasProfilePicture = async () => {
        const currentUser = firebase.auth().currentUser
        const id = currentUser.uid
        const dataSnapshot = await firebase.database().ref(`/users/${id}/profilePicture`).once('value')
        const profilePictureUrl = dataSnapshot.val()
        if (profilePictureUrl) {
            this.setState({
                url: profilePictureUrl
            })
        }
    }

    render() {
        //const showProgress = this.state.progress !== 0 && this.state.progress !== 100
        return (
            <>
                <div className={styles.profilPictureEdit}>
                    <div className={styles.profilePicture} >
                        <img src={this.state.url || "https://immedilet-invest.com/wp-content/uploads/2016/01/user-placeholder.jpg"} alt="Profile pic" className={styles.userImg} />
                    </div>
                </div>
                <label for="file" className={styles.inputFileLabel}>Change profile picture</label>
                <div className={styles.loadPicSec} >
                    <div className={styles.uploadButtons}>
                        
                        <input className={styles.inputFileHidden} type="file" onChange={this.handleChange} accept="image/*"  name="file" id="file" />
                    </div>
                    <div className={styles.skill}>
                        <div className={styles.skillBigPink}><p className={styles.skillsSmallsPink}>Favorite genre:</p>
                            <h2 className={styles.nameTitlePink} >{firebase.auth().currentUser.displayName}</h2>
                        </div>
                        <div className={styles.skillBig}><p className={styles.skillsSmallsP}>Username:</p>
                            <h2 className={styles.nameTitleFirst} style={{ color: 'white' }}>{firebase.auth().currentUser.displayName}</h2>
                        </div>
                        <div className={styles.skillBigPink}><p className={styles.skillsSmallsPink}>Favorite books:</p>
        <h2 className={styles.nameTitlePink} >{this.state.favsNumber}</h2>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default ImageUpload;