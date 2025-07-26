import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

function Home(){
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('')
    const [name,setName] = useState('')
    axios.defaults.withCredentials = true;

    useEffect(()=>{
        axios.get('http://localhost:6868')
        .then(res =>{
            if(res.data.Status === "Sucess"){
                setAuth(true)
                setName(res.data.name)
                //navigate('/login')
            }else{
                setAuth(false)
                setMessage(res.data.Error)

            }
        })// console.log(res))

        .catch(err => console.log(err));
        
    }, [])

    const handleLogout = ()=> {
        axios.get('http://localhost:6868/logout')
        .then(res =>{
            location.reload(true);
        }).catch(err => console.log(err));
    }
    return(
        
        <div className='constainer mt-4'>
            (
                auth ?
                <div>
                    <h3>You are athorized --- {name}</h3>
                    <button className = 'btn btn-danger' onClick={handleLogout}>Logout</button>
                </div>
                :
                <div>
                    <h3>{message}</h3>
                    <h3>Logout now</h3>
                    <Link to="/login" className='btn btn-primary'>Login</Link>
                </div>
            )
        </div>
    )
}


/*import LessonCard from '../LessonCard';
import axios from 'axios';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lessons: [],
            count: 2,
        }
    }
    componentDidMount() {
        this.getLessons();
    }
    render() {
        return (
            <div className="content-container">
                <div className="main-content">
                    <h1 className="header-text">
                        Welcome back to &lt;HTML/&gt;
                    </h1>
                    <div className="sub-heading-container">
                        <p>
                            <span className="sub-heading">
                                Let's brush up our html, js and css knowledge
                            </span>
                        </p>
                    </div>
                    <div style={{ display: 'flex' }}>
                        {
                            this.state.lessons
                                .map(le => <LessonCard name={le.text}
                                    description={le.title}
                                    key={le.value} />)
                        }
                    </div>
                </div>

            </div>
        );
    }

    getLessons() {
        axios.get('http://www.sfu.ca/bin/wcm/course-outlines?2015/summer/cmpt/120')
            .then(({ data: lessons }) => {
                console.log('result: ', lessons);
                this.setState({
                    ...this.state,
                    lessons
                })
            })
            .catch(err => console.log('error: ', err));

        // return [{
        //   name: "lesson1",
        //   description: "Fundamentals of react",
        // },
        // {
        //   name: "lesson2",
        //   description: "More than Fundamentals of react",
        // },
        // {
        //   name: "lesson3",
        //   description: "One before the last one",
        // },
        // {
        //   name: "lesson4",
        //   description: "The last one",
        // }]
    }
}
*/
export default Home;