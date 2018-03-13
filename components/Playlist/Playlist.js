import React from 'react';
import './Playlist.css';
import { TrackList } from "../TrackList/TrackList";

export class Playlist extends React.Component{
    constructor(props){
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event){
            this.props.onNameChange(event.target.value);
    }

    render(){
        return(
            <div className="Playlist">
                <input placeholder="Enter a playlist name" defaultValue = {this.props.playlistName} onChange={this.handleNameChange} />
                <TrackList tracks = {this.props.playlistTracks}  onRemove={this.props.onRemove} isRemoval={true}/>
                <a className="Playlist-save"  onClick={this.props.onSave} >SAVE TO SPOTIFY</a>
            </div>
        )
    }
}