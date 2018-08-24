import React, { Component} from 'react';
import {storage} from '../firebase'
import * as firebase from 'firebase'

class ImageUpload extends Component {
    constructor(props){
        super(props);
        this.state = {
            image: null,
            photoURL: '',
            progress: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this)
    }
    handleChange = e => {
        if(e.target.files[0]){
            const image = e.target.files[0];
            this.setState(() => ({image}));
        }
    }

    handleUpload = () => {
        const {image} = this.state;
        const uploadTask = firebase.storage().ref(`images/${image.name}`).put(image)
        uploadTask.on('state_changed',
         (snapshot) => {
             const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) *100)
             this.setState({progress})
             //progress function
                
        }, (error) => {
             console.log(error)
         }, 
         () => {
             firebase.storage().ref('images').child(image.name).getDownloadURL().then(photoURL => {
                 console.log(photoURL)
                 this.setState({photoURL})
                 firebase.auth().currentUser.updateProfile({ photoURL: photoURL })
                 window.location.reload();
             })
            //complete function
            
        });
        
    }
    render(){
        return(
            <div>
                <progress value={this.state.progress} max='100'/>
                <input type="file" onChange={this.handleChange}/>
                <button onClick={this.handleUpload}>Upload Photo</button>
                {/* <img src={this.state.photoURL || 'https://via.placeholder.com/200x200'} alt="Uploaded images" height="200" width="200" /> */}
            </div>
        )
    }
}

export default ImageUpload;