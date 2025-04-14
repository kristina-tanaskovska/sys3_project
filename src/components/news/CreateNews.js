import { useState } from 'react';
import axios from 'axios';

function CreateNews() {
    // const [title, setTitle] = useState('My Title');
    // const [slug, setSlug] = useState();
    const [state, setState] = useState({
        title: undefined,
        slug: '',
        text: ''
    })

    const createNews = () => {
        axios.post('http://88.200.63.148:5009/novice', {
            ...state
        })
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }

    return (
        <div className='create-news'>
            <div className='container'>
                <h1> Add News </h1>
                <br />
                <input type='text' placeholder='Title'
                    onChange={({ target: { value: inputTitle } }) => setState(prevState => ({ ...prevState, title: inputTitle }))}
                    value={state.title} />

                <p>Title: {state.title}</p>

                <input type='text' placeholder='Slug'
                    onChange={({ target: { value: inputSlug } }) => setState(prevState => ({ ...prevState, slug: inputSlug }))}
                    value={state.slug} />
                <p>Title: {state.slug}</p>
                <textarea placeholder='Enter your news here'
                    onChange={({ target: { value: inputText } }) => setState(prevState => ({ ...prevState, text: inputText }))} />
                <p>Text: {state.text}</p>
                <button onClick={() => createNews()}>Create News</button>
            </div>
        </div>
    )
}

export default CreateNews;