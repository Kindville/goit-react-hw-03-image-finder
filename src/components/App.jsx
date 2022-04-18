import React, { Component } from "react"
import Notiflix from 'notiflix';
// import { ToastContainer } from "react-toastify";
import { Searchbar } from "./Searchbar"
import { ImageGallery } from "./ImageGallery"
import { Button } from "./Button"
import { Modal } from "./Modal";
import { Loader } from "./Loader";
import axios from "axios"
import './styles.css'

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
    modalImg: '',
  }
  
  componentDidUpdate(prevProps, prevState) {
            const { query, page, perPage } = this.state

    if (prevState.query !== query) {

      this.setState({ loading: true })

      const getImages = async (query, page, perPage) => {
        const response = await axios.get(`https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`)
        return response.data
      }

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
    }
      if (prevState.page !== page && page !== 1) {
       this.setState({ loading: true })

      const getImages = async (query, page, perPage) => {
        const response = await axios.get(`https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`)
        return response.data
      }
        getImages(query, page)
          .then(({ hits }) => {
            const imagesList = hits.map(hit => ({
              id: hit.id,
              description: hit.tags,
              smallImage: hit.webformatURL,
              largeImage: hit.largeImageURL,
              loading: false,                            
            }));

            return this.setState(({ images, perPage }) => {
              return {
                images: [...images, ...imagesList],
                perPage: perPage + imagesList.length,
                 loading: false,                            

              };
            });
          })
          .catch(error => this.setState({ error }))
      }
    }
  
  handleFormSubmit = data => {
    this.setState({images:[], query: data, page: data});
  }
  onLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }))
    
  }
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  openModal = largeImage => { 
    this.setState({
      showModal: true,
      modalImg: largeImage,
  });
    }
      
  render() {
    const {
          images,
          perPage,
          totalImages,
          loading, 
          showModal,      
      modalImg,
  } = this.state;
    return (
      <div> 
        <Searchbar
          onSubmit={this.handleFormSubmit }
        />
        {loading && <Loader/>} 
        
        {images && <ImageGallery
          images={images}
          openModal={this.openModal}
        />}
        {perPage >= 12 && perPage < totalImages && !loading &&
          <Button onLoadMore={this.onLoadMore}
          />}
        {showModal && 
         ( <Modal
          onClose={this.toggleModal}>
          <img src={modalImg} alt="largeImage" />

          </Modal>)}
        {/* <Toastdiv/> */}
      </div>
    )
  }
}
