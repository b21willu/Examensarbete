import { Component } from 'inferno';
import './App.css';
import Footer from './components/Footer.js';
import Header from './components/Header.js';
import MainContent from './components/MainContent.js';
import Navigation from './components/Navigation.js';

export default class App extends Component {
  render() {
    return (
      <div>
          <Navigation />
          <Header />
          <MainContent />
          <Footer />
      </div>
    );
  }
}
