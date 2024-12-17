export function setupPreconnect() {
  const preconnectUrls = [
    "https://web.muveplayer.com",
    "https://api.muveplayer.com",
  ];

  preconnectUrls.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = url;
    document.head.appendChild(link);

    const dnsLink = document.createElement("link");
    dnsLink.rel = "dns-prefetch";
    dnsLink.href = url;
    document.head.appendChild(dnsLink);
  });
}
