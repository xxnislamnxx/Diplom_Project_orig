import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import ListGroup from 'react-bootstrap/ListGroup';

const UsersBar = observer(  () => {
    const {user} = useContext(Context)
    return (
        <div>
            <div>
                Список сотрудников в отделе:
            </div>
            <ListGroup className="mt-3">
                {user.users.map(userss => 
                    <ListGroup.Item 
                        style={{cursor: 'pointer'}}
                        key={userss.id}>
                        {userss.Name}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>

    )

})
export default UsersBar;