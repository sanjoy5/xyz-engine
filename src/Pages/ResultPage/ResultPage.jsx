import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useRef } from 'react';
import { BsDownload } from 'react-icons/bs';
const ResultPage = () => {
    const pdfRef = useRef()
    let info = JSON.parse(localStorage.getItem('info'))
    let result = JSON.parse(localStorage.getItem('resultData'))

    const downloadPDF = () => {
        const input = pdfRef.current
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/pnn')
            const pdf = new jsPDF('p', 'mm', 'a4', true)
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = pdf.internal.pageSize.getHeight()
            const imgWidth = canvas.width
            const imgHeight = canvas.height
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
            const imgX = (pdfWidth - imgWidth * ratio) / 2
            const imgY = 30
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
            pdf.save('prototype.pdf')
        })

    }
    return (
        <div className='max-w-7xl mx-auto px-5 mt-12 mb-24'>

            <div className="w-full flex items-center justify-center mb-8">
                <button onClick={downloadPDF} className="inline-flex items-center bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-base  text-white"> Download PDF <BsDownload className='ml-2 text-lg' /></button>
            </div>

            <div ref={pdfRef} className="md:w-1/2 bg-slate-100 rounded-lg p-8 flex flex-col mx-auto w-full relative z-10  ">
                <h1 className="text-2xl text-center font-bold mb-5  rounded">Prototype</h1>
                <div className='mb-4 text-center'>
                    <h2 className="text-xl mb-2 font-semibold text-indigo-500">Project Name:</h2>
                    <p className="text-lg text-black">{result?.name}</p>
                </div>
                <div className='mb-4 text-center'>
                    <h2 className="text-xl mb-2 font-semibold text-indigo-500">Project Description:</h2>
                    <p className="text-lg text-black">{result?.description}</p>
                </div>
                <div className="flex items-center gap-4 mb-4 text-center">
                    <div className='w-full'>
                        <h2 className="text-xl mb-2 font-semibold text-indigo-500">Client:</h2>
                        <p className="text-lg text-black">{result?.client}</p>
                    </div>
                    <div className='w-full'>
                        <h2 className="text-xl mb-2 font-semibold text-indigo-500">Contractor:</h2>
                        <p className="text-lg text-black">{result?.contractor}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 mb-4 text-center">
                    <div className='w-full'>
                        <h2 className="text-xl mb-2 font-semibold text-indigo-500">Max X:</h2>
                        <p className="text-lg text-black">{result?.maxX}</p>
                    </div>
                    <div className='w-full'>
                        <h2 className="text-xl mb-2 font-semibold text-indigo-500">Min X:</h2>
                        <p className="text-lg text-black">{result?.minX}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 mb-4 text-center">
                    <div className='w-full'>
                        <h2 className="text-xl mb-2 font-semibold text-indigo-500">Max Y:</h2>
                        <p className="text-lg text-black">{result?.maxY}</p>
                    </div>
                    <div className='w-full'>
                        <h2 className="text-xl mb-2 font-semibold text-indigo-500">Min Y:</h2>
                        <p className="text-lg text-black">{result?.minY}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 mb-4 text-center">
                    <div className='w-full'>
                        <h2 className="text-xl mb-2 font-semibold text-indigo-500">Max Z:</h2>
                        <p className="text-lg text-black">{result?.maxZ}</p>
                    </div>
                    <div className='w-full'>
                        <h2 className="text-xl mb-2 font-semibold text-indigo-500">Min Z:</h2>
                        <p className="text-lg text-black">{result?.minZ}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;