import { Component } from 'react';
import './App.css';
import { FaceRecognition } from './components/FaceRecognition/FaceRecognition';
import { ImageLink } from './components/ImageLink/ImageLink';
import { Logo } from './components/Logo/Logo';
import { Navigation } from './components/Navigation/Navigation';
import { Rank } from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ParticlesBg from 'particles-bg'

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    email: '',
    name: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        email: data.email,
        name: data.name,
        entries: data.entries,
        joined: data.joined
      }
    });
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  // https://samples.clarifai.com/metro-north.jpg
  onInputChange = (events) => {
    this.setState({ input: events.target.value });
  }

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input })

    fetch('https://face-recognition-api-w99w.onrender.com/imageAPI', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: this.state.input })
    })
      .then(response => response.json())
      .then(result => {

        fetch('https://face-recognition-api-w99w.onrender.com/image', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: this.state.user.id })
        })
          .then(resp => resp.json())
          .then(entries => {
            this.setState(Object.assign(this.state.user, { entries: entries.entries }));
          })
          .catch(console.log);

        this.displayFaceBox(this.calculateFaceLocation(result));

      })
      .catch(error => console.log('Unable to call Clarify API'));
  }

  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState(initialState);
    }
    else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  }

  render() {
    const { isSignedIn, route, imageUrl, box } = this.state;
    return (
      <div className="App">
        <ParticlesBg className='particles' color='#ffffff' num={200} type='cobweb' bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {
          route === 'home'
            ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLink
                onInputChange={this.onInputChange}
                onPictureSubmit={this.onPictureSubmit}
              />
              <FaceRecognition imageUrl={imageUrl} box={box} />
            </div>
            : (route === 'signin'
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />)
        }
      </div>
    );
  }

}

export default App;
