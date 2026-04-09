import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, onProductClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={onProductClick}
          index={index}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
