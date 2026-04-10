import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, onProductClick, viewMode = 'grid' }) => {
  return (
    <div className={
      viewMode === 'grid' 
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8" 
        : "flex flex-col gap-4"
    }>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={onProductClick}
          index={index}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
