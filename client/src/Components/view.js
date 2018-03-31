import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNote, updateNote, deleteNote } from '../Actions';
import {
    Jumbotron,
    Button,
    Input,
    Label,
    Form,
    FormGroup,
    Modal,
    ModalBody,
    ModalHeader
} from 'reactstrap';

import Notes from './notes';

class ViewNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            id: -1,
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount() {
        if (this.props.notes.length > 0) {
            const defaultNote = this.props.notes[0];
            this.setState({
                title: defaultNote.title,
                content: defaultNote.content,
                id: defaultNote._id
            });
        }
    }

    noteChangeHandler = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    updateNote = event => {
        event.preventDefault();
        const editNote = {
            id: this.state.id,
            title: this.state.title,
            content: this.state.content
        };
        const note = {
            title: this.state.title,
            content: this.state.content
        };

        if (this.state.content.length === 0 || this.state.title.length === 0) {
            alert(
                'You need to have a Title and Body in your note before you can save'
            );
        } else if (
            this.state.content.length > 0 &&
            this.state.title.length > 0 &&
            this.state.id !== -1
        ) {
            this.props.updateNote(editNote);
        } else if (
            this.state.id === -1 &&
            this.state.content.length > 0 &&
            this.state.title.length > 0
        ) {
            this.props.addNote(note);
            this.setState({
                title: '',
                content: '',
                id: -1
            });
        }
    };

    previewNote = (title, content, id) => {
        const notetitle = title;
        const notecontent = content;
        const noteId = id;
        this.setState({ title: notetitle, content: notecontent, id: noteId });
    };

    deleteNote = event => {
        if (this.state.id === -1) {
            this.setState({
                title: '',
                content: '',
                id: -1
            });
        } else {
            event.preventDefault();
            this.props.deleteNote(this.state.id);
            this.setState({
                title: '',
                content: '',
                id: -1
            });
        }
    };

    render() {
        return (
            <div className="DashBoard">
                <Jumbotron>
                    <Notes previewNote={this.previewNote} />
                    <div className="ViewNote">
                        <Button color="primary" onClick={this.toggle}>
                            New
                        </Button>
                        <br />
                        <br />
                        <Button color="danger" onClick={this.toggle}>
                            New{this.props.buttonLabel}
                        </Button>
                        <Modal
                            isOpen={this.state.modal}
                            toggle={this.toggle}
                            className={this.props.className}
                        >
                            <ModalHeader toggle={this.toggle}>
                                Add/Edit Note
                            </ModalHeader>
                            <ModalBody>
                                <Form>
                                    <FormGroup onSubmit={this.updateNote}>
                                        <Label>Title: </Label>
                                        <Input
                                            name="title"
                                            onChange={this.noteChangeHandler}
                                            value={this.state.title}
                                            type="text"
                                            placeholder="Title"
                                            required
                                        />

                                        <Label>Body: </Label>
                                        <Input
                                            className="ViewNote--text"
                                            name="content"
                                            onChange={this.noteChangeHandler}
                                            value={this.state.content}
                                            type="textarea"
                                            rows="10"
                                            placeholder="Add Notes"
                                            required
                                        />
                                    </FormGroup>
                                </Form>
                                <div className="ViewNote--update">
                                    <Button
                                        color="success"
                                        onClick={this.updateNote}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        color="danger"
                                        onClick={this.deleteNote}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </ModalBody>
                        </Modal>
                    </div>
                </Jumbotron>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes,
        id: state.id
    };
};

export default withRouter(
    connect(mapStateToProps, { addNote, updateNote, deleteNote })(ViewNotes)
);
