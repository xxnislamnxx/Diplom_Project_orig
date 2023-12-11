import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import ListGroup from 'react-bootstrap/ListGroup';

const UsersBar = observer(  () => {
    const {otdel} = useContext(Context)
    return (
        <div>
            <div>
                Список сотрудников в отделе:
            </div>
            <ListGroup className="mt-3">
                {otdel.users.map(userss => 
                    <ListGroup.Item 
                        style={{cursor: 'pointer'}}
                        active={userss.id === otdel.selectedOtdel.id}
                        onClick={() => otdel.setSelectedOtdel(userss)}
                        key={userss.id}
                    >
                        {userss.Name}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>

    )

})
export default UsersBar;