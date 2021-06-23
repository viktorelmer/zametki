import './App.scss';
import NotesList from "./components/NotesList";
import {useState} from "react";
import Input from "./components/Input";

function App() {
    const [notes, setNotes] = useState([
            {text: "I wanna go to #shop 1", tags: ['#shop'], id: 1},
            {text: "I wanna go to #shop 2", tags: ['#shop'], id: 2},
            {text: "I wanna go to #shop 3", tags: ['#shop'], id: 3},
            {text: "I wanna go to #shop 4", tags: ['#shop'], id: 4},
        ]),
        [findNotes, setFindNotes] = useState([])

    function getNoteById(id) {
        const note = notes.filter((item) => {
            return item['id'] === id
        })[0]
        return note
    }

    function getNoteArrId(id) {
        for (let x = 0; x < notes.length; x++) {
            if (notes[x]['id'] === id) return x
        }
    }
    /**
     * Функция добавления в список заметок строки при нажатии Enter на фокусе элемента
     * @param e - ивент ответ при нажатии кнопки
     */
    function addNewNote(e) {
        const text = e.currentTarget.value
        if (e.code === 'Enter' && text.length > 0) {
            let newValue = notes
            const tags = checkHashTag(text),
                id = newValue.push({text: text, tags: tags})
            newValue[id - 1].id = id
            e.currentTarget.value = ""
            setNotes([...newValue])
        }
    }

    /**
     * Функция которая проверяет и возвращает теги из текста
     * @param text {string} - текст в котором будет искаться
     * @param tags {Array} - дефолтный параметр куда записывается список тегов
     * @returns tags {Array} - список тэгов
     */
    function checkHashTag(text, tags = []) {
        if (text.length > 0 && text.includes("#")) {
            tags = text.split(" ").filter((item) => {
                return item[0] === "#"
            })
            return tags
        }
        return tags
    }

    function findNote(e, result = []) {
        const text = e.target.value
        if (e.code === 'Enter' && text.length > 0) {
            result = notes.filter((item) => {
                return item["tags"].join(" ").includes(text)
            })
            setFindNotes([...result])
        }
    }

    function editNoteAc(noteData) {
        setNotes((prev) => {
            const tags = checkHashTag(noteData["text"])
            noteData["tags"] = tags
            prev[getNoteArrId(noteData['id'])] = noteData
            return prev
        })
    }

    function removeNote(id) {
        let prev = notes
        prev.splice(getNoteArrId(id), 1)
        setNotes([...prev])
    }

    return (
        <div className="App">
            <div className="container">
                <Input id="input_text" lable="Введите текст для публикации: " onChange={checkHashTag} onKeyPress={addNewNote}/>
                <NotesList removeNote={removeNote} editNoteAc={editNoteAc} notes={notes} lable="Notes list:"/>
            </div>
            <div className="container">
                <Input id="input_find" lable="Поиск: " onKeyPress={findNote}/>
                <NotesList removeNote={removeNote} editNoteAc={editNoteAc} notes={findNotes} lable="Finded notes:"/>
            </div>
        </div>
    );
}

export default App;
