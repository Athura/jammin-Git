import React, { Component } from 'react';
import './App.css';
import {SearchBar} from "../SearchBar/SearchBar";
import {SearchResults} from "../SearchResults/SearchResults";
import {Playlist} from "../Playlist/Playlist";
import {Spotify} from "../util/Spotify";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchResults: [],
            playlistName: '',
            playlistTracks: [],
        };

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    addTrack(track){
        let tracks = this.state.playlistTracks;
        if(!tracks.find(a => a.id === track.id)){
            tracks.push(track);
            this.setState({
                playlistTracks: tracks
            });
        }
    }

    removeTrack(track) {
        const id = this.state.playlistTracks[track];
        const findId = this.state.playlistTracks.filter(track => track.id === id);
        if (findId.length===1) {
            const searchArray = this.state.searchResults;
            const trackIndex = this.state.searchResults.findIndex(track => track.id === id);
            searchArray[trackIndex].added = '';
        } else {
            console.log('Nothing was found, sorry!');
        }
        this.state.playlistTracks.splice(track,1);
        this.setState({ playlistTracks: this.state.playlistTracks });
    }

    updatePlaylistName(name){
        this.setState({
            playlistName: name
        });
    }

    savePlaylist(){
        let tracks = this.state.playlistTracks;
        if(tracks.length && this.state.playlistName){
            let tracksURIs = [];
            for(let i = 0; i <this.state.playlistTracks.length; i++){
                tracksURIs.push(this.state.playlistTracks[i].uri);
            }
            Spotify.savePlaylist(this.state.playlistName, tracksURIs).then( () => {
                this.setState({
                    playlistName: this.state.playlistName,
                    playlistTracks: tracks
                });
            });
        }
    }

    search(term){
        Spotify.search(term).then(results => {
            this.setState({searchResults: results})
        });
    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search}/>
                    <div className="App-playlist">
                        <SearchResults searchResults = {this.state.searchResults}
                                       onAdd = {this.addTrack}
                                       />
                        <Playlist
                            playlistName = {this.state.playlistName}
                            playlistTracks = {this.state.playlistTracks}
                            onRemove={this.removeTrack}
                            onNameChange ={this.updatePlaylistName}
                            onSave ={this.savePlaylist}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;