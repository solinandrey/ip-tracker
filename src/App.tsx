import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import styles from "./App.module.scss";
import Title from "./components/Title";
import SearchBar from "./components/SearchBar";
import Table from "./components/Table";
import Map from "./components/Map";

interface IpInfo {
  status: string,
  country: string,
  countryCode: string,
  region: string,
  regionName: string,
  city: string,
  zip: string,
  lat: number,
  lon: number,
  timezone: string,
  isp: string,
  org: string,
  as: string,
  query: string
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
      `http://ip-api.com/json/${address}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setIpInfo(data);
      });
  }

  const formLocation = () => {
    return `${ipInfo?.country}, ${
      ipInfo?.region ? ipInfo?.region + "," : ""
    } ${ipInfo?.city}`;
  };

  return (
    <div className={styles.App}>
      <div className={styles.upper}>
        <Title text="IP tracker" />
        <SearchBar submitSearch={(address: string) => {searchForIp(address)}}/>
        {ipInfo && (
          <Table
            ip={ipInfo?.query}
            location={formLocation()}
            timezone={ipInfo.timezone}
            isp={ipInfo.isp}
          />
        )}
      </div>
      <div className={styles.bottom}>
        {ipInfo && <Map position={{...ipInfo, lng: ipInfo.lon}}/>}
      </div>
    </div>
  );
}

export default App;
