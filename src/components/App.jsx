import React, { Component } from "react"

import {Container} from './App.styled'
import { Searchbar } from "./Searchbar"
import { ImageGallery } from "./ImageGallery"
import { Button } from "./Button"
import axios from "axios"

axios.defaults.baseURL = 'https://pixabay.com/api/'
 const KEY ='25204764-ad3097bdd52dd29ccb650192a'


//  const Gallery = ({images}) => (
//   <ul>
//     {images.map(({ id, webformatURL }) => (
//       <li key={id}>
//         <img src={webformatURL} alt=''/>
//       </li>
//     ))}
//   </ul>
//  );

export class App extends Component{
  state = {
    images: '',
    loading: false,
    query: '',
    page: 1,
    perPage: 12,
    totalImages: 0, 
      
  }
  handleFormSubmit = images => {
// console.log(images);
    this.setState({images});
  }
  onLoadMore =() => {
  }
  openModal = () => {
    
  }

  async componentDidMount(query, page, perPage) {   
   this.setState({ loading: true })
    
    const response = await axios.get(`https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`) 
          this.setState({ images: response.data.hits });
        this.setState({ loading: false })
    //  .then(res => res.json())
    //  .then(images => this.setState(images))
    //  .finally(() => this.setState({ loading: false }))
  }
  render() {
    const { images } = this.state;
    return (
      <Container> 
        <Searchbar
          onSubmit={this.handleFormSubmit }
        />
        {this.state.loading && <h3>Loading...</h3>}
        
        {images && <ImageGallery
          images={images}
          // openModal={openModal}
        />}
        <Button onClick={this.onLoadMore} />
      </Container>
    )
  }
}
