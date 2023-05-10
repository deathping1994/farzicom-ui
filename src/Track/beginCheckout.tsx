import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Cookies from "js-cookie";
import queryString from "query-string";
import { getMetadataValue, parseJson } from "../utils";

interface BeginCheckoutProps {
  cart_amount: number;
  currency: string;
  items: {
    item_id: string | number;
    item_name: string;
    currency: string;
    price: string | number;
    quantity: string | number;
  };
}

export const beginCheckout = async (
  shopMetaData: any,
  { cart_amount, currency, items }: BeginCheckoutProps
) => {
  let visitorId, ip, utm;

  if (Cookies.get("fctrack_visitor_id")) {
    visitorId = Cookies.get("fctrack_visitor_id");
  } else {
    const fp = await FingerprintJS.load();
    const visitorProps = await fp.get();
    visitorId = visitorProps?.visitorId;
    Cookies.set("fctrack_visitor_id", visitorId);
  }

  if (sessionStorage.getItem("ip")) {
    ip = sessionStorage.getItem("ip");
  } else {
    try {
      const res = await fetch("https://qc.brimo.in/ip");
      const data = await res.json();
      ip = data?.ip;
      sessionStorage.setItem("ip", data?.ip);
    } catch (err) {
      console.log("err", err);
    }
  }

  if (Cookies.get("fctrack")) {
    utm = Cookies.get("fctrack");
  } else {
    const queryValue = queryString.parse(window.location.search);
    if (
      queryValue?.utm_source ||
      queryValue?.utm_medium ||
      queryValue?.utm_campaign
    ) {
      utm = `us=${queryValue?.utm_source}; um=${queryValue?.utm_medium}; uc=${queryValue?.utm_campaign}`;
    } else {
      utm = "";
    }
  }

  const FC_TRACKING =
    shopMetaData &&
    getMetadataValue(shopMetaData, "fc_session_tracking") &&
    parseJson(getMetadataValue(shopMetaData, "fc_session_tracking"));

  fetch(FC_TRACKING?.api_uri || "https://t.farziengineer.co/collect", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ui: Cookies.get("user_id"),
      ci: FC_TRACKING?.client_id,
      cart_amount,
      currency,
      items,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      if (res?.data?.ui) {
        Cookies.set("user_id", res?.data?.ui, {
          expires: 365 * 24 * 60 * 60 * 1000,
        });
      }
    })
    .catch((err) => {
      console.log("t.farziengineer.co/collect error:", err);
    });
};
