let my_user_token = '6d0d5b6d2a9b405c900e34fed6b5a255';
let url = 'https://accounts.spotify.com/authorize';
let scope = 'playlist-modify-public';
let redirectUri = "http://localhost:3000/";
let accessToken;

export const Spotify = {
    getAccessToken(){
        if(accessToken){
            return accessToken;
        }
        const newAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const newExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if(newAccessToken && newExpiresIn){
            accessToken = newAccessToken[1];
            const expiresIn = Number(newExpiresIn[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessURL = `${url}?client_id=${my_user_token}&response_type=token&scope=${scope}&show_dialog=true&redirect_uri=${redirectUri}`;
            window.location = accessURL;
        }
    },

    async search(term) {
        if(accessToken === undefined) {
            this.getAccessToken();
        }
        try {
            let response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (response.ok) {
                let jsonResponse = await response.json();
                let tracks = jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri,
                    preview: track.preview_url
                }));
                return tracks;
            }
        } catch (error) {
            console.log(error);
        }
    },

    savePlaylist(playlistName, trackURIs){
        if(playlistName && trackURIs){
            const accessToken = Spotify.getAccessToken();
            const headers = {
                Authorization: `Bearer ${accessToken}`
            };
            let userID;
            let playlistID;

            return fetch('https://api.spotify.com/v1/me', {
                headers: headers}).then(response => {
                    if(response.ok){
                        return response.json();
                    }
                    throw new Error('Request failed!');
            }, networkError => {
                    console.log(networkError.message);
            }).then(jsonResponse => {
                userID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
                    {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({name: playlistName})
                    }).then(response => {
                        if(response.ok){
                            return response.json();
                        }
                        throw new Error('Request failed!');
                }, networkError => {
                        console.log(networkError.message);
                }).then(jsonResponse => {
                    playlistID = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
                        {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify({uris: trackURIs})
                        }).then(response => {
                            if(response.ok){
                                return response.json();
                            }
                            throw new Error('Request failed!');
                    }, networkError => {
                            console.log(networkError.message);
                    }).then(jsonResponse => jsonResponse)
                });
            });
        } else {
            return;
        }
    },

};
