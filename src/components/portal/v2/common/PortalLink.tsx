import React from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Light wrapper around <Link> that maintains the portal
 * token in the query param.
 */
export const PortalLink = ({ children, to, ...props }) => {
  const { search } = useLocation();

  return (
    <Link to={to + search} {...props} viewTransition>
      {children}
    </Link>
  );
};
