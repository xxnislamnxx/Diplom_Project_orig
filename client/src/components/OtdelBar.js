import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import ListGroup from 'react-bootstrap/ListGroup';

const OtdelBar = observer(  () => {
    const {otdel} = useContext(Context)
    return (
        <div>
            <div>
                Список отделов:
            </div>
            <ListGroup className="mt-3">
                {otdel.otdels.map(otdell => 
                    <ListGroup.Item 
                        style={{cursor: 'pointer'}}
                        active={otdell.id === otdel.selectedOtdel.id}
                        onClick={() => otdel.setSelectedOtdel(otdell)
                        }
                        key={otdell.id}
                    >
                        {otdell.Name}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>

    )

})
export default OtdelBar;