import React from 'react';

const LogoGallery = () => {
  const logos = [
    { name: 'JavaScript', src: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png' },
    { name: 'Python', src: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' },
    { name: 'Java', src: 'https://www.oracle.com/a/ocom/img/obic-java-cup.svg' }, // Oracle official logo
    { name: 'C++', src: 'https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg' },
    { name: 'C#', src: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/C_Sharp_wordmark.svg' },
    { name: 'PHP', src: 'https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg' },
    { name: 'Ruby', src: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Ruby_logo.svg' },
    { name: 'Go', src: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg' },
    { name: 'Swift', src: 'https://developer.apple.com/swift/images/swift-og.png' }, // Apple official swift logo
    { name: 'TypeScript', src: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg' },
    { name: 'C', src: 'https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg' },  // Kotlin official logo
    { name: 'Rust', src: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Rust_programming_language_black_logo.svg' },
  ];

  return (
    <div className="container mx-auto p-4 my-[1rem]">
      <h2 className="font-semibold mb-4 text-center text-purple-900 text-3xl">Programming Languages</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {logos.map((logo) => (
          <div key={logo.name} className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-md">
            <img src={logo.src} alt={logo.name} className="h-16 w-auto object-contain mb-2" />
            <span className="text-sm">{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoGallery;