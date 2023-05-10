import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Cookies from "js-cookie";
import queryString from "query-string";
import { getMetadataValue, parseJson } from "../utils";

interface addToCartTrackProps {
  product_name: string;
  product_id: string;
  quantity: string | number;
  product_price: string | number;
  currency: string;
  variant: string;
}

export const addToCartTrack = async (
  shopMetaData: any,
  {
    product_name,
    product_id,
    quantity,
    product_price,
    currency,
    variant,
  }: addToCartTrackProps
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

  fetch(
    `${
      FC_TRACKING?.api_uri || "https://t.farziengineer.co/collect"
    }/?evt_type=AddToCart`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ui: Cookies.get("user_id"),
        ci: FC_TRACKING?.client_id,
        product_name,
        product_id,
        quantity,
        product_price,
        currency,
        variant,
      }),
    }
  )
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
