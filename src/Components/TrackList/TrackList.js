import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

// import {Track} from '../Track/Track'; --> use this when the Track class is  (export class Track extends React.Component)
// if no curly brace in the import, then Track.js should use ( export default Track);
//both can work


 class TrackList extends React.Component{

    render(){
        
        return (<div className="TrackList">
                    <Track />
                    <Track />
                    <Track />
                </div>)

    }
}

export default TrackList;