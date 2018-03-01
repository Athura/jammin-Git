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
    }

    addTrack(track){
        let tracks = this.state.playlistTracks;
        if(track !== tracks){
            tracks.push(track);
            this.setState(
                {playlistTrack: track}
            );
        }
    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar/>
                    <div className="App-playlist">
                        <SearchResults searchResults = {this.state.searchResults}  onAdd = {this.addTrack}/>
                        <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;