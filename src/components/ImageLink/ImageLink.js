import './ImageLink.css'
    ;
export const ImageLink = ({ onInputChange, onPictureSubmit }) => {
    return (
        <div>
            <p className="f3">
                {'This magic brain will detect faces in your pictures. Give it a try!'}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5" >
                    <input
                        className="f4 pa2 w-70 center"
                        type="text"
                        placeholder='Enter image URL here'
                        onChange={onInputChange}
                    />
                    <button
                        className="w-30 grow f4 link ph3 pv2 dib white bg-light-pink"
                        onClick={onPictureSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    );
}