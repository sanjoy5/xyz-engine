import React, { useEffect, useState } from 'react';
import Steps from './Steps';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import Swal from 'sweetalert2';
import ChartComponent from '../ChartComponent';
import ResponsiveLineChart from '../ResponsiveLineChart';


const StepTwo = () => {
    let info = JSON.parse(localStorage.getItem('info'))
    const navigate = useNavigate()

    const [csvData, setCsvData] = useState([]);
    // console.log('Csv Data : ', csvData);


    const [minMaxValues, setMinMaxValues] = useState({
        max_X: '',
        min_X: '',
        max_Y: '',
        min_Y: '',
        max_Z: '',
        min_Z: '',
    });

    // Chart added 
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (csvData.length > 0) {
            const newChartData = csvData.map((row) => ({ KP: row.KP, X: parseFloat(row.X) }));
            setChartData(newChartData);
        }
    }, [csvData]);

    // Upload CSV file  

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
                const data = result.data;

                let max_X = Number.MIN_SAFE_INTEGER;
                let min_X = Number.MAX_SAFE_INTEGER;
                let max_Y = Number.MIN_SAFE_INTEGER;
                let min_Y = Number.MAX_SAFE_INTEGER;
                let max_Z = Number.MIN_SAFE_INTEGER;
                let min_Z = Number.MAX_SAFE_INTEGER;

                data.forEach((row) => {
                    const xValue = parseFloat(row.X);
                    const yValue = parseFloat(row.Y);
                    const zValue = parseFloat(row.Z);

                    max_X = Math.max(max_X, xValue);
                    min_X = Math.min(min_X, xValue);
                    max_Y = Math.max(max_Y, yValue);
                    min_Y = Math.min(min_Y, yValue);
                    max_Z = Math.max(max_Z, zValue);
                    min_Z = Math.min(min_Z, zValue);
                });

                setMinMaxValues({
                    max_X: max_X.toString(),
                    min_X: min_X.toString(),
                    max_Y: max_Y.toString(),
                    min_Y: min_Y.toString(),
                    max_Z: max_Z.toString(),
                    min_Z: min_Z.toString(),
                });

                setCsvData(data);
            },
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMinMaxValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };




    // Form Submission 
    const handleSubmitForm = (event) => {
        event.preventDefault()
        if (
            minMaxValues.max_X === '' ||
            minMaxValues.min_X === '' ||
            minMaxValues.max_Y === '' ||
            minMaxValues.min_Y === '' ||
            minMaxValues.max_Z === '' ||
            minMaxValues.min_Z === ''
        ) {

            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Please fill all fields',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        let resultData = { name: info?.name, description: info?.description, client: info?.client, contractor: info?.contractor, maxX: minMaxValues?.max_X, minX: minMaxValues?.min_X, maxY: minMaxValues?.max_Y, minY: minMaxValues?.min_Y, maxZ: minMaxValues?.max_Z, minZ: minMaxValues?.min_Z }
        console.log('result : ', resultData);
        localStorage.setItem('resultData', JSON.stringify(resultData))
        localStorage.removeItem('info')
        navigate('/result')
    }



    return (
        <div className='max-w-7xl mx-auto px-5 mt-12 mb-24'>
            <Steps step1 step2 />

            <div className="flex mt-12">
                <form className=" md:w-1/2 bg-white rounded-lg p-8 flex flex-col mx-auto w-full relative z-10 shadow-md border">
                    <div className=" mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Project Name</label>
                        <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" defaultValue={info?.name} disabled />

                    </div>
                    <div className=" mb-4">
                        <label htmlFor="description" className="leading-7 text-sm text-gray-600">Project Description</label>
                        <textarea id="description" name="description" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-20 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-8 transition-colors duration-200 ease-in-out" defaultValue={info?.description} disabled></textarea>

                    </div>

                    <div className="flex flex-col md:flex-row  mb-4 w-full gap-4">
                        <div className="w-full">
                            <label htmlFor="client" className="leading-7 text-sm text-gray-600">Client</label>
                            <input type="text" id="client" name="client" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" defaultValue={info?.client} disabled />

                        </div>

                        <div className="w-full">
                            <label htmlFor="contractor" className="leading-7 text-sm text-gray-600">Contractor</label>
                            <input type="text" id="contractor" name="contractor" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" defaultValue={info?.contractor} disabled />

                        </div>
                    </div>


                    <div className="divider"></div>

                    <div className=" mb-4">
                        <label htmlFor="file" className="leading-7 text-sm text-gray-600">Upload CSV File (Optional) </label>
                        <input onChange={handleFileUpload} type="file" id="file" name="csvFile" accept=".csv" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

                    </div>

                    <div className="mb-4">
                        {csvData.length > 0 && <ResponsiveLineChart data={chartData} />}
                    </div>

                    <div className="flex flex-col md:flex-row mb-4 w-full gap-4">
                        <div className="w-full">
                            <label htmlFor="maxX" className="leading-7 text-sm text-gray-600">Max X</label>
                            <input type="number" id="maxX" name="max_X"
                                value={minMaxValues.max_X}
                                onChange={handleInputChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required />

                        </div>

                        <div className="w-full">
                            <label htmlFor="minX" className="leading-7 text-sm text-gray-600">Min X</label>
                            <input type="number" id="minX" name="min_X"
                                value={minMaxValues.min_X}
                                onChange={handleInputChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row mb-4 w-full gap-4">
                        <div className="w-full">
                            <label htmlFor="maxY" className="leading-7 text-sm text-gray-600">Max Y</label>
                            <input type="number" id="maxY" name="max_Y"
                                value={minMaxValues.max_Y}
                                onChange={handleInputChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

                        </div>

                        <div className="w-full">
                            <label htmlFor="minY" className="leading-7 text-sm text-gray-600">Min Y</label>
                            <input type="number" id="minY" name="min_Y"
                                value={minMaxValues.min_Y}
                                onChange={handleInputChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row mb-4 w-full gap-4">
                        <div className="w-full">
                            <label htmlFor="maxZ" className="leading-7 text-sm text-gray-600">Max Z</label>
                            <input type="number" id="maxZ" name="max_Z"
                                value={minMaxValues.max_Z}
                                onChange={handleInputChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

                        </div>

                        <div className="w-full">
                            <label htmlFor="minZ" className="leading-7 text-sm text-gray-600">Min Z</label>
                            <input type="number" id="minZ" name="min_Z"
                                value={minMaxValues.min_Z}
                                onChange={handleInputChange} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

                        </div>
                    </div>


                    <button onClick={handleSubmitForm} type='submit' className="mt-3 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Submit</button>
                </form>



            </div>

        </div>
    );
};

export default StepTwo;