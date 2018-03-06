let my_user_token = '6d0d5b6d2a9b405c900e34fed6b5a255';
let url = 'https://accounts.spotify.com/authorize';
let scope = 'playlist-modify-public';
let redirectUri = 'http://localhost:3000/';

Spotify = {
    getAccessToken(){
        if(my_user_token){
            return my_user_token;
        }

        const newAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const newExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if(newAccessToken && newExpiresIn){
            let accessToken = newAccessToken[1];
            const expiresIn = newExpiresIn[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, 'jammmming');
            return accessToken;
        } else {
            const accessURL = `${url}?client_id=${my_user_token}&response_type=token&scope=${scope}&redirect_uri=${redirectUri}`;
            window.location = accessURL;
        }
    },

    search(term){
        return fetch('https://api.spotify.com/v1/search?type=track&q=' + term, {
            headers: {
                Authorization: `Bearer ${my_user_token}`
            }
        }).then(response => {
            if(response.ok){
                return response.json()
            }
            throw new Error('Request failed!');
        }, networkError => {
            console.log(networkError.message);
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.map(track => ({
                id:track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        })
    }
};


export default Spotify;