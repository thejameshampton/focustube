import SearchBar from '../SearchBar';

export default async function Watch({searchParams}: {
    searchParams?: { [key: string]: string | string[] | undefined };
  }) {
    const v = searchParams!['v'];
    const videoSRC = `https://www.youtube.com/embed/${v}?rel=0&modestbranding=1&enablejsapi=1&autoplay=1&iv_load_policy=3&nologo=1&showinfo=0`;
    return (
        <div>
            <SearchBar q="" />
            <iframe width="560" height="315" src={videoSRC} title="YouTube video player" frameborder="0" allow="fullscreen; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay" allowfullscreen></iframe>
        </div>
    )
}