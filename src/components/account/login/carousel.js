import React, { Component } from 'react';
import image8 from './images/image8.jpeg';
import image9 from './images/image9.jpeg';
import image10 from './images/image10.jpeg';

class Carousel extends Component {
    componentDidMount() {
        $(this.carousel).carousel()
    }
    render() {
        return (
            <div>
                <div ref={(element) => this.carousel = element} id="carousel-example-1z" className="carousel slide carousel-fade" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carousel-example-1z" data-slide-to="0" className="active"></li>
                        <li data-target="#carousel-example-1z" data-slide-to="1"></li>
                        <li data-target="#carousel-example-1z" data-slide-to="2"></li>
                    </ol>

                    <div className="carousel-inner" role="listbox">
                        <div className="carousel-item active">
                            <img className="image8 d-block" src={image8} alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="image9 d-block" src={image9} alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="image10 d-block" src={image10} alt="Third slide" />
                        </div>
                    </div>

                    <a className="carousel-control-prev" href="#carousel-example-1z" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carousel-example-1z" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        );
    }
}

export default Carousel;