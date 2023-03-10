import React, { useEffect, useState } from 'react';
import Header from "./Components/header/Header";
import Sidebar from "./Components/sidebar/Sidebar";
import { Container } from 'react-bootstrap';
import HomeScreen from "./screen/homeScreen/HomeScreen";
import "./_app.scss"
import LoginScreen from './screen/loginScreen/LoginScreen';
import { Routes, Route,useNavigate} from 'react-router-dom';
// import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';
import WatchScreen from './screen/watchScreen/watchScreen';
import { SearchScreen } from './screen/searchScreen';
// import subscriptionScreen from './screen/subscriptionScreen/subscriptionScreen'
import  SubscriptionScreen  from './screen/subscriptionScreen/subscriptionScreen';
import ChannelScreen from './screen/channelScreen/channelScreen'; 

const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false);

  const handleToggleSidebar = () => toggleSidebar(value => !value)
  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app__container ">
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid className="app__main ">
          {children}
        </Container>
      </div>
    </>
  )
}


const App = () => {

const{accessToken,loading}=useSelector(state=>state.auth);

const navigate=useNavigate();

useEffect(()=>{
  if(!loading && !accessToken)
  {
  navigate('/auth');
  }
})



  return (
   
      <Routes>

        <Route path="/" element={<Layout>
          <HomeScreen />
        </Layout>} />

        <Route path='/auth' element={<LoginScreen />} />

        <Route path='/search/:query' element={<Layout><SearchScreen/></Layout>} />

        <Route path='/watch/:id' element={<Layout><WatchScreen/></Layout>} />

        <Route path='/feed/subscriptions' element={<Layout> <SubscriptionScreen/> </Layout>} />

        <Route path='/channel/:channelId' element= {<Layout> <ChannelScreen/> </Layout>}/>
        
        {/* <Route path='' element={ <Redirect to="/" /> }/> */}

      </Routes>
   
  )
}
export default App;
