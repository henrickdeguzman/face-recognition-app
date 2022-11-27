import Tilt from 'react-parallax-tilt';
import brain from './brain.png';

export const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner p3">
                    <img style={{ paddingTop: "10px" }} src={brain} alt="brain logo"></img>
                </div>
            </Tilt>
        </div>
    );
}