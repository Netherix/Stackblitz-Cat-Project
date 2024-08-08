import React, { useState, useEffect } from 'react';
import Search from './Components/Search/Search';
import Pagination from './Components/Pagination/Pagination';
import Sorting from './Components/Sorting/Sorting';
import Favorites from './Components/Favorites/Favorites';
import LearnMore from './Components/LearnMore/LearnMore';
import Button from './Components/Button/Button';
import './App.css'
import { Route, Routes } from 'react-router-dom';

const Home = () => {
  const [catData, setCatData] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAttribute, setSortAttribute] = useState('default'); // State for sorting attribute

  const catsPerPage = 10;
  const maxPages = Math.ceil(catData.length / catsPerPage);
  const lastCatIndex = catsPerPage * currentPage;
  const firstCatIndex = lastCatIndex - catsPerPage;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.thecatapi.com/v1/breeds');
        if (!response.ok) {
          throw new Error('Error: could not get response');
        }
        const data = await response.json();
        setCatData(data);
      } catch (error) {
        console.error('Error: ', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when sorting changes
  }, [sortAttribute]);

  // Sort the catData based on the selected attribute
  const sortedCatData = [...catData].sort((a, b) => {
    if (sortAttribute === 'default') return 0; // No sorting if 'default' is selected
    return b[sortAttribute] - a[sortAttribute]; // Sort in descending order
  });

  const currentCatArray = sortedCatData.slice(firstCatIndex, lastCatIndex);

  const handleSortChange = (attribute) => {
    setSortAttribute(attribute); // Update sorting attribute based on user selection
  };

  const handleClick = (cat) => {
    if (selectedCat && selectedCat.id === cat.id) {
      setSelectedCat(null);
    } else {
      setSelectedCat(cat);
    }
  };

  const handleFavorites = (cat) => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/${cat.reference_image_id}`);
        if (!response.ok) {
          throw new Error('Response failed');
        }
        const data = await response.json();
        setFavorites((prevFavorites) => [...prevFavorites, data]);
      } catch (error) {
        console.error('Error: ', error);
      }
    };
    if (favorites.some(favorite => favorite.id === cat.reference_image_id)) {
      alert('This cat is already in your favorites!');
      return;
    }
    fetchData();
  };

  const handleRemoveFavorites = (image) => {
    const updatedFavorites = favorites.filter((favImage) => favImage.id !== image.id);
    setFavorites(updatedFavorites);
  };

  return (
    <div>
      <Routes>
        <Route path="/learn_more" element={<LearnMore test={'Hello'}/>} />
      </Routes>

      <Search catData={catData} />

      <Favorites
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorites}
      />

      <Sorting
        sortAttribute={sortAttribute}
        onSortChange={handleSortChange}
      />

      {currentCatArray.map((cat) => (
        <div className="styles" key={cat.id}>
          <button onClick={() => handleClick(cat)}>
            {cat.name}
          </button>
          {selectedCat && selectedCat.id === cat.id && (
            <img
              src={`https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`}
              alt={cat.name}
              style={{ height: '300px', width: '300px' }}
            />
          )}
          <Button text={'favorites'}/>
          <Button text={'learn more'} />
          {/* <button onClick={() => handleFavorites(cat)}>
            Favorite
          </button> */}
        </div>
      ))}

      <Pagination
        currentPage={currentPage}
        maxPages={maxPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Home;
