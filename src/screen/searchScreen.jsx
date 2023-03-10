import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { VideoHorizontal } from "../Components/videoHorizontal/VideoHorizontal";
import { getVideosBySearch } from "../redux/actions/videos.action";

export const SearchScreen=()=>{
    
    const {query} = useParams();
    const dispatch=useDispatch();
    const {videos,loading}=useSelector(state=>state.searchedVideos);

    useEffect(()=>{
        dispatch(getVideosBySearch(query));
    },[query,dispatch]);
    
    return(
      <Container>
           {!loading ? (
            videos?.map(video => (
               <VideoHorizontal
                  video={video}
                  key={video.id.videoId}
                  searchScreen
               />
            ))
         ) : (
            <h1>Loading...</h1>
         )}

      </Container>
    )
}