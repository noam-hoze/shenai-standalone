import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState(null);
    const canvasRef = useRef(null);
    const shenaiSdkRef = useRef(null);

    const handleStartScan = async () => {
        const log = (message) => console.log(message);
        const logError = (message, error) => console.error(message, error);

        try {
            const sdkUrl = new URL(
                `/sdk/index.mjs?v=${Date.now()}`,
                window.location.origin
            ).href;
            log(`Importing SDK from: ${sdkUrl}`);
            const sdkModule = await import(/* @vite-ignore */ sdkUrl);
            log("SDK module imported.");

            const sdkFactory = sdkModule.default;
            if (typeof sdkFactory !== "function") {
                throw new Error(
                    "SDK module did not provide a default export function."
                );
            }

            const shenaiSdk = await sdkFactory({
                onRuntimeInitialized: () => log("Shen.AI Runtime Initialized."),
            });
            shenaiSdkRef.current = shenaiSdk;
            log("SDK Factory executed.");

            const apiKey = "25d226de9cfd4aa0a8790609f44909c7";
            const settings = {
                cameraMode: shenaiSdk.CameraMode.FACING_USER,
                showUserInterface: true,
                showFacePositioningOverlay: true,
                enableStartAfterSuccess: true,
                enableSummaryScreen: false,
            };
            log("Settings configured. Initializing SDK...");

            shenaiSdk.initialize(apiKey, "", settings, (result) => {
                log(
                    `Initialization callback received. Result object: ${JSON.stringify(
                        result,
                        null,
                        2
                    )}`
                );
                if (result === shenaiSdk.InitializationResult.OK) {
                    log("SDK Initialization successful.");
                    try {
                        log("Attaching to canvas #mxcanvas...");
                        shenaiSdk.attachToCanvas(canvasRef.current);
                        log(
                            "Successfully attached. Waiting for camera permission..."
                        );
                    } catch (attachError) {
                        logError("Failed to attach to canvas.", attachError);
                    }
                } else {
                    logError(`SDK Initialization failed with code: ${result}`);
                }
            });

            const measurementInterval = setInterval(() => {
                const measurementState = shenaiSdk.getMeasurementState();
                if (measurementState === shenaiSdk.MeasurementState.FINISHED) {
                    clearInterval(measurementInterval);
                    log("Measurement finished. Getting results...");

                    const scanResults = shenaiSdk.getMeasurementResults();
                    const hr10s = shenaiSdk.getHeartRate10s();
                    const hr4s = shenaiSdk.getHeartRate4s();

                    const fullResults = {
                        heart_rate_bpm: scanResults.heart_rate_bpm,
                        hrv_sdnn_ms: scanResults.hrv_sdnn_ms,
                        breathing_rate_bpm: scanResults.breathing_rate_bpm,
                        stress_index: scanResults.stress_index,
                        systolic_blood_pressure_mmhg:
                            scanResults.systolic_blood_pressure_mmhg,
                        diastolic_blood_pressure_mmhg:
                            scanResults.diastolic_blood_pressure_mmhg,
                        cardiac_workload_mmhg_per_sec:
                            scanResults.cardiac_workload_mmhg_per_sec,
                        parasympathetic_activity:
                            scanResults.parasympathetic_activity,
                        bmi_kg_per_m2: scanResults.bmi_kg_per_m2,
                        hr10s: hr10s,
                        hr4s: hr4s,
                    };

                    log("Scan Results:", fullResults);
                    setResults(fullResults);
                    setShowResults(true);
                }
            }, 500);
        } catch (error) {
            logError("A fatal error occurred during the test.", error);
        }
    };

    const handleScanAgain = () => {
        window.location.reload();
    };

    const handleBackToDashboard = (e) => {
        e.preventDefault();
        // This should probably use React Router if this were a larger app
        window.history.back();
    };

    return (
        <div className="App">
            {!showResults ? (
                <div id="container">
                    <canvas id="mxcanvas" ref={canvasRef}></canvas>
                    <button id="startButton" onClick={handleStartScan}>
                        Start Scan
                    </button>
                </div>
            ) : (
                <div id="resultsContainer" className="results-container">
                    <h1 className="results-header">Health Check Results</h1>
                    <div className="results-grid">
                        {/* Heart Rate Card */}
                        <div className="metric-card border-color-heart">
                            <div className="metric-card-content">
                                <div className="metric-card-header">
                                    <div className="metric-title-group">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="metric-icon text-color-heart"
                                        >
                                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                        </svg>
                                        <span className="metric-title">
                                            Heart Rate
                                        </span>
                                    </div>
                                    <div className="metric-value-group">
                                        <span
                                            id="heart_rate_bpm"
                                            className="metric-value"
                                        >
                                            {results?.heart_rate_bpm?.toFixed(
                                                1
                                            ) ?? "--"}
                                        </span>
                                        <span className="metric-range">
                                            60-100 bpm
                                        </span>
                                    </div>
                                </div>
                                <p className="metric-description">
                                    Measures the average number of heartbeats
                                    per minute, which reflects the current state
                                    of the autonomic nervous system and may be
                                    indicative of the cardiovascular fitness
                                    level.
                                </p>
                                <div className="not-enough-data">
                                    Not enough data to display trend
                                </div>
                            </div>
                        </div>

                        {/* Blood Pressure Card */}
                        <div className="metric-card border-color-bp">
                            <div className="metric-card-content">
                                <div className="metric-card-header">
                                    <div className="metric-title-group">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="metric-icon text-color-bp"
                                        >
                                            <path d="M3 3v18h18" />
                                            <path d="m19 9-5 5-4-4-3 3" />
                                        </svg>
                                        <span className="metric-title">
                                            Blood Pressure
                                        </span>
                                    </div>
                                    <div className="metric-value-group">
                                        <span className="metric-value text-color-bp">
                                            <span id="systolic_blood_pressure_mmhg">
                                                {results?.systolic_blood_pressure_mmhg?.toFixed(
                                                    0
                                                ) ?? "--"}
                                            </span>
                                            /
                                            <span id="diastolic_blood_pressure_mmhg">
                                                {results?.diastolic_blood_pressure_mmhg?.toFixed(
                                                    0
                                                ) ?? "--"}
                                            </span>{" "}
                                            mmHg
                                        </span>
                                        <span className="metric-range">
                                            90-129 / 60-84 mmHg
                                        </span>
                                    </div>
                                </div>
                                <p className="metric-description">
                                    Blood pressure readings consist of two key
                                    numbers that indicate cardiovascular health.
                                    The first systolic pressure (SBP), measures
                                    the peak pressure in the arteries during
                                    heartbeats, while the second, diastolic
                                    pressure (DBP), represents the resting
                                    pressure between beats.
                                </p>
                                <div className="not-enough-data">
                                    Not enough data to display trend
                                </div>
                            </div>
                        </div>

                        {/* HRV Card */}
                        <div className="metric-card border-color-hrv">
                            <div className="metric-card-content">
                                <div className="metric-card-header">
                                    <div className="metric-title-group">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="metric-icon text-color-hrv"
                                        >
                                            <rect
                                                width="18"
                                                height="18"
                                                x="3"
                                                y="3"
                                                rx="2"
                                            />
                                            <path d="M7 12h10" />
                                        </svg>
                                        <span className="metric-title">
                                            Heart Rate Variability (HRV)
                                        </span>
                                    </div>
                                    <div className="metric-value-group">
                                        <span
                                            id="hrv_sdnn_ms"
                                            className="metric-value"
                                        >
                                            {results?.hrv_sdnn_ms?.toFixed(1) ??
                                                "--"}
                                        </span>
                                        <span className="metric-range">ms</span>
                                    </div>
                                </div>
                                <p className="metric-description">
                                    Measures the variation in time intervals
                                    between the heartbeats, which reflects the
                                    state of the autonomic nervous system.
                                </p>
                                <div className="not-enough-data">
                                    Not enough data to display trend
                                </div>
                            </div>
                        </div>

                        {/* Breathing Rate Card */}
                        <div className="metric-card border-color-br">
                            <div className="metric-card-content">
                                <div className="metric-card-header">
                                    <div className="metric-title-group">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="metric-icon text-color-br"
                                        >
                                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
                                            <path d="M16 16.5a4.5 4.5 0 0 0-9 0" />
                                            <path d="M8.5 12.5a4.5 4.5 0 0 1 7.2-3.2A4.5 4.5 0 0 1 15.5 17" />
                                        </svg>
                                        <span className="metric-title">
                                            Breathing Rate (BR)
                                        </span>
                                    </div>
                                    <div className="metric-value-group">
                                        <span
                                            id="breathing_rate_bpm"
                                            className="metric-value"
                                        >
                                            {results?.breathing_rate_bpm?.toFixed(
                                                1
                                            ) ?? "--"}
                                        </span>
                                        <span className="metric-range">
                                            12-20 bpm
                                        </span>
                                    </div>
                                </div>
                                <p className="metric-description">
                                    Counts breaths per minute, reflecting
                                    respiratory status and (indirectly) stress
                                    level.
                                </p>
                                <div className="not-enough-data">
                                    Not enough data to display trend
                                </div>
                            </div>
                        </div>

                        {/* Stress Index Card */}
                        <div className="metric-card border-color-stress">
                            <div className="metric-card-content">
                                <div className="metric-card-header">
                                    <div className="metric-title-group">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="metric-icon text-color-stress"
                                        >
                                            <path d="M14 4h-4v10h4V4Z" />
                                            <path d="M10.5 4h.5" />
                                            <path d="M14 14h-4" />
                                            <path d="M10 18a2 2 0 0 1-2-2v-2h8v2a2 2 0 0 1-2 2Z" />
                                            <path d="M12 2a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1Z" />
                                        </svg>
                                        <span className="metric-title">
                                            Stress Index
                                        </span>
                                    </div>
                                    <div className="metric-value-group">
                                        <span
                                            id="stress_index"
                                            className="metric-value"
                                        >
                                            {results?.stress_index?.toFixed(
                                                1
                                            ) ?? "--"}
                                        </span>
                                        <span className="metric-range">
                                            0-4
                                        </span>
                                    </div>
                                </div>
                                <p className="metric-description">
                                    Indicates whether the heart is working in a
                                    stressed or relaxed manner.
                                </p>
                                <div className="not-enough-data">
                                    Not enough data to display trend
                                </div>
                            </div>
                        </div>

                        {/* Cardiac Workload */}
                        <div className="metric-card border-color-cardiac">
                            <div className="metric-card-content">
                                <div className="metric-card-header">
                                    <div className="metric-title-group">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="metric-icon text-color-cardiac"
                                        >
                                            <rect
                                                width="18"
                                                height="18"
                                                x="3"
                                                y="3"
                                                rx="2"
                                            />
                                            <path d="M7 12h10" />
                                        </svg>
                                        <span className="metric-title">
                                            Cardiac Workload
                                        </span>
                                    </div>
                                    <div className="metric-value-group">
                                        <span
                                            id="cardiac_workload"
                                            className="metric-value"
                                        >
                                            {results?.cardiac_workload_mmhg_per_sec?.toFixed(
                                                1
                                            ) ?? "--"}
                                        </span>
                                        <span className="metric-range">
                                            90-216 mmHg/s
                                        </span>
                                    </div>
                                </div>
                                <p className="metric-description">
                                    Indicates the work that the heart needs to
                                    do to pump blood.
                                </p>
                                <div className="not-enough-data">
                                    Not enough data to display trend
                                </div>
                            </div>
                        </div>

                        {/* Parasympathetic Activity */}
                        <div className="metric-card border-color-para">
                            <div className="metric-card-content">
                                <div className="metric-card-header">
                                    <div className="metric-title-group">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="metric-icon text-color-para"
                                        >
                                            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.2a1 1 0 0 0 1 1h.1a2.4 2.4 0 0 1 2.4 2.4v.1a1 1 0 0 0 1 1h1.2a2.5 2.5 0 0 1 2.5 2.5v1.6a2.5 2.5 0 0 1-2.5 2.5h-1.2a1 1 0 0 0-1 1v.1a2.4 2.4 0 0 1-2.4 2.4h-.1a1 1 0 0 0-1 1v1.2a2.5 2.5 0 0 1-5 0v-1.2a1 1 0 0 0-1-1h-.1a2.4 2.4 0 0 1-2.4-2.4v-.1a1 1 0 0 0-1-1H4.5a2.5 2.5 0 0 1-2.5-2.5V12a2.5 2.5 0 0 1 2.5-2.5h1.2a1 1 0 0 0 1-1V8.4a2.4 2.4 0 0 1 2.4-2.4h.1a1 1 0 0 0 1-1V4.5A2.5 2.5 0 0 1 9.5 2Z" />
                                        </svg>
                                        <span className="metric-title">
                                            Parasympathetic Activity
                                        </span>
                                    </div>
                                    <div className="metric-value-group">
                                        <span
                                            id="parasympathetic_activity"
                                            className="metric-value"
                                        >
                                            {results?.parasympathetic_activity?.toFixed(
                                                1
                                            ) ?? "--"}
                                        </span>
                                        <span className="metric-range">%</span>
                                    </div>
                                </div>
                                <p className="metric-description">
                                    Assesses the activity of the parasympathetic
                                    nervous system, which is responsible for
                                    body relaxation and recovery from stress.
                                </p>
                                <div className="not-enough-data">
                                    Not enough data to display trend
                                </div>
                            </div>
                        </div>

                        {/* Body Mass Index (BMI) */}
                        <div className="metric-card border-color-bmi">
                            <div className="metric-card-content">
                                <div className="metric-card-header">
                                    <div className="metric-title-group">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="metric-icon text-color-bmi"
                                        >
                                            <path d="m16 16 3-8 3 8c-2 1-4 1-6 0" />
                                            <path d="M2 16h3" />
                                            <path d="M19 16h3" />
                                            <path d="M10 3v18" />
                                            <path d="M10 7.5h12" />
                                            <path d="M10 12h12" />
                                            <path d="m5 8 3-6 3 6c-2 1-4 1-6 0" />
                                        </svg>
                                        <span className="metric-title">
                                            Body Mass Index (BMI)
                                        </span>
                                    </div>
                                    <div className="metric-value-group">
                                        <span id="bmi" className="metric-value">
                                            {results?.bmi_kg_per_m2?.toFixed(
                                                1
                                            ) ?? "--"}
                                        </span>
                                        <span className="metric-range">
                                            18.5-24.9 kg/m²
                                        </span>
                                    </div>
                                </div>
                                <p className="metric-description">
                                    Body Mass Index, which indicates if your
                                    weight is appropriate for your height.
                                </p>
                                <div className="not-enough-data">
                                    Not enough data to display trend
                                </div>
                            </div>
                        </div>
                        <button id="scanAgainButton" onClick={handleScanAgain}>
                            Scan Again
                        </button>
                    </div>
                </div>
            )}
            <a href="#" id="backLink" onClick={handleBackToDashboard}>
                Go Back to Dashboard
            </a>
        </div>
    );
}

export default App;
