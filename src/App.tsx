import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import styles from "./App.module.scss";
import Title from "./components/Title";
import SearchBar from "./components/SearchBar";
import Table from "./components/Table";
import Map from "./components/Map";

interface IpInfo {
  ip: string;
  location: {
    country: string;
    region: string;
    timezone: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    geonameId: number;
  };
  domains: string[];
  as: {
    asn: number;
    domain: string;
    name: string;
    route: string;
    type: string;
  };
  isp: string;
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
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_3qmlDaay8nIBIyxf7Lia1IPzdJ3X3&ipAddress=${address}`
    )
      .then((response) => response.json())
      .then((data) => {
        setIpInfo(data);
      });
  }

  const formLocation = () => {
    return `${ipInfo?.location.country}, ${
      ipInfo?.location.region ? ipInfo?.location.region + "," : ""
    } ${ipInfo?.location.city}`;
  };

  return (
    <div className={styles.App}>
      <div className={styles.upper}>
        <Title text="IP tracker" />
        <SearchBar submitSearch={(address: string) => {searchForIp(address)}}/>
        {ipInfo && (
          <Table
            ip={ipInfo?.ip}
            location={formLocation()}
            timezone={ipInfo.location.timezone}
            isp={ipInfo.isp}
          />
        )}
      </div>
      <div className={styles.bottom}>
        {ipInfo?.location && <Map position={{...ipInfo?.location}}/>}
      </div>
    </div>
  );
}

export default App;
