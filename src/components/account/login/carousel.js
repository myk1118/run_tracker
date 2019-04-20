import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import image2 from './images/image2.jpeg';
import image3 from './images/image3.jpeg';
import image5 from './images/image5.jpeg';

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
                            <img className="d-block w-100" src={image2} alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={image3} alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={image5} alt="Third slide" />
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