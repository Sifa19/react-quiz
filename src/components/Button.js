export default function Button({ onClickHandler, children, cssStyle }) {
    return <button onClick={onClickHandler} className='btn'
    >{children}</button>
}