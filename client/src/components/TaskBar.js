import { observer } from "mobx-react-lite";
import React, { useContext,useEffect} from "react";
import { Context } from "../index";
import ListGroup from 'react-bootstrap/ListGroup';
import { getTask } from "../http/workApi";

const TaskBar = observer(({Work_id,isHidden}) => {
    const {user} = useContext(Context)
    const {work} = useContext(Context)
    const hid= work.selectedWork.id === Work_id
    
    
    return (
        <div hidden={!hid}>
            <ListGroup className="mt-1 list-group-flush">
                {work.task.map(tasks => 
                    <ListGroup.Item className="list-group-item-action"
                        style={{cursor: 'pointer'}}
                        key={tasks.id}
                        >
                        {tasks.Text}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>

    )

})
export default TaskBar;