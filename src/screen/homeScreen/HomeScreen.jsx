import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Video from "../../Components/video/Video"
import CategoriesBar from "../../Components/categoriesBar/CategoriesBar"
import { useDispatch, useSelector } from 'react-redux'
import { getPopoularVideos, getVideosByCategory } from '../../redux/actions/videos.action'
import InfiniteScroll from 'react-infinite-scroll-component'

const HomeScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPopoularVideos())
    }, [dispatch])

    // const fetchData = () => {
    //     if(activeCategory==='All')
    //     dispatch(getPopoularVideos())
    //     else{
    //     dispatch(getVideosByCategory(activeCategory))
    //     }
    // }

    const { videos } = useSelector(state => state.homeVideos)

    return (
        <div>
            <Container>
                <CategoriesBar />
                <Row>
                    {/* <InfiniteScroll
                        dataLength={videos.length}
                        next={fetchData}
                        hasMore={true}
                        Loader={<div className='spinner-border text-danger d-block mx-auto'> </div>}
                    > */}

                        {videos.map((video) => (
                            <Col lg={3} md={4} >
                                <Video video={video} key={video.id} />
                            </Col>
                        ))}
                    {/* </InfiniteScroll> */}
                </Row>
            </Container>
        </div>

    )
}
export default HomeScreen;