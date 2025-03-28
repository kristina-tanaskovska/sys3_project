import { Component } from 'react';
import axios from 'axios';
import loaderImg from '../assets/images/loader.gif';
import { Link } from 'react-router';

class LessonCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMore: false,
            description: undefined
        };
    }
    render() {
        return (
            <div className="lesson-card">
                <h2>{this.props.name}</h2>
                <div>
                    <p>
                        {this.props.description}
                    </p>
                </div>
                <button onClick={() => this.onViewSummaryClicked()}>
                    View Summary
                </button>
                {
                    this.state.showMore &&
                    <div>
                        {
                            this.state.description ?
                                <div id="moreInfo"
                                    className="more-info-panel">
                                    <p className="black-text">
                                        {this.state.description}
                                    </p>
                                </div> :
                                <div>
                                    <img src={loaderImg} width="40px" alt="loading..." />
                                </div>
                        }
                    <Link to="/lesson" >Go to Lesson</Link>
                    </div>
                    
                }

            </div>
        );
    }

    onViewSummaryClicked() {
        this.setState({ showMore: !this.state.showMore });
        this.getDetails();
    }

    getDetails() {
        axios.get(`http://www.sfu.ca/bin/wcm/course-outlines?2015/summer/cmpt/120/${this.props.name}`)
            .then(res => {
                const {
                    data: {
                        info: {
                            description
                        } = {}
                    } = {}
                } = res;
                console.log('result', description);
                this.setState(prevState => ({
                    ...prevState,
                    description
                }))
            })
            .catch(err => console.log('error loading data: ', err));
    }
}

export default LessonCard;