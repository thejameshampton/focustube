import SearchBar from '../SearchBar';

async function Search({searchParams}: {
    searchParams?: { [key: string]: string | string[] | undefined };
  }) {
    // const searchParams = useSearchParams();
    const q = searchParams!['q'];
    const pageToken = searchParams!['pageToken'];
    const data = await getData(q, pageToken);
    let nextPageHREF = process.env.CURRENT_URL + '/search' + `?q=${q}&pageToken=${data.nextPageToken}`;
    let prevPageHREF = process.env.CURRENT_URL + '/search' + `?q=${q}&pageToken=${data.prevPageToken}`;
    const thumbnails = data.items.map(item => {
        let result;
        let src; 
        let img;
        switch(item.id.kind) {
            case 'youtube#channel':
                src = "https://www.youtube.com/channel/" + item.id.channelId;
                img = item.snippet.thumbnails.default;
                result = (
                    <div>
                        <a href={src}><img src={img.url}/></a>
                    </div>
                )
                break;
            case 'youtube#playlist':
                src = "https://www.youtube.com/playlist?list=" + item.id.playlistId;
                img = item.snippet.thumbnails.default;
                result = (
                    <div>
                        <a href={src}><img height={img.height} width={img.width} src={img.url}/></a>
                    </div>
                )
                break;
                break;
            case 'youtube#video':
                src = process.env.CURRENT_URL + '/watch?v=' + item.id.videoId;
                img = item.snippet.thumbnails.default;
                result = (
                    <div>
                        <a href={src}><img height={img.height} width={img.width} src={img.url}/></a>
                    </div>
                )
                break;
        }
        return result;
    })
    return (
        <div>
            <SearchBar q={q}/>
            {thumbnails}
            {data.prevPageToken ? <a href={prevPageHREF}>Previous</a> : ''}
            {data.nextPageToken ? <a href={nextPageHREF}>Next</a> : ''}
       </div>
    )
}

export async function getData(q, pageToken) {
    let sendString = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${q}&key=${process.env.YOUTUBE_API_KEY}`;
    if(pageToken!) {
        sendString += `&pageToken=${pageToken}`
    }
    const res = await fetch(sendString, {cache: 'no-store'})
    const data = await res.json()
    return data;
  }

export default Search