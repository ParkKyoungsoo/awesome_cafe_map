import React, { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';

export default function Map() {
  useEffect(() => {
    let map = null;
    const initMap = () => {
      map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(37.511337, 127.012084),
        zoom: 13,
      });

      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.4867995957995, 126.982211871752),
        map: map,
        icon: {
          content: `
              <img style="width:50px; height:50px" alt="marker" src='' />
            `,
        },
      });

    }
    initMap();
    addressToGeocode('서울 강남구 압구정로42길 27', map);
  }, []);

  async function addressToGeocode(address: string = '서울 강남구 압구정로42길 27', map: any) {
    const callGeocode = await fetch(`/api/geocode`, {
      method: 'POST',
      body: JSON.stringify({
        address: address
      }),
    });

    const callGeocodeJson = await callGeocode.json();
    console.log(callGeocodeJson.addrLatLng.lng, ' / ', callGeocodeJson.addrLatLng.lat);

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(callGeocodeJson.addrLatLng.lng, callGeocodeJson.addrLatLng.lat),
      map: map,
      icon: {
        content: `
            <img style="width:50px; height:50px" alt="marker" src='' />
          `,
      },
    });
    // const addresses = callGeocodeJson.addresses[0];
    // const addrLatLng = {
    //   lat: addresses.x,
    //   lng: addresses.y
    // };

    // console.log('lat: ', addrLatLng.lat, ' / lng: ', addrLatLng.lng);
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Next Naver maps</title>
      </Head>
      <Script
        strategy='beforeInteractive'
        src='https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=77cjhgmasg'
      ></Script>
      {/* <button type='button' onClick={() => addressToGeocode()}>카페위치</button> */}
      <div id='map' style={{ width: '100%', height: '500px' }}></div>

    </>
  )
}