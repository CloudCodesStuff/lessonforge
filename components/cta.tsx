const Cta = () => {
    return (
        <section  className="bg-white font-plus dark:bg-gray-900">
            <div  className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <div  className="max-w-screen-md">
                    <h2  className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Start planning <span className=" text-transparent bg-clip-text bg-gradient-to-bl from-primary-400 to-primary-600">5x</span> faster.</h2>
                    <p  className="mb-8 font-light text-gray-500 sm:text-xl dark:text-gray-400">Lessonforge helps you unlock your teaching potential. Stop stressing over lessonplans, leave that to us.</p>
                    <div  className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                        <a href="/sign-up"  className="inline-flex items-center justify-center px-4 py-2.5 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                            Get started
                        </a>
                       
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Cta;