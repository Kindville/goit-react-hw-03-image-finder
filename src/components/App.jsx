import React, { Component } from "react"
import Notiflix from 'notiflix';
// import { ToastContainer } from "react-toastify";
import {Container} from './App.styled'
import { Searchbar } from "./Searchbar"
import { ImageGallery } from "./ImageGallery"
import { Button } from "./Button"
import { Modal } from "./Modal";
import axios from "axios"

axios.defaults.baseURL = 'https://pixabay.com/api/'
 const KEY ='25204764-ad3097bdd52dd29ccb650192a'

export class App extends Component{
  state = {
    images: '',
    loading: false,
    query: '',
    page: 1,
    perPage: 12,
    totalImages: 0, 
    error: null,   
    showModal: false,
    currentImgUrl: null,
    currentImgDescription: null,
  }
  
    componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {

      this.setState({ loading: true })

      const getImages = async (query, page, perPage) => {
        const response = await axios.get(`https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`)
        return response.data
      }
      const { query, page, perPage } = this.state

      getImages(query, page, perPage)
        .then(({ hits, totalHits }) => {
          const imagesList = hits.map(hit => ({
                id: hit.id,
                description: hit.tags,
                smallImage: hit.webformatURL,
                largeImage: hit.largeImageURL
          }))
          if (totalHits === 0) {
            this.setState({ loading: false })
            Notiflix.Notify.failure(`Sorry, there are no images matching your search => ${query}. Please try again.`)
          } else {
            return this.setState({
              page: 1,
              images: imagesList,
              perPage: imagesList.length,
              loading: false,
              totalImages: totalHits,
            })
          }
        })
      .catch(error => this.setState({error}))
    } }
  
  handleFormSubmit = data => {
    this.setState({images:[], query: data});
  }
  onLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }))
    
  }
    toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  openModal = e => {
   const currentImgUrl = e.target.dataset.large;
    const currentImgDescription = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
        currentImgUrl: currentImgUrl,
        currentImgDescription: currentImgDescription,
      }));
    }
  }
      
  render() {
    const {
          images,
          perPage,
          totalImages,
          loading,  
          showModal,
          openModal,
          currentImgUrl,
          currentImgDescription
      } = this.state;
    return (
      <Container> 
        <Searchbar
          onSubmit={this.handleFormSubmit }
        />
        {loading && <h3>Loading...</h3>}
        
        {images && <ImageGallery
          images={images}
          openModal={openModal}
        />}
        {perPage >= 12 && perPage < totalImages &&
          <Button onLoadMore={this.onLoadMore}
          />}
        {showModal && 
         ( <Modal
            onClose={this.toggleModal}
            currentImgUrl={currentImgUrl}
            currentImgDescription={currentImgDescription}
          />)}
        {/* <ToastContainer/> */}
      </Container>
    )
  }
}
