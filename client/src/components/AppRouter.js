
import React from "react";
import {Switch , Route} from 'react-router-dom';
import { authRoutes, publicRoutes } from "../routes";
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
        </Switch>

    );

};
export default AppRouter;


/*
import React from "react";
import { Switch, Route } from 'react-router-dom';
import { authRoutes, publicRoutes } from "../routes"; // исправлена опечатка

const AppRouter = () => {
    const isAuth = false;
    return (
        <Switch>
            {isAuth && authRoutes.map(({ path, Component }) => 
                <Route key={path} path={path} component={Component} exact/> // исправлено на "component"
            )}
            {publicRoutes.map(({ path, Component }) => // исправлена опечатка
                <Route key={path} path={path} component={Component} exact/> // исправлено на "component"
            )}
        </Switch>
    );
};

export default AppRouter;
*/