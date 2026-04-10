import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../context/context';
import ProductGrid from '../components/ProductGrid';
import ProductModal from '../components/ProductModal';
import { CATEGORY_METADATA } from '../context/category/categoryData';
import { LayoutGrid, List, ChevronRight, ChevronDown, Filter } from 'lucide-react';

const Products = () => {
  const { products } = useStore();
  const [filter, setFilter] = useState('All');
  const [subFilter, setSubFilter] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('Popularity');
  const [expandedCats, setExpandedCats] = useState(['Artificial Grass']);

  const toggleExpand = (cat) => {
    setExpandedCats(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleFilterChange = (cat, sub = null) => {
    setFilter(cat);
    setSubFilter(sub);
  };

  const filteredProducts = products.filter(p => {
    if (filter === 'All') return true;
    if (subFilter) return p.category === filter && p.subCategory === subFilter;
    return p.category === filter;
  }).sort((a, b) => {
    if (sortBy === 'Name (A-Z)') return a.name.localeCompare(b.name);
    if (sortBy === 'Name (Z-A)') return b.name.localeCompare(a.name);
    return 0; // Default popularity mock
  });

  const openProduct = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#f8fafc] min-h-screen pt-32 pb-20"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-[13px] text-site-secondary/60 mb-8 overflow-x-auto whitespace-nowrap hide-scrollbar py-2">
          <span className="cursor-pointer hover:text-black transition-colors" onClick={() => handleFilterChange('All')}>Home</span>
          <ChevronRight className="w-3 h-3" />
          <span className={`font-medium ${!subFilter ? 'text-black' : 'cursor-pointer hover:text-black transition-colors'}`} onClick={() => handleFilterChange(filter)}>{filter}</span>
          {subFilter && (
            <>
              <ChevronRight className="w-3 h-3" />
              <span className="font-medium text-black">{subFilter}</span>
            </>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-xl border border-site-text/5 shadow-sm p-6 sticky top-32">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-site-text/5">
                <Filter className="w-4 h-4 text-site-text/60" />
                <h2 className="font-medium text-sm uppercase tracking-wider text-site-text/80">Filters</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-site-secondary/50 mb-4 px-1">Category</h3>
                  <div className="space-y-1">
                    <button 
                      onClick={() => handleFilterChange('All')}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${filter === 'All' ? 'bg-site-bg text-black font-semibold' : 'hover:bg-site-bg/50 text-site-secondary/80'}`}
                    >
                      All Items
                    </button>
                    {CATEGORY_METADATA.map((cat) => (
                      <div key={cat.name} className="space-y-1">
                        <div 
                          className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer transition-all ${filter === cat.name && !subFilter ? 'bg-site-bg text-black font-semibold' : 'hover:bg-site-bg/50 text-site-secondary/80'}`}
                          onClick={() => handleFilterChange(cat.name)}
                        >
                          <span className="flex items-center gap-2">
                            {cat.children?.length > 0 && (
                              <button onClick={(e) => { e.stopPropagation(); toggleExpand(cat.name); }}>
                                {expandedCats.includes(cat.name) ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                              </button>
                            )}
                            {cat.name}
                          </span>
                          <span className="text-[10px] text-site-secondary/40 font-normal">({cat.count})</span>
                        </div>
                        {cat.children?.length > 0 && expandedCats.includes(cat.name) && (
                          <div className="pl-6 space-y-1 py-1">
                            {cat.children.map(sub => (
                              <button
                                key={sub}
                                onClick={() => handleFilterChange(cat.name, sub)}
                                className={`w-full text-left px-3 py-1.5 rounded-lg text-[13px] transition-all flex items-center gap-2 ${subFilter === sub ? 'text-black font-medium border-l-2 border-site-text pl-2 ml-[-2px]' : 'text-site-secondary/60 hover:text-black'}`}
                              >
                                {sub}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Listing Area */}
          <main className="flex-grow">
            <div className="bg-white rounded-xl border border-site-text/5 shadow-sm p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col">
                <h1 className="font-serif text-xl text-site-text">{subFilter || filter}</h1>
                <p className="text-[12px] text-site-secondary/50">Showing 1 - {filteredProducts.length} of {filteredProducts.length} items</p>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="flex items-center gap-2 flex-grow sm:flex-grow-0">
                  <span className="text-[12px] text-site-secondary/60 whitespace-nowrap">Sort By</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-site-bg/50 border-none rounded-lg text-sm px-3 py-2 focus:ring-1 focus:ring-site-text/10 outline-none w-full cursor-pointer"
                  >
                    <option>Popularity</option>
                    <option>Name (A-Z)</option>
                    <option>Name (Z-A)</option>
                  </select>
                </div>

                <div className="flex items-center gap-1 bg-site-bg/50 p-1 rounded-lg border border-site-text/5">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-black' : 'text-site-secondary/40 hover:text-site-secondary'}`}
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-black' : 'text-site-secondary/40 hover:text-site-secondary'}`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${filter}-${subFilter}-${viewMode}-${sortBy}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {filteredProducts.length > 0 ? (
                  <ProductGrid 
                    products={filteredProducts} 
                    onProductClick={openProduct} 
                    viewMode={viewMode}
                  />
                ) : (
                  <div className="bg-white rounded-3xl border border-site-text/5 p-20 text-center">
                    <p className="text-site-secondary text-4xl mb-4 opacity-20">✦</p>
                    <p className="text-site-secondary uppercase tracking-widest text-sm opacity-60">
                      No products found in this selection.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      <ProductModal product={selectedProduct} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </motion.div>
  );
};

export default Products;
