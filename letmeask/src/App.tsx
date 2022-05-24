import React from "react";
import { BrowserRouter, Route,Switch } from 'react-router-dom';
import { Home } from './apps/pages/home';
import { NewRoom } from './apps/pages/newroom';
import { Room } from './apps/pages/rooms';
import './apps/assets/styles/global.scss';
import {AuthContProvider } from "./apps/context/AuthContext";
import { AdminRoom } from "./apps/pages/AdminRoom";

function App() {
  return (
        <BrowserRouter>     
              <AuthContProvider>
                <Switch>
                  <Route path="/" exact component={Home}/>
                  <Route path="/rooms/new/" exact component={NewRoom} />
                  <Route path="/rooms/:id" component={Room} />
                  <Route path="/admins/rooms/:id" component={AdminRoom} />
                </Switch>
              </AuthContProvider>  
        </BrowserRouter>     
  );
}

export default App;