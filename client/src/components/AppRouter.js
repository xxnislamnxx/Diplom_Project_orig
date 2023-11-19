
import React from "react";
import {Switch , Route, Redirect} from 'react-router-dom';
import { authRoutes, publicRoutes } from "../routes";
import { USERLIST_ROUTE } from "../utils/consts";
const AppRouter = () => {
    const isAuth = false;
    return (
        <Switch>
            {isAuth && authRoutes.map(({ path, Component }) => 
                <Route key={path} path={path} component={Component} exact/>
            )}
             {publicRoutes.map(({ path, Component }) => 
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={USERLIST_ROUTE}/> {/*Если перейти на не существующую страницу -> редерект на дефолт*/}
            
        </Switch>

    );

};
export default AppRouter;

