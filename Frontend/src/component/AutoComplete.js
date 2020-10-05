import React from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import "@reach/combobox/styles.css";
import { saveAddress } from "../actions/address"
import { connect } from 'react-redux';

function AutoComplete(props) {
  const {
      value, 
      suggestions:{status, data}, 
      setValue, 
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        componentRestrictions: {country: "us"},
        location: {lat: () => 40.7128, lng: () => -74.0060},
        radius: 200 * 1000
      }
    })
    
    function passAddress(e) {
      if (props.listingForm) {
        props.onChangeHandler(e)
      } else if (props.home) {
        props.validateAddress()
      }
    }

    function placeHolderValue() {
      if(props.listingForm){
        if(props.edit){
          return `${props.listingObj.address}`
        }else{
        return "Enter Exact Address"
        }
      }else if(props.index){
        if (props.address === undefined){
          return "Enter a city, address, location"
        }else{
          return `${props.address}`
        }
      }else{
        return "Enter a city, address, location"
      }
    }

    return (
        <>
          <Combobox 
            onSelect={async (address) => {
              passAddress(address);
              setValue(address, false);
              clearSuggestions()
              try {
                  const results = await getGeocode({address});
                  const { lat, lng } = await getLatLng(results[0]);
                  props.saveAddress({
                      lat: lat,
                      lng: lng,
                      address: address
                  })
              } catch(error){
                  console.log(error)
              }
            }}
          >
            <ComboboxInput 
              value={value} 
              onChange={(e) => {
                setValue(e.target.value)
              }}
              placeholder={placeHolderValue()}
            />
            <ComboboxPopover>
              <ComboboxList >
                {status === "OK" && 
                  data.map(({place_id, description}) => (
                    <ComboboxOption key={place_id} value={description} />
                  ))}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
        </>
    )
}


const mapDispatchToProps = dispatch => {
    return {
      saveAddress: (address) => {
        dispatch(saveAddress(address))
      }
    }
}

export default connect(null, mapDispatchToProps)(AutoComplete);