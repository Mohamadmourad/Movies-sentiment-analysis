import { useNavigate, useParams } from 'react-router-dom';
import AboutUs from '../Components/AboutUs';
import Header from '../Components/Header';
import { useEffect, useRef, useState } from 'react';

const HomePage = () => {
    const navigate = useNavigate();
    const titleRef = useRef(null);

    const [error,setError] = useState('');

    const errorCode = useParams().errCode;

    useEffect(()=>{
        try{
            if(errorCode === '404'){
                setError('Movie not found');
            }
        }
        catch(err){
            console.log(err);
        }
    },[])

    const search = ()=>{
        const title = titleRef.current.value;
        console.log(title);
        navigate(`/loading/${title}`);
    }

    return (
        <div className="Homepage">
            <Header />
            <main className='container d-flex justify-content-center main'>
                <form className='d-flex search'>
                    <input type="text" className='form-control' ref={titleRef}></input>
                    <button className="button btn btn-warning" onClick={()=>{search()}}>Search</button>
                </form>
            </main>
            <h3>{error}</h3>
            <AboutUs />
        </div>
    );
}
 
export default HomePage;