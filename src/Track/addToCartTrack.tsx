import Cookies from "js-cookie";
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
  const FC_TRACKING =
    shopMetaData &&
    getMetadataValue(shopMetaData, "fc_session_tracking") &&
    parseJson(getMetadataValue(shopMetaData, "fc_session_tracking"));

  fetch(
    `${
      FC_TRACKING?.api_uri || "https://tr.farziengineer.co/collect"
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
      console.log("tr.farziengineer.co/collect error:", err);
    });
};
