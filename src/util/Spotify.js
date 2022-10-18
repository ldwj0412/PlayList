import Cookies from 'js-cookie';

let  accessToken;
const clientID = '946b484a6c524a8ea21f31c770448e5c';
const redirectURI = 'http://localhost:3000/';


const Spotify={

    getAccessToken(){

        accessToken = Cookies.get('accessToken');

        if(accessToken){
            
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expireInMatch = window.location.href.match(/expires_in=([^&]*)/);
       
        if(accessTokenMatch && expireInMatch){
            alert("if called");
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expireInMatch[1]);
                   
            Cookies.set('accessToken', accessToken, {expires: (expiresIn/3600)/24 });
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
          
            window.history.pushState('Access Token', null, '/');
            return accessToken;
            
            
        }else{

            alert("else called");
            const accessURI = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessURI;

            
        }

    },

   search(term){

    const accessToken = Spotify.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(response => {
        return response.json();})
      .then(jsonRep => {

            if(!jsonRep.tracks){
                return [];
            }

            return jsonRep.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));

      }); 
   },

   savePlayList(name,trackUris){

    if(!name|| !trackUris.length){
        return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers ={ Authorization: `Bearer ${accessToken}`};
    let userId;
    

    return fetch('https://api.spotify.com/v1/me', {headers: headers})
           .then(response =>  response.json())
           .then(jsonRep => {
                userId = jsonRep.id;

                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    headers:  headers,
                    method: 'POST',
                    body: JSON.stringify({name: name})
                    
                })
                .then(response =>  response.json())
                .then(jsonRep => {
                    const playlistID = jsonRep.id;

                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({uris: trackUris})
                    })
                    
                })
           })

    

   }



}


export default Spotify;