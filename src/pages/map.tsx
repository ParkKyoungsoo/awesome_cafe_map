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
    // addressToGeocode('서울 강남구 압구정로42길 27', map);
    getMarkdown(map);
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

  async function getMarkdown(map: any) {
    const getCafeAddress = await fetch('/api/getcafe');
    // const getCafeAddressJson = await getCafeAddress.json();

    const getCafeAddressToJson = await getCafeAddress.text();

    const stringHTML = JSON.parse((getCafeAddressToJson)).callMarkdonwToText;

    let dom = document.createElement('div');
    dom.innerHTML = stringHTML;

    const className = 'Box-body readme blob js-code-block-container js-search-container p-5 p-xl-6 gist-border-0';

    const markdownDom = dom.querySelector(`#readme`);
    if (markdownDom === null) return;
    const tmp = markdownDom.childNodes[1].childNodes;
    let cafeLocation = [];
    for (let i = 0; i < tmp.length; i++) {
      const textContent = markdownDom?.childNodes[1].childNodes[i].textContent;
      if (textContent?.includes('위치 :')) {
        const cafeLocationArr = textContent.split('\n').filter((text: string, index: number) => {
          return index === 1
        });
        cafeLocation.push(cafeLocationArr[0].slice(5));
      }
    }
    // console.log(cafeLocation);
    // return cafeLocation;
    cafeLocation.map((location: string) => {
      addressToGeocode(location, map);
    });
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
      {/* <button type='button' onClick={() => getMarkdown()}>테스트</button> */}
      <div id='map' style={{ width: '100%', height: '500px' }}></div>

    </>
  )
}