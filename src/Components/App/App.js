
import React from 'react';
import './App.css';
import  SearchBar  from '../SearchBar/SearchBar';
import  SearchResults  from '../SearchResults/SearchResults';
import  Playlist  from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state= {searchResults:[],
                  playlistName: "New Playlist",
                  playlistTracks: []
                };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist= this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  render(){

    return (<div>
              <h1>Ja<span className="highlight">mmm</span>ing</h1>
              <div className="App">
                <SearchBar onSearch={this.search}/>
                <div className="App-playlist">
                <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/> 
                <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks } onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/> 
                  
                </div>
              </div>
            </div>)
  }

  addTrack(track){

    let tracks = this.state.playlistTracks;
    if(!this.state.playlistTracks.some(element => element.id ===track.id)){

      tracks.push(track);
      this.setState({playlistTracks: tracks});

      //this.setState({playlistTracks: tracks.push(track)});
  }   


    }


   removeTrack(track){
    let tracks = this.state.playlistTracks;

    let filteredtrack = tracks.filter(savedtrack => savedtrack.id !== track.id);
    this.setState({playlistTracks: filteredtrack});


   }

   updatePlaylistName(name){

    this.setState({playlistName: name});
   }

   savePlaylist(){
    
     let trackURIs = this.state.playlistTracks.map(track => track.uri);
     Spotify.savePlayList(this.state.playlistName,trackURIs).then(()=> {

        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: []
        })
     })

   }

   search(term){
      Spotify.search(term).then(searchResults => {
        this.setState({searchResults: searchResults})
      })

     

   }

  }




export default App;
