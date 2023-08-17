import React from 'react';
import Steps from './Steps';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

const StepOne = () => {
    const navigate = useNavigate()
    let info = JSON.parse(localStorage.getItem('info'))
    console.log('Info: ', info);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        // console.log(data)
        localStorage.setItem('info', JSON.stringify(data))
        navigate('/step-two')
    }

    return (
        <div className='max-w-7xl mx-auto px-5 mt-12 mb-24'>
            <Steps step1 />

            <div className="flex mt-12">
                <form onSubmit={handleSubmit(onSubmit)} className=" md:w-1/2 bg-white rounded-lg p-8 flex flex-col mx-auto w-full relative z-10 shadow-md border">
                    <div className="relative mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Project Name</label>
                        <input type="text" id="name" {...register("name", { required: true })} name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" defaultValue={info?.name} />
                        {errors.name && <span className='text-red-500 text-sm'>Project Name field is required</span>}
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="description" className="leading-7 text-sm text-gray-600">Project Description</label>
                        <textarea id="description" {...register("description", { required: true })} name="description" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-24 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" defaultValue={info?.description} ></textarea>
                        {errors.description && <span className='text-red-500 text-sm'>Project description field is required</span>}

                    </div>

                    <div className="relative mb-4">
                        <label htmlFor="client" className="leading-7 text-sm text-gray-600">Client</label>
                        <input type="text" id="client" {...register("client", { required: true })} name="client" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" defaultValue={info?.client} />
                        {errors.client && <span className='text-red-500 text-sm'>Client field is required</span>}
                    </div>

                    <div className="relative mb-4">
                        <label htmlFor="contractor" className="leading-7 text-sm text-gray-600">Contractor</label>
                        <input type="text" id="contractor" {...register("contractor", { required: true })} name="contractor" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" defaultValue={info?.contractor} />
                        {errors.contractor && <span className='text-red-500 text-sm' >Contractor field is required</span>}
                    </div>

                    <button type='submit' className="mt-3 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Next</button>
                </form>
            </div>

        </div>
    );
};

export default StepOne;