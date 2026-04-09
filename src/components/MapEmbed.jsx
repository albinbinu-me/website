import React from 'react';
import { useStore } from '../context/context';

const MapEmbed = () => {
  const storeData = useStore();

  return (
    <div className="w-full overflow-hidden bg-white rounded-2xl shadow-depth-2 border border-stone-gray/8 p-5">
      <h3 className="font-serif text-2xl text-site-text mb-5 ml-1">
        {storeData.contact.mapTitle}
      </h3>
      <div className="w-full relative rounded-xl overflow-hidden">
        <iframe
          title="Store Location"
          src={storeData.mapEmbedUrl}
          width="100%"
          height="480"
          style={{
            border: 0,
            borderRadius: '12px',
            filter: 'grayscale(0.3) contrast(1.08) brightness(1.02)',
            display: 'block'
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="mt-5 ml-1 space-y-1">
        <p className="text-site-secondary text-sm leading-relaxed">{storeData.address}</p>
        <p className="text-site-secondary text-sm">{storeData.area}</p>
      </div>
    </div>
  );
};

export default MapEmbed;
