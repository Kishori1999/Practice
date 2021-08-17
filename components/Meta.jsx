import React from "react";

export default function Meta() {
  return (
    <>
      <meta
        key="description"
        name="description"
        content="GoG is a Blockchain mobile RPG with 130k+ players on the waitlist. Play AND earn. Exclusive founder NFTs on sale, get free $GOG tokens for buying."
      />

      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:title" property="og:title" content="Guild of Guardians" />
      <meta
        key="og:description"
        property="og:description"
        content="GoG is a Blockchain mobile RPG with 130k+ players on the waitlist. Play AND earn. Exclusive founder NFTs on sale, get free $GOG tokens for buying."
      />
      <meta key="og:site_name" property="og:site_name" content="Guild of Guardians" />
      <meta key="og:image" property="og:image" content="http://guildofguardians.com/imgs/share-img.jpg" />

      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:site" name="twitter:site" content="@guildofguardian" />
      <meta key="twitter:image" name="twitter:image" content="http://guildofguardians.com/imgs/share-img.jpg" />

      {/*
        <meta key="og:url" property="og:url" content="" />

        <meta key="twitter:creator" name="twitter:creator" content="" />
        */}
    </>
  );
}
