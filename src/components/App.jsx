import React, { Component } from "react"
import {Container} from './App.styled'
import { Searchbar } from "./Searchbar"
// import { ImageGallery } from "./ImageGallery"
import axios from "axios"

axios.defaults.baseURL = 'https://pixabay.com/api/'
 const KEY ='25204764-ad3097bdd52dd29ccb650192a'


 const Gallery = ({ images }) => (
  <ul>
    {images.map(({ id, webformatURL }) => (
      <li key={id}>
        <img src={webformatURL} alt=''/>
      </li>
    ))}
  </ul>
 );

export class App extends Component{
  state = {
    images: [],
    loading: false,
  }

  handleSubmit = images => {
    this.setState({images});
  }

 async componentDidMount() {   
   this.setState({ loading: true })
   
       await axios.get(`https://pixabay.com/api/?key=${KEY}&q=cat&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=12`)
        
      .then(images => this.setState({ images }))
      .finally(() => this.setState({ loading: false }))
  }
  render() {
    const { images } = this.state;
    return (
      <Container> 
        <Searchbar
          onSubmit={this.handleSubmit }
        />
       { this.state.loading && <h3>Loading...</h3>}
        {images.length > 0 ? <Gallery images={images} /> : null}
        {/* <ToastContainer autoClose={3000}/> */}
      </Container>
    )
  }
}
