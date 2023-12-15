import { observer } from "mobx-react-lite";
import React, { useContext,useEffect } from "react";
import { Context } from "../index";
import ListGroup from 'react-bootstrap/ListGroup';
import TaskBar from "./TaskBar";
import { getTask } from "../http/workApi";
const WorkBar = observer(() => {
    const {user} = useContext(Context)
    const {work} = useContext(Context)

    useEffect(() => {
        getTask(1).then(data => work.setTask(data))
    }, [])

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
                        <ListGroup.Item >
                            <TaskBar Work_id={workss.id}/>
                        </ListGroup.Item>
                        
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>

    )

})
export default WorkBar;