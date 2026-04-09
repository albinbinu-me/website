import React, { createContext, useContext } from 'react';
import { PRODUCTS } from './product_data';

/**
 * @used-by General utility
 * Configuration values and strings for the site.
 */
export const STORE = {
  /** @used-by Navbar.jsx — left side logo text, Footer.jsx */
  name: "Mall of Decor",
  /** @used-by Hero.jsx, Footer.jsx */
  tagline: "Where Every Corner Tells a Story",
  /** @used-by Footer.jsx, MapEmbed.jsx, Contact.jsx */
  address: "Thondayad Junction, Mavoor Rd, opposite SATHYA, Nearby Kalyan HyperMarket",
  /** @used-by Footer.jsx, MapEmbed.jsx, Contact.jsx */
  area: "Nellikkode, Kozhikode, Kerala 673016",
  /** @used-by Navbar.jsx, Footer.jsx, Contact.jsx */
  phone: "+91 99475 76699",
  /** @used-by ProductCard.jsx */
  whatsapp: "919947576699",

  /** @used-by Footer.jsx, Contact.jsx */
  hours: "Mon–Sat 10am–8pm, Sun Closed",
  /** @used-by MapEmbed.jsx */
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.9575940085947!2d75.80866637513012!3d11.264527588915435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65b1285c37a69%3A0xf8ab3fa03d6147c6!2sMALL%20OF%20DECOR!5e0!3m2!1sen!2sin!4v1775638283077!5m2!1sen!2sin",

  /** @used-by Footer.jsx */
  socials: {
    instagram: "https://instagram.com/mallofdecor",
    facebook: "https://www.facebook.com/people/Mall-Of-Decor/61556164552150/",
    twitter: "https://x.com/Mall_of_decor",
    indiamart: "https://www.indiamart.com/lustrous-industries/"
  }
};

/**
 * @used-by Hero.jsx
 */
export const HERO_TEXT = {
  buttonText: "Explore Collection",
  scrollText: "Scroll"
};

/**
 * @used-by MapEmbed.jsx
 */
export const CONTACT_SECTION = {
  mapTitle: "Find Us",
  email: "mallofdecor.llp@gmail.com"
};

export const storeData = {
  ...STORE,
  products: PRODUCTS,
  hero: HERO_TEXT,
  contact: CONTACT_SECTION
};

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={storeData}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
