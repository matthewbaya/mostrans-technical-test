import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { gql, useApolloClient } from "@apollo/client";

// const GET_CHARACTERS_DETAIL = gql`
//     query {
//       character(id: ${id}) {
//         name
//         status
//         species
//         type
//         gender
//         origin {
//           name
//           type
//           dimension
//         }
//         location {
//           name
//         }
//         image
//         episode {
//           id
//           name
//         }
//       }
//     }
//   `;
export default function CharacterByLocation() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [locationKeys, setLocationKeys] = useState([]);

  const handleLocationClick = (locationKey) => {
    setSelectedLocation(locationKey);
    // Fetch characters for the selected location
    const storedCharacters =
      JSON.parse(localStorage.getItem(locationKey)) || [];
    setCharacters(storedCharacters);

    // Find all keys with the same value
    const locationValue = localStorage.getItem(locationKey);
    const keysWithSameValue = Object.keys(localStorage).filter(
      (key) => localStorage.getItem(key) === locationValue
    );
    setLocationKeys(keysWithSameValue);
  };

  useEffect(() => {
    // Fetch locations from local storage keys
    const storedLocations = Object.keys(localStorage)
      .filter((key) => key.startsWith("assignedLocation-"))
      .map((key) => ({
        key,
        value: localStorage.getItem(key),
      }))
      .sort((a, b) => a.value.localeCompare(b.value)); // Sort locations alphabetically by value
    setLocations(storedLocations);
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="container d-flex flex-column align-items-center">
        <h1>Character by Location</h1>
        <div className="col-3">
          <select
            className="form-select"
            onChange={(e) => handleLocationClick(e.target.value)}
          >
            <option value="">Select a location</option>
            {locations.map((location, index) => (
              <option key={index} value={location.key}>
                {location.value}
              </option>
            ))}
          </select>
        </div>
        {selectedLocation && (
          <div>
            <h2>Characters in {localStorage.getItem(selectedLocation)}</h2>
            <ul>
              {characters.map((character, index) => (
                <li key={index}>
                  <img
                    src={character.image}
                    alt={character.name}
                    style={{ width: "50px", height: "50px" }}
                  />
                  {character.name}
                </li>
              ))}
            </ul>
            <ul>
              {locationKeys.map((key, index) => (
                <li key={index}>{key}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
