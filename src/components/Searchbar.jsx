import { Component } from "react"
// import { toast } from 'react-toastify'
import { FaSearch } from "react-icons/fa";
import Notiflix from 'notiflix';
import './styles.css'

export class Searchbar extends Component{
    state = {
        images: ''
    }
  handleChange = e => {
    this.setState({images: e.currentTarget.value.toLowerCase() })
    }

  handleSubmit = e => {
    e.preventDefault()
    
    if (this.state.images.trim() === '') {
        Notiflix.Notify.warning("Please, specify your search.");
            return
        }
        this.props.onSubmit(this.state.images)
        this.setState({images: ''})
    }

 render() {     
 return (
    <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit} >
             <button type="submit" className="SearchForm-button">
                 <FaSearch size={14}/>
            <span className="SearchForm-button-label">Search</span>
            </button>

            <input
            className="SearchForm-input"
            type="text"
            value={this.state.images}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            />
    </form>
    </header> 
    
    )
}}