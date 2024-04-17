import React, { useState, useEffect } from "react";
import App from './App.css'

function PomodoroTimer() {
    const [minutos, setMinutos] = useState(25);
    const [segundos, setSegundos] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

    useEffect(() => {
        let interval;

        if (isRunning) {
            interval = setInterval(() => {
                if (segundos === 0) {
                    if (minutos === 0) {
                        // Você pode lidar com o fim da pausa aqui
                        // Por exemplo, você pode definir a pausa para 5 minutos após a pausa:
                        setIsBreak(true);
                        setMinutos(5);
                        setSegundos(0);
                    } else {
                        setMinutos((prevMinutos) => prevMinutos - 1);
                        setSegundos(59);
                    }
                } else {
                    setSegundos((prevSegundos) => prevSegundos - 1);
                }
            }, 1000);
        } else {
            clearInterval(interval); // Limpa o intervalo quando o temporizador é pausado
        }

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }, [isRunning, minutos, segundos]);

    const handleStartStop = () => {
        setIsRunning((prevIsRunning) => !prevIsRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setIsBreak(false);
        setMinutos(25);
        setSegundos(0);
    };

    return (
        <div className="timer-container">
            <h1 className="timer">Pomodoro Timer 🍅</h1>
            <span className="timer">
                {minutos.toString().padStart(2, "0")}:{segundos.toString().padStart(2, "0")}
            </span>
            <div className="buttons">
                <button onClick={handleStartStop}>
                    {isRunning ? "Pausar" : "Iniciar"}
                </button>
                <button onClick={handleReset}>Reiniciar</button>
            </div>
            {isBreak && <p>Tire um pausa! 😌</p>}
        </div>
    );
}

export default PomodoroTimer;
