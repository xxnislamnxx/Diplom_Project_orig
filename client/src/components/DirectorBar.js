import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import ListGroup from 'react-bootstrap/ListGroup';

const DirectoBar = observer(({onHidden}) => {
    const {user} = useContext(Context)
    const text = "В этом отделе нет сотрудников"
    return (
        <div hidden={onHidden}>
            <div>
                Начальник отдела:
            </div>
            <ListGroup className="mt-3">
                
                {
                    <ListGroup.Item 
                    style={{cursor: 'pointer'}}
                    key="0"
                    
                    >
                    {user.users.length == 0? "": user.users.at(0).Name}
                </ListGroup.Item>
                }

            </ListGroup>
        </div>

    )

})
export default DirectoBar;