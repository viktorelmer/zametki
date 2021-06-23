import './Input.scss'

export default function Input({onKeyPress, onChange, id, lable}) {

    return (
        <div className="input-container">
            <label htmlFor={id}>{lable}</label>
            <input id={id} type="text" className="input-text" onChange={onChange} onKeyPress={onKeyPress}/>
        </div>
    )
}
