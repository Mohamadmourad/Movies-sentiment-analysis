import getSentiment from "./getSentiment";

const process = async (setMessage, title) => {
    try {
        const apiKey = "*********";
        const data = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`);
        const response = await data.json();
        
        if(response.Response === 'False'){
            setMessage('Movie not found');
            return 404;
        }

        const movieId = response.imdbID;

        const url = `https://www.imdb.com/title/${movieId}/reviews/?ref_=tt_ov_rt`;

        setMessage('gathering movie data');

        let reviews = await getSentiment(url);

        console.log(reviews);

        if(!reviews || reviews.length === 0){
            setMessage('Movie not found');
            return 404;
        }

        setMessage('Done!');

        return {
            title: response.Title,
            year: response.Year,
            genre: response.Genre,
            director: response.Director,
            poster: response.Poster,
            reviews: reviews
        };
    } catch (err) {
        console.error(err);
        setMessage('Error');
        return null; // Return a value in case of error
    }
};

export default process;
