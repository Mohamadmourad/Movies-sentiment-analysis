import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Components/Header';
import arrowUp from '../Images/arrowUp.svg';
import arrowDown from '../Images/arrowDown.svg';

const ScorePage = () => {
    const location = useLocation();
    const { data } = location.state || {};

    const [movie,setMovie] = useState(data);

    const [arrow,setArrow] = useState(arrowDown);

    useEffect(()=>{
     setMovie(data);

     if(movie.reviews.sentiment > 0){
       setArrow(arrowUp);
     }
    },[data]);

    return (
        <section className="ScorePage">
            <Header />
            <aside className='scorepage row p-3'>
                <h2 className='col-12 d-flex justify-content-center'>{movie.title}</h2>
                <div className='row w-100 mt-5'>
                    <div className='d-flex justify-content-center col-12 col-md-3 image'>
                      <img src={movie.poster} alt={movie.title}/>
                    </div>
                    <div className='info col-12 col-md-8 d-flex flex-column'>
                      <ul>
                        <li><h5>Positive Comments: {movie.reviews.positive}</h5></li>
                        <li><h5>Negative Comments: {movie.reviews.negative}</h5></li>
                        <li className='mt-5'><h2>Overall Comments Sentiment: </h2></li>
                        <li className='h4'>
                            {Math.floor((movie.reviews.sentiment)*100)} %
                            <img src={arrow} alt='arrow' className='arrowImg'></img>
                        </li>
                      </ul>
                    </div>
                </div>
            </aside>
        </section>
    );
}
 
export default ScorePage;