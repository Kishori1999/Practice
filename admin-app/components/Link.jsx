import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

export default function Link(props) {
  const { cleanQuery, href, ...restProps } = props;
  const router = useRouter();
  const query = cleanQuery ? {} : router.query;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <NextLink
      href={{
        pathname: href,
        query,
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    />
  );
}
