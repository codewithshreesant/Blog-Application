
import React from 'react'
import Button from '../Button/Button'
import Recommended from '../Recommended_Blogs/Recommended'
import BlogSlider from '../slider/BlogSlider'
import LogoGallery from '../logo_gallery/LogoGallery';
import BlogAnimation from '../scroll_animation/BlogAnimation';
import LanguageTransition from '../programming_transition/LanguageTransition';

function Home() {
  const programmingLanguages = ['JavaScript', 'Python', 'Java', 'C++', 'Rust', 'Go', 'Swift', 'Kotlin'];
  const slides = [
    {
      image: 'https://images.pexels.com/photos/6424590/pexels-photo-6424590.jpeg?auto=compress&cs=tinysrgb&w=600', // Replace with your image path
      title: 'Mastering Python: A Beginner’s Guide',
      description: 'Learn the fundamentals of Python programming and kickstart your coding journey.',
      link: '/blog/python-beginners-guide',
      alt: 'Python Beginners Guide',
    },
    {
      image: 'https://images.pexels.com/photos/360591/pexels-photo-360591.jpeg?auto=compress&cs=tinysrgb&w=600', // Replace with your image path
      title: 'JavaScript: Beyond the Basics',
      description: 'Explore advanced JavaScript concepts and techniques to enhance your web development skills.',
      link: '/blog/javascript-advanced',
      alt: 'JavaScript Advanced',
    },
    {
      image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=600', // Replace with your image path
      title: 'C++: From Fundamentals to Applications',
      description: 'Discover the power of C++ and build robust applications with this versatile programming language.',
      link: '/blog/cpp-fundamentals',
      alt: 'C++ Fundamentals',
    },
    {
      image: 'https://images.pexels.com/photos/11035384/pexels-photo-11035384.jpeg?auto=compress&cs=tinysrgb&w=600', // Replace with your image path
      title: 'Rust: Safe and Concurrent Systems Programming',
      description: 'Dive into Rust programming and learn how to build reliable and efficient systems.',
      link: '/blog/rust-programming',
      alt: 'Rust Programming',
    },
  ];
  return (
    <div>
      <div className='h-[60vh] flex md:flex-row flex-col justify-around items-center'>
        <div className='md:w-[40vw] w-[60vw] flex flex-col gap-[1.5rem]'>
          <h1 className="text-2xl md:text-5xl lg:text-5xl font-extrabold text-center text-purple-600 mt-6 mb-4 shadow-lg">
            Shrisant_Academy
          </h1>
          <p className='text-justify h-[40vh] w-[60vw] md:w-auto md:h-auto' >
            your ultimate destination for all things coding! Whether you're a novice eager to learn or a seasoned developer looking to sharpen your skills, our articles, tutorials, and expert insights will guide you through the fascinating world of programming languages. From Python to JavaScript, C++ to Rust, we've got you covered. Dive in, and let's unlock the power of code together!
          </p>
          <div className='flex gap-[1rem]'>
            <Button name='Explore Now' path='/blogs' />
            <Button name='Learn More' path='/blogs' />
          </div>
        </div>
        <div className="hidden md:block">
          <img src="images/hero_section.png" alt="hero section" className='h-[50vh] w-[30vw]' />
        </div>
      </div>
      <Recommended />
      <BlogSlider slides={slides} />
      <LogoGallery />
      <BlogAnimation />
      <LanguageTransition languages={programmingLanguages} />
    </div>
  )
}

export default Home