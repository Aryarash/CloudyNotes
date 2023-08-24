import React , {useContext} from 'react'
import noteContext from '../context/noteContext';


const NoteItem = (props) => {

    
    const { note , updateNote} = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const handleDelete = ()=>{
        deleteNote(note._id);
    };
    const handleEdit = ()=>{
        updateNote(note);
    };
    return (
        <div className='col-md-3 my-2'>
            <div className="card">
                <div className="card-body">
                    <div className='d-flex align-items-center'>
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-sharp fa-solid fa-trash mx-2" onClick={handleDelete}></i>
                        <i className="fa-solid fa-file-pen mx-2" onClick={handleEdit}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
