export default function ErrorPage(){
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
            <h3>Oops! Some error occurred.</h3>
    <p><a href="/">Go to home page</a> .</p>
        </div>
    )
}