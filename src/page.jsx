import React, { useState } from 'react';
import './App.css';

function StepOne({ formData, setFormData, onNext }) {
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div>
            <h2>Step 1: Project Information</h2>
            <label>
                Project Name:
                <input type="text" name="projectName" value={formData.projectName} onChange={handleChange} />
            </label>
            {/* Add other input fields for project description, client, contractor */}
            <button onClick={onNext}>Next</button>
        </div>
    );
}

function StepTwo({ formData, csvData }) {
    return (
        <div>
            <h2>Step 2: CSV Data and Settings</h2>
            <p>Project Name: {formData.projectName}</p>
            {/* Display other form data */}
            {csvData ? (
                <div>
                    <p>CSV Data:</p>
                    {/* Display CSV data */}
                </div>
            ) : (
                <div>
                    <label>
                        Max X:
                        <input type="number" name="maxX" value={formData.maxX} />
                    </label>
                    {/* Add other input fields for min/max X, Y, Z */}
                </div>
            )}
        </div>
    );
}

function App() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        projectName: '',
        projectDescription: '',
        client: '',
        contractor: '',
        maxX: '',
        minX: '',
        maxY: '',
        minY: '',
        maxZ: '',
        minZ: '',
    });
    const [csvData, setCSVData] = useState(null);

    const handleCSVUpload = (csvFile) => {
        // Handle CSV file upload and extract data
        // Set CSV data and calculate min/max for X, Y, Z
    };

    const handleNext = () => {
        if (step === 1) {
            setStep(2);
        } else if (step === 2) {
            // Perform any final processing or submission
        }
    };

    return (
        <div className="App">
            {step === 1 && (
                <StepOne formData={formData} setFormData={setFormData} onNext={handleNext} />
            )}
            {step === 2 && (
                <StepTwo formData={formData} csvData={csvData} />
            )}
        </div>
    );
}

export default App;