import _ from "lodash";
import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { queryBlackList } from "../constants";

export default function Link(props) {
  const { cleanQuery, href, ...restProps } = props;
  const router = useRouter();
  const query = cleanQuery ? {} : _.omit(router.query, queryBlackList);
  const [pathname, hash] = href.split("#");
  const newHref = {
    hash,
    pathname,
    query,
  };
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <NextLink
      href={newHref}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    />
  );
}
