import React, { useState, useEffect, useRef } from 'react';

const ProgrammingIntroSlider = ({ slides }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const sliderRef = useRef(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 6000);

        return () => clearInterval(intervalId);
    }, [slides]);

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
        }
    }, [currentSlideIndex]);

    return (
        <div className="w-full overflow-hidden rounded-lg shadow-md bg-white">
            <div className="relative overflow-hidden">
                <div
                    ref={sliderRef}
                    className="flex transition-transform duration-1000 ease-in-out"
                    style={{ width: `${slides.length * 100}%` }}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-full p-6"
                            style={{ width: `100%` }}
                        >
                            <h3 className="text-2xl font-semibold mb-2 text-gray-800">{slide.title}</h3>
                            <p className="text-gray-700">{slide.content}</p>
                            {slide.image && (
                                <img src={slide.image} alt={slide.title} className="h-16 w-auto object-contain mb-2" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const LanguageTransition = () => {
    const introSlides = [
        {
            title: 'Welcome to the World of Python',
            content: 'Python is a versatile language used for web development, data science, and more. Its simple syntax makes it beginner-friendly.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg'
        },
        {
            title: 'JavaScript: The Language of the Web',
            content: 'JavaScript powers interactive websites and web applications. Learn how to create dynamic user experiences.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png'
        },
        {
            title: 'Java: Robust and Scalable',
            content: 'Java is known for its robustness and scalability. It is widely used in enterprise applications and Android development.',
            image: 'https://www.oracle.com/a/ocom/img/obic-java-cup.svg'
        },
        {
            title: 'C++: High Performance Computing',
            content: 'C++ is a powerful language used for system programming, game development, and high-performance applications.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg'
        }
    ];

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-8 text-center tracking-tight">
                Programming Language Introductions
            </h2>
            <ProgrammingIntroSlider slides={introSlides} />
        </div>
    );
};

export default LanguageTransition;