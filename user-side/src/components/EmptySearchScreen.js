export default function EmptySearchScreen(){
    const style = {
        display:'flex',
        flexDirection: 'column',
        alignItems:'center',
        paddingTop : '10%',
        paddingLeft:'10%',
        paddingRight:'10%'
      };
    return(
        <div class="article" style={style}>
            <h3>Oops! Looks like you left the search bar empty !!</h3>
    <p>Search movies by typing the movie title in the search box above.</p>
    <p>Or, check out TMDb users’ <a href="/">Top 10 Rated Movies</a> .</p>
        </div>
    )
}