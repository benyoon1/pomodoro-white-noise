
import "./Respiration.css"

const Respiration = ({ isResp, handleRespiration, counter, respirationStage }) => {
    return (
        <div className="respiration-container">

            <button
                className={`start-button`}
                onClick={handleRespiration} title="click to pause">
                {isResp ? respirationStage : "Start Respiration"}
            </button>

            <div className={`stage-common`} hidden={!isResp}>
            </div>
        </div>
    )
}
export default Respiration