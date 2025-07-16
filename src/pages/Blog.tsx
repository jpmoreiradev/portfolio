import React from 'react';

import Header from '../components/Header';
import Blogs from '../components/Blog';
import Footer from '../components/Footer';

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Blogs />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
