import React, { useState, useEffect, useRef } from 'react';

const BlogAnimation = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const codeSnippetsRef = useRef({}); 

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const calculateCodeSnippetOpacity = (snippetId) => {
    const snippetRef = codeSnippetsRef.current[snippetId];
    if (!snippetRef) return 0;
    const elementTop = snippetRef.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.7;
    if (elementTop < triggerPoint) {
      return 1;
    }
    return 0;
  };

  const calculateCodeSnippetTranslateY = (snippetId) => {
    const snippetRef = codeSnippetsRef.current[snippetId];
    if (!snippetRef) return 50;
    const elementTop = snippetRef.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.7;
    if (elementTop < triggerPoint) {
      return 0;
    }
    return 50;
  };

  const calculateTitleScale = () => {
    const maxScroll = 200;
    if (scrollPosition > maxScroll) {
      return 1;
    }
    return 1 + (maxScroll - scrollPosition) / 100;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ transform: `scale(${calculateTitleScale()})`, transition: 'transform 0.3s ease' }}>
          Coding Chronicles
        </h1>
        <p className="text-lg text-gray-300">
          Unlocking the secrets of software development.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Analysis with Python</h2>
          <p className="text-gray-300">
            Explore powerful data manipulation and analysis using Python's Pandas library.
          </p>
          <div
            ref={(el) => (codeSnippetsRef.current['python'] = el)}
            className="bg-gray-700 rounded-md p-4 mb-8 transition-opacity transition-transform duration-500"
            style={{
              opacity: calculateCodeSnippetOpacity('python'),
              transform: `translateY(${calculateCodeSnippetTranslateY('python')}px)`,
            }}
          >
            <pre className="text-sm">
              <code>
                {`
import pandas as pd
data = pd.read_csv('data.csv')
print(data.head())
                `}
              </code>
            </pre>
          </div>
        </div>

        {/* Java Example */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Building APIs with Java Spring Boot</h2>
          <p className="text-gray-300">
            Learn how to create robust RESTful APIs using Java and Spring Boot.
          </p>
          <div
            ref={(el) => (codeSnippetsRef.current['java'] = el)}
            className="bg-gray-700 rounded-md p-4 mb-8 transition-opacity transition-transform duration-500"
            style={{
              opacity: calculateCodeSnippetOpacity('java'),
              transform: `translateY(${calculateCodeSnippetTranslateY('java')}px)`,
            }}
          >
            <pre className="text-sm">
              <code>
                {`
@RestController
public class GreetingController {
  @GetMapping("/greeting")
  public String greeting() {
    return "Hello, Spring Boot!";
  }
}
                `}
              </code>
            </pre>
          </div>
        </div>

        {/* JavaScript Example */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Asynchronous JavaScript with Async/Await</h2>
          <p className="text-gray-300">
            Master asynchronous programming in JavaScript using async/await syntax.
          </p>
          <div
            ref={(el) => (codeSnippetsRef.current['javascript'] = el)}
            className="bg-gray-700 rounded-md p-4 mb-8 transition-opacity transition-transform duration-500"
            style={{
              opacity: calculateCodeSnippetOpacity('javascript'),
              transform: `translateY(${calculateCodeSnippetTranslateY('javascript')}px)`,
            }}
          >
            <pre className="text-sm">
              <code>
                {`
async function fetchData() {
  const response = await fetch('/api/data');
  const data = await response.json();
  console.log(data);
}
fetchData();
                `}
              </code>
            </pre>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-20 h-20 rounded-full bg-blue-500 blur-2xl"
          style={{
            top: '10%',
            left: '5%',
            transform: `translate(${scrollPosition / 15}px, ${-scrollPosition / 20}px)`,
            transition: 'transform 0.5s ease',
          }}
        ></div>
        <div
          className="absolute w-30 h-30 rounded-full bg-green-500 blur-2xl"
          style={{
            bottom: '20%',
            right: '10%',
            transform: `translate(${-scrollPosition / 10}px, ${scrollPosition / 18}px)`,
            transition: 'transform 0.5s ease',
          }}
        ></div>
      </div>
    </div>
  );
};

export default BlogAnimation;