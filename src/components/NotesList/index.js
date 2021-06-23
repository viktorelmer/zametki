import react, {useEffect, useState} from 'react'


import './NotesList.scss'

export default function NotesList({notes, lable, editNoteAc, removeNote}) {
    const [editNote, setEditNote] = useState()

    function setNoteToEditMode(noteData, id) {
        setEditNote({...noteData, id: id})
    }

    function changeEditInput(e) {
        setEditNote((prev) => {
            prev.text = e.target.value
            return prev
        })
    }

    function saveEditValue(e) {
        if (e.key === "Enter") {
            editNoteAc(editNote)
            setEditNote()
        }
    }

    return (
        <div className="notes_list-container">
            <div className="header">
                <div className="header-text">{lable}</div>
                <div className="header-amount">{notes.length} amt.</div>
            </div>
            {notes.map((item) =>
                <div className="note-item" key={item.id}>
                    <div className="flex-container">
                        {editNote && editNote["id"] === item.id ? <input
                                defaultValue={item.text}
                                onChange={changeEditInput}
                                onKeyPress={saveEditValue}
                            />
                            :
                            <div className="note-text">"{item.text}"</div>}
                        <div className="edit-btn" onClick={() => {
                            setNoteToEditMode(item, item.id)
                        }}>✎
                        </div>
                        <div className="delete-btn" onClick={() => {
                            console.log('remove note action')
                            removeNote(item.id)
                        }}>×</div>
                    </div>
                    {item["tags"].map((tag, id) =>
                        <div className="note-tags">{tag}</div>
                    )}
                </div>
            )}
        </div>
    )
}
