import React from "react";
import Slider from "react-slick";
import {CardImg} from "reactstrap";

const SliderComponent = ({arrOfImages}) => {
    function Arrow({ direction, onClick }) {
        return (
            <div
                className={`slider-arrow arrow-${direction}`}
                onClick={onClick}
            >
                <i className={`bi bi-arrow-${direction}`}></i>
            </div>
        );
    }
    let settings = {
        arrows: true,
        adaptiveHeight: true,
        dots: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <Arrow direction="right" />,
        prevArrow: <Arrow direction="left" />,
    };
    return <Slider className={"d-flex flex-row"} {...settings}>{arrOfImages.map((url, index) => (
        <CardImg
            key={index}
            src={url}
            alt={`image ${index + 1}`}
        />
        ))}</Slider>
}
export default SliderComponent;