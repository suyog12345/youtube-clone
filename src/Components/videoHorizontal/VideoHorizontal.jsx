import React from "react"
import { AiFillEye } from 'react-icons/ai'
import { useEffect , useState} from 'react'
import  request from '../../api'
import moment from 'moment'
import numeral from 'numeral';
import {Row,Col} from 'react-bootstrap'
import './_videoHorizontal.scss'
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useNavigate } from "react-router-dom"
import { SearchScreen } from "../../screen/searchScreen"

export const VideoHorizontal=({video , searchScreen,subScreen})=>{
    // const seconds=moment.duration('100').asSeconds()
    // const _duration =moment.utc(seconds*1000).format("mm:ss")


    const {
        id,
        snippet: {
           channelId,
           channelTitle,
           description,
           title,
           publishedAt,
           thumbnails: { medium },
           resourceId,
        },
     } = video
  
   


    //  const isVideo = !(id.kind === 'youtube#channel' || subScreen)
     const isVideo = !(id.kind==='youtube#channel' || subScreen)
     const [views, setViews] = useState(null)
     const [duration, setDuration] = useState(null)
     const [channelIcon, setChannelIcon] = useState(null)
  
     useEffect(() => {
        const get_video_details = async () => {
           const {
              data: { items },
           } = await request('/videos', {
              params: {
                 part: 'contentDetails,statistics',
                 id: id.videoId,
              },
           })
           setDuration(items[0].contentDetails.duration)
           setViews(items[0].statistics.viewCount)
        }
        if(isVideo)
        get_video_details()
     }, [id,isVideo])
  
     useEffect(() => {
        const get_channel_icon = async () => {
           const {
              data: { items },
           } = await request('/channels', {
              params: {
                 part: 'snippet',
                 id: channelId,
              },
           })
           setChannelIcon(items[0].snippet.thumbnails.default)
        }
        get_channel_icon()
     }, [channelId])
  
     const seconds = moment.duration(duration).asSeconds()
     const _duration = moment.utc(seconds * 1000).format('mm:ss')

     const navigate=useNavigate();

   const _channelId= resourceId?.channelId || channelId

     const handleClick=()=>{
      isVideo?
        navigate(`/watch/${id.videoId}`) : navigate(`/channel/${_channelId}`)
     }
      const thumbnail = !isVideo && 'videoHorizontal__thumbnail-channel'
    return(
        <div> 
            <Row
            className="py-2 m-1 videoHorizontal align-items-center"
            onClick={handleClick}
            > 
                <Col xs={6} md={SearchScreen || subScreen ? 4 : 6} className="videoHorizontal__left">
                    <LazyLoadImage
                         src={medium.url}

                    className={`videoHorizontal__thumbnail ${thumbnail}`}
                    effect="blur"
                    wrapperClassName="videoHorizontal__thumbnail-wrapper"
                    />
                    {
                     isVideo && <span className="videoHorizontal__duration">{_duration}</span>
                    }
                </Col>

                <Col xs={6} md={searchScreen || subScreen ? 8: 6} className="videoHorizontal__right p-0">
                <p className="videoHorizontal__title mb-1">
                   {title}
                </p>
                {
                  isVideo && ( 
                     <div className="videoHorizontal__details">
                 <AiFillEye />   {numeral(views).format("0.a")}  • 
                 { moment(publishedAt).fromNow()}
                </div>
                  )
                }

                {(searchScreen || subScreen) && <p className="mt-1 videoHorizontal_desc">{description}</p>}

                <div className="videoHorizontal__channel d-flex align-items-center my-1">
                  {
                     isVideo && (
                        <LazyLoadImage src={channelIcon?.url} effect='blur' />
                     )
                  }
                    <p className="mb-0">{channelTitle}</p>
                </div>
                {
                subScreen && (
                  <p className="mt-2">
                     {video.contentDetails.totalItemCount} Videos
                  </p>
                )}
                </Col>
            </Row>
        </div>
    )
}