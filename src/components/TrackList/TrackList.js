import React from 'react';
import './TrackList.css';
import { Track } from "../Track/Track";

export const TrackList = ({ tracks }) => (
            <div className="TrackList">
                {
                    tracks.map(track =>
                        <Track key={track.id} track = {track}/>
                    )
                }
            </div>
        );