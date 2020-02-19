import React from 'react'
import { useDispatch } from 'react-redux'
import {
    Navbar,
    Form,
    InputGroup,
    FormControl,
    Button,
    Table,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function StudyTable(props) {
    const { studies } = props

    const dispatch = useDispatch()
    return (
        <React.Fragment>
            <Navbar className="bg-light justify-content-between searchBar">
                <Form inline>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">
                                Study Name
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Enter Study Name"
                            aria-label="Username"
                        />
                    </InputGroup>
                </Form>
                <Form inline>
                    <Button
                        variant="outline-primary"
                        onClick={props.handleShow}
                    >
                        Create Study
                    </Button>
                </Form>
            </Navbar>

            <Table responsive bordered>
                <thead>
                    <tr>
                        <th>Study Name</th>
                        <th>Study Start Date</th>
                        <th>Study Completion Date</th>
                        <th>Protocol ID</th>
                        <th>Study Group</th>
                        <th>Phase</th>
                        <th>Primary Indication</th>
                        <th>Secondary Indication</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {studies.map(rowData => (
                        <tr key={rowData.id}>
                            <td>{rowData.study_name}</td>
                            <td>{rowData.study_start_date}</td>
                            <td>{rowData.study_completion_date}</td>
                            <td>{rowData.protocol_id}</td>
                            <td>{rowData.study_group}</td>
                            <td>{rowData.phase}</td>
                            <td>{rowData.primary_indication}</td>
                            <td>{rowData.secondary_indication}</td>
                            <td>
                                <FontAwesomeIcon
                                    onClick={() => {
                                        dispatch({
                                            type: 'DELETE_STUDY',
                                            id: rowData.id,
                                        })
                                    }}
                                    icon="trash-alt"
                                    transform="shrink-2"
                                    color="red"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </React.Fragment>
    )
}
