import React from 'react'
import './_Video.scss'
import { AiFillEye } from 'react-icons/ai'
import { useEffect , useState} from 'react'
import  request from '../../api'
import moment from 'moment'
import numeral from 'numeral';
import { useNavigate } from 'react-router-dom'
import ChannelScreen from '../../screen/channelScreen/channelScreen'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const Video = ({ video }) => {

    const { id, snippet: 
        { channelId, 
            channelTitle, 
            title,
             publishedAt, 
             thumbnails: { medium }, }, contentDetails} = video

    const[views,setViews]=useState(null);
    const[duration,setduration]=useState(null);
    const[channelIcon,setChannelIcon]=useState(null);

 
    const _videoId = id?.videoId || contentDetails?.videoId || id


    const seconds=moment.duration(duration).asSeconds()
    const _duration =moment.utc(seconds*1000).format("mm:ss")

    useEffect(() => {
        const get_video_details = async () => {
            const { data: { items } } = await request('/videos', {
                params: {
                    part: 'contentDetails,statistics',
                    id: _videoId,
                }
            },)
            setViews(items[0].statistics.viewCount)
            setduration(items[0].contentDetails.duration)
        }
        get_video_details()
    },[id])

    useEffect(() => {
        const get_channel_icon= async () => {
            const { data: { items } } = await request('/channels', {
                params: {
                    part: 'snippet',
                    id: channelId,
                }
            },)
            setChannelIcon(items[0].snippet.thumbnails.default)
        }
        get_channel_icon()
    },[channelId])
const navigate=useNavigate();

const handleVideoClick=()=>{
navigate(`/watch/${_videoId}`);
}

    return (
        <div className='video' onClick={handleVideoClick}>

<div className='video__top'>
            {/* <img src={medium.url} alt='' /> */}
            <LazyLoadImage src={medium.url} effect='blur' />
            <span className='video__top__duration'>{_duration}</span>
         </div>
            <div className="video__title">{title}</div>
            <div className="video__details">
                <span>
                    <AiFillEye />   {numeral(views).format("0.a")} <span> • </span> 
                </span>
                <span> { moment(publishedAt).fromNow()}</span>
            </div>
            {!ChannelScreen && (
            <div className='video__channel'>
               <LazyLoadImage src={channelIcon?.url} effect='blur' />

               <p>{channelTitle}</p>
            </div>
         )}
      </div>
   )
}

export default Video
