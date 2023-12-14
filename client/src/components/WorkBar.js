import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import ListGroup from 'react-bootstrap/ListGroup';

const WorkBar = observer(() => {
    const {user} = useContext(Context)
    const {work} = useContext(Context)
    return (
        <div>
            <div>
                Кол-во проектов:
            </div>
            <ListGroup className="mt-3">
                {work.works.map(workss => 
                    <ListGroup.Item 
                        style={{cursor: 'pointer'}}
                        key={workss.id}
                        >
                        {workss.Text}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>

    )

})
export default WorkBar;