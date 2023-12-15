import { observer } from "mobx-react-lite";
import React, { useContext,useEffect} from "react";
import { Context } from "../index";
import ListGroup from 'react-bootstrap/ListGroup';
import { getTask } from "../http/workApi";

const TaskBar = observer(({Work_id}) => {
    const {user} = useContext(Context)
    const {work} = useContext(Context)
    

    return (
        <div>
            <div >
                Кол-во задач: {Work_id}
            </div>
            <ListGroup className="mt-0">
                {work.task.map(tasks => 
                    <ListGroup.Item 
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