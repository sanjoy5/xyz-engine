import React from 'react';
import { Link } from 'react-router-dom';

const Steps = ({ step1, step2 }) => {
    return (
        <>
            <section className="max-w-7xl mx-auto px-5">
                <div className="flex flex-wrap items-center justify-center">

                    {
                        step1 ? <>

                            <Link to='/' className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium  inline-flex items-center leading-none border-indigo-500 text-indigo-500 tracking-wider rounded-t">
                                STEP 1
                            </Link>
                        </> :
                            <>
                                <button className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start  title-font font-medium  inline-flex items-center leading-none  text-gray-500 tracking-wider rounded-t" disabled>
                                    STEP 1
                                </button>
                            </>
                    }

                    {
                        step2 ? <>
                            <Link to='/step-two' className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium  inline-flex items-center leading-none border-indigo-500 text-indigo-500 tracking-wider rounded-t">
                                STEP 2
                            </Link>
                        </>
                            : <>
                                <button className="sm:px-6 py-3 w-1/2 sm:w-auto justify-center sm:justify-start  title-font font-medium  inline-flex items-center leading-none  text-gray-500 tracking-wider rounded-t" disabled>
                                    STEP 2
                                </button>
                            </>

                    }



                </div>
            </section>
        </>
    );
};

export default Steps;