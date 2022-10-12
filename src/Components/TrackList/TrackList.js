import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

// import {Track} from '../Track/Track'; --> use this when the Track class is  (export class Track extends React.Component)
// if no curly brace in the import, then Track.js should use ( export default Track);
//both can work


 class TrackList extends React.Component{

    render(){
        
        return (
                <div className="TrackList">
                    {
                        this.props.tracks.map( track => {
                        return <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>
                        })
                    }
                    {/* <p>{this.props?.tracks?.length}</p> */}
                </div>
            )

    }
}

export default TrackList;


