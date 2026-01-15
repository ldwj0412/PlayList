import React from 'react';
import './Track.css';


class Track extends React.Component{


    constructor(props){
        super(props);
        this.state = { isPreviewing: false };
        this.audioRef = React.createRef();
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.togglePreview = this.togglePreview.bind(this);
        this.handlePreviewEnd = this.handlePreviewEnd.bind(this);
    }


    render(){
        
        const { previewUrl } = this.props.track;
        return (<div className="Track">
                    <div className="Track-information">
                    <h3> {this.props.track.name} </h3>
                    <p>{this.props.track.artist} |  {this.props.track.album} </p>
                    </div>
                    <div className="Track-actions">
                        {this.renderPreviewButton()}
                        {this.renderAction()}
                    </div>
                    {previewUrl ? (
                        <audio
                            ref={this.audioRef}
                            src={previewUrl}
                            onEnded={this.handlePreviewEnd}
                        />
                    ) : null}
                </div>);

    }

    renderAction(){
        
        if(this.props.isRemoval === true){

            return <button className="Track-action" onClick={this.removeTrack}>-</button>;

        }else{

            return <button className="Track-action" onClick={this.addTrack}>+</button>;
        }
    }

    addTrack(){
        this.props.onAdd(this.props.track);
    }

    removeTrack(){
        this.props.onRemove(this.props.track);
    }

    togglePreview(){
        const { previewUrl } = this.props.track;
        if (!previewUrl) {
            return;
        }
        const audio = this.audioRef.current;
        if (!audio) {
            return;
        }

        if (this.state.isPreviewing) {
            audio.pause();
            audio.currentTime = 0;
            this.setState({ isPreviewing: false });
        } else {
            audio.play();
            this.setState({ isPreviewing: true });
        }
    }

    handlePreviewEnd(){
        this.setState({ isPreviewing: false });
    }

    renderPreviewButton(){
        const hasPreview = Boolean(this.props.track.previewUrl);
        const label = this.state.isPreviewing ? 'Pause' : 'Preview';
        return (
            <button
                className="Track-preview"
                onClick={this.togglePreview}
                disabled={!hasPreview}
                aria-label={hasPreview ? `${label} track preview` : 'No preview available'}
            >
                {hasPreview ? label : 'No Preview'}
            </button>
        );
    }
}

export default Track;
