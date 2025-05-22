import { useState, useEffect } from 'react';

function Counter(props) {

    const [count, setCount] = useState(0);
    const [age, setAge] = useState(0);

    useEffect(() => {
        console.log('inside use effect');
    }, [count]);

    return (
        <div>
            <button onClick={() => setCount(count => count + 1)}>Increment Count</button>
            <button onClick={() => setAge(age => age + 5)}>Age +5</button>
            <div>
                Count: {count}
            </div>
            <div>
                Age: {age}
            </div>
        </div>
    )
}

export default Counter;