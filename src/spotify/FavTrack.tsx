const clientId = "85aa4d0b59e64a94a727088a17f91fa3";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
  redirectToAuthCodeFlow(clientId);
} else {
  const accessToken = await getAccessToken(clientId, code);
  const track = await fetchProfile(accessToken);
  populateUI(track);
}

async function redirectToAuthCodeFlow(clientId: string) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", "http://localhost:5173/callback");
  // params.append("scope", "user-read-private user-read-email");
  params.append("scope", "user-top-read");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length: number) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function getAccessToken(clientId: string, code: string) {
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:5173/callback");
  params.append("code_verifier", verifier!);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const { access_token } = await result.json();
  return access_token;
}

async function fetchProfile(token: string): Promise<any> {
  const result = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=1",
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return await result.json();
}

function populateUI(track: any) {
  console.log(track);
  document.getElementById("displayName")!.innerText = track.items[0].name;
  if (track.items[0].album.images[0]) {
    const trackImage = new Image(200, 200);
    trackImage.src = track.items[0].album.images[0].url;
    document.getElementById("img")!.appendChild(trackImage);
  }
  document.getElementById("id")!.innerText = track.items[0].id;
  document.getElementById("artist")!.innerText =
    track.items[0].album.artists[0].name;
  // document.getElementById("uri")!.innerText = profile.uri;
  // document
  //   .getElementById("uri")!
  //   .setAttribute("href", profile.external_urls.spotify);
  // document.getElementById("url")!.innerText = profile.href;
  // document.getElementById("url")!.setAttribute("href", profile.href);
  // document.getElementById("imgUrl")!.innerText =
  //   albums.images[0]?.url ?? "(no albums image)";
}

function FavTracks() {
  return (
    <>
      <h1>Display your Favorite Track in Spotify</h1>
      <section id="track">
        <h2>
          Track's name: <span id="displayName"></span>
        </h2>
        <span id="img"></span>
        <ul>
          <li>
            Artist: <span id="artist"></span>
          </li>
          <li>
            Track ID: <span id="id"></span>
          </li>
          <li>
            Spotify URI: <a id="uri" href="#"></a>
          </li>
          <li>
            Link: <a id="url" href="#"></a>
          </li>
          <li>
            Album's Image: <span id="imgUrl"></span>
          </li>
        </ul>
        <iframe
          style={{ borderRadius: "12px" }} // Converted style string to object
          src="https://open.spotify.com/embed/album/1WVIJaAboRSwJOe4u0n0Q7?utm_source=generator"
          width="75%"
          height="352"
          frameBorder="0" // Use camelCase for `frameBorder`
          allowFullScreen // Boolean attributes in JSX do not need the `=""` syntax
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </section>
    </>
  );
}

export default FavTracks;
