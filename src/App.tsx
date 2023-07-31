import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import styles from "./App.module.scss";
import Title from "./components/Title";
import SearchBar from "./components/SearchBar";
import Table from "./components/Table";
import Map from "./components/Map";

interface IpInfo {
  country_name: string,
  city: string,
  latitude: number,
  longitude: number,
  time_zone: {
    name: string;
    current_time: string;
  },
  isp: string,
  ip: string
}


interface IpAddress {
  ip: string;
}

function App() {
  const [ipAddress, setIpAddress] = useState<IpAddress | null>(null);
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  useEffect(() => {
    fetch("https://api.ipify.org?format=json&callback=?")
      .then((response) => response.json())
      .then((data) => setIpAddress(data));
  }, []);
  useEffect(() => {
    if (ipAddress) {
      searchForIp(ipAddress.ip)
    }
  }, [ipAddress]);

  const searchForIp = (address: string) => {
    fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=04f8804390a34325afa93d5e3a298f42&ip=${address}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setIpInfo(data);
      });
  }

  const formLocation = () => {
    return `${ipInfo?.country_name}, ${ipInfo?.city}`;
  };

  const formTimezone = () => {
    return `${ipInfo?.time_zone.name}, ${ipInfo?.time_zone.name}`;
  }

  return (
    <div className={styles.App}>
      <div className={styles.upper}>
        <Title text="IP tracker" />
        <SearchBar submitSearch={(address: string) => {searchForIp(address)}}/>
        {ipInfo && (
          <Table
            ip={ipInfo?.ip}
            location={formLocation()}
            timezone={formTimezone()}
            isp={ipInfo.isp}
          />
        )}
      </div>
      <div className={styles.bottom}>
        {ipInfo && <Map position={{lat: ipInfo.latitude, lng: ipInfo.longitude}}/>}
      </div>
    </div>
  );
}

export default App;
