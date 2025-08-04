import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './Home.css'

function Home(){
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('')
    const [name,setName] = useState('')
    axios.defaults.withCredentials = true;

    useEffect(()=>{
        axios.get('http://88.200.63.148:6868')
        .then(res =>{
            if(res.data.Status === "Success"){
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
        axios.get('http://88.200.63.148/logout')
        .then(res =>{
            location.reload();
        }).catch(err => console.log(err));
    }

  return (
    <div className="home-page">
      

      <div className="hero-section">
        <h1>{auth ? `Welcome back, ${name}!` : "Welcome to MySite"}</h1>
        <p>{auth ? "Glad to have you here." : "Please log in or register to explore more."}</p>
        {auth && (
    <Link to="/garden">
      <button className="go-to-garden-button">
        Go to Garden
      </button>
    </Link>
  )}
      </div>


      <div className="content-section">
        <h2>About This Website</h2>
        <p>
          This is a sample web application built with React, Express, and modern CSS. Users can register,
          log in, and access protected content once authenticated. The design is mobile-friendly and provides
          an intuitive user experience.
        </p>
        <p>
          When a user is authenticated, a personalized message appears along with an option to log out.
          Unauthenticated users are prompted to sign in or create an account. The layout features a
          responsive navigation bar and scrollable content area for long explanations.
        </p>
        <p>
          Feel free to explore and test the login and registration functionality. Everything you need is just
          a click away in the menu bar.
        </p>
        
      </div>
    </div>
  );
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