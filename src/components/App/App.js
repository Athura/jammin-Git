import React, { Component } from 'react';
import './App.css';
import {SearchBar} from "../SearchBar/SearchBar";
import {SearchResults} from "../SearchResults/SearchResults";
import {Playlist} from "../Playlist/Playlist";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            "searchResults": [
                {
                name: 'Boozle',
                artist: 'Joshua Johnson',
                album: 'The bamboozle'
                },
                {
                    name: 'Hoozle',
                    artist: 'Micah Muessig',
                    album: 'The Good Stuff'
                }],
            playlistName: "Josh's bangers",
            playlistTracks: [{
                name: 'The coozle',
                artist: 'Steve Gardner',
                album: 'My HITTs'
            }]
        };

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    addTrack(track){
        let tracks = this.state.playlistTracks;
        let x = tracks.find(a => a.name === track.name);
        if(!x){
            tracks.push(track);
            this.setState({
                playlistTrack: track
            });
        }
    }

    removeTrack(track){
        let tracks = this.state.playlistTracks;
        let x = tracks.filter(a => a.name === track.name);
        this.setState({
            playlistTrack: track
        });
    }

    updatePlaylistName(name){
        this.setState({
            playlistName: name
        });
    }

    savePlaylist(){
        let tracks = this.state.playlistTracks;
        if(tracks.length && this.state.playlistName){
            let tracksURIs = tracks.map( x => x.uri);
            this.setState({
                playlistName: 'New Playlist',
                playlistTracks: []
            });
        }
    }

    search(term){
        console.log(`Your new track's name is ${term}`);
    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search}/>
                    <div className="App-playlist">
                        <SearchResults searchResults = {this.state.searchResults}  onAdd = {this.addTrack}/>
                        <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks} onRemove={this.removeTrack} onNameChange ={this.updatePlaylistName} onSave ={this.savePlaylist}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;