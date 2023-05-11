import Cookies from "js-cookie";
import { getMetadataValue, parseJson } from "../utils";

interface CheckoutItem {
  item_id: string | number;
  item_name: string;
  variant: string;
  currency: string;
  price: string | number;
  quantity: string | number;
}

interface purchaseTrackProps {
  transaction_id: string | number;
  order_amount: string | number;
  tax: string | number;
  shipping_charge: string | number;
  currency: string;
  items: CheckoutItem[];
}

export const purchaseTrack = async (
  shopMetaData: any,
  {
    transaction_id,
    order_amount,
    tax,
    shipping_charge,
    currency,
    items,
  }: purchaseTrackProps
) => {
  const FC_TRACKING =
    shopMetaData &&
    getMetadataValue(shopMetaData, "fc_session_tracking") &&
    parseJson(getMetadataValue(shopMetaData, "fc_session_tracking"));

  fetch(
    `${
      FC_TRACKING?.api_uri || "https://tr.farziengineer.co/collect"
    }/?evt_type=Purchase`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ui: Cookies.get("user_id"),
        ci: FC_TRACKING?.client_id,
        transaction_id,
        order_amount,
        tax,
        shipping_charge,
        currency,
        items,
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
