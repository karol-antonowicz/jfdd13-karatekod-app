import React, { Component } from 'react';
import styles from '../styles/App.module.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';
import Page from './Page';
import SearchBar from './SearchBar';
import SomeButtons from '../components/SomeButtons'
import Secure from '../components/Secure'


function App() {
  return (
    <Secure>
    <Router>
      <div className={styles.app}>
          <Header className={styles.header} />
          
          <main>
            <aside>
              <Navigation className={styles.navigation}/>
            </aside>
              <Page className={styles.page}/>
          </main>
          <Footer className={styles.footer}/>
          <SomeButtons />
      </div>
    </Router>
    </Secure>
  );
}

export default App;
