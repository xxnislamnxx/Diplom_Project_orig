import React from "react";
import {Switch , Route , Redirect} from 'react-router-dom'
import { authRoutes, publicRotes } from "../routes";
const AppRouter = () => {
    const isAuth = false
    return (
        <Switch>
            {isAuth && authRoutes.map(({path, Component}) => 
                <Route key={path} path={path} Component={Component} exact/>
            )}
             {publicRotes.map(({path, Component}) => 
                <Route key={path} path={path} Component={Component} exact/>
            )}
        </Switch>

    )

}
export default AppRouter;