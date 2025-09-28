import React from 'react';

const AboutPage = () => {
  return (
    <main className="min-h-screen pt-20 flex items-center justify-center">
      <div className="text-center max-w-4xl px-4">
        <h1 className="text-4xl font-bold mb-6 text-green-800">
          Our Story
        </h1>
        <p className="text-xl text-green-700 mb-6">
          The problem I saw: Companies refresh laptops every 3-4 years. 
          Perfectly good machines are either shredded or sold into grey markets where data leaks happen. 
          Meanwhile, 100 million kids worldwide still don&apos;t have a device to learn on.
        </p>
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
          <p className="text-lg text-green-800">
            Give us your used laptops, we will wipe them to government-certified nothing, 
            then hand them to schools & NGOs. Zero data, zero doubt, zero cost to do good.
          </p>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
