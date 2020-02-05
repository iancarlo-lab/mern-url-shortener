import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  // Initialize state
  state = { 
    toggleButton: false,
    originalUrl: '',
    newUrl: '',
    shortUrl: ''
   }

  onSubmitUrl = (e) => {
    e.preventDefault()
    // Get the url and store them in state
    const URL = {
      url: this.state.newUrl
    }
    axios.post('/api/shorturl/new/', URL)
      .then(res =>{
         console.log(res.data)
         if(res.data.error){
          console.log("Not added to a data base: " + this.state.newUrl)
          alert("The URL provided doesn't exists");
          return
         }
         this.setState({
           shortUrl: res.data.short_url,
           originalUrl: res.data.original_url,
           newUrl: ''
         })
         alert("URL added succesfully! " + this.state.newUrl);
         //window.location = '/';
        })
      .catch(err =>{
         console.log("Not added to a data base: " + err)
        })
  }

  onChangeInput = (e) => {
    e.preventDefault();
    this.setState({
      newUrl: e.target.value
    });
  }

  onHelpDisplay = () => {
    this.setState({
      toggleButton: true
    })
  }

  hideHelpDisplay = () => {
    this.setState({
      toggleButton: false
    })
  }

  
 displayHelp = () => {
  return(
    <div>
      <ul>
         <li>USAGE: Write inside the input box a webpage like: www.raizen.com  , then click on the shortened url.</li>
        <li>I can POST a URL to [project_url]/api/shorturl/new and I will receive a shortened URL in the JSON response.<code>Example : "original_url":"www.google.com","short_url":1</code></li>
        <li>If I pass an invalid URL that doesn't follow the http(s)://www.example.com(/more/routes) format, the JSON response will contain an error like <code>"error":"invalid URL"</code></li>
        <li>When I visit the shortened URL, it will redirect me to my original link.</li>
      </ul>
      <button onClick={this.hideHelpDisplay} className="button-hide"  >Hide Help</button>
    </div>
  )
}

  

  render() {
    const { newUrl, originalUrl, toggleButton } = this.state;

    return (
      <div className="App">
          <div>
            <h1>API Project: URL Shortener Microservice</h1>
            <h2>Add your desired url (www.yoururl.com): </h2>
            <form onSubmit={this.onSubmitUrl}>
              <input 
              type="text" 
              className="input-box"
              value={this.state.newUrl}
              onChange={this.onChangeInput}></input>
            <button
              className="more"
              onClick={this.onSubmitUrl}>
              Submit
            </button>
            </form>
          </div>
          <div className="displayed-url">
          <h4>Your shortened url:</h4>
          <a href={`http://${originalUrl}`} target="_blank"  rel="noopener noreferrer">{this.state.shortUrl}</a>
          </div>
          <br/>
          {toggleButton ? this.displayHelp() : 
          <div>
             <p>Help?</p>
             <button onClick={this.onHelpDisplay} className="button-help">Help</button>
          </div>}
      </div>

        );
      }
}

export default App;
