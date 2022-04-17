import { Component } from "react"
// import { toast } from 'react-toastify'
import Notiflix from 'notiflix';
import styles from './styles.css'

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
        Notiflix.Notify.failure("Please, specify your search.");
            return
        }
        this.props.onSubmit(this.state.images)
        this.setState({images: ''})
    }

 render() {     
 return (
    <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit} style={styles.form}>
            <button type="submit" className="button">
            <span className="button-label">Search</span>
            </button>

            <input
            className="input"
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