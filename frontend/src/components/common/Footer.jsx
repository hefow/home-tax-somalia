import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <div className="container mx-auto">
        <p>&copy; 2023 Home Tax Somalia. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-gray-400">Facebook</a>
          <a href="#" className="hover:text-gray-400">Twitter</a>
          <a href="#" className="hover:text-gray-400">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
