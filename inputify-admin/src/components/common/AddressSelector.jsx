import { useState } from "react";

import {
  Country,
  State,
  City
} from "country-state-city";

import "../../styles/form.css";

function AddressSelector({
  formData,
  setFormData
}) {

  const [selectedCountry, setSelectedCountry] =
    useState("");

  const [selectedState, setSelectedState] =
    useState("");

  const countries =
    Country.getAllCountries();

  const states =
    State.getStatesOfCountry(
      selectedCountry
    );

  const cities =
    City.getCitiesOfState(
      selectedCountry,
      selectedState
    );

  return (

    <div className="address-section">

      <div className="form-grid">

        <div className="form-group">

          <label>
            Address Line 1
          </label>

          <input
            type="text"
            value={formData.address1 || ""}
            onChange={(e)=>
              setFormData({
                ...formData,
                address1:e.target.value
              })
            }
          />

        </div>

        <div className="form-group">

          <label>
            Address Line 2
          </label>

          <input
            type="text"
            value={formData.address2 || ""}
            onChange={(e)=>
              setFormData({
                ...formData,
                address2:e.target.value
              })
            }
          />

        </div>

        <div className="form-group">

          <label>
            Country
          </label>

          <select
            value={selectedCountry}
            onChange={(e)=>{

              setSelectedCountry(
                e.target.value
              );

              setSelectedState("");

              setFormData({
                ...formData,
                country:e.target.value,
                state:"",
                city:""
              });

            }}
          >

            <option value="">
              Select Country
            </option>

            {countries.map((country)=>(
              <option
                key={country.isoCode}
                value={country.isoCode}
              >
                {country.name}
              </option>
            ))}

          </select>

        </div>

        <div className="form-group">

          <label>
            State
          </label>

          <select
            value={selectedState}
            onChange={(e)=>{

              setSelectedState(
                e.target.value
              );

              setFormData({
                ...formData,
                state:e.target.value,
                city:""
              });

            }}
          >

            <option value="">
              Select State
            </option>

            {states.map((state)=>(
              <option
                key={state.isoCode}
                value={state.isoCode}
              >
                {state.name}
              </option>
            ))}

          </select>

        </div>

        <div className="form-group">

          <label>
            City
          </label>

          <select
            value={formData.city || ""}
            onChange={(e)=>
              setFormData({
                ...formData,
                city:e.target.value
              })
            }
          >

            <option value="">
              Select City
            </option>

            {cities.map((city)=>(
              <option
                key={city.name}
                value={city.name}
              >
                {city.name}
              </option>
            ))}

          </select>

        </div>

        <div className="form-group">

          <label>
            Zip Code
          </label>

          <input
            type="text"
            value={formData.zipcode || ""}
            onChange={(e)=>
              setFormData({
                ...formData,
                zipcode:e.target.value
              })
            }
          />

        </div>

      </div>

    </div>
  );
}

export default AddressSelector;