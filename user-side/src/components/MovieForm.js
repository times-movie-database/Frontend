import './MovieForm.css';

export default function MovieForm() {

    const handleSubmit = () => {
        alert("sent");
    }
    return (
        <div>
            <form>
                <ul className='container'>
                    <li>
                        <input type='text' placeholder='Movie Title' maxLength='5'></input><br />
                    </li>
                    <li>
                        <textarea rows='15' cols='20' placeholder='Summary' className='form-control'></textarea><br />
                    </li>
                    <li>
                        <input type='text' placeholder='Cast'></input><br />
                    </li>
                    <li>
                        <input type='text' placeholder='Genre'></input><br />
                    </li>
                    <li>
                        <button type='submit' onClick={handleSubmit}>Submit</button>
                    </li>
                </ul>
            </form>
        </div>
    );
}