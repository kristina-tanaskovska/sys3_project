import { Component } from 'react';
class LessonCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMore: false
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
                <button onClick={() => this
                    .setState({ showMore: !this.state.showMore })}>
                    View Summary
                </button>
                {
                    this.state.showMore &&
                    <div id="moreInfo"
                        className="more-info-panel">
                        <p className="black-text">
                            If you take the first lesson you can do the second one :)
                        </p>
                    </div>
                }

            </div>
        );
    }
}

export default LessonCard;