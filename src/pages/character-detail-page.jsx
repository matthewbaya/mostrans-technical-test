import { gql, useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";
import Navbar from "../components/navbar";

export default function CharacterDetailPage() {
  const [character, setCharacter] = useState({});
  const [locationName, setLocationName] = useState("");
  const [assignedLocation, setAssignedLocation] = useState(null); // State untuk menyimpan lokasi yang di-assign
  const client = useApolloClient();
  const { id } = useParams();
  const GET_CHARACTERS_DETAIL = gql`
    query {
      character(id: ${id}) {
        name
        status
        species
        type
        gender
        origin {
          name
          type
          dimension
        }
        location {
          name
        }
        image
        episode {
          id
          name
        }
      }
    }
  `;

  useEffect(() => {
    client
      .query({ query: GET_CHARACTERS_DETAIL })
      .then((result) => {
        console.log(result.data.character);
        setCharacter(result.data.character);
      })
      .catch((error) => console.error(error));

    // Load assigned location from localStorage
    const savedLocation = localStorage.getItem(`assignedLocation-${id}`);
    if (savedLocation) {
      setAssignedLocation(savedLocation);
    }
  }, [id, client]);

  const handleAssignLocation = () => {
    if (locationName) {
      setAssignedLocation(locationName);
      localStorage.setItem(`assignedLocation-${id}`, locationName); // Save to localStorage
      setLocationName("");
    } else {
      alert("Location name must be unique and not empty");
    }
  };

  console.log(character);
  return (
    <>
      <Navbar></Navbar>
      <div className="container d-flex flex-column mt-3 mb-3">
        {character.name ? (
          <>
            <div className="d-flex flex-column align-items-center">
              <div className="d-flex gap-2 flex-column mb-2 align-items-center">
                <img
                  src={character.image}
                  alt={character.name}
                  style={{ width: "200px" }}
                />
                <h1>{character.name}</h1>
              </div>
              <div className="d-flex justify-content-center flex-column border border-primary-subtle rounded px-5 pt-3">
                <p>
                  Status:{" "}
                  <span
                    className={
                      character.status === "Alive"
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {character.status}
                  </span>
                </p>
                <p>
                  Species:{" "}
                  <span className="text-success">{character.species}</span>
                </p>
                <p>
                  Type: <span className="text-success">{character.type}</span>
                </p>
                <p>
                  Gender:{" "}
                  <span className="text-success">{character.gender}</span>
                </p>
                <p>
                  Origin :{" "}
                  <span className="text-success">{character.origin.name}</span>
                </p>
                <div className="d-flex gap-3 mb-3">
                  <input
                    className="form-control"
                    type="text"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    placeholder="Enter location name"
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleAssignLocation}
                  >
                    Assign Location
                  </button>
                </div>

                {assignedLocation && (
                  <p>Assigned Location: {assignedLocation}</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Loader></Loader>
          </div>
        )}
      </div>
    </>
  );
}
