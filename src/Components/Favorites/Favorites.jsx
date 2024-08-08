import React from 'react';

const Favorites = ({ favorites, onRemoveFavorite }) => {
  return (
    <div>
      <h3>Favorites</h3>
      {favorites.map((image) => (
        <div key={image.id}>
          <img
            src={image.url}
            alt={image.name}
            style={{ height: "300px", width: "300px" }}
          />
          <button onClick={() => onRemoveFavorite(image)}>
            Remove Favorites
          </button>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
