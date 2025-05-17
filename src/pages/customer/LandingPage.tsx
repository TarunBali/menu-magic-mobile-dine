
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Clock, MapPin, Star, Utensils } from 'lucide-react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  return (
    <CustomerLayout hideNav={true}>
      {/* Hero Section */}
      <section className="relative bg-cover bg-center py-32 text-white"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to FoodieSpot</h1>
          <p className="text-xl md:text-2xl mb-8">Experience the authentic flavors of Indian cuisine</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/menu">
              <Button size="lg" className="bg-restaurant-primary hover:bg-restaurant-secondary text-white">
                View Our Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/order-history">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                Check Order Status
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Restaurant Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-restaurant-accent rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-10 w-10 text-restaurant-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Opening Hours</h3>
              <p className="text-gray-600">Mon - Fri: 10am - 11pm</p>
              <p className="text-gray-600">Sat - Sun: 9am - 12am</p>
            </div>
            <div className="text-center">
              <div className="bg-restaurant-accent rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-10 w-10 text-restaurant-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="text-gray-600">123 Food Street</p>
              <p className="text-gray-600">Foodie City, FC 12345</p>
            </div>
            <div className="text-center">
              <div className="bg-restaurant-accent rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Utensils className="h-10 w-10 text-restaurant-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reservations</h3>
              <p className="text-gray-600">Call: (123) 456-7890</p>
              <p className="text-gray-600">Email: reservations@foodiespot.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Dishes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Special Dishes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our chef's special creations that blend traditional recipes with modern twists.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="food-card">
              <img
                src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398"
                alt="Butter Chicken"
                className="food-card-image"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">Butter Chicken</h3>
                  <span className="font-semibold text-restaurant-primary">₹320</span>
                </div>
                <p className="text-gray-600 mb-4">Tender chicken pieces in a rich tomato and butter gravy</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  </div>
                  <Link to="/menu">
                    <Button size="sm" className="bg-restaurant-primary hover:bg-restaurant-secondary">Order Now</Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="food-card">
              <img
                src="https://images.unsplash.com/photo-1567188040759-fb8a254b3128"
                alt="Paneer Tikka"
                className="food-card-image"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">Paneer Tikka</h3>
                  <span className="font-semibold text-restaurant-primary">₹220</span>
                </div>
                <p className="text-gray-600 mb-4">Cottage cheese marinated in spices and grilled to perfection</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>
                  <Link to="/menu">
                    <Button size="sm" className="bg-restaurant-primary hover:bg-restaurant-secondary">Order Now</Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="food-card">
              <img
                src="https://images.unsplash.com/photo-1589302168068-964664d93dc0"
                alt="Vegetable Biryani"
                className="food-card-image"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">Vegetable Biryani</h3>
                  <span className="font-semibold text-restaurant-primary">₹280</span>
                </div>
                <p className="text-gray-600 mb-4">Fragrant rice cooked with mixed vegetables and aromatic spices</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <Star className="h-4 w-4 text-gray-300" />
                  </div>
                  <Link to="/menu">
                    <Button size="sm" className="bg-restaurant-primary hover:bg-restaurant-secondary">Order Now</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link to="/menu">
              <Button size="lg" className="bg-restaurant-primary hover:bg-restaurant-secondary">
                View Full Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About FoodieSpot</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2010, FoodieSpot has been serving authentic and delicious cuisine to our valued customers for over a decade. Our recipes have been passed down through generations, preserving the authentic taste while incorporating modern culinary techniques.
              </p>
              <p className="text-gray-600 mb-6">
                We take pride in using only the freshest ingredients, locally sourced whenever possible, to create memorable dining experiences for our guests. Our dedicated team of chefs and staff work tirelessly to ensure that every dish that leaves our kitchen meets our high standards.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <Award className="h-6 w-6 text-restaurant-primary mr-2" />
                  <span className="text-gray-800 font-medium">Award-Winning Cuisine</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-6 w-6 text-restaurant-primary mr-2" />
                  <span className="text-gray-800 font-medium">Top-Rated Restaurant</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
                alt="Restaurant Interior"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-8 -left-8 bg-restaurant-primary text-white p-6 rounded-lg shadow-lg hidden md:block">
                <p className="text-2xl font-bold">10+</p>
                <p>Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-restaurant-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Order?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Enjoy our delicious food from the comfort of your home. Order online now!
          </p>
          <Link to="/menu">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-restaurant-primary">
              Order Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </CustomerLayout>
  );
};

export default LandingPage;
