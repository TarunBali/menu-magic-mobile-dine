
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { menuItems, menuCategories } from '@/data/menuData';
import { MenuItem } from '@/types/menu';

const MenuPage = () => {
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(menuItems);
  
  useEffect(() => {
    let results = menuItems;
    
    // Apply category filter
    if (selectedCategory) {
      results = results.filter(item => item.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        item => 
          item.name.toLowerCase().includes(term) || 
          item.description.toLowerCase().includes(term)
      );
    }
    
    setFilteredItems(results);
  }, [searchTerm, selectedCategory]);

  return (
    <CustomerLayout>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Our Menu</h1>
            <p className="text-gray-600">Explore our wide range of delicious dishes</p>
          </div>
          
          <div className="mt-4 md:mt-0 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search menu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full md:w-64"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={!selectedCategory ? "default" : "outline"}
            onClick={() => setSelectedCategory('')}
            className={!selectedCategory ? "bg-restaurant-primary hover:bg-restaurant-secondary" : ""}
          >
            All
          </Button>
          {menuCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? "bg-restaurant-primary hover:bg-restaurant-secondary" : ""}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-gray-600 mb-6">
          Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
        </p>

        {/* Menu items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredItems.map((item) => (
            <div key={item.id} className="food-card">
              <div className="relative h-48">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  {item.isVegetarian && (
                    <Badge className="bg-green-500">Veg</Badge>
                  )}
                  {item.isSpicy && (
                    <Badge className="bg-red-500">Spicy</Badge>
                  )}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <span className="font-semibold text-restaurant-primary">₹{item.price}</span>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <Button
                    onClick={() => addItem(item)}
                    className="w-full bg-restaurant-primary hover:bg-restaurant-secondary"
                  >
                    Add to Cart
                    <Plus className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No items found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <Button onClick={() => { setSearchTerm(''); setSelectedCategory(''); }}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Cart CTA */}
        <div className="fixed bottom-20 md:bottom-8 left-0 right-0 flex justify-center pointer-events-none">
          <Link to="/cart" className="pointer-events-auto">
            <Button size="lg" className="bg-restaurant-primary hover:bg-restaurant-secondary shadow-lg">
              Go to Cart
            </Button>
          </Link>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default MenuPage;
