import * as React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useState, useEffect } from "react";
import { useRef } from "react";

const render = (status) => {
  return <h1>{status}</h1>;
};

function Map({ onClick, onIdle, children, style, center, ...options }) {
  const ref = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current));
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [options, map]);

  useEffect(() => {
    if (map) {
      map.setCenter(center);
    }
  }, [center, map]);

  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        // eslint-disable-next-line no-undef
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [onClick, onIdle, map]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
}

export default function AApp() {
  const [clicks, setClicks] = useState([]);
  const [zoom, setZoom] = useState(18); // initial zoom
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [center, setCenter] = useState({
    lat: latitude,
    lng: longitude,
  });
  const Marker = (options) => {
    useEffect(() => {
      // eslint-disable-next-line no-undef
      const marker = new google.maps.Marker({
        draggable: true,
        // eslint-disable-next-line no-undef
      });
      marker.setOptions(options);
    }, [options]);

    return null;
  };
  useEffect(() => {
    (async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        // eslint-disable-next-line no-undef
      });
    })();
  }, []);

  const onClick = (e) => {
    // avoid directly mutating state
    setClicks([e.latLng]);
    // setClicks([e.latLng]);
    // eslint-disable-next-line no-undef
  };

  const onIdle = (m) => {
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Wrapper
        apiKey={"AIzaSyCOiE2eWa6NRChpdRolHo_bO5OMz9-vQhw"}
        render={render}
      >
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{
            width: "400px",
            height: "200px",
            border: "2px solid black",
            borderRadius: "10px",
          }}
          loading="lazy"
        >
          {clicks.map((latLng, i) => (
            <Marker key={i} position={latLng} />
          ))}

          {/* {clicks.length !== 0 && <Marker position={clicks[0].toJSON()} />} */}
        </Map>
      </Wrapper>
      {/* Basic form for controlling center and zoom of map. */}
      {/* {form} */}
    </div>
  );
}
