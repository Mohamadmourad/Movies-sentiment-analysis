import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import process from '../Functions/process';
import { useNavigate, useParams } from 'react-router-dom';

const Loading = () => {
    const [message,setMessage] = useState('Loading...');

    const navigate = useNavigate();

    const title = useParams().title;
    
    useEffect(()=>{
        const loading = async()=>{
          let data = await process(setMessage,title);

          if(data === 404){
            navigate('/homepage/404');
          }
         else if(!data){
            navigate('/');
          }
          else
          navigate('/review', { state: { data } } )
        }
        loading();
    },[]);

    return (
        <div className='Loading'>
            <ReactLoading type={"spinningBubbles"} color={"#FFD369"} height={200} width={200} />
            <h5 className='mt-5'>{message}</h5>
        </div>
    );
}
 
export default Loading;