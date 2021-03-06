import React, { Component } from 'react'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import styles from '../styles/Login.module.css'
import logoText from '../images/logo.png'
import logo from '../images/logopic.png'
import ImageUpload from '../components/ImageUpload'
import Favs from '../pages/AdminPage'
import LoginRegister from './LoginRegister'


class Login extends Component {

    state = { 
        isSignedIn: false,
        user: null }

    uiConfig = {
        signedInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
        callbacks: {
            signInSuccess: (auth) => {
                firebase.database().ref('/users/' + auth.uid).transaction(data => {
                    return {
                        name: firebase.auth().currentUser.displayName,
                        created: firebase.auth().currentUser.metadata.creationTime,
                        lastSingIn: firebase.auth().currentUser.metadata.lastSignInTime,
                        profilePicture: firebase.auth().currentUser.profilePicture
                    }
                })
            }
        }
    }

    componentDidMount = () => {

        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isSignedIn: !!user })
            if(user) {
                firebase.database().ref(`users/${user.uid}`).on('value', dataSnapshot => {
                    const user = dataSnapshot.val()
                    this.setState ({
                        user:user
                    })
                })
            }
        })
     
    
    }
    componentWillUnmount() {
        if (this.state.user) {
            firebase.database().ref(`users/${this.state.user.uid}`).off('value')}
    }

    render() {
        return (
            <>
                {this.state.isSignedIn ? (
                    <div className={styles.userProfile}>
                        <div style={{ clear: "both" }}></div>
                            <div className={styles.userContent}>
                                <div className={styles.userInfo}></div>   
                                <ImageUpload />
                            </div>
                            <section style={{width:'100%', marginTop:'20px'}}>
                <div style={{textAlign:'center'}}><h4>Your favorite books</h4></div>
                            <Favs />
                            </section>
                    </div>
                ) : (

                        <div className={styles.loginGrid}>


                            <div className={styles.logoSection} >
                                <div className={styles.logo}> <img src={logo} width="100%" /> </div>
                                <div className={styles.logoText}>  <img src={logoText} width="100%" /> </div>
                            </div>
                            <div className={styles.loginDesc}>
                                
                            </div>

                            <div className={styles.loginBox}>
                                <LoginRegister />
                                <StyledFirebaseAuth
                                    uiConfig={this.uiConfig}
                                    firebaseAuth={firebase.auth()}
                                />
                            </div>
                        </div>
                    )}

            </>
        )
    }
}

export default Login
