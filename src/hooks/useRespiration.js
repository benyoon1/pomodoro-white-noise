import { useEffect, useState } from "react";

const useRespiration = () => {
    const [isResp, setIsResp] = useState(false);
    const [respirationStage, setRespirationState] = useState("");
    const [counter, setCounter] = useState(0)
    const [repeat, setRepeat] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!isResp) return () => clearInterval(intervalId)
            if (repeat > 110) return () => clearInterval(intervalId)

            setCounter(Number(counter + 1))
            setRepeat(Number(repeat + 1))

            if ((respirationStage === "Inhale") && (counter >= 5)) {
                setRespirationState("Exhale")
                setCounter(0)
            }

            if ((respirationStage === "Exhale") && (counter >= 6)) {
                setRespirationState("Inhale")
                setCounter(0)
            }

        }, 1000);

        return () => clearInterval(intervalId);
    }, [isResp, counter, respirationStage, repeat]);

    const handleRespiration = () => {
        if(isResp){
            setCounter(0)
            setRepeat(0)
        }
        setRespirationState("Inhale")
        setIsResp(!isResp)
        return
    }

    return {
        counter,
        isResp,
        respirationStage,
        handleRespiration
    }
}

export default useRespiration;