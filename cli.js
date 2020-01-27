#!/usr/bin/env node

const axios = require("axios");
const twofactordomains = require("2fa-domains");

main();

async function main() {
  const domains = await twofactordomains.fetchDomains();
  const res = await axios.get("https://monitor.firefox.com/hibp/breaches");
  const breaches = res.data;
  const data = breaches.filter(breach => domains.includes(breach.Domain));

  console.log(domains.length, "2FA domains");
  console.log(breaches.length, "breaches");
  console.log(data.length, "breached domains have 2FA");
  console.log("");
  console.log(data.map(breach => breach.Name).join("\n"));
}
